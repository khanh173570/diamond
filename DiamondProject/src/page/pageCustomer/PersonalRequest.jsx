import React, { useEffect, useState } from 'react';
import { Row, Col, Stack } from 'react-bootstrap';

export const PersonalRequest = () => {
    const [myRequest, setMyRequest] = useState([]);
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const API = 'https://jsonplaceholder.typicode.com/users';
    const userId = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}`);
                const data = await response.json();
                // Filter requests by username (name)
                const userRequests = data.filter((item) => item.username === userId.username);
                setMyRequest(userRequests);
                setLoading(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        return ()=>{
            setLoading(false)
        }
    }, [userId.username,isEdit ]);


    const handleOnCancel = async (id, value) => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: value }),
            });
            const data = await response.json();
            setIsEdit(true)
            console.log(data)
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    if(!loading){
        return <div  style={{ minHeight: '500px' }}>Loading...</div>
    }

    return (
        <div className='my-5' style={{ minHeight: '500px' }}>
            <h2 className='text-center' style={{ margin: "30px 0" }}>My Request</h2>
            {myRequest.length > 0 ? (
                <Stack gap={4}>
                    {myRequest.map((request) => (
                        <Row key={request.id} className="justify-content-center w-50 mx-auto p-3" style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}>
                            <Col md={1} className="d-flex justify-content-center align-items-center">
                                {request.id}
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img
                                    src="/src/assets/assetsCustomer/diamond-svgrepo-com.svg"
                                    alt="Diamond"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col>
                                <Stack>
                                    {/* Service name */}
                                    <div className='mb-1 fw-bold'>Valuation Diamond</div>
                                    {/* Description */}
                                    <div className='mb-1'>Please contact me at 3:00 pm, I need to discuss something about your service, and don't be late again! Thanks</div>
                                    {/* Quantity */}
                                    <div className='mb-1'>Quantity: 4</div>
                                </Stack>
                            </Col>
                            <Col md={2} className="d-flex">
                                <div className="me-2 ">
                                    {request.status}
                                </div>
                                <img
                                    src="/src/assets/assetsCustomer/cancel.svg"
                                    alt="update status"
                                    width="20"
                                    height="20"
                                    onClick={() => handleOnCancel(request.id, 'Canceled')}
                                />
                            </Col>
                        </Row>
                    ))}
                </Stack>
            ) : (
                <div className='text-center fw-bold fs-1'>You don't have request valuation yet</div>
            )}
        </div>
    );
};
