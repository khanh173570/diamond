import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate/formattedDate";

export const ReceiptDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // const API = 'http://localhost:8080/order_detail_request/orderDetail'; 
  const API = 'https://fakestoreapi.com/carts/user';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/${id}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    //  [orderId]
  }, [id]);


  // const handleCreateForm = (product) => {
  //   navigate('/staff/valuation', { state: { product } });
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Container>
        <div>
          <img 
            src="/src/assets/assetsStaff/back.svg"
            alt=""

          />
        </div>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          {/* <Col md={3}>{orderDetails[0].orderId.requestId.requestId}</Col> */}
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          {/* <Col md={3}>{orderDetails[0].orderId.customerName}</Col> */}
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          {/* <Col md={3}>{orderDetails[0].phone}</Col> */}
        </Row>
        <Row className="mb-4">
          <Col md={2}>Status:</Col>
          {/* <Col md={3}>{orderDetails[0].status}</Col> */}
        </Row>
        <Table>
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>Service</th>
              <th>Experied Date</th>
              <th>Valuation Staff</th>
              <th>Size</th>
              <th>Diamond</th>
              <th>Status</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((product) => (
              <tr key={product.id} className="text-center">
                {/* img */}
                <td>
                  <img
                    src={product.img}
                    alt=""
                    height='80'
                    width='80'
                  />
                </td>
                {/* Service */}
                <td>{product.id}</td>
                {/* receive - expired */}
                <td>{formattedDate(product.date)}</td>
                {/* valuation staff */}
                <td>{product.id}</td>
                {/* size */}
                <td>{product.id}</td>
                {/* isDiamond */}
                <td>{product.userId}</td>
                {/* status */}
                <td>
                  {product.userId}
                </td>
                {/* unit price */}
                <td>{product.id}</td>
                {/* <td>
                  <Button onClick={() => handleCreateForm(product)} disabled={!product.isDiamond}>Create Certificate</Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};