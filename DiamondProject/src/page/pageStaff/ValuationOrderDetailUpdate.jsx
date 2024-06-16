import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'http://localhost:8080/order_detail_request/getOrderDe'; 
const APIUpdate = 'http://localhost:8080/order_detail_request/updateAllOD';

export const ValuationOrderDetailUpdate = () => {
    const {orderDetailId } = useParams();
    const location = useLocation();
    const product = location.state.product;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    // State for form fields
    const [formEdit, setFormEdit] = useState({
        status: product.status,
        isDiamond: product.isDiamond,
        img: product.img
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/${orderDetailId}`);
                const data = await response.json();

                setFormEdit({
                    status: data.status,
                    isDiamond: data.isDiamond,
                    img: data.img
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [orderDetailId]);

    // Handle image upload
    const handleUploadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setFormEdit(currentState => ({ ...currentState, img: URL.createObjectURL(img) }));
        }
    };

    const handleFormChange = (field, value) => {
        setFormEdit(currentState => ({ ...currentState, [field]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`${APIUpdate}/${orderDetailId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formEdit),
            });
            const data = await response.json();
            if (data) {
                toast.success('Update successfully.');
                navigate('/valuation-staff/valuation-order', {state:{check:true}});
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    if (isLoading) {
        return <div className="text-center my-4"><Spinner animation="border" /></div>;
    }
    // làm một hàm update 

    return (
        <Container >
            <div >
            <div className="mb-4">
                    <img
                        src="/src/assets/assetsStaff/back.svg"
                        alt="Back"
                        onClick={() => {
                            navigate('/valuation-staff/valuation-order');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            <div className="text-center my-4">
                    <h1>Edit Product</h1>
                </div>
            <div >
                

                <Row className="mb-4 justify-content-center">
                    <Col md={2} className="text-end">
                        Product Id:
                    </Col>
                    <Col md={4} >
                        {product.orderDetailId}
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-center">
                    <Col md={2} className="text-end">
                        <Form.Label>Status</Form.Label>
                    </Col>
                    <Col md={4}>
                        <Form.Select
                            aria-label="Status"
                            name="status"
                            value={formEdit.status ? formEdit.status : product.status}
                            onChange={(e) => handleFormChange('status', e.target.value)}
                        >
                            <option value="Requested">Requested</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Finished">Finished</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-center">
                    <Col md={2} className="text-end">
                        <Form.Label>Is it Diamond?</Form.Label>
                    </Col>
                    <Col md={4}>
                        <Form.Select
                            aria-label="Is Diamond"
                            name="isDiamond"
                            value={formEdit.isDiamond ? "true" : "false"}
                            onChange={(e) => handleFormChange('isDiamond', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-center">
                    <Col md={2} className="text-end">
                        <Form.Label>Image</Form.Label>
                    </Col>
                    <Col md={4}>
                        {formEdit.img ? (
                            <div className="text-center">
                                <img src={formEdit.img} alt="Product" height='80' width='80' className='border border-dark mb-2' />
                            </div>
                        ) : (
                            <div className="text-center">
                                <label htmlFor="upload-img" style={{ cursor: 'pointer' }}>
                                    <img
                                        src="/src/assets/assetsStaff/upload.svg"
                                        alt="Upload Icon"
                                        height='40px'
                                        width='40px'
                                    />
                                </label>
                                <input type="file" id="upload-img" onChange={handleUploadImage} accept=".jpg, .jpeg, .png" style={{ display: 'none' }} />
                            </div>
                        )}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={{ span: 4, offset: 2 }} className="text-center ">
                        <Button onClick={handleSaveChanges} className="w-100">Save Changes</Button>
                    </Col>
                </Row>
            </div>
                </div>
        </Container>
    );
};
