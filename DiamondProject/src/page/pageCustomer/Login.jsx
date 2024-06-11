import React, { useState } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // test thu

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.error("Error username !", {
                position: toast.POSITION.TOP_CENTER,
            });

        }
        if (password === '' || password === null) {
            result = false;
            toast.error("Error password !", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
        return result;
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const loginRequest = {username, password}
        if (validate()) {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/posts', loginRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const data = response.json();
                if (data) {
                    // localStorage.setItem('user', JSON.stringify(data)); 
                    if (data.role === 'customer') {
                        navigate("/");
                    } else if (data.role === 'staff') {
                        navigate("/staff");
                    } else if (data.role === 'admin') {
                        navigate("/admin");
                    } else {
                        setIsLogin(false);
                        setError('Invalid role');
                    }
                } else {
                    setIsLogin(false);
                    setError('Login failed');
                }
            } catch (error) {
                console.error('Invalid username or password', error);
              
            }
        }
    };

    return (
        <div>
            <div className="form-container d-flex justify-content-center align-items-center">
                <form
                    className="form-row my-5 p-5"
                    style={{ width: "600px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
                    onSubmit={handleOnSubmit}
                >
                    <div className="form-title d-flex justify-content-center mb-3 fw-bold">
                        <h1>Login</h1>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email address"
                            name="email"
                            value={username}
                            className="form-control mt-1 py-2"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <div className="form-password d-flex justify-content-between">
                            <label htmlFor="password">Password</label>
                            <div className="form-forgot">
                                <a href="" className="link-secondary">Forgot password?</a>
                            </div>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            className="form-control mt-1 py-2"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <div className="form-button d-grid mt-4 text-center">
                        <button type="submit" className="btn fw-bold py-2" style={{ backgroundColor: "#CCFBF0" }}>
                            Login
                        </button>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                        <div style={{ flex: 1, backgroundColor: "#DDE1DF", height: "2px" }} />
                        <p style={{ margin: "0 10px" }}>Or sign in with</p>
                        <div style={{ flex: 1, backgroundColor: "#DDE1DF", height: "2px" }} />
                    </div>
                    <div className="form-img text-center mt-4">
                        {/* nhập đường dẫn  */}
                    <a href="">
                    <img
                            src="/src/assets/assetsCustomer/Google.png"
                            alt="google"
                            className="img rounded-circle border border-dark"
                            height="40"
                            width="40"
                        />
                    </a>

                    </div>
                    <hr
                        style={{
                            background: "#DDE1DF",
                            height: "2px",
                            marginTop: "1.5em"
                        }}
                    />
                    <p className="text-center mt-4">You don't have an account? <NavLink to="/signup" className="link-secondary">Sign up</NavLink></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
