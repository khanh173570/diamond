import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { UserRequestDetails1 } from './UserRequestDetails';

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [currentDetail, setCurrentDetail] = useState({});
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate(); // add useNavigate hook

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
  }, [isEdit]);

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
        console.log('Update response:', data);
        setIsEdit(true);
        setEditRowId(null); // Reset edit mode
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };

  // Delete data
  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/evaluation-request/${id}`, {
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
          <Table striped bordered className="fs-5">
            <thead style={{ backgroundColor: '#E2FBF5' }}>
              <tr>
                <th>Request ID</th>
                <th>UserId</th>
                <th>Date</th>
                <th>Status</th>
                <th>View Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userRequest.map((user) => (
                <tr key={user.requestId}>
                  <td>{user.requestId}</td>
                  <td>{user.userId.userId}</td>
                  <td>{user.requestDate}</td>
                  <td className='d-flex'>
                    {editRowId === user.requestId ? (
                      <>
                        <Form.Select
                          aria-label="Requested"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="request">Requested</option>
                          <option value="accepted">Accepted</option>
                          <option value="canceled">Canceled</option>
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
                    <img
                      src='/src/assets/assetsStaff/delete.svg'
                      alt="Delete"
                      height="20"
                      width="20"
                      onClick={() => handleDeleteItem(user.requestId)}
                    />
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
