import React, { useEffect, useState } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';
import AdminStats from './AdminStats';


import './AdminHome.css'; // Custom styles

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar shadow">
        <div className="sidebar-header">
          <h4>ComplaintCare</h4>
          <p className="text-light small">Welcome, Admin</p>
          <strong className="text-warning">{userName}</strong>
        </div>
        <Nav className="flex-column mt-4">
          <Nav.Link onClick={() => setActiveComponent('dashboard')} className={activeComponent === 'dashboard' ? 'active' : ''}>
            📊 Dashboard
          </Nav.Link>
          <Nav.Link onClick={() => setActiveComponent('UserInfo')} className={activeComponent === 'UserInfo' ? 'active' : ''}>
            👥 Users
          </Nav.Link>
          <Nav.Link onClick={() => setActiveComponent('Agent')} className={activeComponent === 'Agent' ? 'active' : ''}>
            🧑‍💼 Agents
          </Nav.Link>
          <Button variant="outline-light" size="sm" className="mt-4" onClick={LogOut}>
            🔒 Logout
          </Button>
        </Nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
  <div className="header bg-gradient p-3 rounded shadow-sm mb-4">
    <h2 className="custom-header-title">
      {activeComponent === 'dashboard'
        ? 'Dashboard'
        : activeComponent === 'UserInfo'
        ? 'Users'
        : 'Agents'}
    </h2>
    <p className="mb-0 custom-header-subtitle">
      Manage and monitor complaints effectively.
    </p>
  </div>


        <Container fluid>
          <div className="content-box p-4 bg-white shadow-sm rounded">
            {activeComponent === 'dashboard' && (
  <>
    <AdminStats />
    <AccordionAdmin />
  </>
)}

            {activeComponent === 'UserInfo' && <UserInfo />}
            {activeComponent === 'Agent' && <AgentInfo />}
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-light text-center py-2">
        <small>© 2025 ComplaintCare | All rights reserved</small>
      </footer>
    </div>
  );
};

export default AdminHome;
