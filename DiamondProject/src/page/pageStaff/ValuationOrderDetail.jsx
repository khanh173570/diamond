import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import formattedDate from "../../utils/formattedDate/formattedDate";

export const ValuationOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editColIsDiamond, setEditColIsDiamond] = useState(false);
  const [editColStatus, setEditColStatus] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editIsDiamond, setEditIsDiamond] = useState(true);
  const userId = JSON.parse(localStorage.getItem('consult_staff'));
  const navigate = useNavigate();
  // get orderdetails by userId
  // const API = 'http://localhost:8080/order_detail_request/orderDetail'; 
  const API = `https://fakestoreapi.com/carts/user`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/${userId.id}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId.id, editIsDiamond, editStatus]);

  // update by order detail id
  // const APIUpdate = 'http://localhost:8080/order_detail_request/getOrderDe'
  const APIUpdate = 'https://fakestoreapi.com/carts';

  const handleOnChangeStatus = (productId, field, value) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${APIUpdate}/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: value }),
        });
        const data = await response.json();
        console.log('Update response:', data);
        setEditRowId(null);
        setEditColIsDiamond(false);
        setEditColStatus(false);
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
    return <div className="text-center my-4"><Spinner animation="border" /></div>;
  }

  return (
    <Container>
      <div className="text-center my-4">
        <h1>Valuation's Staff Product</h1>
      </div>
      <Table>
        <thead>
          <tr className="text-center">
            <th>Product Id</th>
            <th>Image</th>
            <th>Service</th>
            <th>Expired Date</th>
            <th>Size</th>
            <th>Diamond</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((product) => (
            <tr key={product.id} className="text-center">
              <td>{product.id}</td>
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
              {/* <td>{product.serviceId.serviceType}</td> */}
              <td>{product.userId}</td>
              {/* receive - expired */}
              <td>{formattedDate(product.expiredReceivedDate)}</td>
              {/* size */}
              <td>{product.id}</td>
              {/* isDiamond */}
              <td>
                {editRowId === product.id && editColIsDiamond ? (
                  <>
                    <Form.Select
                      aria-label="Is Diamond"
                      name="isDiamond"
                      value={editIsDiamond}
                      onChange={(e) => setEditIsDiamond(e.target.value === 'true')}
                    >
                      <option value=""></option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Select>
                    <Button onClick={() => handleOnChangeStatus(product.id, 'isDiamond', editIsDiamond)}>Save</Button>
                  </>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="text-center">{product.isDiamond ? "Yes" : "No"}</div>
                    <img
                      src="/src/assets/assetsStaff/editStatus.svg"
                      alt="Edit"
                      height="20"
                      width="20"
                      onClick={() => {
                        setEditRowId(product.id);
                        setEditIsDiamond(product.isDiamond);
                        setEditColIsDiamond(true);
                        setEditColStatus(false);
                      }}
                    />
                  </div>
                )}
              </td>
              {/* status */}
              <td>
                {editRowId === product.id && editColStatus ? (
                  <>
                    <Form.Select
                      aria-label="Status"
                      value={editStatus}
                      name="status"
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Received">Received</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Finished">Finished</option>
                    </Form.Select>
                    <Button onClick={() => handleOnChangeStatus(product.id, 'status', editStatus)}>Save</Button>
                  </>
                ) : (
                  <div className="d-flex justify-content-between">
                    <div>{product.status}</div>
                    <img
                      src="/src/assets/assetsStaff/editStatus.svg"
                      alt="Edit"
                      height="20"
                      width="20"
                      onClick={() => {
                        setEditRowId(product.id);
                        setEditStatus(product.status);
                        setEditColStatus(true);
                        setEditColIsDiamond(false);
                      }}
                    />
                  </div>
                )}
              </td>
              {/*  disabled={!product.isDiamond} */}
              <td>
                <Button onClick={() => handleCreateForm(product)}>Create Form</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
