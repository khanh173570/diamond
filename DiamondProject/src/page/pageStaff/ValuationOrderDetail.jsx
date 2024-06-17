import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formattedDate from "../../utils/formattedDate/formattedDate";
import useAuth from "../../utils/hook/useAuth";

export const ValuationOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAuth()
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/order_detail_request/getOrderDetailByEvaluationStaffId/${user.userId}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleCreateForm = (product) => {
    navigate('/valuation-staff/valuation', { state: { product } });
  };

  if (isLoading) {
    return <div className="text-center my-4"><Spinner animation="border" /></div>;
  }


  return (
    <Container>
      <ToastContainer />
      <div className="text-center my-4">
        <h1>Valuation's Staff Product</h1>
      </div>
      <Table>
        <thead>
          <tr className="text-center">
            <th>Product Id</th>
            <th>Image</th>
            <th>Service</th>
            <th>Dealine</th>
            <th>Size</th>
            <th>Diamond</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((product) => (
            <tr key={product.orderDetailId} className="text-center">
              <td>{product.orderDetailId}</td>
              <td>
                <div>
                  {product.img ? (
                    <div>
                      <img src={product.img} alt="clarity-characteristics-upload" height='80' width='80' className='border border-dark' />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="upload-img">
                        <img
                          src="/src/assets/assetsStaff/upload.svg"
                          alt="Upload Icon"
                          height='40px'
                          width='40px'
                        />
                      </label>
                    </div>
                  )}
                </div>
              </td>
              <td>{product.serviceId.serviceType}</td>
              <td>{formattedDate(product.receivedDate)}</td>
              <td>{product.size}</td>
              <td>
                <div className="text-center">{product.isDiamond ? "Yes" : "No"}</div>
              </td>
              <td>
                <div>{product.status}</div>
              </td>
              <td>
                <Button onClick={() => handleCreateForm(product)} disabled={!product.isDiamond}>Create Certificate</Button>
              </td>
              <td>
                <img
                  src="/src/assets/assetsStaff/editStatus.svg"
                  alt="Upload Icon"
                  height='20'
                  width='20'
                  onClick={() => {
                    navigate(`/valuation-staff/valuation-order/${product.orderDetailId}`, { state: { product } })
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
