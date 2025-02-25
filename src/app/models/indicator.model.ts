export interface Indicator {
    id: number;
    nome_arquivo: string;
    titulo: string;
    subtitulo: string;
    fonte: string;
  }
  
  export interface MapFeatureProperties {
    id: string;
    name: string;
    valor: number;
    fillColor: string;
    titulo: string;
    fonte: string;
    meta_estadual_valor: number;
    prefix_meta: string;
    sufix_meta: string;
  }
  
  export interface MapFeature {
    type: 'Feature';
    properties: MapFeatureProperties;
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: number[][][];
    };
  }
  
  export interface MapData {
    type: 'FeatureCollection';
    features: MapFeature[];
  }