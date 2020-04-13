// default map template
import maplayersListTemplate from '../templates/maplayers_list.html';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';
import { Store } from './store';

// Legend Templates
import ColorRampHub from '../templates/colorramp_hub.html';
import ColorRampFishAndWildlife from '../templates/colorramp_fishandwildlife.html';
import ColorRampAquatic from '../templates/colorramp_aquatic.html';
import ColorRampTerrestrial from '../templates/colorramp_terrestrial.html';
import ColorRampExposure from '../templates/colorramp_exposure.html';
import ColorRampAsset from '../templates/colorramp_asset.html';
import ColorRampThreat from '../templates/colorramp_threat.html';
import ColorRampPopDensity from '../templates/colorramp_popdensity.html';
import ColorRampSocVuln from '../templates/colorramp_socvuln.html';
import ColorRampCritFac from '../templates/colorramp_critfac.html';
import ColorRampCritInfra from '../templates/colorramp_critinfra.html';
import ColorRampDrainage from '../templates/colorramp_drainage.html';
import ColorRampErosion from '../templates/colorramp_erosion.html';
import ColorRampFloodProne from '../templates/colorramp_floodprone.html';
import ColorRampSLR from '../templates/colorramp_slr.html';
import ColorRampStormSurge from '../templates/colorramp_stormsurge.html';
import ColorRampGeoStress from '../templates/colorramp_geostress.html';
import ColorRampSlopefrom from '../templates/colorramp_slope.html';
import ColorRampDriverAsset from '../templates/colorramp_driver_asset.html';
import ColorRampDriverThreat from '../templates/colorramp_driver_threat.html';
import ColorRampDriverNSHub from '../templates/colorramp_targetedwatershed_hub.html';
import ColorRampDriverNSExposure from '../templates/colorramp_targetedwatershed_exposure.html';
import ColorRampDriverNSAsset from '../templates/colorramp_targetedwatershed_asset.html';
import ColorRampDriverNSThreat from '../templates/colorramp_targetedwatershed_threat.html';
import ColorRampDriverNSFishAndWildlife from '../templates/colorramp_targetedwatershed_fishandwildlife.html';


// scss
import '../css/maplayers_list.scss';

import {
  googleAnalyticsEvent
} from './utilitys';

const store = new Store({});
// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;


// templates
// import layer_checkboxTemplate from '../templates/layer_checkbox.html'

/**
 * MapLayersList Component
 * Render and control map layer control
 */
