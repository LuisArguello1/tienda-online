import React, { useEffect } from "react";
import "./Css/informes.css";
import salir from "./Assets/salir.svg";
import DatosUserInforme from "./DatosUserInforme";
import DevolucionInforme from "./DevolucionInforme";
import { useState } from "react";

const Informes = ({ MostrarInformes, setMostrarInformes ,nombreUsuario}) => {
    const [MostarDatosInforme, setMostrarDatosInforme] = useState(false)
    const [MostrarDevolucionInforme, setMostrarDevolucionInforme] = useState(false)

  const [ListaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    // Cargar usuarios desde localStorage
    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    setListaUsuarios(storedUsers);
  },[]);

  function mostrarDatosUser() {
    setMostrarDatosInforme(true)
  }

  function mostrarDevolucionesUser() {
    setMostrarDevolucionInforme(true)
  }

  return (
    <>
      {MostrarInformes && (
        <div className="contenedor-informes-padre">
          <div className="contenedor-btn-salir">
            <button
              onClick={() => setMostrarInformes(false)}
              className="btn-salir"
            >
              <img className="salir-img" src={salir} alt="salir"></img>
            </button>
          </div>
          <div className="contenedor-titulo-informe">
            Informes - Compras de clientes
          </div>
          <div className="contenedor-btn-informes">
            <button className="button-name" role="button" onClick={() => mostrarDatosUser()}>
              Datos Usuarios
            </button>
            <button className="button-name" role="button" onClick={() => mostrarDevolucionesUser()}>
              Pedidos devolución
            </button>
          </div>
          <div className="contenedor-info-scroll">
            {ListaUsuarios.length === 1? "No existen Usuarios":
              (ListaUsuarios.slice(1).map((user) => (
                <div className="contenedor-informe-user" key={user.cedula}>
                  <div className="datos-user-informe">
                    <div className="nombre-user">
                      <strong>Nombre cliente: </strong> {user.usuario} -{" "}
                      <strong>Cedula cliente: </strong> {user.cedula}
                    </div>
                    <div className="titulo-informe">
                      <strong>Productos Comprados: </strong>#{" "}
                      {user.productoComprados.length}{" "}
                    </div>
                    <div className="total-pagar">
                      <strong>Total compra:</strong> $ {user.totalCompra}{" "}
                    </div>
                  </div>
                  <div className="productos-comprado-user">
                    {user.productoComprados.length === 0
                      ? "No existen productos comprados"
                      : user.productoComprados.map((p) => (
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
                </div>
              )))
            }
          </div>
        </div>
      )}
      {MostarDatosInforme && (
        <DatosUserInforme MostarDatosInforme={MostarDatosInforme} setMostrarDatosInforme={setMostrarDatosInforme}></DatosUserInforme>
      )}
      {MostrarDevolucionInforme &&(
        <DevolucionInforme MostrarDevolucionInforme={MostrarDevolucionInforme} setMostrarDevolucionInforme={setMostrarDevolucionInforme} nombreUsuario={nombreUsuario}></DevolucionInforme>
      )}
    </>
  );
};

export default Informes;
