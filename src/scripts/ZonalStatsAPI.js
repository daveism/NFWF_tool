import { CancelToken, post } from 'axios';

const apiEndpoint = 'https://lg0njzoglg.execute-api.us-east-1.amazonaws.com/';
const zonalStatsPath = 'Prod/zonal_stats';

// https://xi4lrz17r8.execute-api.us-east-1.amazonaws.com/Prod/identify/proxy?x=1745727&y=451980

/** API Wrapper Service Class
* this wrapps the lambda service into axios js calls
* it should only handle the api calls
*/
export class ZonalStatsAPI {
  constructor(url = apiEndpoint, path = zonalStatsPath) {
    this.url = url + path;
    this.cancelToken = CancelToken.source();
  }

  async httpPost() {
    this.cancelToken.cancel('Cancelled Ongoing Request');
    this.cancelToken = CancelToken.source();
    const axiosConfig = {
      cancelToken: this.cancelToken.token,
      headers: {
        'content-type': 'text/plain'
      }
    };

    const postData = {"type":"FeatureCollection","name":"nfwf_projects","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"EZG_ID":62087,"prg_name":"The Nature Conservancy","proj_name":"Helen Wood Park/Alba Beach Coastal and Community Resilience Project","region":"Gulf","id":62087,"name":"Helen Wood Park/Alba Beach Coastal and Community Resilience Project","area":193802.458},"geometry":{"type":"Polygon","coordinates":[[[-88.07954411333384,30.5754026753025],[-88.07935546712419,30.575217055774587],[-88.08036158024238,30.5743894977231],[-88.08151142380606,30.573739821033737],[-88.08158328902879,30.573507792589933],[-88.08233787386746,30.573337638045025],[-88.08220312657484,30.572687954309398],[-88.08231092440893,30.57239404833262],[-88.08283194727372,30.5726183450796],[-88.08331703752715,30.57241725146844],[-88.08348771743113,30.57211561026992],[-88.08347873427829,30.571597403969463],[-88.08407162236581,30.57088583259808],[-88.08447586424366,30.5707698150317],[-88.08553587627891,30.56960189713371],[-88.08564367411302,30.569246104780884],[-88.08628147796475,30.569238370150025],[-88.08450281370219,30.57528666313919],[-88.08377517832204,30.575271194840266],[-88.08357754895954,30.575944063562876],[-88.08028073186682,30.575944063562876],[-88.07945428180544,30.575766179182153],[-88.07930156820713,30.575626965091356],[-88.07954411333384,30.5754026753025]]]}}]};

    try {
      const response = await post(this.url, postData, axiosConfig);
      console.log(response.data);
      return response.data.features[0].mean;
    } catch (err) {
      console.log(err)
      return {};
    }
  }

  async httPut() {
    this.cancelToken.cancel('Cancelled Ongoing Request');
    this.cancelToken = CancelToken.source();
    const axiosConfig = {
      cancelToken: this.cancelToken.token,
      headers: {
        'content-type': 'text/plain'
      }
    };

    const postData = {"type":"FeatureCollection","name":"nfwf_projects","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"EZG_ID":62087,"prg_name":"The Nature Conservancy","proj_name":"Helen Wood Park/Alba Beach Coastal and Community Resilience Project","region":"Gulf","id":62087,"name":"Helen Wood Park/Alba Beach Coastal and Community Resilience Project","area":193802.458},"geometry":{"type":"Polygon","coordinates":[[[-88.07954411333384,30.5754026753025],[-88.07935546712419,30.575217055774587],[-88.08036158024238,30.5743894977231],[-88.08151142380606,30.573739821033737],[-88.08158328902879,30.573507792589933],[-88.08233787386746,30.573337638045025],[-88.08220312657484,30.572687954309398],[-88.08231092440893,30.57239404833262],[-88.08283194727372,30.5726183450796],[-88.08331703752715,30.57241725146844],[-88.08348771743113,30.57211561026992],[-88.08347873427829,30.571597403969463],[-88.08407162236581,30.57088583259808],[-88.08447586424366,30.5707698150317],[-88.08553587627891,30.56960189713371],[-88.08564367411302,30.569246104780884],[-88.08628147796475,30.569238370150025],[-88.08450281370219,30.57528666313919],[-88.08377517832204,30.575271194840266],[-88.08357754895954,30.575944063562876],[-88.08028073186682,30.575944063562876],[-88.07945428180544,30.575766179182153],[-88.07930156820713,30.575626965091356],[-88.07954411333384,30.5754026753025]]]}}]};

    try {
      const response = await puy(this.url, postData, axiosConfig);
      console.log(response.data);
      return response.data.features[0].mean;
    } catch (err) {
      console.log(err)
      return {};
    }
  }


  getZonalStatsSummary() {
    return this.httpPost();
  }
}
