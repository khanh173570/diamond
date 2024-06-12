import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import formattedDate from "../../utils/formattedDate/formattedDate";

export const ValuationOrder = () => {
    const [valuationOrder, setValuationOrder] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editStatus, setEditStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const userId = JSON.parse(localStorage.getItem('consult_staff'));

    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem('consult_staff'));
    //     if (storedUser) {
    //         setUser(storedUser);
    //         setIsLogin(true)
    //     }
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // API get orderDetails by userId
                // const response = await fetch('http://localhost:8080/order_request/getOrders');
                const response = await fetch(`https://fakestoreapi.com/carts/user/${userId.id}`);
                const data = await response.json();
                setValuationOrder(data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const viewDetail = (item) => {
        navigate(`/staff/valuation-order/${item.id}`, { state: { item } });
    };

    const handleOnChangeStatus = (id) => {
        // Update status logic here
        setEditRowId(null);
    };

    const handleDeleteItem = (id) => {
        // Delete item logic here
    };

    if (loading) {
        return <div className="text-center my-4"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <div className="text-center my-4"><Alert variant="danger">{error}</Alert></div>;
    }

    return (
        <Container>
            <h2 className="text-center my-4">Manage My Product</h2>
            <Table striped bordered hover responsive className="fs-5">
                <thead style={{ backgroundColor: '#E2FBF5' }}>
                    <tr>
                        <th>Product ID</th>
                        <th>Customer Name</th>
                        <th>Expired Date</th>
                        <th>Status</th>
                        <th>View Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {valuationOrder.length > 0 ? (
                        valuationOrder.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userId}</td>
                                <td>{user.id}</td>
                                <td>
                                    {editRowId === user.id ? (
                                        <Form className="d-flex">
                                            <Form.Select
                                                aria-label="Requested"
                                                value={editStatus}
                                                onChange={(e) => setEditStatus(e.target.value)}
                                            >
                                                <option value="request">Requested</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="canceled">Canceled</option>
                                            </Form.Select>
                                            <Button
                                                variant="primary"
                                                className="ms-2"
                                                onClick={() => handleOnChangeStatus(user.id)}
                                            >
                                                Save
                                            </Button>
                                        </Form>
                                    ) : (
                                        <div className="d-flex justify-content-between">
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
                                                className="ms-2"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        onClick={() => viewDetail(user)}
                                        className="btn text-dark"
                                        style={{ backgroundColor: '#7CF4DE' }}
                                    >
                                        View Details
                                    </Button>
                                </td>
                                <td>
                                    <img
                                        src='/src/assets/assetsStaff/delete.svg'
                                        alt="Delete"
                                        height="20"
                                        width="20"
                                        onClick={() => handleDeleteItem(user.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};
