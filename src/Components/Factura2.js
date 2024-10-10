import React, { useEffect } from "react";
import { useState } from "react";
import "./Css/factura.css";
import logoEmpresa from "./Img/supermarket.png";
import salir from "./Assets/salir.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
  TotalCargo,
}) => {
  const [Usuario, setUsuario] = useState("");
  const [Cedula, setCedula] = useState("");

  useEffect(() => {
    let listaUsuariosActualizada =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    for (let i = 0; i < listaUsuariosActualizada.length; i++) {
      if (listaUsuariosActualizada[i].usuario === nombreUsuario) {
        listaUsuariosActualizada[i].productoComprados = productosSeleccionados;
        listaUsuariosActualizada[i].totalCompra = TotalCargo;
        setUsuario(listaUsuariosActualizada[i].usuario);
        setCedula(listaUsuariosActualizada[i].cedula);
        break;
      }
    }

    localStorage.setItem("usuarios", JSON.stringify(listaUsuariosActualizada));
  }, [nombreUsuario, productosSeleccionados, TotalCargo]);

  function recargarPagina() {
    window.location.reload();
  }

  const generarPDF = () => {
    const doc = new jsPDF();

    // Agregar el logo
    doc.setFont("helvetica","bold")
    doc.text("Super Mercado ", 10, 30);
    doc.addImage(logoEmpresa, "PNG", 50, 10, 40, 30);

    // Título de la factura
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Factura", 150, 30);

    // Datos del usuario
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Datos Usuario:`, 10, 50);

    doc.setFont("helvetica", "normal");
    doc.text(`Nombre Usuario: ${Usuario}`, 10, 60);
    doc.text(`Cédula Usuario: ${Cedula}`, 10, 70);

    // Encabezado de la tabla de productos
    const encabezado = [["Cant", "Descripción", "Precio U.", "Importe"]];
    const productos = productosSeleccionados.map((p) => [
      p.cantidad,
      p.nombreProducto,
      p.precioProducto,
      (p.precioProducto * p.cantidad).toFixed(2),
    ]);

    // Generar tabla de productos
    autoTable(doc, {
      head: encabezado,
      body: productos,
      startY: 80,
      theme: "grid"
    });

    // Preparar datos para la tabla de totales
    const totales = [
      ["Subtotal 0%   :", `$${Subtotal}`],
      ["Subtotal 15%  :", `$${Iva}`],
      ["Total         :", `$${Total}`],
      ["Cargo envío   :", `$${CargoEnvio}`],
      ["Total a pagar :", `$${TotalCargo}`],
    ];

    const pageWidth = doc.internal.pageSize.getWidth()
    const tableWidth = 100
    const startX = pageWidth - tableWidth - 10

    // Generar tabla de totales
    autoTable(doc, {
      head: [["Descripción", "Monto"]],
      body: totales.map(([descripcion, monto]) => {
        return [
          {
            content: descripcion,
            styles: {
              font: "helvetica",
              fontStyle: "bold",
              textColor: "black",
              halign: "right",
            },
          },
          { content: monto, styles: { halign: "center" } },
        ]; // Ajusta el color aquí
      }),
      startY: doc.lastAutoTable.finalY + 10, // Inicia después de la tabla de productos
      startX: startX,
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30, halign: "center" },
      },
      theme: "grid",
    });

    // Descargar el PDF
    doc.save("factura.pdf");
  };

  return (
    <>
      {MostarFactura && (
        <div className="contenedor-factura">
          <div className="contenedor-btn">
            <button className="button-descargar" onClick={generarPDF}>
              Descargar Factura
            </button>
            <button className="button-salir" onClick={recargarPagina}>
              <img src={salir} alt="salir"></img>
              Salir
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
                <div className="factura-numero">
                  <strong>Factura:</strong> #1
                </div>
              </div>
              <div className="datos-usuario-factura">
                <div className="datos-user">
                  <strong>Enviar a:</strong>
                </div>
                <div className="datos-user">
                  <strong>Nombre Usuario:</strong>
                  {Usuario}
                </div>
                <div className="datos-user">
                  <strong>Cedula Usuario:</strong>
                  {Cedula}
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
