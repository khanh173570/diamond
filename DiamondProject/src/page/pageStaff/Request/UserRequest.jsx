import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Row,Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { UserRequestDetails1 } from './UserRequestDetails';
import formattedDate from '../../../utils/formattedDate/formattedDate';

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [currentDetail, setCurrentDetail] = useState({});
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate(); // add useNavigate hook
  const [searchTerm,setSearchTerm] = useState('');


  const handleSearch = ()=>{

  }
  // List data
  const API = 'http://localhost:8080/evaluation-request/gett_all';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}`);
        const data = await response.json();
        setUserRequest(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isEdit,editStatus]);

  // Update data
  const handleOnChangeStatus = (requestId) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/evaluation-request/updateStatus/${requestId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: editStatus }),
        });
        const data = await response.json();
        setIsEdit(true);
        setEditRowId(null); // Reset edit mode
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };


  // Delete data
  const handleDeleteItem = async (requestId) => {
    try {
      await fetch(`http://localhost:8080/evaluation-request/${requestId}`, {
        method: 'DELETE',
      });
      setIsEdit(true);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const viewDetails = (userRequestDetail) => {
    setCurrentDetail(userRequestDetail);
    setIsViewDetail(true);
  };

  return (
    <Container>
           
      {!isViewDetail ? (
        <>
        
          <h2 className="text-center my-4">User Request</h2>
          <div className='justify-content-center' style={{ width: '80%', margin: '0 auto' }}>
        <Form className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search by ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
          <Table striped bordered className="fs-5">
            <thead style={{ backgroundColor: '#E2FBF5' }}>
              <tr>
                <th>Request ID</th>
                <th>Guest Name</th>
                <th>Send Date</th>
                <th>Status</th>
                <th>View Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userRequest.map((user) => (
                <tr key={user.requestId}>
                  <td>{user.requestId}</td>
                  <td>{user.guestName}</td>
                  <td>{formattedDate(user.requestDate)}</td>
                  <td className='d-flex'>
                    {editRowId === user.requestId ? (
                      <>
                        <Form.Select
                          aria-label="Requested"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="Requested">Requested</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Canceled">Canceled</option>
                        </Form.Select>
                        <Button onClick={() => handleOnChangeStatus(user.requestId)}>Save</Button>
                      </>
                    ) : (
                      <div className='d-flex justify-content-between'>
                        <div>{user.status}</div>
                        <img
                          src="/src/assets/assetsStaff/editStatus.svg"
                          alt="Edit"
                          height="20"
                          width="20"
                          onClick={() => {
                            setEditRowId(user.requestId);
                            setEditStatus(user.status);
                          }}
                        />
                      </div>
                    )}
                  </td>

                  <td>
                    <Button
                      onClick={() => viewDetails(user)}
                      className="btn text-dark"
                      style={{ backgroundColor: '#7CF4DE' }}
                    >
                      View Details
                    </Button>
                  </td>
                  <td className=''>
                  <Button variant="danger" size="sm">
                  <img
                      src='/src/assets/assetsStaff/delete.svg'
                      alt="Delete"
                      height="20"
                      width="20"
                      onClick={() => handleDeleteItem(user.requestId)}
                    />
                  </Button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        currentDetail && (
          <div>
            <img
              src="/src/assets/assetsStaff/back.svg"
              alt="go back"
              className="mt-3"
              height="40"
              width="40"
              onClick={() => setIsViewDetail(false)}
            />
            <UserRequestDetails1
              key={currentDetail.requestId}
              userRequestDetail={currentDetail}
              navigate={navigate} 
            />
          </div>
        )
      )}
    </Container>
  );
};
