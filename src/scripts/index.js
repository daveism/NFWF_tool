// import dependencies
import Navigo from 'navigo';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// import custom classess
import { Store } from './store';
import { URL } from './url';
import {
  checkValidObject,
  addMissingStateItems,
  addDownloadGoogleEvents
} from './utilitys';

// import extended components
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { NavBar } from './navBar';
import { About } from './about';
import { Explore } from './explore';
import { MapInfo } from './mapinfo';
import { ShareUrl } from './shareurl';
import { SearchLocations } from './searchlocations';

// import html templates
import DownloadDataPage from '../templates/downloaddata.html';
import NotFoundPage from '../templates/notfound.html';
import LandingPage from '../templates/landingpage.html';
import { restoreGraphState } from './zonalStats';

// scss
import '../css/_print.scss';
// initialize navbar
// const aboutnavBarComponent = new AboutNavBar('about-nav-holder');
const navBarComponent = new NavBar('nav-holder');

const urlParams = new URLSearchParams(window.location.search);
const hasShareURL = urlParams.get('shareurl');
const theStartNav = urlParams.get('fornav');
const URLCls = new URL();

library.add(fas, far);


// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch();

let mapComponent;
let maplayersComponent;
let exploreComponent;
let mapInfoComponent;
let searchLocationsComponent;
let aboutComponent;
let shareurl;

const store = new Store({});

// lint overirdes
store.setStoreItem('navBarComponent', navBarComponent);
store.removeStateItem('navBarComponent');
store.setStoreItem('maplayersComponent', maplayersComponent);
store.removeStateItem('maplayersComponent');
store.setStoreItem('aboutComponent', aboutComponent);
store.removeStateItem('aboutComponent');
store.setStoreItem('shareurl', shareurl);
store.removeStateItem('shareurl');

let homeloc = window.location.origin;
// handle gh pages dist folder.
if (homeloc === 'https://nemac.github.io') {
  homeloc += '/NFWF_tool/dist';
}

// Creates a new Leaflet Map in the target DOM element
//
// @param selector - string DOM selector
// Closes over global import Map
function initMap(selector) {
  return new Map(selector);
}

// Creates a new about page component
//
// @param selector - string DOM selector
// Closes over global import Map
function initAbout(selector) {
  return new About(selector);
}

// Creates a new Leaflet Map in the target DOM element
//
// @param map - instantiated element of class Map
// @param selector - string DOM selector
// Closes over global import MapLayersList
function initMapLayerList(map, selector) {
  return new MapLayersList(selector, {
    mapComponent: map,
    events: {
      layerToggle: (event) => { map.toggleLayer(event.detail); }
    }
  });
}

// set the state for items that could be working
// we will need this to make sure we do not stop the spinner befire the work
// is actually complete
function setworkingstates() {
  store.setStoreItem('working_basemap', false);
  store.setStoreItem('working_mapinfo', false);
  store.setStoreItem('working_zonalstats', false);
  store.setStoreItem('working_search', false);
  store.setStoreItem('working_s3retreive', false);
  store.setStoreItem('working_s3save', false);
  store.setStoreItem('working_drawlayers', false);
}

// Creates the entire map component
//
// Closes over global import Map
function initMapComponent() { // add parameter for type of explore
  if (mapComponent === undefined) {
    mapComponent = initMap('map-holder');
    maplayersComponent = initMapLayerList(mapComponent, 'maplayers_list-holder');
    mapInfoComponent = new MapInfo('', { mapComponent });
    setworkingstates();
    exploreComponent = new Explore('explore-holder', {
      mapComponent,
      mapInfoComponent,
      hasShareURL,
      theStartNav
    });
    shareurl = new ShareUrl('', { mapComponent, URLCls });
    // add switch for type of explore
    searchLocationsComponent = new SearchLocations('', {
      mapComponent,
      mapInfoComponent,
      exploreComponent,
      hasShareURL,
      theStartNav
    });
  }

  // restore only if first render
  if (mapComponent.renderCount === 0) {
    mapComponent.restoreMapState();

    if (checkValidObject(mapInfoComponent)) {
      mapInfoComponent.restoreMapInfoState();
    }

    if (checkValidObject(searchLocationsComponent)) {
      searchLocationsComponent.restoreSearchLocationsState();
    }

    if (checkValidObject(exploreComponent)) {
      exploreComponent.restoreSavedGeoJson();
      restoreGraphState();
    }
  }


  mapComponent.renderCount += 1;

  // delay listners unitll after setup also needs slight time out so the map dose not move on start
  setTimeout(() => { mapComponent.addMapEventListners(mapComponent.map); }, 1000);
}

