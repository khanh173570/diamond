import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ManageCustomer.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const ManageCustomer = () => {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formContainCustById,setFormContainCustById] =useState([]);
  const [showFormInfor,setShowFormInfor] = useState(false);
  const [formAddCust, setFormAddCust] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
  });

  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAddCust({
      ...formAddCust,
      [name]: value,
    });
  };
  //save add new cust
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
          title: 'Successs!',
          text: 'Add new cust successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        const { confirmPassword, ...dataToSend } = formAddCust; 
        console.log('Data to be sent to server:', dataToSend);
        handleClose();
      } else {
        console.log('save failed');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };
  //get customer
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
      // get Customer by Id 
      const handleShowCustomerInfor = async (customerId) => {
            try{
                const response = await fetch (`https://jsonplaceholder.typicode.com/users/${customerId}`);
                const customer = response.json();
                setFormContainCustById(customer);
                setShowFormInfor(true)
            }catch(error){
              console.log("Error:",error)
            }
      };
      const handCloseCustomerInfor = () => {

        setShowFormInfor(false);
        setFormContainCustById(null);
      };
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
        {dataCustomer.map((dataCust) => (
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
                <Button to={`/admin/editcustomer/${dataCust.id}`} className="nav-link">
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
        ))}
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
                  <Modal.Title className='w-100 d-flex justify-content-center'>INFORMATION OF CUSTOMER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p></p>
              </Modal.Body>

          </Modal>
      )}
     
    </div>
  );
};
