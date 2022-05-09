import { SafeResourceUrl } from "@angular/platform-browser";

export class Recurso {
    idRecurso: bigint;
    nombre: string;
    contenido: string;
    contenidoSS: SafeResourceUrl;
    tipo: string;
  }
