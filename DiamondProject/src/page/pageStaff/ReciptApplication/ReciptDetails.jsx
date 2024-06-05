import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const ReceiptDetails = () => {

  const { state } = useLocation();
  const result = state.item;

  if (!result) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <Container>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="ms-3 fs-5">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{result.company.name}</Col>
        </Row>
        <div className="mb-4">
          <Row className="ms-3 fs-5">
            <Col md={2}>Customer Name:</Col>
            <Col md={2}>{result.name}</Col>
          </Row>
          <Row className="ms-3 fs-5">
            <Col md={2}>Phone:</Col>
            <Col md={2}>{result.phone}</Col>
          </Row>
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Service</th>
                <th>Received date</th>
                <th>Expired date</th>
                <th>Valuation Staff</th>
                <th>Size</th>
                <th>CheckDiamond</th>
                <th>Status</th>
                <th>UnitPrice</th>
              </tr>
            </thead>
            <tbody>
              {/* Assuming you have detailed order items */}
              {result.orderDetailId &&
                result.orderDetailId.map((product) => (
                  <tr key={product.orderDetailId}>
                    <td>{product.orderDetailId}</td>
                    <td>{product.img}</td>
                    <td>{product.serviceId}</td>
                    <td>{product.receivedDate}</td>
                    <td>{product.expiredReceivedDate}</td>
                    <td>{product.evaluationStaffId}</td>
                    <td>{product.size}</td>
                    <td>{product.isDiamond}</td>
                    <td>{product.status}</td>
                    <td>{product.unitPrice}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};
