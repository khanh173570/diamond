import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { UserRequestDetails1 } from './UserRequestDetails';

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({})
  const [currentDetail, setCurrentDetail] = useState({})
  const [isViewDetails, setIsViewDetail] = useState(false);
  // View detail

  //--------------------------------------
  // lay list data request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUserRequest(data);
        // console.log(data);  // Log the data directly after fetching
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  // const handleOnChangeStatus = (id,value)=>{
  //   userRequest.filter ((userRequestId)=>{
  //     userRequestId === id ? setCurrentStatus({id, value})
  //   })
  //   useEffect ( async ()=>{
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users',
  //       {
  //         method:'POST',
  //         headers:{
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //         ,body: JSON.stringify('')

  //       }
  //     )
  //   })
  // }


  // // lay service

  // // tu dong cap nhat status duoi database
  // // const handleOnChangeStatus = (id, value) => {
  // //   setUserRequest((currentState) => {
  // //     currentState.id === id ? setCurrentState({ ...currentState, status: value }) : 'requested'
  // //   })
  // // }
  // // const viewDetails = (requestID) => {
  // //   userRequest.map((currentState)=>{
  // //     requestID === currentState.id ? setCurrentDetail(currentState) : 
  // //   })
  // // }

  const viewDetails = (userRequestDetail) => {
    setCurrentDetail(userRequestDetail)
    setIsViewDetail(true);
  }
  // -------Change Status
  return (

    <div>
      {!isViewDetails ? (
        <>
          <h2 className='text-center my-4'>User Request</h2>
          <Table striped bordered className='fs-5'>
            <thead style={{ backgroundColor: '#E2FBF5' }}>
              <tr>
                <th>Customer Id</th>
                <th>Name</th>
                <th>Status</th>
                <th>Delete</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {userRequest.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>
                    <Form.Select
                      aria-label="Requested"
                      // onChange={(e) => handleOnChangeStatus(user.id, e.target.value)}
                      onChange={(e)=> console.log(e.target.value)}
                    >
                      <option value={user.name}>{user.name}</option>
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
            <img src="/src/assets/back.svg" alt="go back" className='mt-3' height="40" width="40" onClick={()=> setIsViewDetail(false)} />
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