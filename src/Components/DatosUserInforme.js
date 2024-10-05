import React, { useEffect, useState } from "react";
import "./Css/datosInformesUser.css";

const DatosUserInforme = ({ MostarDatosInforme, setMostrarDatosInforme }) => {
  const [MostrarContrasena, setMostrarContrasena] = useState({});
  const [ListaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const ObtenerLista = JSON.parse(localStorage.getItem("usuarios")) || [];
    setListaUsuarios(ObtenerLista);
  }, []);

  function mostarContra(cedula) {
    setMostrarContrasena((prevEstado) => ({
      ...prevEstado,
      [cedula]: !prevEstado[cedula],
    }));
  }

  function deleteUser(cedula) {
    const nuevaListaUser = ListaUsuarios.filter((user) => user.cedula !== cedula)
    setListaUsuarios(nuevaListaUser)
    localStorage.setItem("usuarios", JSON.stringify(nuevaListaUser))
  }
  return (
    <>
      {MostarDatosInforme && (
        <div className="contenedor-padre-datos-user">
          <div className="contenedor-btn-salir2">
            <div><strong>Datos Usuarios</strong></div>
            <button
              className="button-informes"
              onClick={() => setMostrarDatosInforme(false)}
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
          <div className="contenedor-datos-scroll-informes">
            {ListaUsuarios.slice(1).map((user, index) => (
              <div className="contenedor-datos-mostrar" key={user.cedula}>
                <div>
                  <strong>Cliente #{index + 1}</strong>
                </div>
                <div>
                  <strong>Nombre clientes: </strong>
                  {user.usuario}
                </div>
                <div>
                  <strong>Cedula clientes: </strong>
                  {user.cedula}
                </div>
                <div>
                  <strong>Contraseña: </strong>
                  {MostrarContrasena[user.cedula]
                    ? user.contrasena
                    : "********"}
                </div>
                <div className="contenedor-btn-contra">
                  <button
                    className="lock-button"
                    onClick={() => mostarContra(user.cedula)}
                  >
                    <svg className="lock-svgIcon" viewBox="-0.5 -0.5 16 16">
                      <path
                        d="M7.5 8.235c-0.1949375 0 -0.38187499999999996 0.0775 -0.5196875 0.2153125s-0.2153125 0.32475 -0.2153125 0.5196875v2.205c0 0.1949375 0.0775 0.38187499999999996 0.2153125 0.51975s0.32475 0.21525 0.5196875 0.21525c0.1949375 0 0.3819375 -0.07743749999999999 0.51975 -0.21525s0.21525 -0.32481250000000006 0.21525 -0.51975v-2.205c0 -0.1949375 -0.07743749999999999 -0.38187499999999996 -0.21525 -0.5196875s-0.32481250000000006 -0.2153125 -0.51975 -0.2153125Zm3.675 -2.94V3.825c0 -0.9746875 -0.3871875 -1.9094375 -1.076375 -2.598625S8.4746875 0.15 7.5 0.15c-0.9746875 0 -1.9094375 0.3871875 -2.598625 1.076375S3.825 2.8503125000000002 3.825 3.825v1.47c-0.5848125 0 -1.145625 0.23231249999999998 -1.5591875 0.6458125000000001C1.8523124999999998 6.354375 1.62 6.9152499999999995 1.62 7.5v5.145c0 0.58475 0.23231249999999998 1.145625 0.6458125000000001 1.5591875 0.41356249999999994 0.4135 0.974375 0.6458125000000001 1.5591875 0.6458125000000001h7.35c0.58475 0 1.145625 -0.23231249999999998 1.5591875 -0.6458125000000001 0.4135 -0.41356249999999994 0.6458125000000001 -0.9744375 0.6458125000000001 -1.5591875V7.5c0 -0.58475 -0.23231249999999998 -1.145625 -0.6458125000000001 -1.5591875 -0.41356249999999994 -0.4135 -0.9744375 -0.6458125000000001 -1.5591875 -0.6458125000000001ZM5.295 3.825c0 -0.5848125 0.23231249999999998 -1.145625 0.6458125000000001 -1.5591875C6.354375 1.8523124999999998 6.9152499999999995 1.62 7.5 1.62s1.145625 0.23231249999999998 1.5591875 0.6458125000000001c0.4135 0.41356249999999994 0.6458125000000001 0.974375 0.6458125000000001 1.5591875v1.47H5.295V3.825Zm6.615 8.82c0 0.1949375 -0.07743749999999999 0.3819375 -0.21525 0.51975s-0.32481250000000006 0.21525 -0.51975 0.21525H3.825c-0.1949375 0 -0.38187499999999996 -0.07743749999999999 -0.51975 -0.21525 -0.1378125 -0.1378125 -0.21525 -0.32481250000000006 -0.21525 -0.51975V7.5c0 -0.1949375 0.07743749999999999 -0.38187499999999996 0.21525 -0.5196875 0.137875 -0.1378125 0.32481250000000006 -0.2153125 0.51975 -0.2153125h7.35c0.1949375 0 0.3819375 0.0775 0.51975 0.2153125s0.21525 0.32475 0.21525 0.5196875v5.145Z"
                        fill="#ffffff"
                        stroke-width="1"
                      ></path>
                    </svg>
                  </button>
                  <button className="btn3" onClick={() => deleteUser(user.cedula)}>
                    <svg
                      viewBox="0 0 15 17.5"
                      height="17.5"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                    >
                      <path
                        transform="translate(-2.5 -1.25)"
                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                        id="Fill"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DatosUserInforme;
