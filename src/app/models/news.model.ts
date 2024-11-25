import { SafeUrl } from "@angular/platform-browser";

export interface News {
    id: number;
    titulo: string;
    introducao: string;
    data_publicacao: string | Date;
    imagens: string | SafeUrl;
    link: string;
}
