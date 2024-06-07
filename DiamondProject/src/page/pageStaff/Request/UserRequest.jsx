import React, { useEffect, useState } from 'react';
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
  const [isEdit, setIsEdit] = useState(false)

  // List data
  const API = 'https://jsonplaceholder.typicode.com/posts';
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
  const handleOnChangeStatus = (id) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${API}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: editStatus }),
        });

        const data = await response.json();
        console.log('Update response:', data);
        // setUserRequest((currentState) =>
        //   currentState.map((user) =>
        //     user.id === data.id ? { ...user, status: data.status } : user
        //   )
        // );
        setIsEdit(true)
        setEditRowId(null);  // Reset edit mode
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };

  // Delete data
  const handleDeleteItem = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });
      setIsEdit(true)
      // setUserRequest((prevState) => prevState.filter((user) => user.id !== id));
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
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userId}</td>
                  <td>{user.requestDate}</td>
                  <td className='d-flex'>
                    {editRowId === user.id ? (
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
                        <Button onClick={() => handleOnChangeStatus(user.id)}>Save</Button>
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
                            setEditRowId(user.id);
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
                      onClick={() => handleDeleteItem(user.id)}
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
              key={currentDetail.id}
              userRequestDetail={currentDetail}
            />
          </div>
        )
      )}
    </Container>
  );
};
