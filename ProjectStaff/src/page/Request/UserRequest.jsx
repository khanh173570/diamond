import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [currentState, setCurrentState] = ('')


  // View detail

  //--------------------------------------
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

  // tu dong cap nhat status duoi database
  const handleOnChangeStatus = (id, value)=>{
    setUserRequest((currentState) =>{
      currentState.id === id ? setCurrentState({...currentState, status:value}) :'requested'
    })
  }
  return (
    <div>
      <h2 className='text-center my-4'>User Request</h2>
      <Table striped bordered className='fs-5'>
        <thead style={{ backgroundColor: '#E2FBF5' }}>
          <tr>
            <th>
              Customer Id
            </th>
            <th>
              Date
            </th>
            <th>
              Status
            </th>
            <th>
              Delete
            </th>
            <th>
              View Details
            </th>
          </tr>
        </thead>

        {userRequest.map((userRequestID) => {
          return <tbody key={userRequestID.id}>
            <tr>
              <td>
                {userRequestID.username}
              </td>
              <td>
                {userRequestID.name}
              </td>
              <td>
                <Form.Select aria-label="Requested" 
                onChange={(e) => (handleOnChangeStatus(userRequestID.id, e.target.value))}>
                  <option value="requested">Requested</option>
                  <option value="accepted">Accepted</option>
                  <option value="canceled">Canceled</option>
                </Form.Select>
              </td>
              <td>
                <img
                  src="src/assets/trash.svg"
                  alt="" />
              </td>
              <td>
                <Button as={NavLink} to={`/user-request/${userRequestID.id}`} className='btn text-dark' style={{ backgroundColor: '#7CF4DE' }}>
                  View Details
                </Button>
              </td>
            </tr>
          </tbody>

        })}
      </Table>
    </div>
  );
};