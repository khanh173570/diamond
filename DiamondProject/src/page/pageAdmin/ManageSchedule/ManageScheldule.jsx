import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import './ManageSchedule.css';
import { Pagination } from 'react-bootstrap';

export const ManageSchedule = () => {
  const [dataManage, setDataManage] = useState([]);
  const [evaluationStaffIds, setEvaluationStaffIds] = useState([]);
  const [selectedEvaluationStaff, setSelectedEvaluationStaff] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch orderDetail data
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
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setEvaluationStaffIds(data);
      } catch (error) {
        console.error('Error fetching staff IDs:', error);
      }
    };

    fetchStaffIds();
  }, []);
 
  const handleOnChangeValuationStaff = (orderDetailId, value) => {
    setSelectedEvaluationStaff((prevState) => ({
      ...prevState,
      [orderDetailId]: value,
    }));
  };

  const handleSendClick = async (orderDetailId) => {
    const evaluationStaffId = selectedEvaluationStaff[orderDetailId];
    if (!evaluationStaffId) return;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetailId, evaluationStaffId }),
      });
      const data = await response.json();
      console.log(data);

      Swal.fire({
        title: 'Thành công!',
        text: 'Dữ liệu đã được lưu thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating evaluation ID:', error);
    }
  };
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts =dataManage.slice(indexOfFirstPost, indexOfLastPost);
      // Change page
              const paginate = (event, pageNumber) => {
                event.preventDefault();
                setCurrentPage(pageNumber);
              };

              let active = currentPage;
              let items = [];
              for (let number = 1; number <= Math.ceil(dataManage.length / itemsPerPage); number++) {
                items.push(
                  <Pagination.Item key={number} active={number === active} onClick={(event) => paginate(event, number)}>
                    {number}
                  </Pagination.Item>,
                );
}
  return (
    <>
      <h2 className="text-center p-4 my-4">Schedule Valuation Diamond</h2>

      <Table striped bordered className="fs-5">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>OrderDetailId</th>
            <th>Order Date</th>
            <th>Type Service</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.username}</td>
              <td>11/1/1111</td>
              <td>{data.email}</td>
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
                <Button onClick={() => handleSendClick(data.id)} className='btn text-light'>
                  SEND
                </Button>
              </td>
            </tr>
          ))}
          
        </tbody>
       
      </Table>
      <Pagination className='d-flex justify-content-center'>{items}</Pagination>

    </>
  );
};
