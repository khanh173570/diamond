import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, } from 'react-bootstrap';
import { GeneratePDF } from './GeneratePDF';
import { useLocation } from 'react-router-dom';

export const ValuationApplication = () => {
    const [isPrint, setIsPrint] = useState(false);
    // const location = useLocation();
    // const product = location.state.product;
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [result, setResult] = useState({
        diamondOrigin: '',
        measurements: '',
        proportions: '',
        shapeCut: '',
        caratWeight: 0,
        color: '',
        clarity: '',
        cut: '',
        symmetry: '',
        polish: '',
        fluorescence: '',
        description: '',
        price: 0,
        //  orderDetailId: product.id,
        orderDetailId: '',
        //userId: product.address.suite
        userId: ''

    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formattedResult = {
            ...result,
            caratWeight: parseFloat(result.caratWeight),
            price: parseFloat(result.price)
        };
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(formattedResult),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if(data){

            }
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
        }
    };

    const handleUploadImage1 = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage1(URL.createObjectURL(img));
        }
    };

    const handlePrint = () => {
        setIsPrint(true);
    };

    return (
        <Container>
            {!isPrint ? (
                <Form onSubmit={handleOnSubmit}>
                    <h1 className="text-center my-3">Diamond Valuation Report</h1>
                    <Row className="mb-2 align-items-center">
                        <Col md={2}>
                            <Form.Label htmlFor="userId" className="mb-0">Staff ID:</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                id="userId"
                                name='userId'
                                value={result.userId}
                                onChange={handleOnChange}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2 align-items-center">
                        <Col md={2}>
                            <Form.Label htmlFor="orderDetailId" className="mb-0">Order Detail ID:</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                id="orderDetailId"
                                name='orderDetailId'
                                value={result.orderDetailId}
                                onChange={handleOnChange}
                            />
                        </Col>
                    </Row>

                    <div className='d-flex'>
                        <div className='w-50'>
                            <div className='my-4 ms-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Diamond Valuation Report</h4>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="diamondOrigin">Diamond Origin</label>
                                    </Col>
                                    <Col md={5}>
                                        {/* <input type="text" id='diamondOrigin' name='diamondOrigin' value={result.diamondOrigin} style={{ border: 'none', borderBottom: 'solid' }}
                                            onChange={handleOnChange}
                                        /> */}
                                        <select
                                            id='diamondOrigin'
                                            name='diamondOrigin'
                                            value={result.diamondOrigin}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="Natutal">Natural</option>
                                            <option value="Lab Grown">Lab Grown</option>

                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="measurements">Measurements</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='measurements' name="measurements" style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            value={result.measurements || ''}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="shapeCut">ShapeCut</label>
                                    </Col>
                                    <Col md={5}>
                                        <select
                                            id='shapeCut'
                                            name='shapeCut'
                                            value={result.shapeCut || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="Round">Round</option>
                                            <option value="Cushion">Cushion</option>
                                            <option value="Emerlad">Emerlad</option>
                                            <option value="Oval">Oval</option>
                                            <option value="Heart">Heart</option>
                                            <option value="Princess">Princess</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="description">Description</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='description' name='description' value={result.description} style={{ border: 'none', borderBottom: 'solid', width: '100%' }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-4 ms-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Grading Results</h4>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="carat-weight">Carat Weight</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="number" id='carat-weight' name="caratWeight" style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            value={result.caratWeight || ''}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="color">Color Grade</label>
                                    </Col>
                                    <Col md={5}>
                                        <select
                                            id='color'
                                            name='color'
                                            value={result.color || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="K">K</option>
                                            <option value="J">J</option>
                                            <option value="I">I</option>
                                            <option value="H">H</option>
                                            <option value="G">G</option>
                                            <option value="F">F</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="clarity">Clarity Grade</label>
                                    </Col>
                                    <Col md={5}>
                                        <select
                                            id='clarity'
                                            name='clarity'
                                            value={result.clarity || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="SI2">SI2</option>
                                            <option value="SI1">SI1</option>
                                            <option value="VS2">VS2</option>
                                            <option value="VS1">VS1</option>
                                            <option value="VVS2">VVS2</option>
                                            <option value="VVS1">VVS1</option>
                                            <option value="IF">IF</option>
                                            <option value="FL">FL</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="cut">Cut Grade</label>
                                    </Col>
                                    <Col md={5}>
                                        <select
                                            id='cut'
                                            name='cut'
                                            value={result.cut || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="FAIR">FAIR</option>
                                            <option value="GOOD">GOOD</option>
                                            <option value="V.GOOD">V.GOOD</option>
                                            <option value="EX.">EX.</option>
                                        </select>
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-4 ms-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Additional Grading Information</h4>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="polish">Polish</label>
                                    </Col>
                                    <Col md={5}>
                                        <select
                                            id='polish'
                                            name='polish'
                                            value={result.polish || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="FAIR">FAIR</option>
                                            <option value="GOOD">GOOD</option>
                                            <option value="V.GOOD">V.GOOD</option>
                                            <option value="EX.">EX.</option>
                                        </select>
                                    </Col>
                                </Row>

                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="symmetry">Symmetry</label>
                                    </Col>
                                    <Col md={5}>
                                        <select
                                            id='symmetry'
                                            name='symmetry'
                                            value={result.symmetry || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="FAIR">FAIR</option>
                                            <option value="GOOD">GOOD</option>
                                            <option value="V.GOOD">V.GOOD</option>
                                            <option value="EX.">EX.</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="fluorescence">Fluorescence</label>
                                    </Col>
                                    <Col md={5}>
                                    <select
                                            id='fluorescence'
                                            name='fluorescence'
                                            value={result.fluorescence || ''}
                                            style={{ border: 'none', borderBottom: 'solid', width: "100%" }}
                                            onChange={handleOnChange}
                                        >
                                            <option value=""></option>
                                            <option value="VSTG">VSTG</option>
                                            <option value="STG">STG</option>
                                            <option value="MED">MED</option>
                                            <option value="FNT">FNT</option>
                                            <option value="NON">NON</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="proportions">Proportion</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="text" id='proportions' name='proportions' value={result.proportions} style={{ border: 'none', borderBottom: 'solid',width: "100%" }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 align-items-end justify-content-between">
                                    <Col md={4}>
                                        <label htmlFor="estimate-price">Estimate Price</label>
                                    </Col>
                                    <Col md={5}>
                                        <input type="number" id='estimate-price' name='price' value={result.price || ''} style={{ border: 'none', borderBottom: 'solid',width: "100%" }}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className='w-50'>
                            <div className='my-4 ms-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Proportions</h4>
                                <div className='my-3 d-flex justify-content-center'>
                                    {image ? <img src={image} alt="proportions-upload" height='250px' className='border border-dark' />
                                        : <div className='w-75 d-flex justify-content-center align-items-center border border-dark' style={{ height: '250px' }}>
                                            <img
                                                src="/src/assets/assetsStaff/upload.svg"
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
                            <div className='my-4 ms-4' style={{ width: '500px' }}>
                                <h4 className='text-center py-1' style={{ backgroundColor: '#7CF4DE' }}>Diamond Image</h4>
                                <div className='my-3 d-flex justify-content-center'>
                                    {image1 ? <img src={image1} alt="clarity-characteristics-upload" height='250px' className='border border-dark' />
                                        : <div className='w-75 d-flex justify-content-center align-items-center border border-dark' style={{ height: '250px' }}>
                                            <img
                                                src="/src/assets/assetsStaff/upload.svg"
                                                alt="Upload Icon"
                                                height='40px'
                                                width='40px'
                                            />
                                        </div>}
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <input type="file" id="image_upload" onChange={handleUploadImage1} accept=".jpg, .jpeg, .png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-4'>
                        <Button className='btn btn-success me-4' type='submit'>Confirm</Button>
                        <Button className='btn btn-danger me-4' type='button' onClick={handlePrint}>Print</Button>
                    </div>
                </Form>
            ) : (
                <div>
                    <img
                        src="/src/assets/assetsStaff/back.svg"
                        alt="go back"
                        className='mt-3'
                        height="20"
                        width="20"
                        onClick={() => setIsViewDetail(false)}
                    />
                    <GeneratePDF result={result} image={image} image1={image1}/>
                </div>
            )}
        </Container>
    );
};
