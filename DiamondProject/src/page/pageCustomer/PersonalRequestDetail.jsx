import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import formattedDate from '../../utils/formattedDate/formattedDate';
import { Status } from '../../component/Status';

export const PersonalRequestDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isCancel, setIsCancel] = useState(false);
  const [requestDetail, setRequestDetail] = useState({});
  const [order, setOrder] = useState([]);
  const [isOrder, setIsOrder] = useState(false);

  // API to fetch request by request id  
  const API = `http://localhost:8080/evaluation-request`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/${requestId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch request details');
        }
        const data = await response.json();
        setRequestDetail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [requestId, isCancel]); 

  // Get order by request id
  const APIOrderById = `http://localhost:8080/order_request/getOrderByRequestId`;
  
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`${APIOrderById}/${requestId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        if (data) {
          setOrder(data);
          setIsOrder(true);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchOrderData();
  }, [requestId]);

  // Update request by requestID
  const APIUpdate = 'http://localhost:8080/evaluation-request/update';
  
  const handleOnCancel = async (value) => {
    try {
      const response = await fetch(`${APIUpdate}/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: value }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsCancel(true);
        // setRequestDetail(prev => ({ ...prev, status: 'Canceled' }));
        toast.success('Request has been canceled successfully.');
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status. Please try again.');
      setIsCancel(false);
    }
  };

  const showCancelConfirmation = () => {
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure you want to cancel this request?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleOnCancel('Canceled')
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const closeToMyList = () => {
    navigate('/my-request');
  };

  const viewMyOrder = () => {
    navigate('/my-order');
  };

  return (
    <div>
      <ToastContainer />
      <Container className='w-50 border border-dark rounded p-4 my-5'>
        <Row className='mb-3'>
          <Col>
            <h4>Request Receipt</h4>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={3}>
            <div className='fw-bold'>Meeting Date</div>
            <div>{formattedDate(requestDetail.meetingDate)}</div>
          </Col>
          <Col md={3}>
            <div className='fw-bold'>Status</div>
            <Status status={requestDetail.status} />
          </Col>
          <Col md={3}>
            <div className='fw-bold'>Request ID</div>
            <div>{state.request.requestId}</div>
          </Col>
          <Col md={3}>
            <div className='fw-bold'>Order ID</div>
            {isOrder && order.length > 0 && <div>{order[0].orderId}</div>}
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <div className='fw-bold'>Customer</div>
            <div>{state.request.guestName}</div>
          </Col>
          <Col md={6}>
            <div className='fw-bold'>Phone</div>
            <div>{state.request.phoneNumber}</div>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <div className='fw-bold'>Description</div>
            <div>{state.request.requestDescription}</div>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col className='d-flex justify-content-end'>
            <Button className='me-3' variant="danger" onClick={showCancelConfirmation} disabled={requestDetail.status === 'Canceled'}>
              {requestDetail.status === 'Canceled' ? 'Canceled' : 'Cancel Request'}
            </Button>
            <Button className='me-3' onClick={closeToMyList}>Close</Button>
            {/* <Button className='me-3' onClick={viewMyOrder} disabled={requestDetail.status === 'Canceled'}>View My Order</Button> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
