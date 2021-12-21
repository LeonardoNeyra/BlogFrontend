import  { environment } from '../../environments/environment';

const base_url = environment.base_url;

interface _Usuario {
    _id: string;
    nombre: string;
    img: string;
}

export class Post {

    constructor (
        public _id: string,
        public titulo: string,
        public cuerpo: string,
        public nComentarios: number,
        public nLikes: number,
        public activo: boolean,
        public fechaCrea: Date,
        public img?: string,
        public usuario?: _Usuario,
    ) { }
    
}

