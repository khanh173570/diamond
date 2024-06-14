import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ManageCustomer.css';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const ManageCustomer = () => {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formContainCustById, setFormContainCustById] = useState(null);
  const [showFormInfor, setShowFormInfor] = useState(false);
  const [formAddCust, setFormAddCust] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
  });
  const [formEditCust, setFormEditCust] = useState(null);
  const [originalData, setOriginalData] = useState(null); // To store original data for comparison
  const [showEditForm, setShowEditForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAddCust({
      ...formAddCust,
      [name]: value,
    });
  };

  const handleEditOnChange = (e) => {
    const { name, value } = e.target;
    setFormEditCust({
      ...formEditCust,
      [name]: value,
    });
  };

  // Save new customer
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (formAddCust.password !== formAddCust.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Confirm Password failed.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formAddCust),
      });
      if (response.ok) {
        const newDataCustAdd = await response.json();
        setDataCustomer([...dataCustomer, newDataCustAdd]);
        Swal.fire({
          title: 'Success!',
          text: 'Add new cust successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        handleClose();
      } else {
        console.log('save failed');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  // Fetch customer data
  useEffect(() => {
    const fetchDataCustomer = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setDataCustomer(data);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };

    fetchDataCustomer();
  }, []);

  // Show customer information
  const handleShowCustomerInfor = async (customerId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${customerId}`);
      const customer = await response.json();
      setFormContainCustById(customer);
      setShowFormInfor(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handCloseCustomerInfor = () => {
    setShowFormInfor(false);
    setFormContainCustById(null);
  };

  // Show edit customer form
  const handleShowEditCustomer = async (customerId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${customerId}`);
      const customer = await response.json();
      setFormEditCust(customer);
      setOriginalData(customer); // Store the original data
      setShowEditForm(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleCloseEditCustomer = () => {
    setShowEditForm(false);
    setFormEditCust(null);
    setOriginalData(null);
  };

  // Handle edit customer form submit
  // Handle edit customer form submit
const handleEditOnSubmit = async (e) => {
  e.preventDefault();
  if (!formEditCust) return;

  const updatedFields = {};
  for (const key in formEditCust) {
    if (formEditCust[key] !== originalData[key]) {
      updatedFields[key] = formEditCust[key];
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    Swal.fire({
      title: 'Error!',
      text: 'No changes made.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  const dataToSend = {
    id: formEditCust.id,
    ...updatedFields
  };

  try {
    console.log('Data to send:', dataToSend); // Log data being sent to backend
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${formEditCust.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      const updatedCustomer = await response.json();
      setDataCustomer((prevData) =>
        prevData.map((cust) =>
          cust.id === updatedCustomer.id ? updatedCustomer : cust
        )
      );
      Swal.fire({
        title: 'Success!',
        text: 'Customer updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      console.log('Updated customer:', updatedCustomer);
      handleCloseEditCustomer();
    } else {
      console.log('update failed');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

const indexOfLastPost = currentPage * itemsPerPage;
const indexOfFirstPost = indexOfLastPost - itemsPerPage;
const currentPosts = dataCustomer.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (event, pageNumber) => {
  event.preventDefault();
  setCurrentPage(pageNumber);
};  

let active = currentPage;
let items = [];
for (let number = 1; number <= Math.ceil(dataCustomer.length / itemsPerPage); number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} onClick={(event) => paginate(event, number)}>
      {number}
    </Pagination.Item>,
  );
}


  return (
    <div className='container'>
      <div className='justify-content-first d-flex my-2 p-4'>
        <img
          src='/src/assets/assetsAdmin/person.svg'
          width='40'
          height='40'
          className='my-3'
          alt='Logo'
        />
        <h4 className='p-4'>Manage Customer</h4>
        <Button onClick={handleShow} className="nav-link h-100 my-4" >
          <img
            src='/src/assets/assetsAdmin/plus.svg'
            width='40'
            height='40'
            className=''
            alt='Add'
          />
        </Button>
      </div>
      <div className="customer-list fs-5">
        <div>
          <div className='row  mx-2 my-2'>
            <p className='col-md-2'>CustomerID</p>
            <p className='col-md-3'>CustName</p>
            <p className='col-md-3'>Phone</p>
            <p className='col-md-2'>Email</p>
          </div>
        </div>
        {currentPosts.map((dataCust) => (
            <div key={dataCust.id} className="customer-card my-4 border hover">
            <div className="row">
              <p className='col-md-2'> {dataCust.id}</p>
              <p className='col-md-3'>{dataCust.name}</p>
              <p className='col-md-3'> {dataCust.email}</p>
              <p className='col-md-2'>{dataCust.phone}</p>
              <div className='col-md-2 d-flex justify-content-around'>
                <Button onClick={() => handleShowCustomerInfor(dataCust.id)} className='nav-link'>
                  <img
                    src='/src/assets/assetsAdmin/eye.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='View'
                   
                  />
                </Button>
                <Button onClick={() => handleShowEditCustomer(dataCust.id)} className="nav-link">
                  <img
                    src='/src/assets/assetsAdmin/pen.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='Edit'
                  />
                </Button>
                <Button className="nav-link">
                  <img
                    src='/src/assets/assetsAdmin/trash.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='Delete'
                  />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* {dataCustomer.map((dataCust) => (
          <div key={dataCust.id} className="customer-card my-4 border hover">
            <div className="row">
              <p className='col-md-2'> {dataCust.id}</p>
              <p className='col-md-3'>{dataCust.name}</p>
              <p className='col-md-3'> {dataCust.email}</p>
              <p className='col-md-2'>{dataCust.phone}</p>
              <div className='col-md-2 d-flex justify-content-around'>
                <Button onClick={() => handleShowCustomerInfor(dataCust.id)} className='nav-link'>
                  <img
                    src='/src/assets/assetsAdmin/eye.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='View'
                   
                  />
                </Button>
                <Button onClick={() => handleShowEditCustomer(dataCust.id)} className="nav-link">
                  <img
                    src='/src/assets/assetsAdmin/pen.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='Edit'
                  />
                </Button>
                <NavLink to={`/admin/deletecustomer/${dataCust.id}`} className="nav-link">
                  <img
                    src='/src/assets/assetsAdmin/trash.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='Delete'
                  />
                </NavLink>
              </div>
            </div>
          </div>
        ))} */}
          <Pagination className='d-flex justify-content-center'>{items}</Pagination>
      </div>
                        {/* Modal Add  New Cust */}
      <Modal show={showForm} onHide={handleClose} className='p-5' size='lg'>
        <Modal.Header closeButton className='mx-4'>
        <img
                  src='/src/assets/assetsAdmin/logo.png'
                  width='80'
                  height='80'
                  alt='Logo'
                  className=''
                />
          <Modal.Title className="d-flex justify-content-center w-100">Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='form-row my-5 p-3 mx-5'
            style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
            onSubmit={handleOnSubmit}
          >
              <div className='justify-content-center d-flex my-2 p-4'>
                        <h3>Form Add New Customer</h3>
               </div>
            <div className='form-row d-flex my-5'>
              <div className='form-group col-md-6'>
                <label htmlFor='firstname'>FirstName:</label>
                <input
                  id='firstname'
                  type='text'
                  name='firstname'
                  value={formAddCust.firstname}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='lastname'>LastName:</label>
                <input
                  id='lastname'
                  type='text'
                  name='lastname'
                  value={formAddCust.lastname}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='username'>Username:</label>
              <input
                id='username'
                type='text'
                name='username'
                value={formAddCust.username}
                className='mx-2'
                onChange={handleOnChange}
                style={{ width: "70%", borderRadius: "5px" }}
                required
              />
            </div>
            <div className='form-group col-md-6 my-5'>
              <label htmlFor='password'>Password:</label>
              <input
                id='password'
                type='password'
                name='password'
                value={formAddCust.password}
                className='mx-2'
                onChange={handleOnChange}
                style={{ width: "70%", borderRadius: "5px" }}
                required
              />
            </div>
            <div className='form-group col-md-10 my-5'>
              <label htmlFor='confirmPassword'>Confirm Password:</label>
              <input
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                value={formAddCust.confirmPassword}
                className='mx-2'
                onChange={handleOnChange}
                style={{ width: "50%", borderRadius: "5px" }}
                required
              />
            </div>
            <div className='form-button text-center d-flex justify-content-end'>
              <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
                 {/* Modal show Infor Customer */}
      {formContainCustById && (
          <Modal show={showFormInfor} onHide={handCloseCustomerInfor}  className='p-5' size='lg'>
              <Modal.Header closeButton>
        <img
          src='/src/assets/assetsAdmin/logo.png'
          width='80'
          height='80'
          alt='Logo'
          className=''
        />
        <Modal.Title className='w-100 d-flex justify-content-center'>INFORMATION OF CUSTOMER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <div className="card p-4" style={{ width: '100%', maxWidth: '700px' }}>
              <div className='container d-flex'>
                  <div>
                        <img src="https://www.beelancer.vn/storage/2022/10/casemiro-365x405.jpg" alt="customer" 
                               width='200'
                            height='200'
                          />
                  </div>
                  <div>
                          <div className='container d-flex'>
                        <h4 className='p-4'> Doe John</h4>
                        <p className='p-4 my-1'>
                        <img
                            src='/src/assets/assetsAdmin/map.svg'
                            width='20'
                            height='20'
                            alt='Logo'
                            className=''
                          />
                          Ho Chi Minh</p>
                            </div>
                      <div className='container'>
                      <p className='mx-4'><strong>ID:</strong> ST12345  <strong className='mx-5'></strong><strong>Role:</strong> Staff</p>
                      <p className='mx-4'><strong>Phone:</strong> 098-2444-332</p>
                      <p className='mx-4'><strong>Email:</strong> johndoe@meomeo.com</p>
                      <p className='mx-4'><strong>Username:</strong> minh123</p>
                      <p className='mx-4'><strong>Password:</strong> 123456</p>
                      <p className='mx-4'><strong>Birthday:</strong> 12/3/2222</p>
                      </div>
              </div>
              </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
      )}
                 {/* Modal Edit Customer */}
      {formEditCust && (
        <Modal show={showEditForm} onHide={handleCloseEditCustomer} className='p-5' size='lg'>
          <Modal.Header closeButton>
            <img
              src='/src/assets/assetsAdmin/logo.png'
              width='80'
              height='80'
              alt='Logo'
              className=''
            />
            <Modal.Title className='w-100 d-flex justify-content-center'>EDIT CUSTOMER</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className='form-row my-5 p-3 mx-5'
              style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
              onSubmit={handleEditOnSubmit}
            >
              <div className='justify-content-center d-flex my-2 p-4'>
                <h3>Form Edit Customer</h3>
              </div>
              <div className='form-row d-flex my-5'>
                <div className='form-group col-md-6'>
                  <label htmlFor='firstname'>FirstName:</label>
                  <input
                    id='firstname'
                    type='text'
                    name='firstname'
                    value={formEditCust.id}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='lastname'>LastName:</label>
                  <input
                    id='lastname'
                    type='text'
                    name='lastname'
                    value={formEditCust.id}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
              </div>
               <div className='form-group col-md-6 my-5'>
                <label htmlFor='password'>Password:</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  value={formEditCust.id}
                  className='mx-2'
                  onChange={handleEditOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='email'>Email:</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formEditCust.email}
                  className='mx-2'
                  onChange={handleEditOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='phone'>Phone:</label>
                <input
                  id='phone'
                  type='text'
                  name='phone'
                  value={formEditCust.phone}
                  className='mx-2'
                  onChange={handleEditOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='address'>Address:</label>
                <input
                  id='address'
                  type='text'
                  name='address'
                  value={formEditCust.address}
                  className='mx-2'
                  onChange={handleEditOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='birthday'>Birthday:</label>
                <input
                  id='birthday'
                  type='text'
                  name='birthday'
                  value={formEditCust.birthday}
                  className='mx-2'
                  onChange={handleEditOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='phone'>Phone:</label>
                <input
                  id='phone'
                  type='text'
                  name='phone'
                  value={formEditCust.phone}
                  className='mx-2'
                  onChange={handleEditOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-button text-center d-flex justify-content-end'>
                <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
