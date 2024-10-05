import React, { useEffect } from "react";
import "./Css/destino.css";
import { useState } from "react";
import salir from "./Assets/salir2.svg";
import Factura from "./Factura2";
import Swal from "sweetalert2";

const Destino = ({
  setMostrarPago,
  DestinoMostrar,
  setDestinoMostrar,
  EnviarTotal,
  productosSeleccionados,
  ListaUsuarios,
  nombreUsuario,
  Total,
  Subtotal,
  Iva 
}) => {
  const [TotalCargo, setTotalCargo] = useState(0);
  const [CargoEnvio, setCargoEnvio] = useState(0);
  const [Direccion, setDireccion] = useState("");
  const [Correo, setCorreo] = useState("");
  const [CodigoPostal, setCodigoPostal] = useState("");
  const [MostarFactura, setMostrarFactura] = useState(false);
  const [ListaProductos, setListaProductos] = useState([])
  const palabras_prohibidas = [
    "puto",
    "mierda",
    "pene",
    "polla",
    "pendejo",
    "verga",
    "pies",
    "patas",
    "pito",
    "manco",
    "manca",
    "puta",
    "perra",
    "zorra",
    "hjp",
    "crvrg",
    "vrg",
    "feo",
    "fea",
    "maldito",
    "maldita",
    "maricon",
    "gay",
    "cocaina",
    "marihuana",
    "droga",
    "cigarrillos",
    "cigarro",
    "extasis",
    "nigga",
    "negro",
    "blanco",
    "marron",
    "policia",
    "ladron",
    "drogadicto",
    "fumador",
    "fumar",
    "tabaco",
    "macho",
    "macha",
    "hembra",
    "hembro",
    "coca",
  ];

  const validarDireccion = (direccion) =>
    direccion.length > 6 &&
    !palabras_prohibidas.includes(direccion.toLowerCase());
  const validarCodigoPostal = (codigoPostal) =>
    codigoPostal.length >= 4 && codigoPostal.length <= 7;

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  useEffect(() => {
    const obtenerListaProductos = JSON.parse(localStorage.getItem("listaProductos")) || []
    setListaProductos(obtenerListaProductos)

    
  }, [])


  useEffect(() => {
    const cargoEnvio1 = 9.0;
    setCargoEnvio(cargoEnvio1);
  }, []);

  useEffect(() => {
    const total = parseFloat(EnviarTotal) + parseFloat(CargoEnvio);
    setTotalCargo((total).toFixed(2));
  }, [EnviarTotal, CargoEnvio]);

  function llenarCorreo(correo) {
    setCorreo(correo);
  }
  function llenarDireccion(dirección) {
    setDireccion(dirección);
  }
  function llenarCodigoPostal(codigoPostal) {
    setCodigoPostal(codigoPostal);
  }

  function actualizarInventario() {
    console.log("Productos seleccionados:", productosSeleccionados);
    console.log("Lista de productos antes de actualizar:", ListaProductos);
  
    const actualizarListaProductos = ListaProductos.map(producto => {
      const productoSeleccionado = productosSeleccionados.find(p => p.idProducto === producto.idProducto);
      if (productoSeleccionado) {
        return {
          ...producto,
          cantidad: producto.cantidad - productoSeleccionado.cantidad
        };
      }
      return producto;
    });
  
    const productosActualizados = actualizarListaProductos.filter(producto => producto.cantidad > 0);
  
    console.log("Lista de productos después de actualizar:", productosActualizados);
  
    localStorage.setItem("listaProductos", JSON.stringify(productosActualizados));
    setListaProductos(productosActualizados);
  }

  function validardatos() {
    if (validarRelleno()) {
      if (validarDireccion(Direccion) && validarCodigoPostal(CodigoPostal) && validarCorreo(Correo)) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Gracias por su compra `,
          text: "Tome captura de factura por seguridad o reclamo",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });

        actualizarInventario()

        setMostrarFactura(true);
        setCodigoPostal("")
        setCorreo("")
        setDireccion("")
      } else if (!validarDireccion(Direccion)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Direccion invalida",
          text: "Error!!, ingrese una direccion vaida",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else if (!validarCodigoPostal(CodigoPostal)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Codigo Postal es invalido",
          text: "Error!!, ingrese un codigo postal valido",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      }else if (!validarCorreo(Correo)){
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Correo es invalido",
          text: "Error!!, ingrese un correo valido",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    }
  }

  function validarRelleno() {
    if (!Direccion || !CodigoPostal || !Correo) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Campos Requeridos",
        text: "Error!!, rellene todos los campos",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      {DestinoMostrar && (
        <div className="contenedor-destino-padre">
          <div className="formulario-preguntas">
            <div className="contenedor-salir">
              Agregar destino
              <button
                className="salir-button"
                onClick={() => setDestinoMostrar(false)}
              >
                <img src={salir} alt="salir" className="salir21"></img>
                Cancelar
              </button>
            </div>
            <div className="contenedor-presupuesto-preguntas">
              <div className="presupuesto">
                <div className="datos-entrega">
                  <strong>Direccion origen:</strong> Milagro
                </div>
                <div className="datos-entrega">
                  <strong>Codigo Postal :</strong> 091701
                </div>
                <div className="datos-entrega">
                  <strong>Met. transporte :</strong> Terrestre
                </div>
                <div className="datos-entrega">
                  <strong>Peso paquete :</strong> 10lb
                </div>
                <div className="datos-entrega">
                  <strong>Tiempo entrega :</strong> 5 dias
                </div>
                <div className="cargo-entrega">
                  <strong>Total productos :</strong>
                  <div className="precio-entrega">$ {EnviarTotal}</div>
                </div>
                <div className="cargo-entrega">
                  <strong>Cargo por envio :</strong>
                  <div className="precio-entrega">$ {CargoEnvio}</div>
                </div>
                <div className="cargo-entrega">
                  <strong>Total a pagar:</strong>
                  <div className="precio-entrega">$ {TotalCargo}</div>
                </div>
              </div>
              <div className="preguntas">
                <div className="coolinput">
                  <label className="text" htmlFor="input">
                    Correo:
                  </label>
                  <input
                    className="input"
                    name="input"
                    placeholder="correo...."
                    type="email"
                    value={Correo}
                    onChange={(e) => llenarCorreo(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="coolinput">
                  <label className="text" htmlFor="input">
                    Direccion:
                  </label>
                  <input
                    className="input"
                    name="input"
                    placeholder="Direccion...."
                    type="text"
                    value={Direccion}
                    onChange={(e) => llenarDireccion(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="coolinput">
                  <label className="text" htmlFor="input">
                    Cod. Postal:
                  </label>
                  <input
                    className="input"
                    name="input"
                    placeholder="Cod. Postal..."
                    type="number"
                    value={CodigoPostal}
                    onChange={(e) => llenarCodigoPostal(e.target.value)}
                    required
                  ></input>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => validardatos()}
                >
                  <div className="btn-txt">Ver factura y pagar</div>
                  <kbd className="btn-kbd">P</kbd>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {MostarFactura && (
        <Factura
          MostarFactura={MostarFactura}
          setMostrarFactura={setMostrarFactura}
          productosSeleccionados={productosSeleccionados}
          ListaUsuarios={ListaUsuarios}
          nombreUsuario={nombreUsuario}
          Total={Total}
          Subtotal={Subtotal}
          Iva = {Iva}
          CargoEnvio = {CargoEnvio}
          TotalCargo = {TotalCargo}
        ></Factura>
      )}
    </>
  );
};

export default Destino;
