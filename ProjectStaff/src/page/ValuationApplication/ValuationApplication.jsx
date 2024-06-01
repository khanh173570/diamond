import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { GeneratePDF } from './GeneratePDF';

export const ValuationApplication = () => {
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [result, setResult] = useState({
        valuationid: '',
        orderid: '',
        customerName: '',
        certificateDate: '',
        measurements: '',
        assessmentID: '',
        shape: '',
        caratWeight: '',
        colorGrade: '',
        clarityGrade: '',
        cutGrade: '',
        polish: '',
        symmetry: '',
        fluorescence: '',
        clarityCharacteristics: '',
        inscription: '',
        comments: '',
        estimatePrice: '',
    });
    const [isPrint, setIsPrint] = useState(false);

    // add valuation result
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({ result }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Submitted data', data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setResult((currentState) => ({
            ...currentState,
            [name]: value
        }));
    };

    const handleUploadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img));
            setResult((currentState) => ({ ...currentState, image: URL.createObjectURL(img) }));
        }
    };

    const handleUploadImage1 = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage1(URL.createObjectURL(img));
            setResult((currentState) => ({ ...currentState, image1: URL.createObjectURL(img) }));
        }
    };

    const handleUploadImage2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage2(URL.createObjectURL(img));
            setResult((currentState) => ({ ...currentState, image2: URL.createObjectURL(img) }));
        }
    };

    const handlePrint = () => {
        setIsPrint(true);
    };

    return (
        <Container>
            {!isPrint ? (
                <Form onSubmit={handleOnSubmit}>
                    <h1 className="text-center my-3">New Valuation Result</h1>
                    <Row className="mb-2 align-items-center">
                        <Col md={2}>
                            <Form.Label htmlFor="valuationid" className="mb-0">ValuationID:</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                id="valuationid"
                                name="valuationid"
                                onChange={handleOnChange}
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
                                name="orderid"
                                onChange={handleOnChange}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2 align-items-center">
                        <Col md={2}>
                            <Form.Label htmlFor="customerName" className="mb-0">Customer Name:</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                id="customerName"
                                name="customerName"
                                onChange={handleOnChange}
                            />
                        </Col>
                    </Row>

                    <div className='d-flex'>
                        <div className='w-50'>
                            <div className='my-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>GIA Report Details</h4>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="certificateDate">Certificate Date</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='certificateDate' name="certificateDate" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="measurements">Measurements</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='measurements' name="measurements" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="assessmentID">Assessment ID</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='assessmentID' name="assessmentID" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="shape">Shape</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='shape' name="shape" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Grading Results</h4>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="caratWeight">Carat Weight</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='caratWeight' name="caratWeight" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="colorGrade">Color Grade</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='colorGrade' name="colorGrade" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="clarityGrade">Clarity Grade</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='clarityGrade' name="clarityGrade" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="cutGrade">Cut Grade</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='cutGrade' name="cutGrade" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Additional Grading Information</h4>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="polish">Polish</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='polish' name="polish" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="symmetry">Symmetry</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='symmetry' name="symmetry" style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            {/* Add Image Upload Fields */}
                            <div className="my-4">
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Upload Images</h4>
                                <Row className="mb-2 align-items-center">
                                    <Col md={4}>
                                        <label htmlFor="image1">Image 1</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="file" id="image1" accept="image/*" onChange={handleUploadImage1} />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-center">
                                    <Col md={4}>
                                        <label htmlFor="image2">Image 2</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="file" id="image2" accept="image/*" onChange={handleUploadImage2} />
                                    </Col>
                                </Row>
                                {image1 && (
                                    <Row className="mb-2 align-items-center">
                                        <Col md={4}>
                                            <img src={image1} alt="Image 1" style={{ width: '100%' }} />
                                        </Col>
                                    </Row>
                                )}
                                {image2 && (
                                    <Row className="mb-2 align-items-center">
                                        <Col md={4}>
                                            <img src={image2} alt="Image 2" style={{ width: '100%' }} />
                                        </Col>
                                    </Row>
                                )}
                            </div>

                        </div>
                    </div>
                    <Button type="submit" className="mt-3">Submit</Button>
                </Form>
            ) : (
                <GeneratePDF result={result} />
            )}
        </Container>
    );
};
