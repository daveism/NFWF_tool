import { Store } from './store';
import { identifyConfig } from '../config/identifyConfig';

const store = new Store({});

// Parses the configuration of identify values and gets the requested configuration object
// @param type | String - matches the layer key
// @param rank | String || Number - rounded and matches the value key
// @return Object
export function getIdentifyValue(type, rank) {
  const identifyData = identifyConfig.colorLookup;
  const trueRank = Math.round(typeof rank !== 'number' ? parseFloat(rank) : rank);
  let item;
  let i;
  let l;

  for (i = 0, l = identifyData.length; i < l; i += 1) {
    item = identifyData[i];
    if (item.layer === type && item.value === trueRank) {
      break;
    }
  }

  return item;
}

/**
 * update the display of element
 *  @param { Object } element - Element object from click event, used to toggle
 *                   display state
 */
export function toggleElementDisplay(thisEle, elements) {
  elements.forEach((ele) => {
    const name = ele.replace('main_nav_', '');
    const tabEle = document.querySelector(`[ref="tab-${name}"]`);
    const mapClass = tabEle.className;
    const newMapClass = mapClass + (mapClass.indexOf(' d-none') > 0) ? ' ' : 'd-none';

    tabEle.className = newMapClass;
  });
}

// convert a number to to the word representation
// of the number.  We are using the word in the HTML class
// and will use this to highlight the value in the chart details
export function numberToWord(number) {
  let numberWord = 'none';

  switch (number) {
    case 0:
      numberWord = 'none';
      break;
    case 1:
      numberWord = 'one';
      break;
    case 2:
      numberWord = 'two';
      break;
    case 3:
      numberWord = 'three';
      break;
    case 4:
      numberWord = 'four';
      break;
    case 5:
      numberWord = 'five';
      break;
    case 6:
      numberWord = 'six';
      break;
    case 7:
      numberWord = 'seven';
      break;
    case 8:
      numberWord = 'eight';
      break;
    case 9:
      numberWord = 'nine';
      break;
    case 10:
      numberWord = 'ten';
      break;
    case 11:
      numberWord = 'eleven';
      break;
    case 12:
      numberWord = 'twelve';
      break;
    case 13:
      numberWord = 'thirteen';
      break;
    case 14:
      numberWord = 'fourteen';
      break;
    case 15:
      numberWord = 'fifteen';
      break;
    case 16:
      numberWord = 'sixteen';
      break;
    case 17:
      numberWord = 'seventeen';
      break;
    case 18:
      numberWord = 'eightteen';
      break;
    case 19:
      numberWord = 'nineteen';
      break;
    case 20:
      numberWord = 'twenty';
      break;
    default:
  }
  return numberWord;
}

// Reformats data for the indexes
// @param data | Object - all data from the API
// @return Array
//  TODO add from mapconfig
export function getIndexes(data) {
  return [
    {
      label: 'Resilience Hubs',
      key: 'hubs',
      value: data.hubs,
      range: '1 to 10',
      source: 'default'
    },
    {
      label: 'Targeted Watershed Hubs',
      key: 'ns-hubs',
      value: data.ns_hubs,
      range: '1 to 5',
      source: 'ns'
    },
    {
      label: 'Aquatic Index',
      key: 'aquatic',
      value: data.aquatic,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Targeted Watershed Fish and Wildlife',
      key: 'ns-fishandwildlife',
      value: data.ns_fishandwildlife,
      range: '0 to 5',
      source: 'ns'
    },
    {
      label: 'Terrestrial Index',
      key: 'terrestrial',
      value: data.terrestrial,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Community Asset Index',
      key: 'asset',
      value: data.asset,
      range: '1 to 10',
      source: 'default'
    },
    {
      label: 'Targeted Watershed Asset Index',
      key: 'ns-asset',
      value: data.ns_asset,
      range: '1 to 5',
      source: 'ns'
    },
    {
      label: 'Threat Index',
      key: 'threats',
      value: data.threat,
      range: '1 to 10',
      source: 'default'
    },
    {
      label: 'Targeted Watershed Threat Index',
      key: 'ns-threats',
      value: data.ns_threat,
      range: '1 to 5',
      source: 'ns'
    },
    {
      label: 'Community Exposure Index',
      key: 'exposure',
      value: data.exposure,
      range: '1 to 10',
      source: 'default'
    },
    {
      label: 'Targeted Watershed Exposure Index',
      key: 'ns-exposure',
      value: data.ns_exposure,
      range: '1 to 5',
      source: 'ns'
    }
  ];
}

