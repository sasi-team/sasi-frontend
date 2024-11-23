export interface EstabelecimentosDeSaude {
  codigo_tipo_unidade?: number;
  codigo_uf?: number;
  codigo_municipio?: number;
  status?: 0 | 1;
  estabelecimento_possui_centro_cirurgico?: 0 | 1;
  estabelecimento_possui_centro_obstetrico?: 0 | 1;
  limit?: number;
  offset?: number;
}

export interface Estabelecimento {
codigo_cnes: number;
nome_fantasia: string;
endereco_estabelecimento: string;
numero_estabelecimento: string;
bairro_estabelecimento: string;
codigo_cep_estabelecimento: string;
latitude_estabelecimento_decimo_grau: number;
longitude_estabelecimento_decimo_grau: number;
numero_telefone_estabelecimento: string | null;
descricao_turno_atendimento: string;
estabelecimento_faz_atendimento_ambulatorial_sus: string;
estabelecimento_possui_centro_cirurgico: number;
estabelecimento_possui_servico_apoio: number;
estabelecimento_possui_atendimento_ambulatorial: number;
codigo_municipio: number;
}

export interface EstabelecimentoResponse {
estabelecimentos: Estabelecimento[];
}

// export interface EstabelecimentoResponse {
//   estabelecimentos: any[] ;
// }

export interface Cidade {
  codigo_ibge: string;
  nome: string;
  latitude: number;
  longitude: number;
}

export interface TipoUnidade {
  codigo_tipo_unidade: number;
  descricao_tipo_unidade: string;
}