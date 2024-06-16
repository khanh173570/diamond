import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useReactToPrint } from "react-to-print";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useLocation } from "react-router-dom";

export const CreateReceipt = () => {
  const [selection, setSelection] = useState([]);
  const [custName, setCustName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reviewMode, setReviewMode] = useState(false);
  const [orderDate, setOrderDate] = useState(""); // Initialize with empty string
  const [sampleSizeInput, setSampleSizeInput] = useState(""); // State to hold sampleSize input value
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const {userRequestDetail}  = location.state
  const componentRef = useRef();

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

  useEffect(() => {
    // Function to initialize orderDate with current date and time
    const initializeOrderDate = () => {
      const now = new Date();
      const formattedDate = formatDate(now);
      setOrderDate(formattedDate);
    };

    initializeOrderDate(); // Call the initialization function
  }, []);

  const formatDate = (dateTime) => {
    const padZero = (num) => (num < 10 ? `0${num}` : num);
    const month = padZero(dateTime.getMonth() + 1);
    const day = padZero(dateTime.getDate());
    const year = dateTime.getFullYear();
    const hours = padZero(dateTime.getHours());
    const minutes = padZero(dateTime.getMinutes());

    return `${month}/${day}/${year}, ${hours}:${minutes}`;
  };

  const handleRowChange = (index, field, value) => {
    // Remove leading zeros and ensure only numeric input
    const numericValue = value.replace(/^0+(?=\d)|[^.\d]/g, '');

    // Validate sample size
    if (field === "size") {
      if (!/^\d*\.?\d*$/.test(numericValue)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [index]: "Sample size must be a valid number."
        }));
      } else if (parseFloat(numericValue) <= 2) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [index]: "Sample size must be greater than 2."
        }));
      } else {
        setErrors(prevErrors => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[index]; // Clear error if sample size is valid
          return updatedErrors;
        });
      }
    }

    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: numericValue } : row
    );
    setRows(updatedRows);

    // Log sampleSize change
    console.log(`Sample size updated at index ${index}: ${numericValue}`);

    // Set unit price to 0 if serviceId or size is not set
    if (!rows[index].serviceId || !rows[index].size) {
      updatedRows[index].unitPrice = 0;
      setRows(updatedRows);
    }
  };

  const handleServiceChange = async (index, serviceId) => {
    const selectedService = selection.find(
      (service) => service.serviceId === serviceId
    );
    if (!selectedService) return;

    try {
      const size = rows[index].size || sampleSizeInput;
      console.log(
        `Sending request for serviceId ${serviceId} with size ${size}`
      );

      // Fetch price service
      const unitPrice = await fetchUnitPrice(serviceId, size || 0);

      const orderDateTime = new Date(orderDate);
      const hoursRegex = /(\d+)\s*hour/i;
      const match = selectedService.serviceType.match(hoursRegex);
      let hoursToAdd = 0;
      if (match) {
        hoursToAdd = parseInt(match[1], 10);
      }

      // Calculate received and expired received dates
      const receivedDateTime = new Date(
        orderDateTime.getTime() + hoursToAdd * 3600000
      );
      const expiredReceivedDateTime = new Date(
        receivedDateTime.getTime() + 30 * 24 * 3600000
      );

      const formattedReceivedDate = formatDate(receivedDateTime);
      const formattedExpiredReceivedDate = formatDate(expiredReceivedDateTime);

      // Update rows state with new data
      const newRows = rows.map((row, rowIndex) => {
        if (rowIndex === index) {
          return {
            ...row,
            serviceId: selectedService.serviceId,
            unitPrice: unitPrice || 0, // Set unitPrice to 0 if unitPrice is not fetched
            receivedDate: formattedReceivedDate,
            expiredReceivedDate: formattedExpiredReceivedDate,
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
      const response = await fetch(
        `http://localhost:8080/service_price_list/calculate?serviceId=${serviceId}&size=${size}`
      );
      const data = await response.json();
      console.log(
        `Fetching price for serviceId ${serviceId} with size ${size}:`,
        data
      );
      return data;
    } catch (error) {
      console.error("Error fetching unitPrice:", error);
      return null;
    }
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 0;
    setQuantity(e.target.value);
    const newRows = Array.from({ length: qty }, () => ({
      serviceId: "",
      receivedDate: "",
      expiredReceivedDate: "",
      size: 0,
      unitPrice: 0.0,
    }));
    setRows(newRows);
  };

  const totalPrice = rows.reduce(
    (total, row) => total + parseFloat(row.unitPrice || 0),
    0
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Check for errors in sample size validation
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return; // Prevent form submission if there are errors
    }

    const dataToSend = {
      userId: "customer10",
      customerName: userRequestDetail.guestName,
      requestId: userRequestDetail.requestId,
      phone: userRequestDetail.phoneNumber,
      diamondQuantity: parseInt(quantity),
      orderDate: orderDate, // Use formatted orderDate
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

      Toastify({
        text: "Successfully",
        duration: 3000, // Duration the notification will be shown
        gravity: "top", // Position of the notification
        position: "right", // Position of the notification
        backgroundColor: "green",
      }).showToast();
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
                <p>Order Date: {orderDate}</p>
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
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={row.size}
                          onChange={(e) =>
                            handleRowChange(index, "size", e.target.value)
                          }
                        />
                        {errors[index] && (
                          <div className="text-danger">{errors[index]}</div>
                        )}
                      </td>
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
=======
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
              <p>Order Date: {orderDate}</p>
>>>>>>> FE_ANHMINH
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
              {userRequestDetail.guestName}
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Phone</label>
              </div>
              <div className="col-7">
                {userRequestDetail.phoneNumber}
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
               {userRequestDetail.requestId}
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-3" style={{ width: "15%" }}>
                <label className="form-label fw-bold">Order Date</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  value={orderDate}
                  readOnly // Make the orderDate field readOnly in the form
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
                        type="text"
                        className="form-control"
                        value={row.receivedDate}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.expiredReceivedDate}
                        readOnly
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
                      {errors[index] && (
                        <div className="text-danger">{errors[index]}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.unitPrice}
                        readOnly
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
