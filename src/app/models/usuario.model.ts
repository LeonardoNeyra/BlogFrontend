import  { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor (
        public nombre: string,
        public alias: string,
        public email: string,
        public google: boolean,
        public rol: string,
        public activo: boolean,
        public fechaCrea: Date,
        public password?: string,
        public img?: string,
        public uid?: string
    ) { }

    get imagenUrl() {
        // Google API
        if (this.img.includes('http')) {
            return this.img;
        }

        // API: /upload/usuarios/8296ea1a-a263-449e-97e6-24aa70f58d58.jpg
        if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        }
        else {
            return `${base_url}/upload/usuarios/noimage`;
        }
    }
}

