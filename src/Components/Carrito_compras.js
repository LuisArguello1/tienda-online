import React, { useState, useEffect } from "react";
import "./Css/carritoCompras.css";
import salir from "./Assets/salir.svg";
import carrito from "./Assets/shop.svg";
import eliminar from "./Assets/eliminar.svg";
import PagoCompra from "./pagoCompra";

const Carrito_compras = ({
  OcultarCarrito,
  ocultarCarrito,
  productosSeleccionados,
  setProductosSeleccionados,
  ListaUsuarios,
  nombreUsuario
}) => {
  const [Subtotal, setSubtotal] = useState(0);
  const [Iva, setIva] = useState(0);
  const [Total, setTotal] = useState(0);
  const [EnviarTotal, setEnviarTotal] = useState(0)
  const [MostrarPago, setMostrarPago] = useState(false);

  useEffect(() => {
    const subtotal = productosSeleccionados
      .reduce(
        (accu, producto) => accu + producto.precioProducto * producto.cantidad,
        0
      )
      .toFixed(2);
    setSubtotal(subtotal);
    const total = productosSeleccionados.reduce(
      (accu, producto) => accu + producto.precioProducto * producto.cantidad,
      0
    );

    const porcIva = 15;
    const iva = total * (porcIva / 100);
    setIva(iva.toFixed(2));

    setEnviarTotal((total + iva).toFixed(2))
    setTotal((total + iva).toFixed(2));
  }, [productosSeleccionados]);

  function eliminarProducto(producto) {
    const nuevaListaProductos = productosSeleccionados.filter(
      (p) => p.idProducto !== producto.idProducto
    );
    setProductosSeleccionados(nuevaListaProductos);
  }

  function aumentarCantidad(producto) {
    const nuevaListaProductos = productosSeleccionados.map((p) =>
      p.idProducto === producto.idProducto
        ? { ...p, cantidad: p.cantidad + 1 }
        : p
    );
    setProductosSeleccionados(nuevaListaProductos);
  }

  function disminuirCantidad(producto) {
    const nuevaListaProductos = productosSeleccionados.map((p) =>
      p.idProducto === producto.idProducto && p.cantidad > 1
        ? { ...p, cantidad: p.cantidad - 1 }
        : p
    );
    setProductosSeleccionados(nuevaListaProductos);
  }


  return (
    <>
      {OcultarCarrito && (
        <div className="contenedor-carrito-compras">
          <header className="encabezado-carrito">
            <div className="contenedor-carrito">
              <p className="titulo-carrito">Mi Carrito</p>
              <img
                src={carrito}
                alt="svg - no encontardo"
                className="img-carrito"
              ></img>
            </div>

            <img
              src={salir}
              alt="svg - no encontrado"
              className="salir"
              onClick={() => ocultarCarrito(false)}
            ></img>
          </header>

          <div className="productosSeleccionados">
            {productosSeleccionados.length === 0 ? (
              <div className="existenciaProducto">
                No existen productos agregados
              </div>
            ) : (
              productosSeleccionados.map((producto) => (
                <div className="contenedorProducto" key={producto.idProducto}>
                  <div className="contenedor-img">
                    <img
                      src={producto.imgProducto}
                      alt="imagen no encontrada"
                      className="img-producto"
                    ></img>
                  </div>
                  <div className="contenedorDetalles">
                    <p className="detalleProducto">{producto.nombreProducto}</p>
                    <div className="contenedorOpcion">
                      <p className="precio">{producto.precioProducto}</p>
                      <div className="opciones">
                        <img
                          onClick={() => eliminarProducto(producto)}
                          className="eliminar"
                          src={eliminar}
                          alt="svg - no encontrado"
                        ></img>
                        <div className="contenedor-statd">
                          <div className="contenedorCant">
                            <div className="cantidad">{producto.cantidad}</div>
                          </div>
                          <div className="contenedor-mas-menos">
                            <div
                              className="subir-bajar"
                              onClick={() => aumentarCantidad(producto)}
                            >
                              +
                            </div>
                            <div
                              className="subir-bajar"
                              onClick={() => disminuirCantidad(producto)}
                            >
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {productosSeleccionados.length === 0 ? (
            ""
          ) : (
            <>
              <div className="Contenedor-total">
                <div className="Subtotal">
                  <div>Subtotal 0%</div>
                  <div>{Subtotal}</div>
                </div>
                <div className="Subtotal">
                  <div>Subtotal 15%</div>
                  <div>{Iva}</div>
                </div>
                <div className="total">
                  <div>Total</div>
                  <div>{Total}</div>
                </div>
              </div>
              <div className="Contenedor-button-pago">
                <button className="Btn" onClick={() => setMostrarPago(true)}>
                  Pay
                  <svg class="svgIcon" viewBox="0 0 576 512">
                    <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {MostrarPago && (
        <PagoCompra
          mostrarPago={MostrarPago}
          setMostrarPago={setMostrarPago}
          EnviarTotal={EnviarTotal}
          productosSeleccionados={productosSeleccionados}
          ListaUsuarios={ListaUsuarios}
          nombreUsuario={nombreUsuario}
          Total={Total}
          Subtotal={Subtotal}
          Iva = {Iva}
        />
      )}
    </>
  );
};

export default Carrito_compras;
