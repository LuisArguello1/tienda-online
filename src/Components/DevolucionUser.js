import React from "react";
import "./Css/devolucionUser.css";
import { useState, useEffect } from "react";

const DevolucionUser = ({
  MotrarDevolucionUser,
  setMostrarDevolucionUser,
  nombreUsuario,
}) => {
  const [ListaUsuarios, setListaUsuarios] = useState([]);
  const [UserDevolucionProductos, setUserDevolucionProductos] = useState(null);

  useEffect(() => {
    const obtenerListaUser = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log(obtenerListaUser);
    setListaUsuarios(obtenerListaUser);
  }, []);

  useEffect(() => {
    if (ListaUsuarios.length > 0) {
      const usuario = ListaUsuarios.find(
        (user) => user.usuario === nombreUsuario
      );
      console.log("Usuario encontrado:", usuario);
      setUserDevolucionProductos(usuario || null);
    }
  }, [ListaUsuarios, nombreUsuario]);

  const solicitarDevolucion = () => {
    if (UserDevolucionProductos) {
      const updatedUser = {
        ...UserDevolucionProductos,
        devolucion: "Solicitud en proceso",
      };

      const updatedUsersList = ListaUsuarios.map((user) =>
        user.usuario === nombreUsuario ? updatedUser : user
      );

      setListaUsuarios(updatedUsersList);
      setUserDevolucionProductos(updatedUser);
      localStorage.setItem("usuarios", JSON.stringify(updatedUsersList));
    }
  };

  return (
    <>
      {MotrarDevolucionUser && (
        <div className="contenedor-padre-devolucion">
          <div className="contenedor-btn-salir2">
            <div>
              <strong>Devolución</strong>
            </div>
            <button
              className="button-informes"
              onClick={() => setMostrarDevolucionUser(false)}
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
          <div className="contenedor-scroll-devolucion-user">
            {UserDevolucionProductos ? (
              <>
                <div className="contenedor-datos-user-devolucion">
                  <div>
                    <strong>Nombre: </strong>
                    {UserDevolucionProductos.usuario}
                  </div>
                  <div>
                    <strong>Cedula: </strong>
                    {UserDevolucionProductos.cedula}
                  </div>
                  <div>
                    <strong>Cantidad Productos: # </strong>
                    {UserDevolucionProductos.productoComprados.length}
                  </div>
                  <div>
                    <strong>Total Compra: $ </strong>
                    {UserDevolucionProductos.totalCompra}
                  </div>
                  {UserDevolucionProductos.productoComprados.length > 0 && (
                    <>
                      <div className="contenedor-btn-devo">
                        {UserDevolucionProductos.devolucion !==
                          "Solicitud en proceso" &&
                          UserDevolucionProductos.devolucion !==
                            "Devolucion Aceptada" &&
                          UserDevolucionProductos.devolucion !==
                            "Devolucion Rechazada" && (
                            <button
                              className="button-devo"
                              onClick={solicitarDevolucion}
                            >
                              Solicitar devolución
                            </button>
                          )}
                      </div>
                      <div className="confirmacion-devolucion">
                        Confirmación : 
                        {UserDevolucionProductos.devolucion
                          ?  UserDevolucionProductos.devolucion
                          : "Presione, para procesar"}
                      </div>
                    </>
                  )}
                </div>
                <div className="productos-comprado-user">
                  {UserDevolucionProductos.productoComprados.length === 0
                    ? "No existen productos comprados"
                    : UserDevolucionProductos.productoComprados.map((p) => (
                        <div
                          className="contenedor-productos1"
                          key={p.idProducto}
                        >
                          <div className="contenedor-datos-producto2">
                            <div className="nombre-producto">
                              <strong>{p.nombreProducto}</strong>
                            </div>
                            <div className="precio-proucto">
                              Precio Unitario $ {p.precioProducto}
                            </div>
                            <div className="idProducto">
                              Id Producto: {p.idProducto}
                            </div>
                            <div className="cantidad-producto">
                              Cantidad Producto: # {p.cantidad}
                            </div>
                          </div>
                          <div className="contenedor-img-producto">
                            <img
                              className="img-product"
                              src={p.imgProducto}
                              alt="img-product"
                            ></img>
                          </div>
                        </div>
                      ))}
                </div>
              </>
            ) : (
              <div>Cargando.....</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DevolucionUser;
