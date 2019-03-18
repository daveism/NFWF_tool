
// Use Case
//
// Normal Flow:
//  Using a supplied geojson feature, convert the geometry to Esri json and
//  send a request for an intersection query to the NatureServe hubs Feature Server hosted on ArcGIS Online.
//  The response contains a list of Esri feature objects that intersect the supplied feature.
//
//  Each feature object is then transformed back into a geojson feature to match the structure
//  of a geojson feature returned from the zonal stats API (nfwf-tool-api).
//  When all features have finished processing, return an Array of processed features.
//
// Alternate Flow:
//  The request for intersection is a success, but no features are returned.
//  Return an empty Array.
//
// Alternate Flow (Errors):
//  - The geojson feature is malformed.
//  - The Feature Server returns a bad request status code (400).
//  In these cases an Error object is returned.
import simplify from '@turf/simplify';
import config from '../config/NatureServeHubIntersectionConfig';

const Terraformer = require('terraformer');
Terraformer.ArcGIS = require('terraformer-arcgis-parser');
const axios = require('axios');

function transformAgolAttrs(attrs) {
  const props = { mean: {} };
  Object.keys(attrs).forEach((agolField) => {
    let fieldName;
    const val = attrs[agolField];
    if (agolField in config.fieldMaps) {
      fieldName = config.fieldMaps[agolField];
    } else {
      fieldName = agolField;
    }
    props.mean[fieldName] = val;
  });
  return props;
}

function convertAgolNatureServeHubsFeature(feature) {
  const geojsonGeom = Terraformer.ArcGIS.parse(feature.geometry);
  const featureGeojson = {
    type: 'Feature',
    properties: transformAgolAttrs(feature.attributes),
    geometry: geojsonGeom
  };
  return featureGeojson;
}

export class NatureServeHubIntersectionApi {
  constructor(url = config.queryUrl) {
    this.queryUrl = url;
    this.agolOutFields = config.agolOutFields;
  }

  static simplifyshape(feature) {
    const options = { tolerance: 0.0009, highQuality: false };
    const simplified = simplify(feature, options);
    return simplified;
  }

  static simplifyGeoJson(geojsonFeatures) {
    return geojsonFeatures.map((feature) => {
      const options = { tolerance: 0.0009, highQuality: false };
      const simplified = simplify(feature, options);
      return simplified;
    });
  }

  async getIntersectedNatureServeHubs(feature) {
    try {
      const esriGeom = Terraformer.ArcGIS.convert(feature.geometry);
      const esriGeomStr = JSON.stringify(esriGeom);

      const queryParams = {
        geometry: esriGeomStr,
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryPolygon',
        outFields: this.agolOutFields.join(),
        f: 'json',
        inSR: 4326,
        outSR: 4326
      };

      const response = await axios.get(this.queryUrl, {
        params: queryParams
      });
      if (Object.prototype.hasOwnProperty.call(response.data, 'error')) {
        throw response.data.message;
      }
      const esriFeatures = response.data.features;
      const geojsonFeatures = esriFeatures.map(f => convertAgolNatureServeHubsFeature(f));

      const newgeojson = NatureServeHubIntersectionApi.simplifyGeoJson(geojsonFeatures);

      return newgeojson;
    } catch (err) {
      return new Error(err);
    }
  }
}
