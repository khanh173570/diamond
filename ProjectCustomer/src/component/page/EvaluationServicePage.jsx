import React, { useEffect, useState } from 'react'
function EvaluationServicePage(){
  
    const [formRequest, setFormRequest] = useState({
      typeSrevice: 'service',
      phone: '',
      fullname: '',
      email: '',
      description: '',
      username: '',
      submissionDate: '' // Thêm trường submissionDate
  });
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
        setFormRequest((currentState)=> ({...currentState,username:user.name}))
    }
  },[])

  const handleOnChang = (e) => {
      const { name, value } = e.target;
      setFormRequest(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  // Function to handle login success
  const handleLoginSuccess = (username) => {
      setFormRequest(prevState => ({
          ...prevState,
          username: username // Set the username in the formRequest
      }));
  };

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      try {
          // Thêm dữ liệu ngày khi gửi mẫu đi
          const submissionDate = new Date().toISOString();
          setFormRequest(prevState => ({
              ...prevState,
              submissionDate: submissionDate
          }));
        //   lay API gia thoi
          const response = await fetch('https://jsonplaceholder.typicode.com/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formRequest)
          });

          if (!response.ok) {
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
                        <label htmlFor="typeSrevice" className='px-1'> Type SerVice: </label>
                        <select id="typeService" className="custom-select">
                            <option value="service">Evaluation Dimond</option>
                        </select>
                    </div>

                    <div className="form-row d-flex justify-content-between">
                        <div className="form-group mt-4 col-md-6">
                            <img
                                    src='/src/assets/user.svg'
                                    alt='User icon'
                                    width='15'
                                    height='15'
                                    className="mx-1"
                                />
                            <label htmlFor="fullname" className='px-1'> Full name: </label>
                            <input
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={formRequest.fullname}
                                className="mt-1 px-2"
                                
                                onChange={handleOnChang}
                                required
                            />
                        </div>
                        <div className="form-group mt-4 col-md-6 ">
                        <img
                                    src='/src/assets/email.svg'
                                    alt='email icon'
                                    width='15'
                                    height='15'
                                    className="mx-1"
                                />
                            <label htmlFor="email" className='px-1'> Email: </label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                value={formRequest.email}
                                className="mt-1 px-2"
                                onChange={handleOnChang}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mt-4 col-md-6">
                            <img
                                    src='/src/assets/phone.svg'
                                    alt='User icon'
                                    width='15'
                                    height='15'
                                    className="mx-1"
                                />
                            <label htmlFor="phone" className='px-3'>Phone:    </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={formRequest.phone}
                                className="mt-1 px-2"
                                
                                onChange={handleOnChang}
                                required
                            />
                        </div>
                        <div className="form-group mt-4">
                            
                            <label htmlFor="description" className='px-3'>Description:    </label>
                            <input
                                id="description"
                                type="text l"
                                name="description"
                                value={formRequest.description}
                                className="form-control mt-1 px-2"
                                style={{width : "100%" , height:"350px",borderColor: "black"}}
                                onChange={handleOnChang}
                                required
                            />
                        </div>
                      <div className="form-button text-center">
                        <button type="submit" className="btn fw-bold py-3 px-3 my-3 " style={{ backgroundColor: "#CCFBF0", borderColor:"black",marginLeft: "70%"}}>SEND</button>
                      </div>
                </form>
            </div>
        </div>
    );
};
export default EvaluationServicePage;
