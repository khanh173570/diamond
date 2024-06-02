import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './ManageSchedule.css'
export const ManageSchedule = () => {
  const [dataManage, setDataManage] = useState([]);
  const [evaluationStaffIds, setEvaluationStaffIds] = useState([]);
  const [selectedEvaluationStaff, setSelectedEvaluationStaff] = useState({});

  // Fetch order data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setDataManage(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch evaluation staff IDs
  useEffect(() => {
    const fetchStaffIds = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Replace with your API endpoint
        const data = await response.json();
        setEvaluationStaffIds(data);
      } catch (error) {
        console.error('Error fetching staff IDs:', error);
      }
    };

    fetchStaffIds();
  }, []);

  const handleOnChangeValuationStaff = (orderId, value) => {
    setSelectedEvaluationStaff((prevState) => ({
      ...prevState,
      [orderId]: value,
    }));
  };

  const handleSendClick = async (orderId) => {
    const evaluationStaffId = selectedEvaluationStaff[orderId];
    if (!evaluationStaffId) return;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, evaluationStaffId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating evaluation ID:', error);
    }
  };

  return (
    <>
      <h2 className="text-center p-4 my-4">Schedule Valuation Diamond</h2>
      <Table striped bordered className="fs-5">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>OrderDetailID</th>
            <th>Receive Date</th>
            <th>Evaluation Staff ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataManage.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.id}</td>
              <td>11/1/1111</td>
              <td>
                <Form.Select
                  onChange={(e) => handleOnChangeValuationStaff(data.id, e.target.value)}
                  value={selectedEvaluationStaff[data.id] || ''}
                >
                  <option value="">Select Staff</option>
                  {evaluationStaffIds.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button onClick={() => handleSendClick(data.id)}
                        className='btn text-light'>SEND</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
