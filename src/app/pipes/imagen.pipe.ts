import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'posts'|'comentarios' ): string {
    
     // Sin imagen
     if (!img) {
      return `${base_url}/upload/usuarios/noimage`;
    }
    // Google API
    else if (img.includes('http')) { 
        return img;
    }
    // API: /upload/usuarios/8296ea1a-a263-449e-97e6-24aa70f58d58.jpg
    else if (img) {
        return `${base_url}/upload/${tipo}/${img}`;
    }
    // No imagen
    else {
        return `${base_url}/upload/usuarios/noimage`;
    }
    
  }

}
