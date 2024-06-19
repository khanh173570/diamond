import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import formattedDateTime from "../../../utils/formattedDate/formattedDateTime";
import updateById from "../../../utils/updateAPI/updateById";
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Status } from "../../../component/Status";
const API_BASE_URL = 'http://localhost:8080';
export const ReceiptDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [allFinished, setAllFinished] = useState(false);
  const [isFinishedOrder, setIsFinishedOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
        setIsLoading(true)
        const finishedOrders = data.filter(orderDetail => orderDetail.status === 'Finished');
        if (finishedOrders.length === data.length) {
          setAllFinished(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  //tự cập nhật trạng thái khi tất cả đều thành công
  useEffect(() => {
    if (allFinished && (orderDetails[0]?.orderId?.status !== 'Finished' && orderDetails[0]?.orderId?.status !== 'Sealed') ) {
      updateById(`${API_BASE_URL}/order_request/updateStatus`, orderId, 'status', 'Completed');
    }
  }, [allFinished, orderId, orderDetails]);


  if (isLoading) {
    return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
  }

  //show confirm finished
  const showConfirmFinished = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to Finish',
      message: 'Click ok to finish the order',
      buttons: [
        {
          label: 'Ok',
          onClick: () => updateFinishedOrder()
        },
        {
          label: 'Cancel',
          onClick: () => { }
        }
      ]
    });
  };

  const showConfirmedSealed = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to Seal',
      message: 'Click ok to seal the order',
      buttons: [
        {
          label: 'Ok',
          onClick: () => updateSealedOrder()
        },
        {
          label: 'Cancel',
          onClick: () => { }
        }
      ]
    });
  };

  const updateSealedOrder = async () => {
    try {
      await updateById(`${API_BASE_URL}/order_request/updateStatus`, orderId, 'status', 'Sealed');
      toast.success('Sealed');
      setIsLoading(true)
    } catch {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
      
    }finally{
      setIsLoading(false)
    }
  }
  const viewCertificate = (orderDetailId) => {

    navigate(`/staff/view-certificate/${orderDetailId}`)
  }
  const updateFinishedOrder = async () => {
    try {
      await updateById(`${API_BASE_URL}/order_request/updateStatus`, orderId, 'status', 'Finished');
      setIsFinishedOrder(true);
      setIsLoading(true)
      toast.success('Finished');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      <ToastContainer />
      <Container>
        <div>
          <img
            src="/src/assets/assetsStaff/back.svg"
            alt=""
            onClick={() => {
              navigate('/staff/view-receipt')
            }}
          />
        </div>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{orderDetails[0]?.orderId?.requestId?.requestId}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          <Col md={3}>{orderDetails[0]?.orderId?.customerName}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          <Col md={3}>{orderDetails[0]?.orderId?.phone}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Status:</Col>
          <Col md={3}>
            <Status status={orderDetails[0]?.orderId?.status} />
          </Col>
        </Row>
        <Table>
          <thead>
            <tr className="text-center">
              <th>Sample Valuation Id</th>
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
                <td>{product.serviceId.serviceType}</td>
                <td>{formattedDateTime(product.receivedDate)}</td>
                <td>{product.evaluationStaffId}</td>
                <td>{product.size}</td>
                <td>{product.isDiamond ? 'Yes' : 'No'}</td>
                <td><Status status={product.status} /></td>
                <td>{product.unitPrice}</td>
                <td >
                  <Button onClick={() => viewCertificate(product.orderDetailId)} disabled={product.status !== 'Finished'}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end my-4">
          <Button style={{margin:"0px 13px"}} onClick={showConfirmFinished}>
            {!isFinishedOrder ? 'Finished' : 'Finish Order'}
          </Button>
          <Button style={{margin:"0px 13px"}} onClick={showConfirmedSealed}>
            {!isFinishedOrder ? 'Sealed' : 'Seal Order'}
          </Button>
        </div>
      </Container>
    </div>
  );
};
