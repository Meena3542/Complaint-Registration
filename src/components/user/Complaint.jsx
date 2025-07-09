import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Complaint.css';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userComplaint, setUserComplaint] = useState({
    userId: user._id,
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: '',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios.post(`http://localhost:8000/Complaint/${_id}`, userComplaint)
      .then(res => {
        alert("✅ Your complaint has been submitted!");
        handleClear();
      })
      .catch(err => {
        console.log(err);
        alert("❌ Something went wrong. Please try again.");
      });
  };

  return (
    <div className="complaint-page position-relative d-flex justify-content-center align-items-center">
      {/* Animated background */}
      <div className="animated-background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Animated form card */}
      <motion.div
        className="complaint-form-card shadow-lg p-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60 }}
        style={{ zIndex: 1 }}
      >
        <h3 className="text-center text-primary mb-4" bg="dark">📝 Complaint Registration Form</h3>
        <form onSubmit={handleSubmit}>
          <motion.div className="row" initial="hidden" animate="visible" variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}>
            {["name", "address", "city", "state", "pincode", "status"].map((field, index) => (
              <motion.div
                key={field}
                className="col-md-6 mb-3"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={userComplaint[field]}
                  placeholder={field === 'status' ? 'e.g., Pending' : ''}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="form-label">Complaint Description</label>
            <textarea
              name="comment"
              rows="4"
              className="form-control"
              value={userComplaint.comment}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button type="submit" className="btn btn-primary px-5 py-2">
              🚀 Submit Complaint
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Complaint;
