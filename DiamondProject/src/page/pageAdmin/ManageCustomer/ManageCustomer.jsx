import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import './ManageCustomer.css'
export const ManageCustomer = () => {
  const [dataCustomer,setDataCustomer] = useState([]);
    useEffect (() => {
      const fetchDataCustomer = async () => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setDataCustomer(data);
        }catch(error){
          console.error('error fetching data:',error);
        }
      };

      fetchDataCustomer();
    },[]);
  return (
     
    <div className='container '>
    <div className='justify-content-first d-flex  my-2 p-4'>
      <img
                src='/src/assets/assetsAdmin/person.svg'
                width='40'
                height='40'
                className='my-3'
                alt='Logo'
                   />
    <h4 className='p-4'>Manage Customer</h4>
    <NavLink to="/admin/createnewcust" className="nav-link">
    <img
                src='/src/assets/assetsAdmin/plus.svg'
               
                width='40'
                height='40'  
                className='my-3'
                alt='Logo'
                   />
    </NavLink> 
    </div>
      <div bordered className="fs-5">
        <thead>
          <tr>
            <th className='p-4'>CustomerID</th>
            <th   >Fullname</th>
            <th>Address</th>
            <th></th>
            <th></th>
            <th></th> 
            
          </tr>
        </thead>
        <tbody> 
          {dataCustomer.map((dataCust) =>(
            <tr key={dataCust.userId}>
                <td>{dataCust.userId}</td>
                <td>{dataCust.name +' '+dataCust.name}</td>
                <td>{dataCust.id}</td>
                <td>
                  <NavLink to="" className="nav-link">
                  <img
                        src='/src/assets/assetsAdmin/eye.svg'
               
                        width='20'
                        height='20'  
                        className='mr-2'
                        alt='Logo'
                   />
                  </NavLink>
                </td> 
                <td>
                <NavLink to="" className="nav-link">
                  <img
                        src='/src/assets/assetsAdmin/pen.svg'
               
                        width='20'
                        height='20'  
                        className='mr-2'
                        alt='Logo'
                   />
                  </NavLink>
                </td>
                <td>
                <NavLink to="" className="nav-link">
                  <img
                        src='/src/assets/assetsAdmin/trash.svg'
               
                        width='20'
                        height='20'  
                        className='mr-2'
                        alt='Logo'
                   />
                  </NavLink>  
                </td>


            </tr>


          ))}

        </tbody>

        
      </div>
    </div>

  )
  }