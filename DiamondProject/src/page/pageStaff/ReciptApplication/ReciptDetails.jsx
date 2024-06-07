import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export const ReceiptDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const API = 'https://jsonplaceholder.typicode.com/users'; // Replace with your actual API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleOnChangeStatus = (productId) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${API}/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: editStatus }),
        });

        const data = await response.json();
        console.log('Update response:', data);

        setEditRowId(null); // Reset edit mode
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };

  const handleCreateForm = (product) => {
    navigate('/staff/valuation', { state: { product } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{id}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          <Col md={3}>{orderDetails[0].name}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          <Col md={3}>{orderDetails[0].phone}</Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Service</th>
              <th>Time</th>
              <th>Valuation Staff</th>
              <th>Size</th>
              <th>Diamond</th>
              <th>Status</th>
              <th>Unit Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.name}</td>
                <td>{product.name}-{product.name}</td>
                <td>{product.name}</td>
                <td>{product.name}</td>
                <td>{product.isDiamond ? "Yes" : "No"}</td>
                <td>
                  {editRowId === product.id ? (
                    <>
                      <Form.Select
                        aria-label="Status"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="Received">Received</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Finished">Finished</option>
                      </Form.Select>
                      <Button onClick={() => handleOnChangeStatus(product.id)}>Save</Button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <div>{product.username}</div>
                      <img
                        src="/src/assets/assetsStaff/editStatus.svg"
                        alt="Edit"
                        height="20"
                        width="20"
                        onClick={() => {
                          setEditRowId(product.id);
                          setEditStatus(product.status);
                        }}
                      />
                    </div>
                  )}
                </td>
                <td>{product.name}</td>
                <td>
                  {/* disabled={!product.isDiamond} */}
                  <Button onClick={() => handleCreateForm(product)} >Create Form</Button>
                </td>
              </tr>
              
            ))}
            <tr>
              <td colSpan={7} className="fw-bold">Total Price</td>
              <td colSpan={3}>{orderDetails[0].phone}</td>
            </tr>
            
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
