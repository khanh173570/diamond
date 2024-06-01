import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'

export const ReciptDetails = () => {
    const [recipt, setRecipt] = useState({
        id:'',
        userId:'',
        date:'',
        products: [{
            productId:'',
            quantity:''
        }]
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/carts/6');
                const data = await response.json();
                setRecipt(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container>
                <div className='text-center my-4'>
                    <h1>Information of Order Detail</h1>
                </div>
                <div>
                    <Row className='ms-3 fs-5' >
                        <Col md={2}>Customer Name:</Col>
                        <Col md={2}>{recipt.userId}</Col>
                    </Row>
                    <Row className='ms-3 fs-5' >
                        <Col md={2}>Phone:</Col>
                        <Col md={2}>{recipt.id}</Col>
                    </Row>
                    <Row className='ms-3 fs-5' >
                        <Col md={2}>Quantity:</Col>
                        <Col md={2}>{recipt.id}</Col>
                    </Row>
                    <Row className='ms-3 fs-5' >
                        <Col md={2}>Date:</Col>
                        <Col md={3}>{recipt.date}</Col>
                    </Row>
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>OrderID</th>
                                <th>Service</th>
                                <th>Received date</th>
                                <th>Expired date</th>
                                <th>Valuation Staff</th>
                                <th>Size</th>
                                <th>CheckDiamond</th>
                                <th>Status</th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {recipt.products.map((product) => {
                                <tr key={product.productId} >
                                    <td>{product.productId}</td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    )
}
