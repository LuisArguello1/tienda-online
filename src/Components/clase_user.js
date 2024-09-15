class User{
    constructor(usuario,cedula,contrasena){
        this.usuario = usuario
        this.cedula = cedula
        this.contrasena = contrasena
        this.productoComprados = []
    }
    presentar(){
        return `Nombre: ${this.usuario}, Cedula: ${this.cedula}, Contraseña: ${this.contrasena}`
    }
}

export default User;
