import React, { useEffect } from "react";
import Registro_user from "./Registro_user";
import Carrito_compras from "./Carrito_compras";
import DevolucionUser from "./DevolucionUser";
import Informes from "./Informes";
import GestionProductos from "./GestionProductos";
import "./Css/productos.css";
import shop from "./Assets/shop.svg";
import salir3 from "./Assets/salir.svg";
import list from "./Assets/list.svg";
import { useState } from "react";

const Productos = ({ esAdmin, nombreUsuario, ListaUsuarios }) => {
  const [OcutarInicio, setOcultarInicio] = useState(false);
  const [MostrarProductos, setMostrarProductos] = useState(true);
  const [MostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [MostrarTotal, setMostrarTotal] = useState(false);
  const [ProductosSeleccionados, setProductosSeleccionados] = useState([]);
  const [MostrarBolida, setMostrarBolita] = useState(null);
  const [MostrarInformes, setMostrarInformes] = useState(false);
  const [MostrarGestionProductos, setMostrarGestionProductos] = useState(false);
  const [MotrarDevolucionUser, setMostrarDevolucionUser] = useState(false);
  const [MostrarList, setMostrarList] = useState(false);
  const [MostrarAgotamiento, setMostrarAgotamiento] = useState(true);
  const [DesactivarBtnCompra, setDesactivarBtnCompra] = useState(true);
  const [ListaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    const obtenerListaProductos =
      JSON.parse(localStorage.getItem("listaProductos")) || [];
    setListaProductos(obtenerListaProductos);
  }, []);

  useEffect(() => {
    // Actualizar el localStorage cuando ListaProductos cambie
    localStorage.setItem("listaProductos", JSON.stringify(ListaProductos));
  }, [ListaProductos]);

  function informes() {
    setMostrarInformes(true);
  }
  function gestionProductos() {
    setMostrarGestionProductos(true);
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

  function mostrarHeader(estado) {
    setMostrarList(estado);
  }

  return (
    <>
      {/* Se muestra la pantalla de inicio */}
      {OcutarInicio && <Registro_user></Registro_user>}

      {/* se muestra la pantalla de productos */}
      {MostrarProductos && (
        <>
          <div className="contenedor213">
            <div
              className={`encabezado-productos ${MostrarList ? "mostrar" : ""}`}
            >
              <div className="salirHeader" onClick={() => mostrarHeader(false)}>
                <img src={salir3} alt="salir" className="salirImgHeader"></img>
              </div>
              <div className="contenedor-logo">
                <p className="logo-producto">
                  Super <div className="enfasis">mercado</div>
                </p>
              </div>
              <div className="contenedor-opciones">
                {esAdmin && (
                  <>
                    <div className="button-admin" onClick={() => informes()}>
                      Informes
                    </div>
                    <div
                      className="button-admin"
                      onClick={() => gestionProductos()}
                    >
                      Gst. Producto
                    </div>
                  </>
                )}
                <div
                  className="button-devolucion"
                  onClick={() => setMostrarDevolucionUser(true)}
                >
                  Devolucion
                </div>
                <div
                  className="Carrito-compras"
                  onClick={() => mostrarProductos(true)}
                >
                  {ProductosSeleccionados.length === 0
                    ? ""
                    : MostrarNotificacion && (
                        <div className="notificacion">
                          {ProductosSeleccionados.length}
                        </div>
                      )}
                  <img
                    className="shop-productos"
                    src={shop}
                    alt="svg - no encontrado"
                  ></img>
                </div>
                <div
                  className="Cerrar-Sesion"
                  onClick={() => handleClickButtonSesionOcultar(true, false)}
                >
                  <span>Cerrar Sesion</span>
                </div>
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
              <div className="titulo-user">
                <div className="listMenu" onClick={() => mostrarHeader(true)}>
                  <img className="menu" src={list} alt="menu"></img>
                  {ProductosSeleccionados.length === 0
                    ? ""
                    : MostrarNotificacion && (
                        <div className="notificacion">
                          {ProductosSeleccionados.length}
                        </div>
                      )}
                </div>
                <div className="nombreUsuario"> Bienvenido, </div>
                {nombreUsuario}
              </div>

              <div className="productosDesct">
                <div className="titulo-dest">Productos destacados</div>
                {ListaProductos.slice(0, 5).map((producto) => (
                  <div className="card2" id="card" key={producto.idProducto}>
                    <span className="glass"></span>
                    <div className="content">
                      <div className="contenedor-producto2">
                        {MostrarBolida === producto.idProducto && (
                          <div className="alerta2">Agregado</div>
                        )}
                        <div className="imgProducto2">
                          <img
                            className="productoImg"
                            src={producto.imgProducto}
                            alt="img - producto"
                          ></img>
                        </div>
                        <div className="detalleProducto2">
                          {producto.nombreProducto}
                        </div>
                        <div className="contenedor-precio-btn">
                          <div className="precio2">
                            $ {producto.precioProducto}
                          </div>
                          <div
                            className="btnCompra"
                            onClick={() => agregarProductoAlCarrito(producto)}
                          >
                            Comprar
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="productos-venta">
                {ListaProductos.slice(5).map((producto) => (
                  <div
                    className="contenedor-producto-prueba"
                    key={producto.idProducto}
                  >
                    <div className="contenedor-img-producto-prueba">
                      <img
                        src={producto.imgProducto}
                        alt="img-producto"
                        className="img-producto-prueba"
                      ></img>
                    </div>
                    <div className="contenedor-detalle-producto-prueba">
                      <div className="notiProducto">
                        {producto.cantidad > 0
                          ? ""
                          : MostrarAgotamiento && (
                              <div className="bolita">
                                <div className="noti">Agotado</div>
                              </div>
                            )}
                      </div>
                      <div className="notiProducto">
                        {MostrarBolida === producto.idProducto && (
                          <div className="bolita">
                            <div className="noti">Agregado</div>
                          </div>
                        )}
                      </div>
                      <div className="detalle-producto-prueba">
                        {producto.nombreProducto}
                      </div>
                      <div className="contenedor-precio-cantidad-prueba">
                        <div className="precio-producto-prueba">
                          $ {producto.precioProducto}
                        </div>
                        <div className="cantidad-producto-prueba">
                          disponible: # {producto.cantidad}
                        </div>
                      </div>
                      <div className="contenedor-ptn-prueba">
                        {producto.cantidad == 0
                          ? ""
                          : DesactivarBtnCompra && (
                              <button
                                className="btn-comprar-prueba"
                                onClick={() =>
                                  agregarProductoAlCarrito(producto)
                                }
                              >
                                COMPRAR
                              </button>
                            )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {MostrarInformes && (
        <Informes
          MostrarInformes={MostrarInformes}
          setMostrarInformes={setMostrarInformes}
          ListaUsuarios={ListaUsuarios}
          nombreUsuario={nombreUsuario}
        ></Informes>
      )}
      {MostrarGestionProductos && (
        <GestionProductos
          MostrarGestionProductos={MostrarGestionProductos}
          setMostrarGestionProductos={setMostrarGestionProductos}
        ></GestionProductos>
      )}
      {MotrarDevolucionUser && (
        <DevolucionUser
          MotrarDevolucionUser={MotrarDevolucionUser}
          setMostrarDevolucionUser={setMostrarDevolucionUser}
          nombreUsuario={nombreUsuario}
        ></DevolucionUser>
      )}
    </>
  );
};
export default Productos;