// Reformats data for the drivers of inputs
// @param data | Object - all data from the API
// @return Array
//  TODO add from mapconfig
export function groupByDriver(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}


// Reformats data for the asset drivers
// @param data | Object - all data from the API
// @return Array
//  TODO add from mapconfig
export function getFishAndWildLifeDrivers(data, region) {
  let drivers = [{
        label: 'Aquatic',
        key: 'aquatic',
        value: data.aquatic,
        range: '0 to 5',
        source: 'default'
      },
      {
        label: 'Terrestrial',
        key: 'terrestrial',
        value: data.terrestrial,
        range: '0 to 5',
        source: 'default'
      }];

  switch (region) {
    case 'puerto_rico':
      drivers = [{
            label: 'Marine',
            key: 'aquatic',
            value: data.marine,
            range: '0 to 5',
            source: 'default'
          },
          {
            label: 'Terrestrial',
            key: 'terrestrial',
            value: data.terrestrial,
            range: '0 to 5',
            source: 'default'
          }];
      break;
    case 'us_virgin_islands':
      drivers = [{
            label: 'Marine',
            key: 'aquatic',
            value: data.marine,
            range: '0 to 5',
            source: 'default'
          },
          {
            label: 'Terrestrial',
            key: 'terrestrial',
            value: data.terrestrial,
            range: '0 to 5',
            source: 'default'
          }];
      break;
    case 'northern_mariana_islands':
      drivers = [{
            label: 'Marine',
            key: 'aquatic',
            value: data.marine,
            range: '0 to 5',
            source: 'default'
          },
          {
            label: 'Terrestrial',
            key: 'terrestrial',
            value: data.terrestrial,
            range: '0 to 5',
            source: 'default'
          }];
      break;
    default:
      drivers = drivers;
  }
  return drivers;
}

// Reformats data for the asset drivers
// @param data | Object - all data from the API
// @return Array
//  TODO add from mapconfig
export function getAssetDrivers(data) {
  return [
    {
      label: 'Population Density',
      key: 'population-density',
      value: data.pop_density,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Social Vulnerability',
      key: 'social-vulnerability',
      value: data.social_vuln,
      range: '0 to 3',
      source: 'default'
    },
    {
      label: 'Critical Facilities',
      key: 'critical-facilities',
      value: data.crit_facilities,
      range: '0 or 5',
      source: 'default'
    },
    {
      label: 'Critical Infrastructure',
      key: 'critical-infrastructure',
      value: data.crit_infra,
      range: '0 to 6',
      source: 'default'
    }
  ];
}

// Reformats data for the threat drivers
// @param data | Object - all data from the API
// @return Array
//  TODO add from mapconfig
export function getThreatDrivers(data) {
  return [
    {
      label: 'Impermeable Soils',
      key: 'drainage',
      value: data.drainage,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Soil Erodibility',
      key: 'erosion',
      value: data.erosion,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Flood-Prone Areas',
      key: 'floodprone-areas',
      value: data.floodprone_areas,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Sea Level Rise',
      key: 'sea-level-rise',
      value: data.sea_level_rise,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Storm Surge',
      key: 'storm-surge',
      value: data.storm_surge,
      range: '0 to 5',
      source: 'default'
    },
    {
      label: 'Geological Stressors',
      key: 'geostress',
      value: data.geostress,
      range: '0 to 3',
      source: 'default'
    },
    {
      label: 'Areas of Low Slope',
      key: 'slope',
      value: data.slope,
      range: '0 to 5',
      source: 'default'
    }
  ];
}

// ensure the object or variable is valid...
// TODO: This should probably be looking for positives rather than checking it
// isn't one of a few negatives. For example this will let booleans, malformed
// lat/long objects, arrays and floats through when it probably shouldn't. The
// code doesn't really say what a valid object is other than not undefined,
// null, empty arrays, empty objects and empty strings.
//
// @param obj - typeless
export function checkValidObject(obj) {
  if (obj === undefined || obj === null) { return false; }
  if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
  if (typeof obj === 'string' && obj.length === 0) { return false; }

  return true;
}

