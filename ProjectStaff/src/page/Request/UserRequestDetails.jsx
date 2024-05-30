import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDataDetail from '../../utils/hook/fetchDataDetail';
import { Row, Col } from 'react-bootstrap'

const UserRequestDetail = () => {
    // useParams lay tu :id cua react-router
    const { id } = useParams();
    const { dataDetail, loading, error } = useFetchDataDetail('https://jsonplaceholder.typicode.com/users', id);
    return (
        <div>
            <div>
                <h2 className='my-4'>Detailed Information</h2>
            </div>

            {loading ? 'Loading...' : error ? `Error: ${error.message}` : (
                <div className='d-flex justify-content-center fs-4 '> 
                    <div className='w-50' style={{  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' , margin:'20px 0', padding:'20px 0'}}>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Name</strong></Col>
                        <Col md={7} className='text-start'>{dataDetail.name}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Username</strong></Col>
                        <Col md={7} className='text-start'>{dataDetail.username}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Email</strong></Col>
                        <Col md={7} className='text-start'>{dataDetail.email}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Phone</strong></Col>
                        <Col md={7} className='text-start'>{dataDetail.phone}</Col>
                    </Row>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserRequestDetail;
