import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';

export const PersonalRequestDetail = () => {
  const { state } = useLocation();
  const navigate =  useNavigate();
  //get request by request
  const API = 'https://jsonplaceholder.typicode.com/users';
  const [isCancel, setIsCancel] = useState(false);
  // cancel request
  const handleOnCancel = async (id, value) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: value }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        setIsCancel(true);
      }
    } catch (error) {
      console.error('Error updating status:', error);
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
          onClick: () => handleOnCancel(state.request.id, 'Cancel')
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };
  useEffect(() => {
    if (isCancel) {
      navigate('/my-request')
    }
  }, [isCancel]);

  const closeToMyList = ()=>{
    navigate('/my-request')
  }
  // de o day
  const viewMyOrder = ()=>{
    // tutu r bo sung sau
    navigate('/my-order')
  }
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
            <div>13/08/2023</div>
          </Col>
          <Col md={3}>
            <div className='fw-bold'>Status</div>
            <div>Requesting</div>
          </Col>
          <Col md={3}>
            <div className='fw-bold'>Request ID</div>
            <div>{state.request.id}</div>
          </Col>
          <Col md={3}>
            <div className='fw-bold'>Order ID</div>
            <div>OR22102001</div>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <div className='fw-bold'>Customer</div>
            <div>{state.request.name}</div>
          </Col>
          <Col md={6}>
            <div className='fw-bold'>Phone</div>
            <div>{state.request.phone}</div>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <div className='fw-bold'>Description</div>
            <div>Please contact me at 3:00 pm, I need to discuss something about your service, and don't be late again! Thanks</div>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col className='d-flex justify-content-end'>
            <Button className='me-3' variant="danger" onClick={showCancelConfirmation} disabled={isCancel}>
               {/* {isCancel || request.status === 'Canceled'? 'Canceled' : 'Cancel Request'} */}
              {isCancel ? 'Canceled' : 'Cancel Request'}
            </Button>
            <Button className='me-3' onClick={()=>closeToMyList()}>Close</Button>
            <Button className='me-3' onClick={()=>viewMyOrder()}>View My Order</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
