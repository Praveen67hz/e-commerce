import { useContext, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { ShopContext } from "../Context/ShopContext";
import "./Invoice.css";

const Invoice = () => {
  const {
    clearCart,
    user,
    products,
    couponCode,
    discountAmount,
    shippingDetails,
  } = useContext(ShopContext);

  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [shippingMethod] = useState(localStorage.getItem("shippingMethod") || "Standard");
  const [shippingCost] = useState(Number(localStorage.getItem("shippingCost")) || 5);

  useEffect(() => {
    if(!products || products.length === 0) return;

    const invoiceId = localStorage.getItem("currentInvoiceId");
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const invoice = invoices.find((inv) => inv.orderId === invoiceId);

    if (invoice) {
      const completeInvoice = {
        ...invoice,
        shippingMethod: localStorage.getItem("shippingMethod") || "Standard",
        shippingCost: Number(localStorage.getItem("shippingCost")) || 5
      };
      setCurrentInvoice(completeInvoice);
    }
    clearCart();
  }, [products]);

  if (!user) return <p>Please login to generate an invoice.</p>;
  if (!currentInvoice) return <p>Loading invoice...</p>;

  const { 
    orderId = 'N/A',
    subtotal = 0,
    finalAmount = 0,
    cartItems = {},
    date = new Date().toLocaleString()
  } = currentInvoice || {};

  const orderProducts = Object.entries(cartItems)
    .filter(([_, qty]) => qty > 0)
    .map(([id, quantity]) => {
      const product = products.find((p) => p.id === Number(id)) || {};
      return {
        name: product.name || "Unknown Product",
        price: product.new_price || 0,
        quantity,
      };
    });

  const formatCurrency = (amount = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.text("INVOICE", 90, yOffset);
    yOffset += 20;

    doc.text(`Order ID: ${orderId}`, 10, yOffset);
    doc.text(`Date: ${date}`, 140, yOffset);
    yOffset += 10;

    doc.text(`Customer: ${user.name}`, 10, yOffset);
    yOffset += 10;

    doc.text(`Email: ${user.email}`, 10, yOffset);
    yOffset += 20;

    doc.text("Shipping Details:", 10, yOffset);
    yOffset += 10;

    doc.text(`Name: ${shippingDetails.name || ""}`, 10, yOffset);
    yOffset += 10;

    doc.text(`Address: ${shippingDetails.address || ""}`, 10, yOffset);
    yOffset += 10;

    doc.text(`City: ${shippingDetails.city || ""}`, 10, yOffset);
    yOffset += 10;

    doc.text(`Postal Code: ${shippingDetails.postalCode || ""}`, 10, yOffset);
    yOffset += 10;

    doc.text(`Country: ${shippingDetails.country || ""}`, 10, yOffset);
    yOffset += 20;

    doc.text("Products:", 10, yOffset);
    yOffset += 10;

    orderProducts.forEach((product, i) => {
      doc.text(
        `${i + 1}. ${product.name} - ${formatCurrency(product.price)} x ${
          product.quantity
        }`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    yOffset += 10;
    doc.text(`Total: ${formatCurrency(subtotal)}`, 10, yOffset);
    yOffset += 10;

    if (discountAmount > 0) {
      doc.text(
        `Coupon Discount (${couponCode}): ${formatCurrency(discountAmount)}`,
        10,
        yOffset
      );
      yOffset += 10;
    }

    doc.text(`Shipping Method: ${shippingMethod}`, 10, yOffset);
    yOffset += 10;

    doc.text(`Shipping Cost: ${formatCurrency(shippingCost)}`, 10, yOffset);
    yOffset += 10;

    doc.text(`Final Amount: ${formatCurrency(finalAmount)}`, 10, yOffset);

    doc.save(`invoice_${orderId}.pdf`);
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h2>INVOICE</h2>
        <p>Order ID: {orderId}</p>
        <p>Date: {date}</p>
      </div>

      <div className="customer-details">
        <p>
          <strong>Customer:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="invoice-body">
        <div className="customer-section">
          <h3>Shipping Details</h3>
          <p>
            <strong>Name:</strong> {shippingDetails.name}
          </p>
          <p>
            <strong>Address:</strong> {shippingDetails.address}
          </p>
          <p>
            <strong>City:</strong> {shippingDetails.city}
          </p>
          <p>
            <strong>Postal Code:</strong> {shippingDetails.postalCode}
          </p>
          <p>
            <strong>Country:</strong> {shippingDetails.country}
          </p>
        </div>

        <div className="order-section">
          <h3>Order Summary</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{formatCurrency(p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-total">
            <p>
              <strong>Total:</strong> {formatCurrency(subtotal)}
            </p>
            <p>
              <strong>Shipping Method:</strong> {shippingMethod}
            </p>
            <p>
              <strong>Shipping Cost:</strong> {formatCurrency(shippingCost)}
            </p>
            {discountAmount > 0 && (
              <p>
                <strong>Discount:</strong> {formatCurrency(discountAmount)}
              </p>
            )}
            <p>
              <strong>Final Amount:</strong> {formatCurrency(finalAmount)}
            </p>
          </div>

          <button onClick={generatePDF} className="download-btn">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;