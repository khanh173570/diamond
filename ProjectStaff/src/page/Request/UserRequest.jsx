import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { UserRequestDetails1 } from './UserRequestDetails';

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [currentDetail, setCurrentDetail] = useState({});
  const [isViewDetails, setIsViewDetail] = useState(false);
  
  //------------------------------------------------------------------------------------------
  // List data
  const API = 'https://jsonplaceholder.typicode.com/users'
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
  }, []);
  //update data
  const handleOnChangeStatus = (id,value) => {
      const fetchUpdateStatus = async () => {
        try {
          const response = await fetch(`${API}/${id}}`,{
            method:'PUT',
            body:JSON.stringify({status:value})
          });
          const data = await response.json();
          userRequest.map((currentState)=>{
            currentState.id === data.id ? ({...currentState, status:data.status} ): currentState
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        fetchUpdateStatus();
      };
  }
  //delete data
  const handleDeleteItem = async (id) =>{
    try{
      await fetch(`${API}/${id}`,{
        method:'DELETE'
      });
     
      userRequest.filter((currentState)=>(currentState.id !== id))
    }catch(error){
      console.log(error);
    }
  }

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
                <th>UserId</th>
                <th>Date</th>
                <th>Status</th>
                <th>Delete</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {userRequest.map((user) => (
                <tr key={user.username}>
                  <td>{user.requestId}</td>
                  <td>{user.userId}</td>
                  <td>{user.requestDate}</td>
                  <td>
                    <Form.Select
                      aria-label="Requested"
                      value={user.status}
                      onChange={(e) => handleOnChangeStatus(user.requestId, e.target.value)}
                    >
                      <option value="request">Requested</option>
                      <option value="accepted">Accepted</option>
                      <option value="canceled">Canceled</option>
                    </Form.Select>
                  </td>
                  <td>
                    <img src="src/assets/trash.svg" 
                    alt="Delete"
                    onClick={handleDeleteItem(userRequest.id)}
                    />
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
