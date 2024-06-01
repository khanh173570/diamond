import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { UserRequestDetails1 } from './UserRequestDetails';

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [currentStatus, setCurrentStatus] = useState({});
  const [currentDetail, setCurrentDetail] = useState({});
  const [isViewDetails, setIsViewDetail] = useState(false);
//------------------------------------------------------------------------------------------
  // List data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUserRequest(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

//------------------------------------------------------------------------------------
  // Handle status change
  const handleOnChangeStatus = (id, value) => {
    setCurrentStatus({ id, value });
  };

  // Submit status change to the server
  useEffect(() => {
    if (currentStatus) {
      const updateStatus = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({currentStatus})
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };

      updateStatus();
    }
  }, [currentStatus]);
//---------------------------------------------------------------------------------
  // View details of a specific user request
  const viewDetails = (userRequestDetail) => {
    setCurrentDetail(userRequestDetail);
    setIsViewDetail(true);
  };
//---------------------------------------------------------------------------------
  return (
    <div>
      {!isViewDetails ? (
        <>
          <h2 className='text-center my-4'>User Request</h2>
          <Table striped bordered className='fs-5'>
            <thead style={{ backgroundColor: '#E2FBF5' }}>
              <tr>
                <th>Request ID</th>
                <th>Username</th>
                <th>Date</th>
                <th>Status</th>
                <th>Delete</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {userRequest.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>13/07/2023</td>
                  <td>
                    <Form.Select
                      aria-label="Requested"
                      onChange={(e) => handleOnChangeStatus(user.id, e.target.value)}
                    >
                      <option value={user.id}>{user.id}</option>
                      <option value="accepted">Accepted</option>
                      <option value="canceled">Canceled</option>
                    </Form.Select>
                  </td>
                  <td>
                    <img src="src/assets/trash.svg" alt="Delete" />
                  </td>
                  <td>
                    <Button
                      onClick={() => viewDetails(user)}
                      className='btn text-dark'
                      style={{ backgroundColor: '#7CF4DE' }}
                    >
                      View Details
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
              src="/src/assets/back.svg"
              alt="go back"
              className='mt-3'
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
    </div>
  );
};
