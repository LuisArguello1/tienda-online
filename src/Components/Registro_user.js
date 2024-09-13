import User from "./clase_user";
import Producto from "./claseProductos"
import { useEffect } from "react";
import "./Css/registro_user.css";
import React from "react";
import click from "./Assets/click.svg";
import salir from "./Assets/salir.svg";
import Swal from "sweetalert2";
import {useState } from "react";
import Productos from "./Productos";



const Registro_user = () => {

  //ventanas emergentes de inicio de sesion y registro
  const [MostarInicionSesion, setMostrarInicioSesion] = useState(false);
  const [MostrarRegistro, setMostrarRegistro] = useState(false);
  const [MostrarRegistro_user, setMostrarRegistro_user] = useState(true);
  const [MostrarProductos, setMostrarProductos] = useState(false);
  const [DatoAdministrativo , setDatoAdministrativo] = useState(false)
  const [ListaProductos, setListaProductos] = useState([])

  //Lista de usurios registrados
  const [ListaUsuarios, setListaUsuarios] = useState([]);

  //campos de inicio de sesion
  const [NombreUsuario, setNombreUsuario] = useState("");
  const [ContrasenaUsuario, setContrasenaUsuario] = useState("");
  const [UsuarioMostrar, setUsuarioMostrar] = useState("")

  //campos de registro de usuario
  const [NombreUsuarioRegistro, setNombreUsuarioRegistro] = useState("");
  const [CedulaUsuarioRegistro, setCedulaUsuarioRegistro] = useState("");
  const [ContrasenaUsuarioRegistro, setContrasenaUsuarioRegistro] =useState("");

  useEffect(() => {
    // Cargar los datos de usuarios desde localStorage al montar el componente
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    setListaUsuarios(usuarios);

    // Añadir credenciales administrativas si no hay usuarios
    if (usuarios.length === 0) {
      const adminUser = new User("Admin-01", "1111177777", "Admin001");
      const updatedUsers = [...usuarios, adminUser];
      localStorage.setItem('usuarios', JSON.stringify(updatedUsers));
      setListaUsuarios(updatedUsers);
    }
  }, []);

  useEffect(() => {
    let producto1 = new Producto(
      "ADOBO COMPLETO MAGGI LA SAZON DOYPACK 200 G",
      0.99,
      1,
      1,
      "https://distribuidorariofrio.com/wp-content/uploads/2022/03/la-sazon-maggi-550gr-1.jpg"
    )
    let producto2 = new Producto(
      "ACEITE LA FAVORITA 1 L",
      2.17,
      2,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/257473000_1.png_1723561307243.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto3 = new Producto(
      "AZUCAR MAS AHORRO 1 KG",
      0.99,
      3,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/259852000_1.png_1719446719532.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto4 = new Producto(
      "SAL YODADA FLUORURADA REFINADA CRIS SAL 1 KG",
      0.49,
      4,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/251308000_1.png_1719584055432.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto5 = new Producto(
      "PAN MOLDE TA'RIKO 450 G N",
      0.99,
      5,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/259628000_1.png_1722456115451.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto6 = new Producto(
      "ATUN LOMITOS EN ACEITE REAL 180 G A/F",
      1.39,
      6,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/257346000_1.png_1722315759324.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto7 = new Producto(
      "TORTILLAS MAMA FANY 250 G",
      2.09,
      7,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/251605000_1.png_1719436190655.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto8 = new Producto(
      "CEREAL CORN FLAKES MCDOUGAL 320 G LECHE CONDENSADA",
      2.59,
      8,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/255171000_1.png_1725577446919.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto9 = new Producto(
      "SARDINAS EN SALSA DE TOMATE REAL 156 G",
      0.93,
      9,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/255843000_1.png_1723824224316.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto10 = new Producto(
      "SALSA DE TOMATE LOS ANDES DOYPACK 200 G",
      1.09,
      10,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/250141000_1.png_1723647731634.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto11 = new Producto(
      "AVENA EN HOJUELAS QUAKER 500 G",
      1.35,
      11,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/257760000_1.png_1721664073031.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto12 = new Producto(
      "MAYONESA MAGGI DOYPACK 200 G",
      1.45,
      12,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/250209000_1.png_1718405866351.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto13 = new Producto(
      "MAIZ DULCE FACUNDO 425 G",
      1.75,
      13,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/250328000_1.png_1719461284025.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto14 = new Producto(
      "CHOCOLATE EN POLVO CHOCOLISTO DOYPACK 200 G",
      1.99,
      14,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/250516000_1.png_1725557469343.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto15 = new Producto(
      "ACEITE C/ACHIOTE LA FAVORITA 200 ML",
      1.25,
      15,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/257434000_1.png_1719439387552.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto16 = new Producto(
      "PREMEZCLA P/PANCAKE YA 454 G",
      2.29,
      16,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/251071000_1.png_1725667242954.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto17 = new Producto(
      "INFUSIONES TA'RIKO 20 SOBRES HIERBA LUISA",
      0.99,
      17,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/259596002_1.png_1719584215668.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto18 = new Producto(
      "SUPLEMENTO EN POLVO VOLUMENE PROTEIN ELITE 500 G GRATIS 50 G VAINILLA",
      20.99,
      18,
      1,
      "https://www.tia.com.ec/media/catalog/product/v/o/volumeneprotein_yey5v5ljaa2jc1hp.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200"
    )
    let producto19 = new Producto(
      "ACEITUNAS S/HUESO MAS AHORRO 235 G",
      1.29,
      19,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/259846000_1.png_1724803291607.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto20 = new Producto(
      "MAYONESA GUSTADINA 320 G SABOR A QUESO",
      4.19,
      20,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/259846000_1.png_1724803291607.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto21 = new Producto(
      "SOPA DE POLLO MAGGI 60 G POLLO",
      0.95,
      21,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/251106001_1.png_1721689309211.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto22 = new Producto(
      "ATUN LOMITOS EN ACEITE GIRASOL TA'RIKO 160 G X 5 A/F",
      4.99,
      22,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/259745000_1.png_1719436375830.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto23 = new Producto(
      "ARROZ ENVEJECIDO OSO SACO 20 LB",
      11.99,
      23,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/257232000_1.png_1722376933343.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
    let producto24 = new Producto(
      "CREMA DE AVELLANA C/CACAO NUTELLA 350 G",
      5.99,
      23,
      1,
      "https://www.tia.com.ec/media/catalog/product/2/5/250951000_1.png_1725579111620.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=200&width=200&canvas=200:200&format=jpeg"
    )
  
    const lista = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8,producto9,producto10,producto11,producto12,producto13,producto14,producto15,producto16,producto17,producto18,producto19,producto20,producto21,producto22,producto23,producto24]
  
    setListaProductos(lista)
  }, []);

  useEffect(() => {
    console.log("UsuarioMostrar actualizado: ", UsuarioMostrar)
  }, [UsuarioMostrar])

  //validacion de datos
  const validarNombreUsuario = (nombre) =>
    /^[a-zA-Z\s]+$/.test(nombre) &&
    !palabras_prohibidas.includes(nombre.toLowerCase()) &&
    nombre.length >= 5;
  const validarCedulaUsuario = (cedula) => /^[0-9]{10}$/.test(cedula);
  const validarContrasenaUsuario = (contrasena) => contrasena.length >= 6;
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

  //Despliegue de ventanas emergentes
  function handleClickButton1(estado) {
    setMostrarInicioSesion(estado);
  }
  function handleClickButton2(estado) {
    setMostrarRegistro(estado);
  }

  //relleno de los estados de los datos de los usuarios inicio de sesion
  function llenarUsuario(nombreUsuario) {
    setNombreUsuario(nombreUsuario);
  }
  function llenarContrasena(contrasenaUsuario) {
    setContrasenaUsuario(contrasenaUsuario);
  }
  //relleno de los estados de los datos de los usuarios registro de user
  function llenarUsuarioRegistro(nombreUsuarioRegistro) {
    setNombreUsuarioRegistro(nombreUsuarioRegistro);
  }
  function llenarCedulaRegistro(cedulaUsuarioRegistro) {
    setCedulaUsuarioRegistro(cedulaUsuarioRegistro);
  }
  function llenarContrasenaRegistro(contrasenaUsuarioRegistro) {
    setContrasenaUsuarioRegistro(contrasenaUsuarioRegistro);
  }

  //Validacion de datos de registro
  function CompararRegistroUsuarios() {
    for (const user of ListaUsuarios) {
      if (
        user.usuario === NombreUsuarioRegistro ||
        user.cedula === CedulaUsuarioRegistro
      )
        return false;
    }
    return true;
  }

  function almacenarDatosUser() {
    if (validarDatosUserRegistro()) {
      if (
        validarNombreUsuario(NombreUsuarioRegistro) &&
        CompararRegistroUsuarios() &&
        validarCedulaUsuario(CedulaUsuarioRegistro) &&
        validarContrasenaUsuario(ContrasenaUsuarioRegistro)
      ) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Excelente... Bienvenido ` + NombreUsuarioRegistro,
          text: "Inicie sesion para ingresar",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });

        
        //se crea intancias de usuarios y se los almacenan en un array
        const user = new User(
          NombreUsuarioRegistro,
          CedulaUsuarioRegistro,
          ContrasenaUsuarioRegistro
        );
        
        const updatedUsers = [...ListaUsuarios, user];
        localStorage.setItem('usuarios', JSON.stringify(updatedUsers));
        setListaUsuarios(updatedUsers);

        //Se imprime por consola los usuarios registrados
        console.log(updatedUsers)

        //se limpian los inputs
        setNombreUsuarioRegistro("");
        setCedulaUsuarioRegistro("");
        setContrasenaUsuarioRegistro("");

        //se cierra la venta de registro
        setMostrarRegistro(false);

      } else if (!validarNombreUsuario(NombreUsuarioRegistro)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Nombre de Usuario incorrecto",
          text: "Ingrese solo letras y vocales en su usuario o ingrese un nombre mas largo",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else if (!validarCedulaUsuario(CedulaUsuarioRegistro)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Cedula de Usuario incorrecto",
          text: "Ingrese su Cedula y que sea igual a 10 numeros",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else if (!validarContrasenaUsuario(ContrasenaUsuarioRegistro)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Contraseña de Usuario incorrecto",
          text: "Ingrese una contraseña mas larga",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else if (!CompararRegistroUsuarios()) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error de identificacion",
          text: "El numero de cedula o usuario ya ha sido ingresado, ingrese otro numero de cedula o usuario",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    }
  }
  function validarDatosUserRegistro() {
    if (
      !NombreUsuarioRegistro ||
      !CedulaUsuarioRegistro ||
      !ContrasenaUsuarioRegistro
    ) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Oops...",
        text: "Rellene todos los campos requeridos",
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

  //validacion datos inicio de sesion
  const validarDatosUser = () => {
    if (!NombreUsuario || !ContrasenaUsuario) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Oops...",
        text: "Rellene todos los campos requeridos",
        width: "300px",
        customClass: {
          popup: "custom-swal",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  function compararUser() {
    for (const user of ListaUsuarios) {
      if (
        user.usuario === NombreUsuario &&
        user.contrasena === ContrasenaUsuario
      ) {
        return true;
      }
    }
    return false;
  }
  function compararDatosAdmisnistrativos(){
    if (NombreUsuario === "Admin-01" && ContrasenaUsuario === "Admin001"){
      setDatoAdministrativo(true)
    }else{
      setDatoAdministrativo(false)
    }
  }
  const rellenarDatos = (estado1, estado2) => {
    if (validarDatosUser()) {
      if (compararUser()) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Excelente...",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
        compararDatosAdmisnistrativos()
        
        const mostrar = NombreUsuario
        setUsuarioMostrar(mostrar)


        setNombreUsuario("");
        setContrasenaUsuario("");
        setMostrarRegistro_user(estado1)
        setMostrarProductos(estado2)
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "No se encontro el usuario",
          text: "Pruebe registrandose o vuelva a intentarlo",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    }
  };


  return (
    <>
      {MostrarRegistro_user && (
        <div className="contenedor-registro-InicioSesion">
          {/* Ventana emergente de inicio de Sesion */}
          {MostarInicionSesion && (
            <div className="contenedor-inicionSesion">
              <div className="background-inicioSesion">
                <div className="Salir-ventana">
                  <img
                    src={salir}
                    alt="svg no encontrado"
                    onClick={() => handleClickButton1(false)}
                  ></img>
                </div>
                <header className="encabezado-registro">Inicio de Sesion</header>
                <p className="info-registro">
                  Ingrese con su usuario y contraseña{" "}
                  <img
                    src={click}
                    alt="svg no encontrado"
                    className="svg-click"
                  ></img>
                </p>
                <div className="Contenedor_datos_usuario">
                  <input
                    type="text"
                    className="entrada-info-user"
                    placeholder="Ingrese su usuario"
                    value={NombreUsuario}
                    onChange={(e) => llenarUsuario(e.target.value)}
                    required
                  ></input>
                  <input
                    type="password"
                    className="entrada-info-user"
                    placeholder="Contraseña"
                    value={ContrasenaUsuario}
                    onChange={(e) => llenarContrasena(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="contenedor-button">
                  <button className="button" onClick={() => rellenarDatos(false,true)}>
                    <div className="blob1"></div>
                    <div className="blob2"></div>
                    <div className="inner">Ingresar</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ventana emergente de ragistro de usuario */}
          {MostrarRegistro && (
            <div className="contenedor-registro">
              <div className="background-registro">
                <div className="Salir-ventana">
                  <img
                    src={salir}
                    alt="svg no encontrado"
                    onClick={() => handleClickButton2(false)}
                  ></img>
                </div>
                <header className="encabezado-registro">Registrarse</header>
                <p className="info-registro">
                  Registre su usuario y contraseña{" "}
                  <img
                    src={click}
                    alt="svg no encontrado"
                    className="svg-click"
                  ></img>
                </p>
                <div className="Contenedor_datos_usuario">
                  <input
                    type="text"
                    className="entrada-info-user"
                    placeholder="Ingrese su usuario"
                    value={NombreUsuarioRegistro}
                    onChange={(e) => llenarUsuarioRegistro(e.target.value)}
                    required
                  ></input>
                  <input
                    type="number"
                    className="entrada-info-user"
                    placeholder="Cedula"
                    value={CedulaUsuarioRegistro}
                    onChange={(e) => llenarCedulaRegistro(e.target.value)}
                    required
                  ></input>
                  <input
                    type="password"
                    className="entrada-info-user"
                    placeholder="Contraseña"
                    value={ContrasenaUsuarioRegistro}
                    onChange={(e) => llenarContrasenaRegistro(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="contenedor-button">
                  <button className="button" onClick={() => almacenarDatosUser()}>
                    <div className="blob1"></div>
                    <div className="blob2"></div>
                    <div className="inner">Registrarse</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ventana de eleccion de inicion Sesion y registro */}
          <div className="contenedor-eleccion">
            <header className="encabezado-registro">Supermercado</header>
            <p className="info-registro">
              Ingrese con su usuario y contraseña{" "}
              <img
                src={click}
                alt="svg no encontrado"
                className="svg-click"
              ></img>     
            </p>
            <div className="contenedor-botones">
              <button
                className="button"
                onClick={() => handleClickButton1(true)}
              >
                <div className="blob1"></div>
                <div className="blob2"></div>
                <div className="inner">Login</div>
              </button>
              <button
                className="button"
                onClick={() => handleClickButton2(true)}
              >
                <div className="blob1"></div>
                <div className="blob2"></div>
                <div className="inner">Register</div>
              </button>
            </div>
          </div>
        </div>
      )}
      {MostrarProductos && (
        <Productos esAdmin={DatoAdministrativo} listaProductos ={ListaProductos} nombreUsuario={UsuarioMostrar}></Productos>
      )}
    </>
  );
};

export default Registro_user;
