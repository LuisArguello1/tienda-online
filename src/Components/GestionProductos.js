import React from "react";
import "./Css/gestionProductos.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const GestionProductos = ({
  MostrarGestionProductos,
  setMostrarGestionProductos,
}) => {
  const [ListaProductos, setListaProductos] = useState([]);
  const [MostrarBtnEdicion, setMostrarBtnEdicion] = useState(false);

  useEffect(() => {
    const obtenerListaProductos =
      JSON.parse(localStorage.getItem("listaProductos")) || [];
    setListaProductos(obtenerListaProductos);
  }, []);

  useEffect(() => {
    // Actualizar el localStorage cuando ListaProductos cambie
    localStorage.setItem("listaProductos", JSON.stringify(ListaProductos));
  }, [ListaProductos]);

  function eliminarProducto(producto) {
    const nuevaListaProductos = ListaProductos.filter((p) => p.idProducto !== producto.idProducto)
    setListaProductos(nuevaListaProductos)
    localStorage.setItem("listaProductos", JSON.stringify(nuevaListaProductos))
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Producto eliminado",
        text: "Reinicie la pagina para aplicar los cambios",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
    });
  }

  return (
    <>
      {MostrarGestionProductos && (
        <div className="contenedor-gestion-productos-padre">
          <div className="contenedor-btn-salir2">
            <strong>Gestion Productos</strong>
            <button
              className="button-informes"
              onClick={() => setMostrarGestionProductos(false)}
            >
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
              >
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
              </svg>
              <span>Salir</span>
            </button>
          </div>
          <div className="contenedor-btn-informes">
            <button
              className="button-name"
              role="button"
              onClick={() => setMostrarBtnEdicion(true)}
            >
              Editar productos
            </button>
            {MostrarBtnEdicion && (
              <button
                className="button5"
                onClick={() => setMostrarBtnEdicion(false)}
              >
                X<div className="close">cancelar edicion</div>
              </button>
            )}
            <button className="button-name" role="button">
              Agregar producto
            </button>
          </div>
          <div className="contenedor-productos-gestion">
            <strong>Inventario: # {ListaProductos.length} productos</strong>
            <div className="productos-venta2">
              {ListaProductos.map((producto) => (
                <div
                  className="contenedor-producto-prueba2"
                  key={producto.idProducto}
                >
                  <div className="contenedor-img-producto-prueba2">
                    <img
                      src={producto.imgProducto}
                      alt="img-producto"
                      className="img-producto-prueba"
                    ></img>
                  </div>
                  <div className="contenedor-detalle-producto-prueba2">
                    <div className="detalle-producto-prueba2">
                      {producto.nombreProducto}
                    </div>
                    <div className="contenedor-precio-cantidad-prueba2">
                      <div className="precio-producto-prueba2">
                        $ {producto.precioProducto}
                      </div>
                      <div className="cantidad-producto-prueba2">
                        disponible: # {producto.cantidad}
                      </div>
                    </div>
                    <div className="contenedor-ptn-prueba2">
                      <button className="btn-comprar-prueba2">COMPRAR</button>
                    </div>
                  </div>
                  <div className="opciones-edicion">
                    {MostrarBtnEdicion && (
                      /* From Uiverse.io by vinodjangid07 */
                      <>
                        <button className="button2" onClick={() => eliminarProducto(producto)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 14"
                            className="svgIcon bin-top"
                          >
                            <g clip-path="url(#clip0_35_24)">
                              <path
                                fill="black"
                                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_24">
                                <rect
                                  fill="white"
                                  height="14"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 57"
                            className="svgIcon bin-bottom"
                          >
                            <g clip-path="url(#clip0_35_22)">
                              <path
                                fill="black"
                                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_22">
                                <rect
                                  fill="white"
                                  height="57"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <button className="editBtn">
                          <svg height="1em" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GestionProductos;
