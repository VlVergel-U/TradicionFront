import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  const logoUrl = `/logo.png`;
  doc.addImage(logoUrl, "PNG", 10, 10, 50, 20);

  doc.setFillColor("#121212");
  doc.rect(0, 0, 210, 297, "F");

  doc.setFontSize(22);
  doc.setTextColor("#4CAF50");
  doc.setFont("helvetica", "bold");
  doc.text("Factura - Restaurante Tradición", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor("#ddd");

  doc.setFont("helvetica", "bold");
  doc.text(`ID de la Orden:`, 14, 40);
  doc.text(`Fecha:`, 14, 50);
  doc.text(`Monto Total:`, 14, 60);
  doc.text(`ID de Pago:`, 14, 70);
  doc.text(`Cliente:`, 14, 80); 

  doc.setFont("helvetica", "normal");
  doc.text(`${order.id}`, 50, 40);
  doc.text(`${new Date(order.createdAt).toLocaleDateString()}`, 50, 50);
  doc.text(`$${order.total_price.toFixed(2)}`, 50, 60);
  doc.text(`${order.payment.paymentId}`, 50, 70);

  doc.text(`${order.customer.first_name} ${order.customer.first_last_name} ${order.customer.second_last_name}`, 50, 80);

  autoTable(doc, {
    startY: 90,
    head: [
      [
        { content: "Producto", styles: { fillColor: "#333" } },
        { content: "Cantidad", styles: { fillColor: "#333" } },
        { content: "Precio", styles: { fillColor: "#333" } },
        { content: "Total", styles: { fillColor: "#333" } },
      ],
    ],
    body: order.orderDetails.map((product) => [
      { content: product.product.name, styles: { textColor: "#ddd" } },
      { content: product.quantity, styles: { textColor: "#ddd" } },
      { content: `$${product.unit_price.toFixed(2)}`, styles: { textColor: "#ddd" } },
      { content: `$${(product.unit_price * product.quantity).toFixed(2)}`, styles: { textColor: "#ddd" } },
    ]),
    theme: "grid",
    styles: {
      halign: "center",
      fillColor: "#1e1e1e",
      textColor: "#ddd",
      lineColor: "#333",
      lineWidth: 0.5,
    },
  });

  doc.setFontSize(10);
  doc.setTextColor("#888");
  doc.text("Factura generada automáticamente por Restaurante Tradición", 105, doc.internal.pageSize.height - 20, { align: "center" });

  doc.save(`Factura_${order.id}.pdf`);
};
