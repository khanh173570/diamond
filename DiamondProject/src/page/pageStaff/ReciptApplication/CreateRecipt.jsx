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
        const [reviewMode, setReviewMode] = useState(false);
        const [orderDate, setOrderDate] = useState("");
        const componentRef = useRef();
        const currentDate = new Date().toLocaleDateString();

<<<<<<< HEAD
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(
                "http://localhost:8080/service/getServices"
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
          serviceId: "",
          receivedDate: new Date().toISOString().split("T")[0],
          expiredReceivedDate: new Date().toISOString().split("T")[0],
          size: 0,
          unitPrice: 0.0,
        }));

        const [rows, setRows] = useState(initialRows);

        const handleRowChange = (index, field, value) => {
          const updatedRows = rows.map((row, rowIndex) =>
            rowIndex === index ? { ...row, [field]: value } : row
          );
          setRows(updatedRows);
        };
        const handleServiceChange = (index, serviceId) => {
          const updatedRows = rows.map((row, rowIndex) =>
            rowIndex === index ? { ...row, serviceId } : row
          );
          setRows(updatedRows);
        };

        const handleQuantityChange = (e) => {
          const qty = parseInt(e.target.value) || 0;
          setQuantity(e.target.value);
          const newRows = Array.from({ length: qty }, (_, i) => ({
            serviceId: selection[i]?.serviceId || "",
            receivedDate: new Date().toISOString().split("T")[0],
            expiredReceivedDate: new Date().toISOString().split("T")[0],
            size: 0,
            unitPrice: 0.0,
          }));
          setRows(newRows);
        };

        const totalPrice = rows.reduce(
          (total, row) => total + parseFloat(row.unitPrice || 0),
          0
=======
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/service/getServices"
>>>>>>> 817d3dda10ef34d9e31b8f5505ee74a0483e1f26
        );

        const handleOnSubmit = async (e) => {
          e.preventDefault();

          const formattedOrderDate = new Date(orderDate).toISOString();

          const dataToSend = {
            userId: "customer10",
            customerName: custName,
            requestId: request,
            phone: phone,
            diamondQuantity: parseInt(quantity),
            orderDate: formattedOrderDate,
            totalPrice: parseFloat(totalPrice),
            orderDetails: rows,
          };

          console.log("Data to send:", dataToSend);

<<<<<<< HEAD
          try {
            const response = await fetch(
              "http://localhost:8080/order_request/create",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
              }
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
=======

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
    return dateTime.toLocaleString("en-US", options);
  };
  

  const handleServiceChange = async (index, serviceId) => {
    const selectedService = selection.find((service) => service.serviceId === serviceId);
    if (!selectedService) return;
  
    try {
      const unitPrice = await fetchUnitPrice(serviceId, rows[index].size);
  
      const orderDateTime = new Date(orderDate); // Ngày đặt hàng
      const hoursRegex = /(\d+)h/; // Biểu thức chính quy để tìm số giờ từ loại dịch vụ
      const match = selectedService.serviceType.match(hoursRegex); // Tìm số giờ từ chuỗi loại dịch vụ
      const hours = match ? parseInt(match[1], 10) : 0; // Số giờ từ loại dịch vụ (nếu có)
      const receivedDateTime = new Date(orderDateTime.getTime() + hours * 3600000); // Tính "Receive Date" bằng cách cộng số giờ từ loại dịch vụ vào ngày đặt hàng
      const expiredReceivedDateTime = new Date(receivedDateTime.getTime() + 30 * 24 * 3600000); // Tính "Expire Date" bằng cách cộng 30 ngày vào "Receive Date"
  
      const formattedReceivedDate = formatDateTime(receivedDateTime.toISOString()); // Định dạng receivedDate
      const formattedExpiredReceivedDate = formatDateTime(expiredReceivedDateTime.toISOString()); // Định dạng expiredReceivedDate
  
      const newRows = rows.map((row, rowIndex) => {
        if (rowIndex === index) {
          return {
            ...row,
            unitPrice: unitPrice,
            receivedDate: formattedReceivedDate, // Sử dụng ngày tháng giờ đã được định dạng
            expiredReceivedDate: formattedExpiredReceivedDate, // Sử dụng ngày tháng giờ đã được định dạng
          };
        }
        return row;
      });
  
      setRows(newRows);
    } catch (error) {
      console.error("Error handling service change:", error);
    }
  };
  
  
  const fetchUnitPrice = async (serviceId, size) => {
    try {
      const response = await fetch(`YOUR_API_URL?serviceId=${serviceId}&size=${size}`);
      const data = await response.json();
      return data.unitPrice;
    } catch (error) {
      console.error("Error fetching unitPrice:", error);
      return null;
    }
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
>>>>>>> 817d3dda10ef34d9e31b8f5505ee74a0483e1f26

            const result = await response.json();
            console.log("Data successfully saved:", result);
          } catch (error) {
            console.error("Error saving data:", error);
          }
        };

        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
        });

<<<<<<< HEAD
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
                            <td>{row.serviceId}</td>
                            <td>{row.receivedDate}</td>
                            <td>{row.expiredReceivedDate}</td>
                            <td>{row.size}</td>
                            <td>{row.unitPrice}</td>
                          </tr>
=======
    const formattedOrderDate = new Date(orderDate).toISOString();

    const dataToSend = {
      userId: "customer10",
      customerName: custName,
      requestId: request,
      phone: phone,
      diamondQuantity: parseInt(quantity),
      orderDate: formattedOrderDate,
      totalPrice: parseFloat(totalPrice),
      orderDetails: rows,
    };

    console.log("Data to send:", dataToSend);

    try {
      const response = await fetch(
        "http://localhost:8080/order_request/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data successfully saved:", result);
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
                <p>Order Date: {new Date(orderDate).toLocaleString()}</p>
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
                      <td>{row.serviceId}</td>
                      <td>{row.receivedDate}</td>
                      <td>{row.expiredReceivedDate}</td>
                      <td>{row.size}</td>
                      <td>{row.unitPrice}</td>
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
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Order Date</label>
              </div>
              <div className="col-7">
                <input
                  type="datetime-local"
                  className="form-control"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
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
                        value={row.serviceId}
                        onChange={(e) =>
                          handleServiceChange(index, e.target.value)
                        }
                      >
                        <option value="">Select Service</option>
                        {selection.map((service) => (
                          <option
                            key={service.serviceId}
                            value={service.serviceId}
                          >
                            {service.serviceType}
                          </option>
>>>>>>> 817d3dda10ef34d9e31b8f5505ee74a0483e1f26
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
                  <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-3" style={{ width: "15%" }}>
                      <label className="form-label fw-bold">Order Date</label>
                    </div>
                    <div className="col-7">
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
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
                              value={row.serviceId}
                              onChange={(e) =>
                                handleServiceChange(index, e.target.value)
                              }
                            >
                              <option value="">Select Service</option>
                              {selection.map((service) => (
                                <option
                                  key={service.serviceId}
                                  value={service.serviceId}
                                >
                                  {service.serviceType}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={row.receivedDate}
                              onChange={(e) =>
                                handleRowChange(index, "receivedDate", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={row.expiredReceivedDate}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "expiredReceivedDate",
                                  e.target.value
                                )
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
                              value={row.unitPrice}
                              onChange={(e) =>
                                handleRowChange(index, "unitPrice", e.target.value)
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
