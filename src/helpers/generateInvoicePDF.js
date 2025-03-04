import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  doc.setFillColor("#ffffff");
  doc.rect(0, 0, 210, 297, "F");

  doc.setFontSize(24);
  doc.setTextColor("#333");
  doc.setFont("helvetica", "bold");
  doc.text("Factura - Restaurante Tradición", 105, 30, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor("#333");
  doc.setFont("helvetica", "bold");
  doc.text(`ID de la Orden:`, 14, 50);
  doc.text(`Fecha:`, 14, 60);
  doc.text(`Monto Total:`, 14, 70);
  doc.text(`Cliente:`, 14, 90);

  doc.setFont("helvetica", "normal");
  doc.text(`${order.id}`, 60, 50);
  doc.text(`${new Date(order.createdAt).toLocaleDateString()}`, 60, 60);
  doc.text(`$${order.total_price.toFixed(2)}`, 60, 70);
  doc.text(`${order.customer.first_name} ${order.customer.first_last_name} ${order.customer.second_last_name}`, 60, 90);

  autoTable(doc, {
    startY: 100,
    head: [
      [
        { content: "Producto", styles: { fillColor: "#f2f2f2", fontStyle: "bold" } },
        { content: "Cantidad", styles: { fillColor: "#f2f2f2", fontStyle: "bold" } },
        { content: "Precio", styles: { fillColor: "#f2f2f2", fontStyle: "bold" } },
        { content: "Total", styles: { fillColor: "#f2f2f2", fontStyle: "bold" } },
      ],
    ],
    body: order.orderDetails.map((product) => [
      { content: product.product.name, styles: { textColor: "#333" } },
      { content: product.quantity, styles: { textColor: "#333" } },
      { content: `$${product.unit_price.toFixed(2)}`, styles: { textColor: "#333" } },
      { content: `$${(product.unit_price * product.quantity).toFixed(2)}`, styles: { textColor: "#333" } },
    ]),
    theme: "grid",
    styles: {
      halign: "center",
      fillColor: "#ffffff",
      textColor: "#333",
      lineColor: "#ddd",
      lineWidth: 0.5,
      fontSize: 10,
    },
    headStyles: {
      fillColor: "#f2f2f2",
      fontStyle: "bold",
    },
  });

  doc.setFontSize(10);
  doc.setTextColor("#888");
  doc.text("Factura generada automáticamente por Restaurante Tradición SAS", 105, doc.internal.pageSize.height - 20, { align: "center" });

  doc.save(`Factura_${order.id}.pdf`);
};
