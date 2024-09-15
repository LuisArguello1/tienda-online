import React, { useEffect } from "react";
import { useState } from "react";
import "./Css/factura.css";
import logoEmpresa from "./Img/pngwing.com.png";
import salir from "./Assets/salir.svg"
const Factura = ({
  MostarFactura,
  setMostrarFactura,
  productosSeleccionados,
  ListaUsuarios,
  nombreUsuario,
  Total,
  Subtotal,
  Iva,
  CargoEnvio,
  TotalCargo
}) => {
    const [Usuario, setUsuario] = useState("")
    const [Cedula, setCedula] = useState("")

    useEffect(() => {
        console.log(ListaUsuarios);
        for (let i = 0; i < ListaUsuarios.length; i++) {
            if (ListaUsuarios[i].usuario === nombreUsuario) {
                setUsuario(ListaUsuarios[i].usuario)
                setCedula(ListaUsuarios[i].cedula)
                ListaUsuarios[i].productoComprados = productosSeleccionados
                console.log(ListaUsuarios[i].productoComprados)
            }
        }
    }, []);

  return (
    <>
      {MostarFactura && (
        <div className="contenedor-factura">
            <div className="contenedor-btn">
              <button
                className="button-salir"
                onClick={() => setMostrarFactura(false)}
              >
                <img src={salir} alt="salir"></img>
              </button>
            </div>
          <div className="contenedor-factura-scroll">
            <div className="factura-productos">
              <div className="factura-header">
                <div className="factura-logo">
                  <img
                    className="logo-posicion"
                    src={logoEmpresa}
                    alt="logo-empresa"
                  ></img>
                </div>
                <div className="factura-numero"><strong>Factura:</strong> #1</div>
              </div>
              <div className="datos-usuario-factura">
                <div className="datos-user"><strong>Enviar a:</strong></div>
                <div className="datos-user">
                  <strong>Nombre Usuario:</strong>{Usuario}
                </div>
                <div className="datos-user">
                  <strong>Cedula Usuario:</strong>{Cedula}
                </div>
              </div>
              <div className="estructura-factura">
                <div className="encabezado-factura">
                  <div className="enca-productos">Cant</div>
                  <div className="enca-productos">Descripción</div>
                  <div className="enca-productos">Precio U.</div>
                  <div className="enca-productos">Importe</div>
                </div>
                {productosSeleccionados.map((p) => (
                  <div className="productos-factura" key={p.idProducto}>
                    <div className="producto-mapeo">{p.cantidad}</div>
                    <div className="producto-mapeo">{p.nombreProducto}</div>
                    <div className="producto-mapeo">{p.precioProducto}</div>
                    <div className="producto-mapeo">
                      {p.precioProducto * p.cantidad}
                    </div>
                  </div>
                ))}
                <div className="totales-factura">
                  <div className="total-productos">
                    <strong>Subtotal 0%</strong>$ {Subtotal}
                  </div>
                  <div className="total-productos">
                    <strong>Subtotal 15%</strong>$ {Iva}
                  </div>
                  <div className="total-productos">
                    <strong>Total:</strong>$ {Total}
                  </div>
                  <div className="total-productos">
                    <strong>Cargo envio:</strong>$ {CargoEnvio}
                  </div>
                  <div className="total-productos">
                    <strong>Total a pagar:</strong>$ {TotalCargo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Factura;
