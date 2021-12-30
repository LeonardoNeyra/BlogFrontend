interface _Usuario {
    _id: string;
    nombre: string;
    alias: string;
    img: string;
}

interface _Post {
    _id: string;
    titulo: string;
}

export class Comentario {
    constructor(
        public id: string,
        public post: _Post,
        public descripcion: string,
        public activo: boolean,
        // public comentarioPadre: _Comentario,
        public respuestas: [],
        public fechaCrea: Date,
        public usuario: _Usuario,
    ) {}
}