import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }

  async actualizarFoto( archivo: File, tipo: 'usuarios'|'posts', id: string ) {
    
    try {
      
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('archivos', archivo);

      console.log(archivo);
      
      
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      
      if (data.ok) {
        return data.nombreArchivo;
      }
      else {
        console.error('error: ' + data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }


}
