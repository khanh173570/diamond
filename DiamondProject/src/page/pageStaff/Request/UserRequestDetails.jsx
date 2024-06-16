import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import formattedDate from '../../../utils/formattedDate/formattedDate';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserRequestDetails1 = ({ userRequestDetail }) => {
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState(userRequestDetail.meetingDate || '');
  const [isEditingDate, setIsEditingDate] = useState(false);


  const createOrder = (userRequestDetail) => {
    navigate('/staff/create-receipt', { state: { userRequestDetail } });
  };

  const API = 'http://localhost:8080/evaluation-request/update';

  const handleAddDate = async (value) => {
    if (!value) {
      return;
    }
    try {
      const response = await fetch(`${API}/${userRequestDetail.requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingDate: value }),
      });
      const data = await response.json();
      if (data) {
        toast.success('Update meeting date successful');
        setAppointmentDate(value);
        setIsEditingDate(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className='my-4 text-center'>Detailed Information</h2>
      <div className='d-flex justify-content-center'>
        <div className='w-50 p-4 shadow' style={{ backgroundColor: '#f8f9fa' }}>
          <Row className='mb-3'>
            <Col md={5} className='text-end'><strong>Full Name:</strong></Col>
            <Col md={7} className='text-start'>{userRequestDetail.guestName}</Col>
          </Row>
          <Row className='mb-3'>
            <Col md={5} className='text-end'><strong>Email:</strong></Col>
            <Col md={7} className='text-start'>{userRequestDetail.requestEmail}</Col>
          </Row>
          <Row className='mb-3'>
            <Col md={5} className='text-end'><strong>Phone:</strong></Col>
            <Col md={7} className='text-start'>{userRequestDetail.phoneNumber}</Col>
          </Row>
          <Row className='mb-3'>
            <Col md={5} className='text-end'><strong>Service:</strong></Col>
            <Col md={7} className='text-start'>{userRequestDetail.service}</Col>
          </Row>
          <Row className='mb-3'>
            <Col md={5} className='text-end'><strong>Description:</strong></Col>
            <Col md={7} className='text-start'>{userRequestDetail.requestDescription}</Col>
          </Row>
          <Row className='mb-3'>
            <Col md={5} className='text-end'><strong>Meeting Date:</strong></Col>
            <Col md={7} className='text-start'>
              {isEditingDate ? (
                <div>
                  <input
                    type="date"
                    className="form-control"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                  <Button className="mt-2" onClick={() => handleAddDate(appointmentDate)}>Save</Button>
                </div>
              ) : (
                <div>
                  <span className='me-3'>{appointmentDate ? formattedDate(appointmentDate) : 'Not set'}</span>
                  <img
                    src="/src/assets/assetsStaff/add.svg"
                    alt="Edit Date"
                    onClick={() => setIsEditingDate(true)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </Col>
          </Row>
          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => createOrder(userRequestDetail)}
              disabled={userRequestDetail.status !== 'Accepted'}
            >
              Create Order
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
