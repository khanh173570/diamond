import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useReactToPrint } from "react-to-print";
import "../ReciptApplication/print.css"; // Import CSS for printing

export const CreateReceipt = () => {
  const [selection, setSelection] = useState([]);
  const [custName, setCustName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [reviewMode, setReviewMode] = useState(false);
  const componentRef = useRef();

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setSelection(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const initialRows = Array.from({ length: parseInt(quantity) || 0 }, () => ({
    service: "khanhtran", // String
    receivedDate: new Date(), // Date
    expiredDate: new Date(), // Date
    size: 10, // Int
    price: 7.0, // Float
  }));

  const [rows, setRows] = useState(initialRows);

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleServiceChange = (index, value) => {
    const selectedService = selection.find(
      (service) => service.username === value
    );
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, service: value } : row
    );
    setRows(updatedRows);
    setSelectedServiceId(selectedService.id);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 0;
    setQuantity(e.target.value);
    const newRows = Array.from(
      { length: qty },
      (v, i) =>
        rows[i] || {
          service: "", // String
          receivedDate: new Date(), // Date
          expiredDate: new Date(), // Date
          size: 3, // Int
          price: 1.0, // Float
        }
    );
    setRows(newRows);
  };

  const totalPrice = rows.reduce(
    (total, row) => total + parseFloat(row.price || 0),
    0
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      customerName: custName,
      request: request,
      phone: phone,
      quantity: parseInt(quantity),
      date: new Date(), // Không cần chuyển đổi sang chuỗi, sử dụng ngày hiện tại
      totalprice: parseFloat(totalPrice),
      items: rows,
    };

    console.log("Data to send:", dataToSend);

    try {
      const response = await fetch("SAVE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data successfully saved:", result);
      // Optionally, you can add more logic here, such as showing a success message or clearing the form
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {reviewMode ? (
        <div>
          <h2 className="d-flex justify-content-center">Review</h2>
          <div ref={componentRef} className="print-container">
            <div className="d-flex justify-content-center">
              <div className="flex-column" style={{ width: "50%" }}>
                <p>Customer Name: {custName}</p>
                <p>Phone: {phone}</p>
                <p>Quantity: {quantity}</p>
                <p>Date: {currentDate}</p>
              </div>
            </div>
            <div className="print-content">
              <Table striped bordered className="fs-5 print-table">
                <thead className="text-center">
                  <tr>
                    <th>Type Service</th>
                    <th>Received Date</th>
                    <th>Expired Date</th>
                    <th>Sample Size</th>
                    <th>Service Price</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.service}</td>
                      <td>{row.receivedDate.toLocaleDateString()}</td> {/* Chỉnh sửa ở đây */}
                      <td>{row.expiredDate.toLocaleDateString()}</td> {/* Chỉnh sửa ở đây */}
                      <td>{row.size}</td>
                      <td>{row.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4" className="text-end">
                      <strong>Total Price</strong>
                    </td>
                    <td>{totalPrice}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="d-flex justify-content-end" style={{ width: "90%" }}>
            <Button onClick={handlePrint}>Print</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <div className="row mb-5">
            <h2 className="p-2 text-center">Order</h2>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Customer Name</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Phone</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Quantity</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Request ID</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <Table striped bordered className="fs-5" style={{ width: "80%" }}>
              <thead className="text-center">
                <tr>
                  <th>Type Service</th>
                  <th>Received Date</th>
                  <th>Expired Date</th>
                  <th>Sample Size</th>
                  <th>Service Price</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="form-control"
                        value={row.service}
                        onChange={(e) =>
                          handleServiceChange(index, e.target.value)
                        }
                      >
                        <option value="">Select Service</option>
                        {selection.map((service) => (
                          <option key={service.id} value={service.username}>
                            {service.username}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date" //{/* Chỉnh sửa ở đây */}
                        className="form-control"
                        value={row.receivedDate}
                        onChange={(e) =>
                          handleRowChange(index, "receivedDate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date" //{/* Chỉnh sửa ở đây */}
                        className="form-control"
                        value={row.expiredDate}
                        onChange={(e) =>
                          handleRowChange(index, "expiredDate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.size}
                        onChange={(e) =>
                          handleRowChange(index, "size", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.price}
                        onChange={(e) =>
                          handleRowChange(index, "price", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Total Price</strong>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={totalPrice}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-end" style={{ width: "90%" }}>
            <Button className="btn btn-success me-4" type="submit">
              Accept
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => setReviewMode(true)}
            >
              Review
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateReceipt;
