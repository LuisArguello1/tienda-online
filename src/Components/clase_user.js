class User{
    constructor(usuario,cedula,contrasena,totalCompra){
        this.usuario = usuario
        this.cedula = cedula
        this.contrasena = contrasena
        this.totalCompra = totalCompra
        this.productoComprados = []
    }
    presentar(){
        return `Nombre: ${this.usuario}, Cedula: ${this.cedula}, Contraseña: ${this.contrasena}`
    }
}

export default User;
