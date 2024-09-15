import React from "react";
import Registro_user from "./Registro_user";
import Carrito_compras from "./Carrito_compras";
import Informes from "./Informes";
import "./Css/productos.css";
import shop from "./Assets/shop.svg";
import { useState } from "react";


const Productos = ({ esAdmin, listaProductos,nombreUsuario,ListaUsuarios}) => {
  const [OcutarInicio, setOcultarInicio] = useState(false);
  const [MostrarProductos, setMostrarProductos] = useState(true);
  const [MostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [MostrarTotal, setMostrarTotal] = useState(false);
  const [ProductosSeleccionados, setProductosSeleccionados] = useState([]);
  const [MostrarBolida, setMostrarBolita] = useState(null);
  const [MostrarInformes, setMostrarInformes] = useState(false)

  function informes(){
    setMostrarInformes(true)
  }

  function handleClickButtonSesionOcultar(estado1, estado2) {
    setOcultarInicio(estado1);
    setMostrarProductos(estado2);
  }

  function agregarProductoAlCarrito(producto) {
    setProductosSeleccionados((prevProductos) => {
      const productoExistente = prevProductos.find(
        (p) => p.idProducto === producto.idProducto
      );
      if (productoExistente) {
        // Si el producto ya está en el carrito, simplemente incrementar la cantidad
        return prevProductos.map((p) =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        return [...prevProductos, { ...producto, cantidad: 1 }];
      }
    });
    setMostrarNotificacion(true);
    setMostrarBolita(producto.idProducto);
  }

  function mostrarProductos(estado) {
    setMostrarTotal(estado);
  }

  return (
    <>
      {/* Se muestra la pantalla de inicio */}
      {OcutarInicio && <Registro_user></Registro_user>}

      {/* se muestra la pantalla de productos */}
      {MostrarProductos && (
        <>
          <div className="contenedor213">
            <div className="encabezado-productos">
              <div className="contenedor-logo">
                <p className="logo-producto">Super <span>mercado</span></p>
              </div>
              <div className="contenedor-opciones">
                {esAdmin && (
                  <>
                    <button className="button-admin" onClick={() => informes()}>Informes</button>
                    <button className="button-admin">Add Producto</button>
                  </>
                )}
                <div
                  className="Carrito-compras"
                  onClick={() => mostrarProductos(true)}
                >
                  {ProductosSeleccionados.length === 0
                    ? ""
                    : MostrarNotificacion && (
                        <div className="notificacion">{ProductosSeleccionados.length}</div>
                      )}
                  <img
                    className="shop-productos"
                    src={shop}
                    alt="svg - no encontrado"
                  ></img>
                </div>
                <button
                  className="Cerrar-Sesion"
                  onClick={() => handleClickButtonSesionOcultar(true, false)}
                >
                  <span>Cerrar Sesion</span>
                </button>
              </div>
              <Carrito_compras
                OcultarCarrito={MostrarTotal}
                ocultarCarrito={mostrarProductos}
                productosSeleccionados={ProductosSeleccionados}
                setProductosSeleccionados={setProductosSeleccionados}
                ListaUsuarios={ListaUsuarios}
                nombreUsuario={nombreUsuario}
              ></Carrito_compras>
            </div>
            <div className="contenedor-productos">
              <div className="titulo-user"><div className="nombreUsuario">  Bienvenido, </div>{nombreUsuario}</div>
              <div className="productosDesct">
                <div className="titulo-dest">Productos destacados</div>
                {listaProductos.slice(0, 4).map((producto) => (
                  <div className="card" key={producto.idProducto}>
                    <div className="notiProducto">
                      {MostrarBolida === producto.idProducto && (
                        <div className="bolita">
                          <div className="noti">Agregado</div>
                        </div>
                      )}
                    </div>
                    <div className="image_container">
                      <img
                        src={producto.imgProducto}
                        alt="imagen no encontrada"
                        className="imgProducto"
                      ></img>
                    </div>
                    <div className="title">
                      <span>{producto.nombreProducto}</span>
                    </div>
                    <div className="action">
                      <div className="price">
                        <span>$ {producto.precioProducto}</span>
                      </div>
                      <button
                        className="cart-button"
                        onClick={() => agregarProductoAlCarrito(producto)}
                      >
                        <svg
                          className="cart-icon"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                          ></path>
                        </svg>
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="productos-venta">
                {listaProductos.map((producto) => (
                  <div className="card" key={producto.idProducto}>
                    <div className="notiProducto">
                      {MostrarBolida === producto.idProducto && (
                        <div className="bolita">
                          <div className="noti">Agregado</div>
                        </div>
                      )}
                    </div>
                    <div className="image_container">
                      <img
                        src={producto.imgProducto}
                        alt="imagen no encontrada"
                        className="imgProducto"
                      ></img>
                    </div>
                    <div className="title">
                      <span>{producto.nombreProducto}</span>
                    </div>
                    <div className="action">
                      <div className="price">
                        <span>$ {producto.precioProducto}</span>
                      </div>
                      <button
                        className="cart-button"
                        onClick={() => agregarProductoAlCarrito(producto)}
                      >
                        <svg
                          className="cart-icon"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                          ></path>
                        </svg>
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {MostrarInformes && (
        <Informes MostrarInformes={MostrarInformes} setMostrarInformes={setMostrarInformes} ListaUsuarios={ListaUsuarios}></Informes>
      )}
    </>
  );
};
export default Productos;
