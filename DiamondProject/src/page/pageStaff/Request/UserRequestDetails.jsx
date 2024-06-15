import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import formattedDate from '../../../utils/formattedDate/formattedDate';
import { useNavigate } from 'react-router-dom'; 

export const UserRequestDetails1 = ({ userRequestDetail }) => {
  const navigate = useNavigate(); 
  const [appointmentDate, setAppointmentDate] = useState(userRequestDetail.appointmentDate || '');
  const [isAppointmentDate, setIsAppointmentDate] = useState(false);

  const createOrder = (userRequestDetail) => {
    navigate('/staff/create-receipt', { state: { userRequestDetail } });
  };

  // API to add and update data by requestId
  const API = 'https://jsonplaceholder.typicode.com/posts';
  const handleAddDate = (value) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${API}/${userRequestDetail.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appointmentDate: formattedDate(value) }),
        });
        const data = await response.json();
        console.log('Update response:', data);
        setAppointmentDate(formattedDate(value));
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };
  return (
    <Container>
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
              {isAppointmentDate ? (
                <div>
                  <span className='me-3'>{appointmentDate}</span>
                  <img
                    src="/src/assets/assetsStaff/add.svg"
                    alt=""
                    onClick={() => {
                      setIsAppointmentDate(false)
                    }} />
                </div>
              ) : (
                <div>
                  <input type="date" className="form-control" onChange={(e) => setAppointmentDate(e.target.value)} />
                  <Button className="mt-2" onClick={() => handleAddDate(appointmentDate)}>Save</Button>
                </div>
              )}
            </Col>
          </Row>
          <div className='d-flex justify-content-end'>
            <Button onClick={() => createOrder(userRequestDetail)} disabled={userRequestDetail.status !=='Accepted'}>Create Order</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
