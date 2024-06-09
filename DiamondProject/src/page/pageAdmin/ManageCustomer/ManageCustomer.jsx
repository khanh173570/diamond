import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ManageCustomer.css';
import {Modal,Button,Form} from 'react-bootstrap'
export const ManageCustomer = () => {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [showForm,setShowForm]=useState(false);
  const [formAddCust,setFormAddCust] = useState({
     username:'',
     password:'', 
     firstname:'',
     lastname:'',
  });
   const handleShow =() => setShowForm(true);
  const handleClose =() => setShowForm(false);
   const handleOnChange = (e) =>{
    const {name,value} = e.target;
    setFormAddCust({
      ...formAddCust,
      [name]:value  
    });
   } ;
    const handleOnSubmit = async (e) =>{
      e.preventDefault();
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formAddCust),
          
        });
        if (response.ok) {
          const newDataCustAdd = await response.json();
          setDataCustomer([...dataCustomer,newDataCustAdd]);
          handleClose;
        } else {
            console.log("save failed")
        }

      }catch(error){
        console.log("Error: "+error);
      }

    };
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
        <Button onClick={handleShow} className="nav-link">
          <img
            src='/src/assets/assetsAdmin/plus.svg'
            width='40'
            height='40'
            className='my-3'
            alt='Add'
          />
        </Button>
      </div>
      <div className="customer-list fs-5">
        <div>
          <div className='row  p-3 my-2'>
          <p className='col-md-2'>CustomerID</p>
          <p className='col-md-3'>CustName</p>
          <p className='col-md-3'>Phone</p>
          <p className='col-md-2'>Emial</p>
         
          
          </div>
        </div>
        {dataCustomer.map((dataCust) => (
          
          <div key={dataCust.id} className=" customer-card p-3 my-4 border hover">
             <div className="row">
            <p className='col-md-2'> {dataCust.id}</p>         
            <p className='col-md-3'>{dataCust.name}</p>
            <p className='col-md-3'> {dataCust.email}</p>
            <p className='col-md-2'>{dataCust.phone}</p>
            <div className='col-md-2 d-flex justify-content-around'>
                <NavLink to={`/admin/viewcustomer/${dataCust.id}`} className="nav-link">
                  <img
                    src='/src/assets/assetsAdmin/eye.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='View'
                  />
                </NavLink>
                <NavLink to={`/admin/editcustomer/${dataCust.id}`} className="nav-link">
                  <img
                    src='/src/assets/assetsAdmin/pen.svg'
                    width='20'
                    height='20'
                    className='my-3'
                    alt='Edit'
                  />
                </NavLink>
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
        <Modal show={showForm} onHide={handleClose} className='p-5' size='lg' > 
          <Modal.Header closeButton>
              <Modal.Title className=" d-flex justify-content-center w-100">Add New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='form-row my-5 p-5 mx-5 '
                  style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}>
              <div></div>

            </Form>
          </Modal.Body>
        </Modal>
    </div>
  );
};
