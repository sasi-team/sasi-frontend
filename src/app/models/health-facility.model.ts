
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

export interface EstabelecimentoResponse {
  estabelecimentos: any[];
}