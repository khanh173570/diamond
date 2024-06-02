import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ViewReciptList = () => {
  const [selection, setSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSelection, setFilteredSelection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Update this URL to the actual API
        const data = await response.json();
        setSelection(data);
        setFilteredSelection(data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = selection.filter(item =>
      item.id.toString().includes(searchTerm)
    );
    setFilteredSelection(filteredData);
  };

  const viewDetail = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-center' style={{marginBottom:'50px', marginTop:'50px'}}>
        <h1>View Order List</h1>
      </div>
 
      <div className='justify-content-center' style={{ width: '80%', margin: '0 auto' }}>
        <Form className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search by ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div>  
      <Table striped bordered hover> 
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        
        <tbody>
          {filteredSelection.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.company.name}</td> {/* Adjust this to the correct field */}
              <td>{item.website}</td> {/* Adjust this to the correct field */}
              <td>{item.phone}</td> {/* Adjust this to the correct field */}
              <td>
                <Button variant="info" onClick={() => viewDetail(item.id)}>
                  View Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </Table>
      </div>
    </div>
  );
};

