import React, { useEffect, useState } from 'react';
import { Row, Col, Stack, Button ,Spinner} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import formattedDate from '../../utils/formattedDate/formattedDate';

export const PersonalRequest = () => {
    const [myRequest, setMyRequest] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API = 'http://localhost:8080/evaluation-request/get_by_user';
    const userId = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/${userId.userId}`);
                const data = await response.json();
                setMyRequest(data);
                setLoading(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        return () => {
            setLoading(false);
        };
    }, [userId.username]);

    if (!loading) {
        return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
      }

    const viewMyRequest = (request) => {
        navigate(`/my-request/${request.requestId}`, { state: { request } });
    };

    return (
        <div className='my-5' style={{ minHeight: '500px' }}>
            <h2 className='text-center' style={{ margin: "30px 0" }}>My Request</h2>
            {myRequest.length > 0 ? (
                <Stack gap={4}>
                    {myRequest.map((request) => (
                        <Row key={request.requestId} className="justify-content-center w-50 mx-auto p-3" style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}>
                            <Col md={1} className="d-flex justify-content-center align-items-center">
                                {request.requestId}
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
                                    <div className='mb-1 fw-bold'>{request.service}</div>
                                    <div className='mb-1'>Request Date: {formattedDate(request.requestDate)}</div>
                                    <div className='mb-1'>Status: {request.status}</div>
                                </Stack>
                            </Col>
                            <Col md={2} className="d-flex">
                                <Stack>
                                    <Button style={{ backgroundColor: '#CCFBF0' }} onClick={() => viewMyRequest(request)}>
                                        <span className='text-dark me-1'>View</span>
                                        <img
                                            src="/src/assets/assetsCustomer/seemore.svg"
                                            alt=""
                                            width="20"
                                            height="20"
                                        />
                                    </Button>
                                </Stack>
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
