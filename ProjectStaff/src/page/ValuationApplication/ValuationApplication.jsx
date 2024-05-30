import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { ValuationPDF } from './ValuationPDF';
import {NavLink} from 'react-router-dom'

export const ValuationApplication = () => {
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [result, setResult] = useState({});

    console.log(result);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            // gia su
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({ result }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Submitted data',data); 
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChange = (name) => (e) => {
        setResult((currentState) => ({
            ...currentState, [name]: e.target.value
        }));
    };

    const handleUploadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img));
            setResult((currentState) => ({...currentState , image: img.name}))
           

        }
    };

    const handleUploadImage1 = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage1(URL.createObjectURL(img));
            setResult((currentState) => ({...currentState , image1: img.name}))
        }
    };

    const handlePrint = ()=>{
        return <ValuationPDF key={id} result={result} />
    }

    return (
        <Container>
            <Form onSubmit={handleOnSubmit}>
                <h1 className="text-center my-3">Valuation Result</h1>
                <Row className="mb-2 align-items-center">
                    <Col md={2}>
                        <Form.Label htmlFor="valuationid" className="mb-0">ValuationID:</Form.Label>
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            id="valuationid"
                            onChange={handleOnChange('valuation')}
                        />
                    </Col>
                </Row>
                <Row className="mb-2 align-items-center">
                    <Col md={2}>
                        <Form.Label htmlFor="orderid" className="mb-0">OrderID:</Form.Label>
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            id="orderid"
                            onChange={handleOnChange('orderID')}
                        />
                    </Col>
                </Row>
                <Row className="mb-2 align-items-center">
                    <Col md={2}>
                        <Form.Label htmlFor="customer-name" className="mb-0">Customer Name:</Form.Label>
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            id="customer-name"
                            onChange={handleOnChange('customer-name')}
                        />
                    </Col>
                </Row>

                {/* Additional form fields */}
                <div className='d-flex'>
                    <div className='w-50'>
                        <div className='my-4' style={{ width: '500px' }}>
                            <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>GIA Report Details</h4>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="certificate-date">Certificate Date</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='certificate-date' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('certificate-date')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="measurements">Measurements</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='measurements' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('measurements')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="assessmentid">Assessment ID</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='assessmentid' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('assessmentID')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="shape">Shape</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='shape' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('shape')}
                                    />
                                </Col>
                            </Row>
                        </div>

                        {/* Grading Results */}
                        <div className='my-4' style={{ width: '500px' }}>
                            <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Grading Results</h4>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="carat-weight">Carat Weight</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='carat-weight' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('carat-weight')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="color-grade">Color Grade</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='color-grade' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('color-grade')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="clarity-grade">Clarity Grade</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='clarity-grade' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('clarity-grade')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="cut-grade">Cut Grade</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='cut-grade' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('cut-grade')}
                                    />
                                </Col>
                            </Row>
                        </div>

                        {/* Additional Grading Information */}
                        <div className='my-4' style={{ width: '500px' }}>
                            <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Additional Grading Information</h4>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="polish">Polish</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='polish' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('polish')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="symmetry">Symmetry</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='symmetry' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('symmetry')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="fluorescence">Fluorescence</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='fluorescence' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('fluorescence')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="clarity-characteristics">Clarity Characteristics</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='clarity-characteristics' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('clarity-characteristics')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="inscription">Inscription</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='inscription' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('inscription')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="comments">Comments</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='comments' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('comments')}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2 align-items-end justify-content-between">
                                <Col md={4}>
                                    <label htmlFor="estimate-price">Estimate Price</label>
                                </Col>
                                <Col md={5}>
                                    <input type="text" id='estimate-price' style={{ border: 'none', borderBottom: 'solid' }}
                                        onChange={handleOnChange('estimate-price')}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className='w-50'>
                        <div className='my-4' style={{ width: '500px' }}>
                            <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Proportions</h4>
                            <div className='my-3 d-flex justify-content-center'>
                                {image ? <img src={image} alt="proportions-upload" height='250px' className='border border-dark' />
                                    : <div className='w-75 d-flex justify-content-center align-items-center border border-dark' style={{ height: '250px' }}>
                                        <img
                                            src="/src/assets/upload.svg"
                                            alt="Upload Icon"
                                            height='40px'
                                            width='40px'
                                        />
                                    </div>}
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input type="file" id="image_upload" onChange={handleUploadImage} accept=".jpg, .jpeg, .png" />
                            </div>
                        </div>
                        <div className='my-4' style={{ width: '500px' }}>
                            <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Clarity Characteristics</h4>
                            <div className='my-3 d-flex justify-content-center'>
                                {image1 ? <img src={image1} alt="clarity-characteristics-upload" height='250px' className='border border-dark' />
                                    : <div className='w-75 d-flex justify-content-center align-items-center border border-dark' style={{ height: '250px' }}>
                                        <img
                                            src="/src/assets/upload.svg"
                                            alt="Upload Icon"
                                            height='40px'
                                            width='40px'
                                        />
                                    </div>}
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input type="file" id="image_upload" onChange={handleUploadImage1} accept=".jpg, .jpeg, .png"

                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end my-4'>
                    <Button className='btn btn-success me-4' type='submit'>Confirm</Button>
                    <Button className='btn btn-primary me-4' type='button'  >Cancel</Button>
                    <Button className='btn btn-danger me-4' type='button' as={NavLink} to={'/print-pdf'} onClick={handlePrint} >Print</Button>
                </div>
            </Form>
        </Container>
    );
};