// toggle spinner visibility on
export function spinnerOn() {
  const el = document.getElementById('map-working');
  const elHolder = document.querySelector('.leaflet-working');

  // ensure elements and class names exists
  if (el === undefined) { return false; }
  if (el.className.baseVal === undefined) { return false; }
  if (elHolder === undefined) { return false; }
  if (elHolder.className === undefined) { return false; }

  // update class for svg spinner
  const elClassName = el.className.baseVal;
  el.className.baseVal = elClassName.replace(' d-none', '');

  // update class for div element that holds svg.  Do this so it dose not cover
  // cover other map elements and panes
  elHolder.className = elHolder.className.replace(' d-none', '');
  elHolder.className = elHolder.className.replace('h-100', '');
  elHolder.className = elHolder.className.replace('w-100', '');
  elHolder.className += ' h-100';
  elHolder.className += ' w-100';

  return true;
}

// check if one of our ajax calls is working
// if we add anymore we will need to add it here
export function checkworking() {
  const workingDrawlayers = store.getStateItem('working_drawlayers');
  if (workingDrawlayers) { return true; }
  // console.log('working_drawlayers');

  const workingBasemap = store.getStateItem('working_basemap');
  if (workingBasemap) { return true; }
  // console.log('working_basemap');

  const workingMapinfo = store.getStateItem('working_mapinfo');
  if (workingMapinfo) { return true; }
  // console.log('working_mapinfo');

  const workingZonalstats = store.getStateItem('working_zonalstats');
  if (workingZonalstats) { return true; }
  // console.log('working_zonalstats');

  const workingSearch = store.getStateItem('working_search');
  if (workingSearch) { return true; }
  // console.log('working_search');

  const workingS3Retreive = store.getStateItem('working_s3retreive');
  if (workingS3Retreive) { return true; }
  // console.log('working_s3retreive');

  const workingS3Save = store.getStateItem('working_s3save');
  if (workingS3Save) { return true; }
  // console.log('working_s3save');

  return false;
}


// toggle spinner visibility off
export function spinnerOff(source = '') {
  if (checkworking()) { return false; }

  const el = document.getElementById('map-working');
  const elHolder = document.querySelector('.leaflet-working');

  // ensure elements and class names exists
  if (el === undefined) { return false; }
  if (el.className.baseVal === undefined) { return false; }
  if (elHolder === undefined) { return false; }
  if (elHolder.className === undefined) { return false; }

  // update class for svg spinner
  const elClassName = el.className.baseVal;
  el.className.baseVal = elClassName.replace(' d-none', '');
  el.className.baseVal += ' d-none';

  // update class for div element that holds svg.  Do this so it dose not cover
  // cover other map elements and panes
  elHolder.className = elHolder.className.replace(' d-none', '');
  elHolder.className = elHolder.className.replace('h-100', '');
  elHolder.className = elHolder.className.replace('w-100', '');
  elHolder.className += ' d-none';

  return true;
}

// TODO: Either generalize this so it isn't always background color and color but instead
// an attribute/value pair. Or preferably make this use classes so we can have the colors
// be in css.
export function addStyle(doc, type, values) {
  const element = doc.getElementById(`${type}-score`);
  if (element !== undefined && element !== null) {
    element.setAttribute('style', `background-color: ${values.backgroundColor}; color: ${values.color};`);
  }
}

// Note that the back-ticks are intentional. They use the new ES6 Template
// Literals pattern.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
export function replaceMapInfoValue(doc, type, values) {
  const element = doc.getElementById(`${type}-score`);
  if (element !== undefined && element !== null) {
    element.textContent = values.label;
  }
}

// check if a parentelemet contains a dom id
// deals with event bubbling so we can check
// if the child is in a specifc parent
export function ParentContains(target, id) {
  for (let p = target && target.parentElement; p; p = p.parentElement) {
    if (p.id === id) { return true; }
  }
  return false;
}

export function flatten(arr) {
  const flat = [];
  arr.forEach((d) => {
    if (Array.isArray(d)) {
      flat.push(...d);
    } else {
      flat.push(d);
    }
  });
  return flat;
}

