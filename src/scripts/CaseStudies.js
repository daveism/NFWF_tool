import { yaml} from 'js-yaml';

import caseStudiesTemplate from '../templates/case_studies.html';
import caseStudyConfig from 'js-yaml-loader!../config/caseStudyConfig.yml';
import {
  checkValidObject,
  googleAnalyticsEvent
} from './utilitys';

export class CaseStudies {
  constructor(mapComponent, exlore) {
    this.mapComponent = mapComponent;
    this.drawAreaGroup = exlore.drawAreaGroup;
    this.caseStudyConfig = caseStudyConfig;
    this.caseStudies = caseStudyConfig.caseStudies;
    this.labelOptions = {
      className: 'userarealabel',
      direction: 'center',
      noHide: false,
      clickable: false,
      permanent: true
    };


  }

  initalize () {
    const zonalAreaWrapper = document.getElementById('zonal-area-wrapper');
    if (zonalAreaWrapper) {
      zonalAreaWrapper.innerHTML = caseStudiesTemplate;

      const heading = document.querySelector('.explore-row-container .sticky-top.sideheading');
      this.displayOff(heading);
    }


    this.caseStudies.forEach((study) => {

      // update main study narrative
      this.updateNarrative(study.htmlid, study.narrative);
      this.updateName(study.htmlid, study.name);

      let lastactions;

      study.steps.forEach( (step) => {
        this.updateNarrative(step.htmlid, step.narrative);
        this.updateName(step.htmlid, step.name);

        if (step.nexthtmlid) {
          this.addNextEvent(step.htmlid, step.nexthtmlid);
        }

        if (step.lasthtmlid) {
          this.addLastEvent(step.htmlid, step.lasthtmlid);
        }

        if (step.actions.name) {
          this.updateActionName(step.htmlid, step.actions.name);
        }

        if (step.actions.layerToggle) {
          this.updateLayerToggleActionEvent(step.htmlid, step.actions.layerToggle, step.nexthtmlid);
        }

        if (step.actions.legendToggle) {
          this.updateLegendToggleActionEvent(step.htmlid, step.actions.legendToggle, step.nexthtmlid);
        }

        if (step.actions.geojson) {
          this.updateDrawGeoJSONActionEvent(step.htmlid, step.actions.geojsonlabel, step.actions.geojson, step.nexthtmlid);
        }

        if (step.actions.viewerlink) {
          this.addViewerLinkEvent(step.htmlid, step.actions.viewerlink, step.nexthtmlid);
        }

        lastactions = step.actions;
      })
    })

  }


  addNextEvent(htmlid, nexthtmlid) {
    const selector = `#${htmlid} #action-next`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.displayOffStep(htmlid);
        this.displayOnStep(nexthtmlid);
      })
    }
  }

  addLastEvent(htmlid, lasthtmlid) {
    const selector = `#${htmlid} #action-last`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.displayOffStep(htmlid);
        this.displayOnStep(lasthtmlid);
      })
    }
  }

  displayOnStep(htmlid){
    const selector = `#${htmlid}`;
    const elem = document.querySelector(selector);
    this.displayActionButton(elem);
  }

  displayOffStep(htmlid){
    const selector = `#${htmlid}`;
    const elem = document.querySelector(selector);
    this.displayOff(elem);
  }

  zoomToGeoJson(zoomlayer) {
    const zoomBounds = zoomlayer.getBounds();
    this.mapComponent.map.flyToBounds(zoomBounds.pad(0.2));
  }


  displayActionButton(elem) {
    if (elem) {
      elem.classList.remove('d-none');
    }
  }

  displayOff(elem) {
    if (elem) {
      elem.classList.add('d-none');
    }
  }

  // add label to layer.
  // label option defined in Explore class
  addUserAreaLabel(layer, name) {
    // if name not passed create the default area name
    // this happens when the user is drawing a new area
    let newname = name;
    if (!checkValidObject(name)) {
      newname = `${this.defaultAreaName}${shapecount}`;
    }
    // labels needs a sec so it's placed on the correct location
    setTimeout(() => { layer.bindTooltip(newname, this.labelOptions); }, 50);
  }

  addViewerLinkEvent(htmlid, href) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.href=href;
      elem.addEventListener( 'click', (e) => {
      })
    }
    this.displayActionButton(elem);
  }

  updateDrawGeoJSONActionEvent(htmlid, label, geojson) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.drawCaseStudyArea(JSON.parse(geojson), label);
      })
      this.displayActionButton(elem);
    }
  }

  updateLegendToggleActionEvent(htmlid, layer) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.legendToggle(layer);
      })
      this.displayActionButton(elem);
    }
  }

  updateLayerToggleActionEvent(htmlid, layer) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.layerToggle(layer);
      })
      this.displayActionButton(elem);
    }

    // const selectornext = `#${htmlid} #action-next`;
    // const elemnext = document.querySelector(selectornext)
    // if (elemnext) {
    //   elemnext.addEventListener( 'click', (e) => {
    //     this.layerToggle(layer);
    //     this.displayNextStep(nexthtmlid);
    //   })
    //   this.displayActionButton(elemnext);
    // }
  }

  updateActionName(htmlid, narrative) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.innerHTML = narrative;
    }
  }

  updateNarrative(htmlid, narrative) {
    const selector = `#${htmlid} #narrative`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.innerHTML = narrative;
    }
  }

  updateName(htmlid, narrative) {
    const selector = `#${htmlid} #name`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.innerHTML = narrative;
    }
  }

  triggerEvent (element, eventName) {
    var event = new Event(eventName);
    element.dispatchEvent(event);
  }

  layerToggle(layer) {
    const toggleBox = document.querySelector(`input#${layer}-toggle`);
    this.triggerEvent(toggleBox,'change')
    toggleBox.checked = !toggleBox.checked;
    this.mapComponent.toggleLayer(layer);
  }


  legendToggle(layer) {
    const toggle = document.getElementById(`${layer}-layerToggle`);
    toggle.classList.toggle('closed');
    toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');
  }

  // used by search by location
  drawCaseStudyArea(GeoJSON, Label) {
    if (checkValidObject(GeoJSON)) {

      const checklayer = this.drawAreaGroup.getLayers();
      if (checklayer.length > 0) {
        this.drawAreaGroup.clearLayers();
      } else {
        // convert geoJson to leaflet layer
        const layer = L.geoJson(GeoJSON);

        // add layer to the leaflet map
        this.drawAreaGroup.addLayer(layer);
        this.addUserAreaLabel(layer, Label);
        this.zoomToGeoJson(layer);
      }
    }
  }
}
