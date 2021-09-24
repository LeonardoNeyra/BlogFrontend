export class Usuario {
    constructor (
        public nombre: string,
        public alias: string,
        public password: string,
        public email: string,
        public google: boolean,
        public rol: string,
        public activo: boolean,
        public fechaCrea: Date,
        public img?: string,
        public uid?: string
    ) {

    }
}