export function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}

// adds a custom google events
export function googleAnalyticsEvent(action = '', category = '', label = '', value = 0) {
  gtag('event', action, {  // eslint-disable-line
    event_category: category,
    event_label: label,
    value: `${value}`,
    uuid: store.getStateItem('uuid')
  });
}

// add google event tags for downloads.
export function addDownloadGoogleEvents() {
  const downloadIds = [
    'download-hubs',
    'download-exposure',
    'download-assets',
    'download-threats',
    'download-aquatic',
    'download-terrestrial',
    'download-populationdensity',
    'download-socialvulnerability',
    'download-criticalfacilities',
    'download-criticalinfrastructure',
    'download-drainage',
    'download-erosion',
    'download-floodproneareas',
    'download-sealevelrise',
    'download-stromsurge',
    'download-geostressor',
    'download-slope'
  ];

  downloadIds.forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('click', (ev) => {
        // ga event action, category, label
        googleAnalyticsEvent('click', 'downloads', id);
      });
    }
  });

  const watersheds = [
    'whatcando-btn-reslinceprojects',
    'whatcando-btn-analyzesites',
    'whatcando-btn-learnmore',
    'whatcando-btn-targetedwatershed',
    'whatcando-btn-finalreport',
    'whatcando-btn-startusingCREST'
  ];

  watersheds.forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('click', (ev) => {
        // ga event action, category, label
        googleAnalyticsEvent('click', 'landingpage', id);
      });
    }
  });
}

