// Home.jsx (Updated with dark mode + typed animation + feature section)
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Footer from './FooterC';
import Image1 from '../../Images/Image1.png';
import { ReactTyped } from 'react-typed';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const themeClass = darkMode ? 'dark-theme' : 'light-theme';

  return (
    <div className={`home-wrapper ${themeClass}`}>
      {/* Navbar */}
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className={darkMode ? 'text-light' : 'text-dark'}>
            ComplaintCare
          </Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </Button>
            </li>
            <li className="nav-item">
              <Link to="/" className={`nav-link ${darkMode ? 'text-light' : 'text-dark'}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className={`nav-link ${darkMode ? 'text-light' : 'text-dark'}`}>SignUp</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className={`nav-link ${darkMode ? 'text-light' : 'text-dark'}`}>Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="hero-section d-flex flex-wrap align-items-center justify-content-between p-5">
        <img src={Image1} alt="Hero" className="img-fluid col-md-6 mb-4 mb-md-0" />
        <div className="col-md-5">
          <ReactTyped
            strings={[
              "Online Complaint Registration",
              "Solve Public Problems Instantly",
              "Fast, Transparent Complaint Handling"
            ]}
            typeSpeed={40}
            backSpeed={30}
            loop
            className="fs-5 text-primary fw-semibold"
          />
          <h1 className="fw-bold mt-3">Empower Your Team</h1>
          <p className="lead">
            Exceed Customer Expectations with our Complaint Management Solution
          </p>
          <Link to="/Login">
            <Button className="mt-3 px-4 py-2" variant="primary">
              Register your Complaint
            </Button>
          </Link>
        </div>
      </Container>

      {/* Feature Cards */}
      <Container className="feature-section py-5">
        <h2 className="text-center mb-4">Why Choose ComplaintCare?</h2>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {[
            { icon: '💬', title: 'Easy Complaint Submission', desc: 'Quick and user-friendly process to raise complaints.' },
            { icon: '🕒', title: 'Real-time Updates', desc: 'Track the status of your complaint anytime.' },
            { icon: '📊', title: 'Role-based Dashboards', desc: 'Custom views for Admins, Agents, and Users.' },
            { icon: '🔐', title: 'Secure Access', desc: 'Your data is protected with role-based authentication.' },
          ].map((feature, idx) => (
            <Card key={idx} style={{ width: '18rem' }} className="text-center shadow">
              <Card.Body>
                <Card.Title style={{ fontSize: '2rem' }}>{feature.icon}</Card.Title>
                <Card.Subtitle className="mb-2 fw-bold">{feature.title}</Card.Subtitle>
                <Card.Text>{feature.desc}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