export class MapLayersList extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, maplayersListTemplate);

    const { WMSLayers } = mapConfig;
    const { TMSLayers } = mapConfig;
    const { zoomRegions } = mapConfig;
    //  store.getStateItem('region')

    // console.log('zoomRegions', zoomRegions)
    // MapLayersList.addOpenMapLayerListener();
    MapLayersList.addToggleMapLayerListener();

    // Add a toggle button for each layer
    WMSLayers.forEach((layerProps) => { this.updateMapLayer(layerProps); });
    TMSLayers.forEach((layerProps) => { this.updateMapLayer(layerProps); });
    TMSLayers.forEach((layerProps) => { MapLayersList.addLegendHTML(layerProps); });

    MapLayersList.ListHolderToggle();
    MapLayersList.ToggleLayerListToggle();
    MapLayersList.mapListToggleToggle();

    MapLayersList.addBaseMapListeners(props.mapComponent);
    MapLayersList.addZoomregionListeners(props.mapComponent, zoomRegions);

    MapLayersList.addLegendListeners();

    this.LayerDescriptionTemplate = '<div class="tooltip layerlist" role="tooltip">' +
              '  <div class="arrow"></div><div class="tooltip-inner"></div>' +
              '  <div class="close-layerlist"><i class="fa fa-times" aria-hidden="true"></i></div>' +
              '</div>';

    this.addToolTipListners();
    MapLayersList.resizeMapList();
    window.addEventListener('resize', MapLayersList.resizeMapList);

    window.addEventListener('aboutNavChange', (e) => {
      const activeNav = store.getStateItem('activeNav');
      const defaultLayerList = document.getElementById('defaultLayerList');
      const nsLayerList = document.getElementById('NSLayerList');
      const btnZoomRegion = document.getElementById('btn-zoomregion');

      if (activeNav === 'main-nav-map-searchNShubs') {
        defaultLayerList.classList.add('d-none');
        nsLayerList.classList.remove('d-none');
        btnZoomRegion.classList.add('d-none');
      } else {
        defaultLayerList.classList.remove('d-none');
        nsLayerList.classList.add('d-none');
        btnZoomRegion.classList.remove('d-none');
      }
    });

    // change region is state changes
    window.addEventListener('regionChanged', (e) => {
      MapLayersList.toggleRegionLayerList();
    });

    // run at startup to capture region in current state
    MapLayersList.toggleRegionLayerList();
  }

  // tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
  // use tooltip and popover components everywhere
  // initalize new tooltips
  addToolTipListners() {
    $(() => {
      $('#maplayers_list [data-toggle="tooltip"]').tooltip({
        trigger: 'hover click focus',
        template: this.LayerDescriptionTemplate
      });

      $('#maplayers_list [data-toggle="tooltip"]').on('shown.bs.tooltip', () => {
        const elems = document.querySelectorAll('.tooltip.layerlist .close-layerlist');
        elems.forEach((elem) => {
          if (elem) {
            elem.addEventListener('click', (e) => {
              const toolTipElem = MapLayersList.ParentTooltip(e.target, 'tooltip');
              $(toolTipElem).tooltip('hide');
            });
          }
        });
      });
    });
  }

  // if parent is tooltip get id so we can hide it.
  static ParentTooltip(target, id) {
    for (let p = target && target.parentElement; p; p = p.parentElement) {
      if (p.id.substring(0, 7) === id) { return p; }
    }
    return null;
  }

  static resizeMapList() {
    const offset = 220;
    if (window.innerHeight < 1024) {
      document.querySelector('#maplayers_list-holder').style.maxHeight = `${window.innerHeight - offset}px`;
      document.querySelector('#maplayers_list-holder').style.height = `${window.innerHeight - offset}px`;
      document.querySelector('#maplayers_list').style.maxHeight = `${window.innerHeight - offset}px`;
      document.querySelector('#maplayers_list').style.height = `${window.innerHeight - offset}px`;
    } else {
      document.querySelector('#maplayers_list-holder').style.maxHeight = 'none';
      document.querySelector('#maplayers_list-holder').style.height = 'none';
      document.querySelector('#maplayers_list').style.maxHeight = 'none';
      document.querySelector('#maplayers_list').style.height = 'none';
    }

    document.querySelector('#maplayers_list-holder').style.maxHeight = `${window.innerHeight - offset}px`;
    document.querySelector('#maplayers_list').style.maxHeight = `${window.innerHeight - offset}px`;
  }

  static addZoomregionListeners(mapComponent, zoomRegions) {
    const btnzoomregionElem = document.getElementById('btn-zoomregion');
    if (btnzoomregionElem) {
      btnzoomregionElem.addEventListener('click', (e) => { MapLayersList.zoomRegionListToggle(e); });
    }

    const btnzoomregionList = document.getElementById('zoomregionlist');
    if (btnzoomregionList) {
      btnzoomregionList.addEventListener('click', (e) => { MapLayersList.zoomRegionListToggle(e); });
    }

    document.getElementById('zoomregion-cus').addEventListener('click', (e) => {
      const region = zoomRegions.filter(regions => regions.region === 'cus');
      MapLayersList.zoomToRegion(mapComponent, region[0]);
      MapLayersList.updateZoomRegionLabel('Contiental U.S.');

      // set region to conus
      store.setStoreItem('region', 'conus');
      const navChangeEvent = new CustomEvent('regionChanged');
      window.dispatchEvent(navChangeEvent);

      // ga event action, category, label
      googleAnalyticsEvent('click', 'zoomregion', 'cus');
    });

    document.getElementById('zoomregion-pr').addEventListener('click', (e) => {
      const region = zoomRegions.filter(regions => regions.region === 'pr');
      MapLayersList.zoomToRegion(mapComponent, region[0]);
      MapLayersList.updateZoomRegionLabel('Puerto Rico');

      // set region to puerto_rico
      store.setStoreItem('region', 'puerto_rico');
      const navChangeEvent = new CustomEvent('regionChanged');
      window.dispatchEvent(navChangeEvent);

      // ga event action, category, label
      googleAnalyticsEvent('click', 'zoomregion', 'pr');
    });

    document.getElementById('zoomregion-uvi').addEventListener('click', (e) => {
      const region = zoomRegions.filter(regions => regions.region === 'uvi');
      MapLayersList.zoomToRegion(mapComponent, region[0]);
      MapLayersList.updateZoomRegionLabel('US Virgin Islands');

      // set region to US Virgin Islands
      store.setStoreItem('region', 'us_virgin_islands');
      const navChangeEvent = new CustomEvent('regionChanged');
      window.dispatchEvent(navChangeEvent);

      // ga event action, category, label
      googleAnalyticsEvent('click', 'zoomregion', 'uvi');
    });

    document.getElementById('zoomregion-cmni').addEventListener('click', (e) => {
      const region = zoomRegions.filter(regions => regions.region === 'cmni');
      MapLayersList.zoomToRegion(mapComponent, region[0]);
      MapLayersList.updateZoomRegionLabel('Northern Mariana Islands');

      // set region to US Northern Mariana Islands
      store.setStoreItem('region', 'northern_mariana_islands');
      const navChangeEvent = new CustomEvent('regionChanged');
      window.dispatchEvent(navChangeEvent);

      // ga event action, category, label
      googleAnalyticsEvent('click', 'zoomregion', 'cmni');
    });

    // document.getElementById('zoomregion-guam').addEventListener('click', (e) => {
    //   const region = zoomRegions.filter(regions => regions.region === 'guam');
    //   MapLayersList.zoomToRegion(mapComponent, region[0]);
    //   MapLayersList.updateZoomRegionLabel('Guam');
    //   const navChangeEvent = new CustomEvent('regionChanged');
    //    window.dispatchEvent(navChangeEvent);
    //
    //   // set region to US Guam
    //   store.setStoreItem('region', 'guam');
    //
    //   // ga event action, category, label
    //   googleAnalyticsEvent('click', 'zoomregion', 'cmni');
    // });

    // document.getElementById('zoomregion-alaska').addEventListener('click', (e) => {
    //   const region = zoomRegions.filter(regions => regions.region === 'alaska');
    //   MapLayersList.zoomToRegion(mapComponent, region[0]);
    //   MapLayersList.updateZoomRegionLabel('alaska');
    //   const navChangeEvent = new CustomEvent('regionChanged');
    //    window.dispatchEvent(navChangeEvent);
    //
    // set region to alaska
    // store.setStoreItem('region', 'alaska');
    //
    //   // ga event action, category, label
    //   googleAnalyticsEvent('click', 'zoomregion', 'alaska');
    // });
    //
    // document.getElementById('zoomregion-hawaii').addEventListener('click', (e) => {
    //   const region = zoomRegions.filter(regions => regions.region === 'hawaii');
    //   MapLayersList.zoomToRegion(mapComponent, region[0]);
    //   MapLayersList.updateZoomRegionLabel('hawaii');
    //   const navChangeEvent = new CustomEvent('regionChanged');
    //    window.dispatchEvent(navChangeEvent);
    //
    // set region to hawaii
    // store.setStoreItem('region', 'hawaii');
    //
    //   // ga event action, category, label
    //   googleAnalyticsEvent('click', 'zoomregion', 'hawaii');
    // });
  }

  // zppm to region
  static zoomToRegion(mapComponent, region) {
    // console.log('region', region)
    mapComponent.map.setView({ lat: region.center[0], lng: region.center[1] }, region.zoom);
  }

  static addBaseMapListeners(mapComponent) {
    document.getElementById('basemap-DarkGray').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('DarkGray');
      MapLayersList.updateBaseMapLabel('Dark Gray');
      // ga event action, category, label
      googleAnalyticsEvent('click', 'basemap', 'Dark Gray');
    });

    document.getElementById('basemap-Imagery').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('Imagery');
      MapLayersList.updateBaseMapLabel('Imagery');
      // ga event action, category, label
      googleAnalyticsEvent('click', 'basemap', 'Imagery Gray');
    });

    document.getElementById('basemap-Topographic').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('Topographic');
      MapLayersList.updateBaseMapLabel('Topographic');
      // ga event action, category, label
      googleAnalyticsEvent('click', 'basemap', 'Topographic');
    });

    document.getElementById('basemap-Streets').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('Streets');
      MapLayersList.updateBaseMapLabel('Streets');
      // ga event action, category, label
      googleAnalyticsEvent('click', 'basemap', 'Streets');
    });

    const btnBaseMapElem = document.getElementById('btn-basemap');
    if (btnBaseMapElem) {
      btnBaseMapElem.addEventListener('click', (e) => { MapLayersList.baseMapListToggle(e); });
    }

    const btnBaseMapList = document.getElementById('basemaplist');
    if (btnBaseMapList) {
      btnBaseMapList.addEventListener('click', (e) => { MapLayersList.baseMapListToggle(e); });
    }
  }

  // toggle layer list for regions conus, pr, usvi, cmni, alaska...
  static toggleRegionLayerList() {
    // get region state
    const region = store.getStateItem('region');
    const activeNav = store.getStateItem('activeNav');

    if (activeNav === 'main-nav-map-searchNShubs') {
      return null;
    }

    console.log('toggleRegionLayerList', region);
    let src = '';

    const defaultLayerList = document.getElementById('defaultLayerList');
    const nsLayerList = document.getElementById('NSLayerList');
    const puertoRicoLayerList = document.getElementById('puertoRicoLayerList');

    switch (region) {
      case 'conus':
        defaultLayerList.classList.remove('d-none');
        puertoRicoLayerList.classList.add('d-none');
        MapLayersList.updateZoomRegionLabel('Contiental U.S.');
        break;
      case 'puerto_rico':
        defaultLayerList.classList.add('d-none');
        puertoRicoLayerList.classList.remove('d-none');
        MapLayersList.updateZoomRegionLabel('Puerto Rico');
        break;
      case 'northern_mariana_islands':
        src = '';
        MapLayersList.updateZoomRegionLabel('Northern Mariana Islands');
        break;
      case 'us_virgin_islands':
        src = '';
        MapLayersList.updateZoomRegionLabel('US Virgin Islands');
        break;
      case 'alaska':
        src = '';
        MapLayersList.updateZoomRegionLabel('Alaska');
        break;
      case 'hawaii':
        src = '';
        break;
        MapLayersList.updateZoomRegionLabel('Hawaii');
      case 'guam':
        src = '';
        MapLayersList.updateZoomRegionLabel('Guam');
        break;
      default:
        src = '';
        MapLayersList.updateZoomRegionLabel('Contiental U.S.');
        break;
    }

  }

  static updateBaseMapLabel(basemapname) {
    const labelElem = document.getElementById('btn-basemap-label');
    if (labelElem) {
      labelElem.innerHTML = basemapname;
    }
  }

  static updateZoomRegionLabel(basemapname) {
    const labelElem = document.getElementById('btn-zoomregion-label');
    if (labelElem) {
      labelElem.innerHTML = basemapname;
    }
  }

  // toggle basemap list on
  static baseMapListToggle(e) {
    // ga event action, category, label
    googleAnalyticsEvent('click', 'button', 'basemaplist');

    const baseMapListElem = document.getElementById('basemaplist');
    const isBaseMapListVissible = baseMapListElem.classList.contains('closed');

    if (isBaseMapListVissible) {
      baseMapListElem.classList.remove('closed');
      // baseMapListElem.classList.remove('active');
    } else {
      baseMapListElem.classList.add('closed');
      // baseMapListElem.classList.add('active');
    }
  }

  // toggle zoom region list on
  static zoomRegionListToggle(e) {
    // ga event action, category, label
    googleAnalyticsEvent('click', 'button', 'zoomregionlist');

    const zoomRegionListElem = document.getElementById('zoomregionlist');
    const iszoomRegionListVissible = zoomRegionListElem.classList.contains('closed');

    if (iszoomRegionListVissible) {
      zoomRegionListElem.classList.remove('closed');
      // baseMapListElem.classList.remove('active');
    } else {
      zoomRegionListElem.classList.add('closed');
      // baseMapListElem.classList.add('active');
    }
  }

  static toggleMapLayerListState() {
    const mapLayerListState = store.getStateItem('maplayerlist');
    if (mapLayerListState === 'open') {
      store.setStoreItem('lastaction', 'maplayerlistclose');
      store.setStoreItem('maplayerlist', 'close');
      // ga event action, category, label
      googleAnalyticsEvent('click', 'maplayerlist', 'close');
    } else {
      store.setStoreItem('lastaction', 'maplayerlistopen');
      store.setStoreItem('maplayerlist', 'open');
      // ga event action, category, label
      googleAnalyticsEvent('click', 'maplayerlist', 'open');
    }

    MapLayersList.ListHolderToggle();
    MapLayersList.ToggleLayerListToggle();
    MapLayersList.mapListToggleToggle();
  }

  static ListHolderToggle() {
    const maplayersHolder = document.getElementById('maplayers_list-holder');
    const mapLayerListState = store.getStateItem('maplayerlist');
    if (maplayersHolder) {
      if (mapLayerListState === 'open') {
        maplayersHolder.classList.add('h-70');
        maplayersHolder.classList.remove('h-0');
      } else {
        maplayersHolder.classList.remove('h-70');
        maplayersHolder.classList.add('h-0');
      }
    }
  }

  static mapListToggleToggle() {
    const mapListToggle = document.getElementById('mapListToggle');
    const mapLayerListState = store.getStateItem('maplayerlist');
    if (mapListToggle) {
      if (mapLayerListState === 'open') {
        mapListToggle.classList.add('show');
      } else {
        mapListToggle.classList.remove('show');
      }
    }
  }

  static ToggleLayerListToggle() {
    const layerList = document.getElementById('ToggleLayerList');
    const mapLayerListState = store.getStateItem('maplayerlist');
    if (layerList) {
      if (mapLayerListState === 'open') {
        layerList.classList.remove('closed');
      } else {
        layerList.classList.add('closed');
      }
    }
  }

  static removeListners() {
    const layerListClose = document.querySelector('.bnt-MapLayersListToggle');
    if (layerListClose) {
      const newLayerListClose = layerListClose.cloneNode(true);
      layerListClose.parentNode.replaceChild(newLayerListClose, layerListClose);
      return newLayerListClose;
    }
    return layerListClose;
  }

  static addToggleMapLayerListener() {
    const layerListClose = document.querySelector('.bnt-MapLayersListToggle');
    if (layerListClose) {
      // add the listener
      layerListClose.addEventListener('click', (ev) => {
        MapLayersList.toggleMapLayerListState();
      });
    }
  }

  /** Create and append new layer button DIV */
  updateMapLayer(layerProps) {
    // add listener
    this.addLayerListListener(layerProps.id);

    // update label
    MapLayersList.updateLayerListName(layerProps.id, layerProps.label);
  }

  // Gets the HTML wrapper of layer controls by id
  //
  // @param id | String
  // @return DOM Element
  static getLayerWrapperFromString(id) {
    return document.getElementById(`${id}-layerToggle`);
  }

  // Gets the HTML wrapper of layer controls by child elem
  //
  // @param elem | DOM Element
  // @return DOM Element
  static getLayerWrapperFromElem(elem) {
    return elem.closest('.custom-control');
  }

  // Multiple functions need to get the wrapper but have different parameters available in their
  // closure, so this gets the wrapper based on what they have.
  //
  // @param param | String || DOM Element
  // @return DOM Element
  static getLayerWrapper(param) {
    return typeof param === 'string' ? MapLayersList.getLayerWrapperFromString(param) :
      MapLayersList.getLayerWrapperFromElem(param);
  }

  // Gets the HTML wrapper of a layers legend and description
  //
  // @param elem | DOM Element
  // @return DOM Element
  static getLegendWrapper(elem) {
    return elem.querySelector('.layer-legend');
  }

  // Returns the HTML for a specified legend type
  //
  // @param type | String
  // @return String
  static getLegendHtml(type) {
    switch (type) {
      case 'hub':
        return ColorRampHub;
      case 'asset':
        return ColorRampAsset;
      case 'threat':
        return ColorRampThreat;
      case 'exposure':
        return ColorRampExposure;
      case 'terrestrial':
        return ColorRampTerrestrial;
      case 'fishandwildlife':
        return ColorRampFishAndWildlife;
      case 'aquatic':
        return ColorRampAquatic;
      case 'driver-asset':
        return ColorRampDriverAsset;
      case 'popdensity':
        return ColorRampPopDensity;
      case 'socvuln':
        return ColorRampSocVuln;
      case 'critfac':
        return ColorRampCritFac;
      case 'critinfra':
        return ColorRampCritInfra;
      case 'drainage':
        return ColorRampDrainage;
      case 'erosion':
        return ColorRampErosion;
      case 'floodprone':
        return ColorRampFloodProne;
      case 'slr':
        return ColorRampSLR;
      case 'stormsurge':
        return ColorRampStormSurge;
      case 'geostress':
        return ColorRampGeoStress;
      case 'slope':
        return ColorRampSlopefrom;
      case 'driver-threat':
        return ColorRampDriverThreat;
      case 'ns-hub':
        return ColorRampDriverNSHub;
      case 'ns-exposure':
        return ColorRampDriverNSExposure;
      case 'ns-asset':
        return ColorRampDriverNSAsset;
      case 'ns-threat':
        return ColorRampDriverNSThreat;
      case 'ns-fishandwildlife':
        return ColorRampDriverNSFishAndWildlife;
      case 'pr_hub':
        return ColorRampHub;
      case 'pr_asset':
        return ColorRampAsset;
      case 'pr_threat':
        return ColorRampThreat;
      case 'pr_exposure':
        return ColorRampExposure;
      case 'pr_terrestrial':
        return ColorRampTerrestrial;
      case 'pr_aquatic':
        return ColorRampAquatic;
      case 'pr_driver-asset':
        return ColorRampDriverAsset;
      case 'pr_popdensity':
        return ColorRampPopDensity;
      case 'pr_socvuln':
        return ColorRampSocVuln;
      case 'pr_critfac':
        return ColorRampCritFac;
      case 'pr_critinfra':
        return ColorRampCritInfra;
      case 'pr_drainage':
        return ColorRampDrainage;
      case 'pr_erosion':
        return ColorRampErosion;
      case 'pr_floodprone':
        return ColorRampFloodProne;
      case 'slr':
        return ColorRampSLR;
      case 'pr_stormsurge':
        return ColorRampStormSurge;
      case 'pr_geostress':
        return ColorRampGeoStress;
      case 'pr_slope':
        return ColorRampSlopefrom;
      case 'pr_driver-threat':
        return ColorRampDriverThreat;
      case 'pr_landslides':
        return ColorRampSlopefrom;
      case 'pr_tsunami':
        return ColorRampSlopefrom;

      default:
        return '';
    }
  }

  // Gets the HTML wrapper of a layers description
  //
  // @param elem | DOM Element
  // @return DOM Element
  static getDescriptionWrapper(elem) {
    return elem.querySelector('.layer-description-text');
  }

  // Opens and closes the legend area
  //
  // @param elem | DOM Element
  static toggleLegendHtml(elem) {
    elem.classList.toggle('closed');
    elem.classList.toggle('open');
    MapLayersList.getLayerWrapper(elem).querySelector('.layer-legend-wrapper').classList.toggle('closed');
    MapLayersList.getLayerWrapper(elem).querySelector('.layer-legend-wrapper').classList.toggle('open');
  }

  // Gets the id of the legend to be used in the store
  //
  // @param elem | DOM Element
  static getLegendId(elem) {
    return `${MapLayersList.getLayerWrapper(elem).id.replace('-layerToggle', '')}-legend`;
  }

  // Adds or removes the legend from the store
  //
  // @param elem | DOM Element
  static toggleLegendState(elem) {
    const legendId = MapLayersList.getLegendId(elem);
    let legendstate = false;
    if (store.checkItem(legendId)) {
      store.removeStateItem(legendId);
      // ga event action, category, label
      googleAnalyticsEvent('click', 'maplayerlist', `close legend ${elem.id}`);
      legendstate = false;
    } else {
      // ga event action, category, label
      googleAnalyticsEvent('click', 'maplayerlist', `open legend ${elem.id}`);
      store.addStateItem(legendId, 'true');
      legendstate = true;
    }
    return legendstate;
  }

  // Opens the legend block if the legend id is in the store
  //
  // @param elem | DOM Element
  static setInitialLegendStatus(elem) {
    const legendId = MapLayersList.getLegendId(elem);
    if (store.checkItem(legendId)) {
      MapLayersList.toggleLegendHtml(elem);
    }
  }

  // Inserts the legend and layer description
  //
  // @param layerProps | Object
  static addLegendHTML(layerProps) {
    const layerElem = MapLayersList.getLayerWrapper(layerProps.id);
    if (layerElem) {
      MapLayersList.getLegendWrapper(layerElem).innerHTML =
          MapLayersList.getLegendHtml(layerProps.legend);
      MapLayersList.getDescriptionWrapper(layerElem).setAttribute('title', layerProps.description);
      MapLayersList.setInitialLegendStatus(layerElem.getElementsByClassName('layer-legend-toggler')[0]);
    }
  }

  // Handles the toggle legend button being interacted with
  // `this` is the button dom element.
  static handleLegendChange(e) {
    MapLayersList.toggleLegendHtml(this);
    MapLayersList.toggleLegendState(this);
  }

  // Adds listeners to the legend buttons
  static addLegendListeners() {
    const legendButtons = document.getElementsByClassName('layer-legend-toggler');
    let i;
    let l;
    for (i = 0, l = legendButtons.length; i < l; i += 1) {
      legendButtons[i].addEventListener('click', MapLayersList.handleLegendChange);
    }
  }

  /**
   *  update the label text from the mapConfig.js file
   *    this is an overide so we can overide the default layer list text
   *  @param { string }  layer id for selecting the dom element.
   *   @param { string }  layer iname the layers name for the label text.
   *
   */
  static updateLayerListName(layerId, layerName) {
    // get and update the layer's label
    const label = document.getElementById(`${layerId}-label`);

    // ensure the html dom element exists
    if (label !== undefined) {
      if (label != null) {
        // update the label
        label.textContent = layerName;
      }
    }
  }

  /**
   *  adds an event listner to the maplayer list.
   *    The listner fires when a user clicks and toggles the display of the map layer
   *  @param { string }  layer id.
   *
   */
  addLayerListListener(layerId) {
    // get and update the layer's checkbox
    const checkBox = document.getElementById(`${layerId}-toggle`);
    const region = store.getStateItem('region');
    if (layerId.includes('PR')) {
      // console.log('addLayerListListener', layerId, checkBox);
    }

    // ensure the html dom element exists
    if (checkBox !== undefined) {
      if (checkBox != null) {
        // add the listner
        checkBox.addEventListener('click', (e) => {
          this.toggleMapLayer(layerId);
        });
      }
    }
  }

  /** Toggle map layer visibility */
  toggleMapLayer(layerName) {
    // Trigger layer toggle callback
    this.triggerEvent('layerToggle', layerName);
  }
}

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = (s) => {
    let el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }
    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
