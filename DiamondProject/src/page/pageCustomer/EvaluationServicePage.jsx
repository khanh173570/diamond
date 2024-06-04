import React, { useEffect, useState } from 'react';

function EvaluationServicePage() {
  const [formRequest, setFormRequest] = useState({
    service: 'service',           // typeSrevice -> service
    phoneNumber: '',              // phone -> phoneNumber
    guestName: '',                // fullname -> guestName
    requestEmail: '',             // email -> requestEmail
    requestDescription: '',       // description -> requestDescription
    userId: '',                   // Thêm userId
    requestDate: ''               // submissionDate -> requestDate
  });

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     setFormRequest((currentState) => ({
  //       ...currentState,
  //       userId: user.username,       // Lấy userId từ localStorage
  //    // Lấy userId từ localStorage
  //       guestName: user.name       // Set guestName với tên người dùng
  //     }));
  //   }
  // }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormRequest(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const requestDate = new Date().toISOString();
    const requestData = { ...formRequest, requestDate };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
    }

      const result = await response.json();
    console.log('Success:', result);
    // Handle success
  } catch (error) {
    console.error('Error:', error);
  }
};

return (
  <div className="form-container justify-content-center align-items-center">
    <div className='justify-content-center d-flex my-2 p-4'>
      <h1>Valuation Request Service</h1>
    </div>
    <div
      className="custom-hr"
      style={{
        width: "1000px",
        height: "2px",
        backgroundColor: "#A9A9A9",
        margin: "0 auto",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"
      }}
    ></div>
    <div className="d-flex justify-content-center align-items-center">
      <form
        className="form-row my-5 p-5"
        style={{ width: "1000px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
        onSubmit={handleOnSubmit}
      >
        <div className="form-group mt-1">
          <label htmlFor="service" className='px-1'> Type Service: </label>
          <select
            id="service"
            name="service"
            className="custom-select"
            value={formRequest.service}
            onChange={handleOnChange}
          >
            <option value="service">Evaluation Diamond</option>
          </select>
        </div>

        <div className="form-row d-flex justify-content-between">

          

            <div className="form-group mt-4 col-md-6">

              <img
                src='/src/assets/assetsCustomer/user.svg'
                alt='User icon'
                width='15'
                height='15'
                className="mx-1"
              />
              <label htmlFor="guestName" className='px-1'> Full name: </label>
              <input
                id="guestName"
                type="text"
                name="guestName"
                value={formRequest.guestName}
                className="mt-1 px-2"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mt-4 col-md-6 ">
              <img
                src='/src/assets/assetsCustomer/email.svg'
                alt='email icon'
                width='15'
                height='15'
                className="mx-1"
              />
              <label htmlFor="requestEmail" className='px-1'> Email: </label>
              <input
                id="requestEmail"
                type="text"
                name="requestEmail"
                value={formRequest.requestEmail}
                className="mt-1 px-2"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="form-group mt-4 col-md-6">
            <img
              src='/src/assets/assetsCustomer/phone.svg'
              alt='Phone icon'
              width='15'
              height='15'
              className="mx-1"
            />
            <label htmlFor="phoneNumber" className='px-3'>Phone:</label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={formRequest.phoneNumber}
              className="mt-1 px-2"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="requestDescription" className='px-3'>Description:</label>
            <input
              id="requestDescription"
              type="text"
              name="requestDescription"
              value={formRequest.requestDescription}
              className="form-control mt-1 px-2"
              style={{ width: "100%", height: "350px", borderColor: "black" }}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-button text-center">
            <button type="submit" className="btn fw-bold py-3 px-3 my-3" style={{ backgroundColor: "#CCFBF0", borderColor: "black", marginLeft: "70%" }}>SEND</button>
          </div>
      </form>
    </div>
  </div>
);
}

export default EvaluationServicePage;