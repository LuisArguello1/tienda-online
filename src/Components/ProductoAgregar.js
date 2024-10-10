import React from "react";
import { useEffect, useState } from "react";
import "./Css/agregarProducto.css";
import Swal from "sweetalert2";
import Producto from "./claseProductos";

const ProductoAgregar = ({
  MostrarAgregarProducto,
  setMostrarAgregarProducto,
}) => {
  const [ListaProductos, setListaProductos] = useState([]);

  const [NombreProducto, setNombreProducto] = useState("");
  const [PrecioProducto, setPrecioProducto] = useState();
  const [CantidadProducto, setCantidadProducto] = useState();
  const [IdProducto, setIdProducto] = useState();
  const [UrlProducto, setUrlProducto] = useState();
  const [archivoProducto, setArchivoProducto] = useState(null);
  const [ImgNoAdmitida, setImgNoAdmitida] = useState(false);
  const [ImgAdmitida, setImgAdmitida] = useState(false);

  const validarPrecioProducto = (precio) => /^\d+(\.\d{1,2})?$/.test(precio);
  const validarCantidad = (cantidad) => /^\d+/.test(cantidad);
  const validarId = (id) => typeof id === "number" && !isNaN(id) && id > 0;

  useEffect(() => {
    const obtenerListaProductos =
      JSON.parse(localStorage.getItem("listaProductos")) || [];
    setListaProductos(obtenerListaProductos);
  }, []);

  useEffect(() => {
    // Actualizar el localStorage cuando ListaProductos cambie
    localStorage.setItem("listaProductos", JSON.stringify(ListaProductos));
  }, [ListaProductos]);

  function capturarImg(e) {
    const archivo = e.target.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (archivo) {
      if (archivo.size > maxSize) {
        setImgNoAdmitida(true)
        setImgAdmitida(false);
        // Limpiar el archivo si es demasiado grande
        setArchivoProducto(null);
        setUrlProducto("")
        Swal.fire({
          position: "top",
          icon: "error",
          title: "El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setUrlProducto(reader.result);
        setImgAdmitida(true);
        setImgNoAdmitida(false);
        setArchivoProducto(archivo)
      };
      reader.readAsDataURL(archivo);
    } else {
      setUrlProducto("");
      setImgAdmitida(false);
    }
  }
  function validarCampos() {
    
    if (validarEntradasVacias()) {
      if (!ImgAdmitida) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
        setImgNoAdmitida(true)
        return;
      }
      if (
        validarPrecioProducto(PrecioProducto) &&
        validarCantidad(CantidadProducto) &&
        validarId(IdProducto)
      ) {
        // Comprobar si el ID ya existe
        const idExistente = ListaProductos.find(
          (producto) => producto.idProducto === IdProducto
        );
        if (idExistente) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "El ID ya existe, por favor ingrese uno diferente.",
            width: "300px",
            customClass: {
              popup: "custom-swal",
            },
          });
        } else {
          const NuevoProducto = new Producto(
            NombreProducto.toUpperCase(),
            PrecioProducto,
            IdProducto,
            CantidadProducto,
            UrlProducto
          );

          setListaProductos((prev) => {
            const nuevosProductos = [
              { ...NuevoProducto, urlImagen: UrlProducto },
              ...prev,
            ];
            localStorage.setItem(
              "listaProductos",
              JSON.stringify(nuevosProductos)
            );
            return nuevosProductos;
          });

          Swal.fire({
            position: "top",
            icon: "success",
            title: "Producto Agregado con exito",
            width: "300px",
            customClass: {
              popup: "custom-swal",
            },
          });
          setNombreProducto("");
          setPrecioProducto("");
          setCantidadProducto("");
          setIdProducto("");
          setUrlProducto("");
          setArchivoProducto(null);
        }
      } else if (!validarPrecioProducto(PrecioProducto)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title:
            "Precio Erroneo ingrese solo numeros y el punto de decimal [.]",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else if (!validarCantidad(CantidadProducto)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Cantidad Erronea, ingrese solo numeros en la cantidad",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else if (!validarId(IdProducto)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Id Erroneo, colocque solo numeros en el id",
          width: "300px",
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    }
  }

  function validarEntradasVacias() {
    if (
      !NombreProducto ||
      !PrecioProducto ||
      !CantidadProducto ||
      !IdProducto ||
      !UrlProducto
    ) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Todos los campos son obligatorios",
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

  function vaciarEntradas() {
    setNombreProducto("");
    setPrecioProducto("");
    setCantidadProducto("");
    setIdProducto("");
    setUrlProducto("");
    setMostrarAgregarProducto(false);
  }

  return (
    <>
      {MostrarAgregarProducto && (
        <div className="contenedor-agregar-producto-padre">
          <div className="contenedor-btn-salir2">
            <strong>Agregar Producto</strong>
          </div>
          <strong>Ingrese los datos del producto</strong>
          <div className="contenedor-entradas-de-cambio">
            <form className="formField">
              <input
                required
                type="text"
                value={NombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
              />
              <span className="span1">Nombre producto</span>
            </form>
            <form className="formField">
              <input
                required
                type="text"
                value={PrecioProducto}
                onChange={(e) => setPrecioProducto(e.target.value)}
              />
              <span className="span1">Precio Producto</span>
            </form>
            <form className="formField">
              <input
                required
                type="number"
                value={CantidadProducto}
                onChange={(e) => setCantidadProducto(e.target.value)}
              />
              <span className="span1">Cantidad Producto</span>
            </form>
            <form className="formField">
              <input
                required
                type="number"
                value={IdProducto}
                onChange={(e) => setIdProducto(Number(e.target.value))}
              />
              <span className="span1">Id Producto</span>
            </form>
            <input
              className="input-file"
              required
              type="file"
              accept="image/*"
              onChange={(e) => capturarImg(e)}
            />
            {UrlProducto && (
              <>
                <img
                  src={UrlProducto}
                  alt="img-preview"
                  className="url-img"
                ></img>
                {ImgNoAdmitida && (
                  <div>
                    El archivo es demasiado grande.
                  </div>
                )}
                {ImgAdmitida && (
                  <div style={{color: "green"}}>El archivo es admitido.</div>
                )}
              </>
            )}
          </div>
          <div className="contenedor-btns-cancelar-guardar">
            <button
              className="button-name2"
              role="button"
              onClick={validarCampos}
            >
              Guardar
            </button>
            <button
              className="button-name3"
              role="button"
              onClick={() => vaciarEntradas()}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductoAgregar;
