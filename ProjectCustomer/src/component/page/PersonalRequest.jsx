import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Stack } from 'react-bootstrap'
export const PersonalRequest = () => {
    const [myRequest, setMyRequest] = useState([]);
    const handleCheck = () => {
    // List my request
    };
    //API cua tbl_evaluation_service_request
    const API = 'https://jsonplaceholder.typicode.com/users'
     //tbl_user is saved in localStorage
    const userId = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                // API for find by name
                // ${API}/${userId.username}
                const response = await fetch(`${API}/${userId.username}`);
                const data = await response.json();
                setMyRequest(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userId.username]);
    //handleOnCheckBox

    //chuc nang huy yeu cau 
    const handleCancel = (id,value) => {
      const fetchUpdateStatus = async () => {
        try {
            // API myRequest/requet_id
          const response = await fetch(`${API}/${id}`,{
            method:'PUT',
            body:JSON.stringify({status:value})
          });
          const data = await response.json();
          myRequest.map((currentState)=>{
            currentState.id === data.id ? ({...currentState, status:data.status} ): currentState
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        fetchUpdateStatus();
      };
  }
    return (
        <div className='my-5' style={{minHeight:'500px'}}>
            <h2 className='text-center' style={{ margin: "30px 0" }}>My Request</h2>
                    <Stack gap={4} >
                        {myRequest.map((request) => (
                            <Row key={request.requestId} className="justify-content-center w-50 mx-auto p-3" style={{boxShadow:'rgb(0 0 0 / 16%) 1px 1px 10px'}}>
                                <Col xs="2" className="d-flex justify-content-center align-items-center">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input "
                                            type="checkbox"
                                            id={`check-${request.requestId}`}
                                            onChange={(e)=>console.log(e.target.checked)}
                                        />
                                    </div>
                                </Col>
                                <Col xs="auto" className="d-flex  align-items-center">
                                    <img
                                        src="/src/assets/diamond-svgrepo-com.svg"
                                        alt="Diamond"
                                        width="50"
                                        height="50"
                                    />
                                </Col>
                                <Col >
                                    <Stack >
                                      {/* request ID */}
                                        <div>{request.requestId}</div>
                                        {/* description */}
                                        <div>{request.requestDescription}</div>
                                        <div>{request.requestDate}</div>
                                    </Stack>
                                </Col>
                                <Col>
                                    <div className="d-flex align-items-center">
                                        {request.status}
                                    </div>
                                </Col>
                                <Col>
                                    <button type='button' onClick={handleCancel(request.id, 'canceled')}>
                                        Cancel Request
                                    </button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </div>
    );
};
