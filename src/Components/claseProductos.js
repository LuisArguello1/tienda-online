import Productos from "./Productos"
class Producto{
    constructor(nombreProducto,precioProducto,idProducto,cantidad,imgProducto){
        this.nombreProducto = nombreProducto
        this.precioProducto = precioProducto
        this.idProducto = idProducto
        this.cantidad = cantidad
        this.imgProducto = imgProducto
    }
}

export default Producto;