// deal with nav bars so back button is not broken
//
// @param selector - string DOM selector
// Closes over global import NavBar
function setNavBars(selector) {
  NavBar.resetTabContent();

  const activeNav = store.getStateItem('activeNav');

  // this very hacky need better way to handle
  if (selector === 'main-nav-map-searchhubs' || selector === 'main-nav-map-searchNShubs' || selector === 'main-nav-map-examples') {
    NavBar.toggleTabContent('main-nav-map');
  } else {
    NavBar.toggleTabContent(selector);
  }

  if (activeNav) {
    if (activeNav === 'main-nav-map-searchhubs' || activeNav === 'main-nav-map-searchNShubs' || activeNav === 'main-nav-map-examples') {
      NavBar.tabUpdate(activeNav);
    } else {
      NavBar.tabUpdate(selector);
    }
  } else {
    NavBar.tabUpdate(selector);
  }
  const navChangeEvent = new CustomEvent('aboutNavChange');
  window.dispatchEvent(navChangeEvent);
}

// Initializes the static pages by inserting the rendered template into the selected DOM element
//
// @param selector - string DOM selector
// @param template - HTML template
function initStaticPage(selector, template) {
  const componentElem = document.getElementById(selector);
  componentElem.innerHTML = template;
}

const router = new Navigo(homeloc, true);

addMissingStateItems();
if (window.screen.availWidth < 769) {
  store.setStoreItem('maplayerlist', 'close');
}

router.on({
  '/': (params, query) => {
    initStaticPage('landingpage-holder', LandingPage);
    setNavBars('main-nav-landingpage');
    addDownloadGoogleEvents();
  },
  '/Home': (params, query) => {
    initStaticPage('landingpage-holder', LandingPage);
    setNavBars('main-nav-landingpage');
    addDownloadGoogleEvents();
  },
  '/AnalyzeProjectSites': (params, query) => {
    initMapComponent();
    setNavBars('main-nav-map');
  },
  '/SearchHubs': (params, query) => {
    initMapComponent();
    setNavBars('main-nav-map-searchhubs');
  },

  '/SearchNSHubs': (params, query) => {
    initMapComponent();
    setNavBars('main-nav-map-searchNShubs');
  },
  '/Examples': (params, query) => {
    initMapComponent();
    setNavBars('main-nav-map-examples');
  },
  '/About': (params, query) => {
    aboutComponent = initAbout('about-holder');
    setNavBars('main-nav-about');
  },
  '/Download': (params, query) => {
    initStaticPage('download-holder', DownloadDataPage);
    setNavBars('main-nav-download');
    addDownloadGoogleEvents();
  }
});

// implement later need to make the tab content area dynamic also
router.notFound((query) => {
  NavBar.resetTabContent();
  NavBar.toggleTabContent('main-nav-notfound');

  // initialize 404
  initStaticPage('notfound-holder', NotFoundPage);
});

router.resolve();

// only run if share url has different start nav
if (checkValidObject(theStartNav)) {
  const elemMain = document.getElementById('main-nav-map');
  if (elemMain) {
    elemMain.click();
  }
  const elemStartNav = document.getElementById(theStartNav);
  if (elemStartNav) {
    elemStartNav.click();
  }
}
