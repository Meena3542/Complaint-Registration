import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Footer from './FooterC';
import './SignUp.css';



const SignUp = () => {
  const [title, setTitle] = useState("Select User");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTitle = (select) => {
    setTitle(select);
    setUser({ ...user, userType: select });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.userType) {
      alert("Please select a user type");
      return;
    }
    const updatedUser = { ...user, userType: title };
    axios.post("http://localhost:8000/SignUp", updatedUser)
      .then((res) => {
        alert("Record submitted");
        JSON.stringify(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
    setUser({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
    });
  };

  return (
    <>
      

      <Navbar style={{ backgroundColor: 'black' }} variant="dark">
  <Container>
    <Navbar.Brand className="text-white">ComplaintCare</Navbar.Brand>
    <Nav className="ms-auto">
      <Nav.Item>
        <Link to="/" className="nav-link text-white">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/signup" className="nav-link text-white">SignUp</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/login" className="nav-link text-white">Login</Link>
      </Nav.Item>
    </Nav>
  </Container>
</Navbar>





      {/* Form Section */}
      <section className="gradient-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-4">SignUp For Registering the Complaint</h2>
                    <p className="text-white-50 mb-4">Please enter your Details</p>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control form-control-lg" required />
                      </div>

                      <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required />
                      </div>

                      <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" required />
                      </div>

                      <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="phone">Mobile No.</label>
                        <input type="tel" name="phone" value={user.phone} onChange={handleChange} className="form-control form-control-lg" required />
                      </div>

                      <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="userType">Select User Type</label>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {title}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <div className="text-center">
                        <button className="btn btn-outline-light btn-lg px-5 mt-3" type="submit">Register</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">Had an account? <Link to="/login" className="text-info">Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SignUp;
