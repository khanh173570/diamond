import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate/formattedDate";

export const ReceiptDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const API = 'http://localhost:8080/order_detail_request/orderDetail'; 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
   
  }, [orderId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // làm 1 hàm update chung nha
  // thêm hàm update status by order id neu nhu status order detail
  
  return (
    <div>
      <Container>
        <div>
          <img 
            src="/src/assets/assetsStaff/back.svg"
            alt=""
            onClick={()=>{
              navigate('/staff/view-receipt')
            }}

          />
        </div>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{orderDetails[0].orderId.requestId.requestId}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          <Col md={3}>{orderDetails[0].orderId.customerName}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          <Col md={3}>{orderDetails[0].orderId.phone}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Status:</Col>
          <Col md={3}>{orderDetails[0].orderId.status}</Col>
        </Row>
        <Table>
          <thead>
            <tr className="text-center">
              <th>Product Id</th>
              <th>Image</th>
              <th>Service</th>
              <th>Deadline</th>
              <th>Valuation Staff</th>
              <th>Size</th>
              <th>Diamond</th>
              <th>Status</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((product) => (
              <tr key={product.orderDetailId} className="text-center">
               <td>{product.orderDetailId}</td> 
                <td>
                  <img
                    src={product.img}
                    alt=""
                    height='80'
                    width='80'
                  />
                </td>
                {/* Service */}
                <td>{product.serviceId.serviceType}</td>
                {/* receive - expired */}
                <td>{formattedDate(product.receivedDate)}</td>
                {/* valuation staff */}
                <td>{product.evaluationStaffId}</td>
                {/* size */}
                <td>{product.size}</td>
                {/* isDiamond */}
                <td>{product.isDiamond ? 'Yes' : 'No'}</td>
                {/* status */}
                <td>
                  {product.status}
                </td>
                {/* unit price */}
                <td>{product.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};