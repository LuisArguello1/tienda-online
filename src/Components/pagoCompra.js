import React from "react";
import Carrito_compras from "./Carrito_compras";
import "./Css/pagoCompra.css";
import salir2 from "./Assets/salir2.svg";
import { useState } from "react";
import Swal from "sweetalert2";
import Destino from "./Destino";

const PagoCompra = ({ mostrarPago, setMostrarPago,EnviarTotal,productosSeleccionados,ListaUsuarios,nombreUsuario,Total,Subtotal,Iva }) => {
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
  const [DestinoMostrar, setDestinoMostrar] = useState(false)
  const [NumeroTarjeta, setNumeroTarjeta] = useState("");
  const [FechaExpiracion, setFechaExpiracion] = useState("");
  const [CodigoSeguridad, setCodigoSeguridad] = useState("");
  const [NombreTitular, setNombreTitular] = useState("");
  const [Dirección, setDireccion] = useState("");
  const [CodigoPostal, setCodigoPostal] = useState("");
  const [Ciudad, setCiudad] = useState("");

  const validarNumeroTarjeta = (numeroTarjeta) => numeroTarjeta.length === 16;
  const validarFechaExpiracion = (fechaExpiracion) => {
    const [month, year] = fechaExpiracion.split("/");
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const expYear = parseInt(year); // Asumiendo que el año está en formato YYYY
    const expMonth = parseInt(month);

    // Validar formato de fecha
    if (!/^\d{2}\/\d{4}$/.test(fechaExpiracion)) {
      return false;
    }

    // Validar mes
    if (expMonth < 1 || expMonth > 12) {
      return false;
    }

    // Validar año y mes en relación con la fecha actual
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return false;
    }

    return true;
  };
  const validarCodigoSeguridad = (codigoSeguridad) =>
    codigoSeguridad.length == 3;
  const validarNombreTitular = (nombreTitular) =>
    nombreTitular.length > 5 &&
    !palabras_prohibidas.includes(nombreTitular.toLowerCase());
  const validarDireccion = (direccion) =>
    direccion.length > 6 &&
    !palabras_prohibidas.includes(direccion.toLowerCase());
  const validarCodigoPostal = (codigoPostal) =>
    codigoPostal.length >= 4 && codigoPostal.length <= 7;
  const validarCiudad = (ciudad) =>
    ciudad.length > 5 && !palabras_prohibidas.includes(ciudad.toLowerCase());

  function llenarNumeroTarjeta(numeroTarjeta) {
    setNumeroTarjeta(numeroTarjeta);
  }
  function llenarFechaExpiracion(fechaExpiracion) {
    setFechaExpiracion(fechaExpiracion);
  }
  function llenarCodigoSeguridad(codigoSeguridad) {
    setCodigoSeguridad(codigoSeguridad);
  }
  function llenarNombreTitular(nombreTitular) {
    setNombreTitular(nombreTitular);
  }
  function llenarDireccion(direccion) {
    setDireccion(direccion);
  }
  function llenarCodigoPostal(codigoPostal) {
    setCodigoPostal(codigoPostal);
  }
  function llenarCiudad(ciudad) {
    setCiudad(ciudad);
  }

  function validarDatos() {
    if (
      validarNumeroTarjeta(NumeroTarjeta) &&
      validarFechaExpiracion(FechaExpiracion) &&
      validarCodigoSeguridad(CodigoSeguridad) &&
      validarNombreTitular(NombreTitular) &&
      validarDireccion(Dirección) &&
      validarCodigoPostal(CodigoPostal) &&
      validarCiudad(Ciudad)
    ) {
      setDestinoMostrar(true)

    } else if (!validarNumeroTarjeta(NumeroTarjeta)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Numero de tarjeta",
        text: "Los digitos de una tarjeta son 16",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else if (!validarFechaExpiracion(FechaExpiracion)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Fecha Expiracion",
        text: "Compruebe que la fecha de expiracion sea la correcta",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else if (!validarCodigoSeguridad(CodigoSeguridad)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Codigo de seguridad",
        text: "Compruebe que el codigo de seguridad contenga 3 digitos",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else if (!validarNombreTitular(NombreTitular)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Nombre del titular",
        text: "Nombre de titular incorrecto o ingrese uno mas largo",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else if (!validarDireccion(Dirección)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Dirección",
        text: "Coloque una dirección valida",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else if (!validarCodigoPostal(CodigoPostal)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Codigo Postal",
        text: "Compruebe el codigo postal esta entre 4 y 7 digitos",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else if (!validarCiudad(Ciudad)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Ciudad",
        text: "Nombre de ciudad no es valida",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    }
  }
  function llenarTarjetadatos() {
    if (
      !NumeroTarjeta ||
      !FechaExpiracion ||
      !CodigoSeguridad ||
      !NombreTitular ||
      !Dirección ||
      !CodigoPostal ||
      !Ciudad
    ) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error, Campos requeridos",
        text: "Rellene todos los campos",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
    } else {
      validarDatos();
    }
  }
  return (
    <>
      {mostrarPago && (
        <div className="contenedor-pago-compra">
          <div className="ordenar">
            <div className="contenedorTarjeta">
              <div className="salir1">
                <img
                  className="salir2"
                  src={salir2}
                  alt="no encontrado"
                  onClick={() => setMostrarPago(false)}
                ></img>
              </div>
              <div className="titulo">Agregar tarjeta para el pago</div>
              <div className="contenedor-card-button">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <p className="heading_8264">MASTERCARD</p>
                      <svg
                        className="logo"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="36"
                        height="36"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#ff9800"
                          d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                        ></path>
                        <path
                          fill="#d50000"
                          d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                        ></path>
                        <path
                          fill="#ff3d00"
                          d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                        ></path>
                      </svg>
                      <svg
                        version="1.1"
                        className="chip"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30px"
                        height="30px"
                        viewBox="0 0 50 50"
                      >
                        {" "}
                        <image
                          id="image0"
                          width="50"
                          height="50"
                          x="0"
                          y="0"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
                        fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
                        ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
                        e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
                        ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
                        u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
                        fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
                        lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
                        tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
                        g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
                        /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
                        orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
                        GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
                        OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
                        I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
                        lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
                        JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
                        qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
                        1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
                        BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
                        amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
                        S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
                        cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                        MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
                        LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
                        ></image>
                      </svg>
                      <svg
                        version="1.1"
                        className="contactless"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20px"
                        height="20px"
                        viewBox="0 0 50 50"
                      >
                        {" "}
                        <image
                          id="image0"
                          width="50"
                          height="50"
                          x="0"
                          y="0"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                        cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
                        lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
                        fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
                        GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
                        VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
                        HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
                        bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
                        DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
                        qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
                        sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
                        Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
                        XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
                        cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
                        nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
                        xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
                        MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
                        OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
                        MDowMIXeN6gAAAAASUVORK5CYII="
                        ></image>
                      </svg>
                      <p className="number">9759 2484 5269 6576</p>
                      <p className="valid_thru">VALID THRU</p>
                      <p className="date_8264">1 2 / 2 4</p>
                      <p className="name">BRUCE WAYNE</p>
                    </div>
                    <div className="flip-card-back">
                      <div className="strip"></div>
                      <div className="mstrip"></div>
                      <div className="sstrip">
                        <p className="code">***</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="button2" onClick={() => llenarTarjetadatos()}>
                  Agregar destino
                </button>
              </div>
            </div>
            <div className="ContenedorDatosTarjeta">
              <div className="contenedor-formulario">
                <form className="formField">
                  <input
                    required=""
                    type="number"
                    value={NumeroTarjeta}
                    onChange={(e) => llenarNumeroTarjeta(e.target.value)}
                  ></input>
                  <span className="span1">Numero de tarjeta:</span>
                </form>
                <form className="formField">
                  <input
                    required=""
                    type="text"
                    value={FechaExpiracion}
                    onChange={(e) => llenarFechaExpiracion(e.target.value)}
                  ></input>
                  <span className="span1">MM / AA:</span>
                </form>
                <form className="formField">
                  <input
                    required=""
                    type="number"
                    value={CodigoSeguridad}
                    onChange={(e) => llenarCodigoSeguridad(e.target.value)}
                  ></input>
                  <span className="span1">Codigo Seguridad:</span>
                </form>
                <form className="formField">
                  <input
                    required=""
                    type="text"
                    value={NombreTitular}
                    onChange={(e) => llenarNombreTitular(e.target.value)}
                  ></input>
                  <span className="span1">Nombre titular:</span>
                </form>
                <form className="formField">
                  <input
                    required=""
                    type="text"
                    value={Dirección}
                    onChange={(e) => llenarDireccion(e.target.value)}
                  ></input>
                  <span className="span1">Dirección:</span>
                </form>
                <form className="formField">
                  <input
                    required=""
                    type="number"
                    value={CodigoPostal}
                    onChange={(e) => llenarCodigoPostal(e.target.value)}
                  ></input>
                  <span className="span1">Codigo Postal:</span>
                </form>
                <form className="formField">
                  <input
                    required=""
                    type="text"
                    value={Ciudad}
                    onChange={(e) => llenarCiudad(e.target.value)}
                  ></input>
                  <span className="span1">Ciudad:</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {DestinoMostrar && (
        <Destino setMostrarPago={setMostrarPago} DestinoMostrar={DestinoMostrar} setDestinoMostrar={setDestinoMostrar} EnviarTotal={EnviarTotal} productosSeleccionados={productosSeleccionados} ListaUsuarios={ListaUsuarios} nombreUsuario={nombreUsuario} Total={Total} Subtotal={Subtotal} Iva = {Iva}></Destino>
      )}
    </>
  );
};

export default PagoCompra;
