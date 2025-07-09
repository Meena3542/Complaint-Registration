import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Alert, Button, Badge, Collapse } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import './Status.css'; // For additional custom styling
import { motion } from 'framer-motion';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    axios.get(`http://localhost:8000/status/${user._id}`)
      .then((res) => setStatusComplaints(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleToggle = (complaintId) => {
    setToggle(prev => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <Badge bg="success">Resolved</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="status-page d-flex flex-wrap justify-content-center gap-4 p-4">
      {statusComplaints.length > 0 ? (
        statusComplaints.map((complaint) => {
          const open = toggle[complaint._id] || false;
          return (
            <motion.div
              key={complaint._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow status-card">
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Name: {complaint.name}
                  </Card.Title>
                  <Card.Text><strong>Address:</strong> {complaint.address}</Card.Text>
                  <Card.Text><strong>City:</strong> {complaint.city}</Card.Text>
                  <Card.Text><strong>State:</strong> {complaint.state}</Card.Text>
                  <Card.Text><strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                  <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                  <Card.Text><strong>Status:</strong> {getStatusBadge(complaint.status)}</Card.Text>

                  <div className="text-end">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleToggle(complaint._id)}
                      aria-controls={`collapse-${complaint._id}`}
                      aria-expanded={open}
                    >
                      💬 Message
                    </Button>
                  </div>

                  <Collapse in={open}>
                    <div id={`collapse-${complaint._id}`} className="mt-3">
                      <Card className="p-2">
                        <ChatWindow complaintId={complaint._id} name={complaint.name} />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </motion.div>
          );
        })
      ) : (
        <motion.div
          className="w-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Alert variant="info">
            <Alert.Heading>📭 No Complaints Found</Alert.Heading>
            <p>You haven’t submitted any complaints yet.</p>
          </Alert>
        </motion.div>
      )}
    </div>
  );
};

export default Status;