// set stateitems if they do not exist
// we will have to any new ones if added.
// this will help when we adding new statitems "breaks" the webpage
export function addMissingStateItems() {
  // check for base map default is DarkGray
  if (!checkValidObject(store.getStateItem('basemap'))) {
    store.setStoreItem('basemap', 'DarkGray');
  }

  if (!checkValidObject(store.getStateItem('uuid'))) {
    store.setStoreItem('uuid', uuid());
  }


  // check for lastaction default is moveend
  if (!checkValidObject(store.getStateItem('lastaction'))) {
    store.setStoreItem('lastaction', 'moveend');
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapCenter'))) {
    store.setStoreItem('mapCenter', { lat: 36.27970720524017, lng: -95.05371093750001 });
  }

  // check for mapLayerDisplayStatus default is listed below
  // to long to list again
  if (!checkValidObject(store.getStateItem('mapLayerDisplayStatus'))) {
    store.setStoreItem('mapLayerDisplayStatus', {
      CONUS_HubsTMS: true,
      NS_HubsTMS: true,
      CONUS_ExposureTMS: false,
      NS_ExposureTMS: false,
      CONUS_AssetsTMS: false,
      NS_AssetsTMS: false,
      CONUS_ThreatsTMS: false,
      NS_ThreatsTMS: false,
      CONUS_AquaticTMS: false,
      CONUS_TerrestrialTMS: false,
      NSFishAndWildlifeTMS: false,
      CONUS_PopDensityTMS: false,
      CONUS_SocVulnTMS: false,
      CONUS_CriticalFacilitiesTMS: false,
      CONUS_CriticalInfrastructureTMS: false,
      CONUS_DraingeTMS: false,
      CONUS_ErosionTMS: false,
      CONUS_SLRTMS: false,
      CONUS_StormSurgeTMS: false,
      CONUS_GeoStressTMS: false,
      CONUS_SlopeTMS: false,
      CONUS_FloodProneAreasTMS: false,
      CONUS_FishAndWildlifeTMS: false,

      PR_HubsTMS: false,
      PR_ExposureTMS: false,
      PR_AssetsTMS: false,
      PR_ThreatsTMS: false,
      PR_AquaticTMS: false,
      PR_TerrestrialTMS: false,
      PR_PopDensityTMS: false,
      PR_SocVulnTMS: false,
      PR_CriticalFacilitiesTMS: false,
      PR_CriticalInfrastructureTMS: false,
      PR_DraingeTMS: false,
      PR_ErosionTMS: false,
      PR_SLRTMS: false,
      PR_StormSurgeTMS: false,
      PR_GeoStressTMS: false,
      PR_SlopeTMS: false,
      PR_FloodProneAreasTMS: false,
      PR_FishAndWildlifeTMS: false,
      PR_LandslideIndexTiles: false,
      PR_TsunamiIndexTiles: false,

      USVI_HubsTMS: false,
      USVI_ExposureTMS: false,
      USVI_AssetsTMS: false,
      USVI_ThreatsTMS: false,
      USVI_AquaticTMS: false,
      USVI_TerrestrialTMS: false,
      USVI_PopDensityTMS: false,
      USVI_SocVulnTMS: false,
      USVI_CriticalFacilitiesTMS: false,
      USVI_CriticalInfrastructureTMS: false,
      USVI_DraingeTMS: false,
      USVI_ErosionTMS: false,
      USVI_SLRTMS: false,
      USVI_StormSurgeTMS: false,
      USVI_GeoStressTMS: false,
      USVI_SlopeTMS: false,
      USVI_FloodProneAreasTMS: false,
      USVI_FishAndWildlifeTMS: false
    });
  }

  // check for maplayerlist default is open
  if (!checkValidObject(store.getStateItem('maplayerlist'))) {
    if (window.screen.availWidth < 769) {
      store.setStoreItem('maplayerlist', 'close');
    } else {
      store.setStoreItem('maplayerlist', 'open');
    }
  }

  // check for region default is conus
  if (!checkValidObject(store.getStateItem('region'))) {
    store.setStoreItem('region', 'continental_us');
  }


  // check for userareacount default is 0
  if (!checkValidObject(store.getStateItem('userareacount'))) {
    store.setStoreItem('userareacount', 0);
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapZoom'))) {
    store.setStoreItem('mapZoom', 4);
  }

  // check for activeNav default is main-nav-map
  if (!checkValidObject(store.getStateItem('activeNav'))) {
    store.setStoreItem('activeNav', 'main-nav-map');
  }

  // check for aboutNav default is about-nav-aboutgen
  if (!checkValidObject(store.getStateItem('aboutNav'))) {
    store.setStoreItem('aboutNav', 'about-nav-aboutgen');
  }

  // check for savedshapes default is {} NULL object
  if (!checkValidObject(store.getStateItem('savedshapes'))) {
    store.setStoreItem('savedshapes', {});
  }

  // check for userarea default is {} NULL object
  if (!checkValidObject(store.getStateItem('userarea'))) {
    store.setStoreItem('userarea', {});
  }

  // check for userareas default is {} NULL object
  if (!checkValidObject(store.getStateItem('userareas'))) {
    store.setStoreItem('userareas', {});
  }

  // check for userarea_buffered default is {} NULL object
  if (!checkValidObject(store.getStateItem('userarea_buffered'))) {
    store.setStoreItem('userarea_buffered', {});
  }

  // check for zonalstatsjson default is {} NULL object
  if (!checkValidObject(store.getStateItem('zonalstatsjson'))) {
    store.setStoreItem('zonalstatsjson', {});
  }

  // check for working_basemap default is false
  if (!checkValidObject(store.getStateItem('working_basemap'))) {
    store.setStoreItem('working_basemap', false);
  }

  // check for working_mapinfo default is false
  if (!checkValidObject(store.getStateItem('working_mapinfo'))) {
    store.setStoreItem('working_mapinfo', false);
  }

  // check for working_mapinfo default is false
  if (!checkValidObject(store.getStateItem('working_zonalstats'))) {
    store.setStoreItem('working_zonalstats', false);
  }

  // check for working_s3retreive default is false
  if (!checkValidObject(store.getStateItem('working_s3retreive'))) {
    store.setStoreItem('working_s3retreive', false);
  }

  // check for working_search default is false
  if (!checkValidObject(store.getStateItem('working_search'))) {
    store.setStoreItem('working_search', false);
  }

  // check for working_s3save default is false
  if (!checkValidObject(store.getStateItem('working_s3save'))) {
    store.setStoreItem('working_s3save', false);
  }

  // check for working_drawlayers default is false
  if (!checkValidObject(store.getStateItem('working_drawlayers'))) {
    store.setStoreItem('working_drawlayers', false);
  }

  // check for zonalactive default is false
  if (!checkValidObject(store.getStateItem('zonalactive'))) {
    store.setStoreItem('zonalactive', ['none', 'none']);
  }
}
