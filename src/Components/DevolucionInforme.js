import React, { useEffect, useState } from "react";
import "./Css/devolucionInforme.css";

const DevolucionInforme = ({
  MostrarDevolucionInforme,
  setMostrarDevolucionInforme,
  nombreUsuario,
}) => {
  const [ListaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const obtenerListaUser = JSON.parse(localStorage.getItem("usuarios")) || [];
    setListaUsuarios(obtenerListaUser);
  }, []);

  const actualizarUsuario = (listaActualizada) => {
    localStorage.setItem("usuarios", JSON.stringify(listaActualizada));
  };

  function aceptarSolicitud(user,estado) {
    const actualizarUser = {
      ...user,
      devolucion: "Devolucion Aceptada",
    };

    const listaActualizada = ListaUsuarios.map((u) =>
      u.cedula === user.cedula ? actualizarUser : u
    );

    setListaUsuarios(listaActualizada);
    actualizarUsuario(listaActualizada);
  }

  function rechazarSolicitud(user) {
    const actualizarUser = {
      ...user,
      devolucion: "Devolucion Rechazada",
    };

    const listaActualizada = ListaUsuarios.map((u) =>
      u.cedula === user.cedula ? actualizarUser : u
    );

    setListaUsuarios(listaActualizada);
    actualizarUsuario(listaActualizada);
  }

  return (
    <>
      {MostrarDevolucionInforme && (
        <div className="contenedor-padre-devolucion-informe">
          <div className="contenedor-btn-salir2">
            <div>
              <strong>Devoluciones de Usuarios</strong>
            </div>
            <button
              className="button-informes"
              onClick={() => setMostrarDevolucionInforme(false)}
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
          <div className="contenedor-devolucion-clientes-scroll">
            {ListaUsuarios.slice(1).map((user, index) => (
              <div className="contenedordatos-devo" key={user.cedula}>
                <div>
                  <strong>Cliente: </strong> #{index + 1}
                </div>
                <div>
                  <strong>Nombre Cliente: </strong> {user.usuario}
                </div>
                <div>
                  <strong>Cedula Cliente: </strong>
                  {user.cedula}
                </div>
                <div>
                  <strong>Cantidad Productos:</strong>
                  {user.productoComprados.length}
                </div>
                <div>
                  <strong>Total Compra: </strong>
                  {user.totalCompra}
                </div>
                <div>
                  <strong>Estado devolución </strong>
                  {user.devolucion}
                </div>
                {user.devolucion !== "No existe solicitud" && user.devolucion !== "Devolucion Aceptada" && user.devolucion !== "Devolucion Rechazada"  && (
                  <div className="contenedor-btn-devolucion">
                    <button
                      class="button-devo2"
                      onClick={() => aceptarSolicitud(user)}
                    >
                      Aceptar Solicitud
                    </button>
                    <button
                      class="button-devo2"
                      onClick={() => rechazarSolicitud(user)}
                    >
                      Rechazar Solicitud
                    </button>
                  </div>
                )}
                <div className="confirmarSolicitud-informe">
                  {user.devolucion}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default DevolucionInforme;
