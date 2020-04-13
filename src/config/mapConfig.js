export var mapConfig = {

  //ESRI Vector BaseMap
  ESRIVectorBasemap: {
    name: "DarkGray"
  },

  //tile layers (WMS)
  TMSLayers:[
    {
      id: "HubsTMS",
      layer: "Hubs TMS",
      label: "Resilience Hubs",
      url: "https://tiles.resilientcoasts.org/HubsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "hub",
      description: "Areas of open lands and protected space that are most suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "ExposureTMS",
      layer: "Exposure TMS",
      label: "Community Exposure Index",
      url: "https://tiles.resilientcoasts.org/ExposureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "exposure",
      description: "The product of the Asset and Threat Indices, which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "AssetsTMS",
      layer: "Assets TMS",
      label: "Community Asset Index",
      url: "https://tiles.resilientcoasts.org/AssetsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "asset",
      description: "Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "ThreatsTMS",
      layer: "Threats TMS",
      label: "Threat Index",
      url: "https://tiles.resilientcoasts.org/ThreatsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "threat",
      description: "Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.",
      source: 'regional',
      region: 'conus'
    },

    {
      id: "FishAndWildlifeTMS",
      layer: "FishAndWildlife TMS",
      label: "Fish and Wildlife Index",
      url: "https://tiles.resilientcoasts.org/CombinedWildlifeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "fishandwildlife",
      description: "Fish and wildlife needs a descriptionm currently this text is just a placeholder.",
      source: 'fishandwildlife',
      region: 'conus'
    },
    {
      id: "AquaticTMS",
      layer: "Aquatic TMS",
      label: "Marine Index",
      url: "https://tiles.resilientcoasts.org/AquaticIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "aquatic",
      description: "An index of priority aquatic species and their habitats, ranked by HUC-10 watershed. A high value represents watersheds where the most priority species and their habitats are present.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "TerrestrialTMS",
      layer: "Terrestrial TMS",
      label: "Terrestrial Index",
      url: "https://tiles.resilientcoasts.org/TerrestrialIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "terrestrial",
      description: "An index of priority terrestrial species and their habitats, ranked by HUC-10 watershed. This Index also includes Important Bird Areas, which transcend watershed boundaries. A high value represents areas where the most priority species, their habitats, and important bird areas are present.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "PopDensityTMS",
      layer: "Population Density TMS",
      label: "Population Density",
      url: "https://tiles.resilientcoasts.org/PopDensityIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "popdensity",
      description: "A ranking of population density by census blocks based on the 2016 American Community Survey. Areas are ranked from low to high using the ratio of people per square kilometer.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "SocVulnTMS",
      layer: "Social Vulnerability TMS",
      label: "Social Vulnerability",
      url: "https://tiles.resilientcoasts.org/SocVulnIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "socvuln",
      description: "Communities that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN dataset. Census blocks above the 80th percentile are ranked from low to high, depicting areas of lower median incomes and minority populations.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "CriticalFacilitiesTMS",
      layer: "Critical Facilities TMS",
      label: "Critical Facilities",
      url: "https://tiles.resilientcoasts.org/CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "critfac",
      description: "Facilities such as schools, hospitals, and police and fire stations that are important to recovery efforts when a community is faced with a flood-related event. All facilities are given the same presence rank.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "CriticalInfrastructureTMS",
      layer: "Critical Infrastructure TMS",
      label: "Critical Infrastructure",
      url: "https://tiles.resilientcoasts.org/CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "critinfra",
      description: "Infrastructure in and around communities that are integral to a community’s ability to recover from a flood event, including primary highways, power plants, and rail lines, among others. High values suggest areas where multiple infrastructure overlap.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "DrainageTMS",
      layer: "Drainage TMS",
      label: "Impermeable Soils",
      url: "https://tiles.resilientcoasts.org/DraingeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "drainage",
      description: "Those areas with poor water drainage potential, including both less-porous soils and areas with high-intensity development. High values suggest that areas contain soils with poor drainage potential and/or a prevalence of developed, impervious surfaces that may pool during flooding or heavy precipitation events.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "ErosionTMS",
      layer: "Erosion TMS",
      label: "Soil Erodibility",
      url: "https://tiles.resilientcoasts.org/ErosionIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "erosion",
      description: "Those areas that contain soil characteristics that have a high susceptibility of soil particle detachment by water. This may include areas that have high silt content or migratory systems such as beaches and dunes. High values suggest that areas carry an increased potential for erosion due to flooding or heavy precipitation events.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "SLRTMS",
      layer: "Sea Level Rise TMS",
      label: "Sea Level Rise",
      url: "https://tiles.resilientcoasts.org/SLRIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "slr",
      description: "NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "StormSurgeTMS",
      layer: "Storm Surge TMS",
      label: "Storm Surge",
      url: "https://tiles.resilientcoasts.org/StormSurgeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "stormsurge",
      description: "Based on the impacts from modeled hurricane storm categories, storm surge is ranked from low to high, with low being a 5-foot surge and high being a 1-foot surge. As a 1-foot surge is more likely to occur than a 5-foot surge, areas within the 1-foot designation are ranked with higher values.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "GeoStressTMS",
      layer: "Geo Stressors TMS",
      label: "Geological Stressors",
      url: "https://tiles.resilientcoasts.org/GeoStressIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "geostress",
      description: "The geologic conditions of the landscape that can exacerbate the level of threat represented from other inputs. Conditions that are highlighted in this input include both landslide susceptibility and subsidence.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "SlopeTMS",
      layer: "Slope TMS",
      label: "Areas of Low Slope",
      url: "https://tiles.resilientcoasts.org/SlopeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "slope",
      description: "The percent rise of the elevation of the landscape, given values from low to high. High values indicate those areas that are very low lying and more likely to retain water and flood.",
      source: 'regional',
      region: 'conus'
    },
    {
      id: "FloodProneAreasTMS",
      layer: "Flood Prone Areas TMS",
      label: "Flood-Prone Areas",
      url: "https://tiles.resilientcoasts.org/FloodProneAreasIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "floodprone",
      description: "Areas considered by FEMA to be in the 100- and 500-year flood zones, as well as the floodway. Frequently and occasionally flooded soil designations are used to identify areas outside of FEMA coverage. Highest values suggest areas directly in the floodway, whereas low values suggest occasionally flooded soils outside of the floodplain.",
      source: 'regional',
      region: 'conus'
    },






    {
      id: "PR_HubsTMS",
      label: "Hubs TMS",
      label: "Resilience Hubs",
      url: "https://tiles.resilientcoasts.org/HubsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "pr_hub",
      description: "Areas of open lands and protected space that are most suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_ExposureTMS",
      label: "Exposure TMS",
      label: "Community Exposure Index",
      url: "https://tiles.resilientcoasts.org/PR_ExposureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_exposure",
      description: "The product of the Asset and Threat Indices, which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_AssetsTMS",
      label: "Assets TMS",
      label: "Community Asset Index",
      url: "https://tiles.resilientcoasts.org/PR_AssetsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_asset",
      description: "Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_ThreatsTMS",
      label: "Threats TMS",
      label: "Threat Index",
      url: "https://tiles.resilientcoasts.org/PR_ThreatsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_threat",
      description: "Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.",
      source: 'regional',
      region: 'puerto_rico'
    },

    {
      id: "PR_FishAndWildlifeTMS",
      label: "FishAndWildlife TMS",
      label: "Fish and Wildlife Index",
      url: "https://tiles.resilientcoasts.org/PR_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_fishandwildlife",
      description: "Fish and wildlife needs a descriptionm currently this text is just a placeholder.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_AquaticTMS",
      label: "Marine TMS",
      label: "Marine Index",
      url: "https://tiles.resilientcoasts.org/PR_AquaticIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_aquatic",
      description: "An index of priority aquatic species and their habitats, ranked by HUC-10 watershed. A high value represents watersheds where the most priority species and their habitats are present.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_TerrestrialTMS",
      label: "Terrestrial TMS",
      label: "Terrestrial Index",
      url: "https://tiles.resilientcoasts.org/PR_TerrestrialIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_terrestrial",
      description: "An index of priority terrestrial species and their habitats, ranked by HUC-10 watershed. This Index also includes Important Bird Areas, which transcend watershed boundaries. A high value represents areas where the most priority species, their habitats, and important bird areas are present.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_PopDensityTMS",
      label: "Population Density TMS",
      label: "Population Density",
      url: "https://tiles.resilientcoasts.org/PR_PopDensityIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_popdensity",
      description: "A ranking of population density by census blocks based on the 2016 American Community Survey. Areas are ranked from low to high using the ratio of people per square kilometer.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_SocVulnTMS",
      label: "Social Vulnerability TMS",
      label: "Social Vulnerability",
      url: "https://tiles.resilientcoasts.org/PR_SocVulnIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_socvuln",
      description: "Communities that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN dataset. Census blocks above the 80th percentile are ranked from low to high, depicting areas of lower median incomes and minority populations.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_CriticalFacilitiesTMS",
      label: "Critical Facilities TMS",
      label: "Critical Facilities",
      url: "https://tiles.resilientcoasts.org/PR_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_critfac",
      description: "Facilities such as schools, hospitals, and police and fire stations that are important to recovery efforts when a community is faced with a flood-related event. All facilities are given the same presence rank.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_CriticalInfrastructureTMS",
      label: "Critical Infrastructure TMS",
      label: "Critical Infrastructure",
      url: "https://tiles.resilientcoasts.org/PR_CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_critinfra",
      description: "Infrastructure in and around communities that are integral to a community’s ability to recover from a flood event, including primary highways, power plants, and rail lines, among others. High values suggest areas where multiple infrastructure overlap.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_DrainageTMS",
      label: "Drainage TMS",
      label: "Impermeable Soils",
      url: "https://tiles.resilientcoasts.org/PR_DraingeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_drainage",
      description: "Those areas with poor water drainage potential, including both less-porous soils and areas with high-intensity development. High values suggest that areas contain soils with poor drainage potential and/or a prevalence of developed, impervious surfaces that may pool during flooding or heavy precipitation events.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_ErosionTMS",
      label: "Erosion TMS",
      label: "Soil Erodibility",
      url: "https://tiles.resilientcoasts.org/PR_ErosionIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_erosion",
      description: "Those areas that contain soil characteristics that have a high susceptibility of soil particle detachment by water. This may include areas that have high silt content or migratory systems such as beaches and dunes. High values suggest that areas carry an increased potential for erosion due to flooding or heavy precipitation events.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_SLRTMS",
      label: "Sea Level Rise TMS",
      label: "Sea Level Rise",
      url: "https://tiles.resilientcoasts.org/PR_SLRIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_slr",
      description: "NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_StormSurgeTMS",
      label: "Storm Surge TMS",
      label: "Storm Surge",
      url: "https://tiles.resilientcoasts.org/PR_StormSurgeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_stormsurge",
      description: "Based on the impacts from modeled hurricane storm categories, storm surge is ranked from low to high, with low being a 5-foot surge and high being a 1-foot surge. As a 1-foot surge is more likely to occur than a 5-foot surge, areas within the 1-foot designation are ranked with higher values.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_SlopeTMS",
      label: "Slope TMS",
      label: "Areas of Low Slope",
      url: "https://tiles.resilientcoasts.org/PR_SlopeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_slope",
      description: "The percent rise of the elevation of the landscape, given values from low to high. High values indicate those areas that are very low lying and more likely to retain water and flood.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_FloodProneAreasTMS",
      label: "Flood Prone Areas TMS",
      label: "Flood-Prone Areas",
      url: "https://tiles.resilientcoasts.org/PR_FloodProneAreasIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_floodprone",
      description: "Areas considered by FEMA to be in the 100- and 500-year flood zones, as well as the floodway. Frequently and occasionally flooded soil designations are used to identify areas outside of FEMA coverage. Highest values suggest areas directly in the floodway, whereas low values suggest occasionally flooded soils outside of the floodplain.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_LandslideIndexTiles",
      label: "Landslides",
      label: "Landslides",
      url: "https://tiles.resilientcoasts.org/PR_LandslideIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_landslides",
      description: "Landslides needs a descriptionm currently this text is just a placeholder.",
      source: 'regional',
      region: 'puerto_rico'
    },
    {
      id: "PR_TsunamiIndexTiles",
      label: "Tsunami",
      label: "Tsunami",
      url: "https://tiles.resilientcoasts.org/PR_ThreatsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: false,
      legend: "pr_tsunami",
      description: "Tsunami needs a descriptionm currently this text is just a placeholder.",
      source: 'regional',
      region: 'puerto_rico'
    },








    {
      id: "NSHubsTMS",
      layer: "Targeted Hubs TMS",
      label: "Hubs",
      url: "https://tiles.resilientcoasts.org/TargetedWatershedHubsTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "ns-hub",
      description: "Areas of open lands and protected space that are most suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.",
      source: 'targetedwatershed',
      region: 'conus'
    },
    {
      id: "NSExposureTMS",
      layer: "Targeted Exposure TMS",
      label: "Exposure Index",
      url: "https://tiles.resilientcoasts.org/TargetedWatershedExposureTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "ns-exposure",
      description: "The product of the Asset and Threat Indices which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.",
      source: 'targetedwatershed',
      region: 'conus'
    },
    {
      id: "NSAssetsTMS",
      layer: "Targeted Assets TMS",
      label: "Asset Index",
      url: "https://tiles.resilientcoasts.org/TargetedWatershedAssetTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "ns-asset",
      description: "Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.",
      source: 'targetedwatershed',
      region: 'conus'
    },
    {
      id: "NSThreatsTMS",
      layer: "Targeted Threats TMS",
      label: "Threat Index",
      url: "https://tiles.resilientcoasts.org/TargetedWatershedThreatTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false,
      legend: "ns-threat",
      description: "Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.",
      source: 'targetedwatershed',
      region: 'conus'
    },
    {
      id: "NSFishAndWildlifeTMS",
      layer: "Targeted Fish and Wildlife TMS",
      label: "Fish and Wildlife Index",
      url: "https://tiles.resilientcoasts.org/TargetedWatershedFishandWildlifeTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false,
      legend: "ns-fishandwildlife",
      description: "An index of priority aquatic species and their habitats, ranked by HUC-10 watershed. A high value represents watersheds where the most priority species and their habitats are present.",
      source: 'targetedwatershed',
      region: 'conus'
    },

  ],


  //tile layers (WMS)
  WMSLayers:[
    // {
    //   id: "SA_ExposureIndex",
    //   layer: "SA_ExposureIndex",
    //   label: "Exposure Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 9000,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_AssetIndex",
    //   layer: "SA_AssetIndex",
    //   label: "Asset Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018WF",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_ThreatIndex",
    //   layer: "SA_ThreatIndex",
    //   label: "Threat Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_AquaticIndex",
    //   layer: "SA_AquaticIndex",
    //   label: "Aquatic Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_TerrestrialIndex",
    //   layer: "SA_TerrestrialIndex",
    //   label: "Terrestrial Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_HubsPreliminary",
    //   layer: "SA_HubsPreliminary",
    //   label: "Hubs (Preliminary)",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 9001,
    //   crs: L.CRS.EPSG3857
    // }

 ],

 mapDefaults: {
    // center: [ 32.7765, -79.9311 ],
    // zoom: 12
    center: [ 36.27970720524017, -95.05371093750001],
    zoom: 4
 },

 // region zooms
 zoomRegions: [
   {
     region: 'cus',
     center: [ 36.27970720524017, -95.05371093750001],
     zoom: 4
   },
   {
     region: 'pr',
     center: [ 18.219772120864576, -66.11643075942995],
     zoom: 8
   },
   {
     region: 'uvi',
     center: [ 17.721667763450085, -64.74265158176424],
     zoom: 11
   },
   {
     region: 'cmni',
     center: [ 15.649362227964682, 147.71191120147708],
     zoom: 7
   },
   {
     region: 'guam',
     center: [ 13.439496420468357, 144.77751821279526],
     zoom: 10
   },
   // {
   //   region: 'alaska',
   //   center: [ 62.72288115028305, 209.90641593933108],
   //   zoom: 4
   // },
   // {
   //   region: 'hawaii',
   //   center: [ 21.08872447557743, 204.9689626693726],
   //   zoom: 6
   // }
 ],
  //leaflet optoins expand as needed
  mapOptions: {
    // center: [ 32.7765, -79.9311 ],
    zoom: 4,
    maxZoom: 16,
    minZoom: 4,
    crs: L.CRS.EPSG3857
  }

};

export default mapConfig;
