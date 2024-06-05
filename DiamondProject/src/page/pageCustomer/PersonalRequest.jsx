import React, { useEffect, useState } from 'react';
import { Row, Col, Stack } from 'react-bootstrap';

export const PersonalRequest = () => {
    const [myRequest, setMyRequest] = useState([]);
    const [checkedRequests, setCheckedRequests] = useState({});
    const API = 'https://jsonplaceholder.typicode.com/users';
    const userId = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}`);
                const data = await response.json();
                setMyRequest(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userId.username]);

    const handleCancel = async (id, value) => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: value }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setMyRequest(prevState => 
                prevState.map(request =>
                    request.id === data.id ? { ...request, status: data.status } : request
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleCheckboxChange = (id) => {
        setCheckedRequests(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className='my-5' style={{ minHeight: '500px' }}>
            <h2 className='text-center' style={{ margin: "30px 0" }}>My Request</h2>
            <Stack gap={4}>
                {myRequest.map((request) => (
                    <Row key={request.id} className="justify-content-center w-50 mx-auto p-3" style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}>
                        <Col xs="2" className="d-flex justify-content-center align-items-center">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`check-${request.id}`}
                                    checked={!!checkedRequests[request.id]}
                                    onChange={() => handleCheckboxChange(request.id)}
                                />
                            </div>
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
                                <div>{request.email}</div>
                                <div>{request.email}</div>
                                <div>{request.email}</div>
                            </Stack>
                        </Col>
                        <Col>
                            <div className="d-flex align-items-center">
                                {request.status}
                            </div>
                        </Col>
                        <Col>
                            {checkedRequests[request.id] && (
                                <button type='button' onClick={() => handleCancel(request.id, 'canceled')}>
                                    Cancel Request
                                </button>
                            )}
                        </Col>
                    </Row>
                ))}
            </Stack>
        </div>
    );
};
