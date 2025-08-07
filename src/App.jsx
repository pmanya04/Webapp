import React, { useState } from 'react';
import { FaWpforms } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    gender: '',
    age: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!formData.email.endsWith('@gmail.com')) {
      setError('Only @gmail.com email addresses are allowed.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('🎉 Data saved successfully!');
        setFormData({ name: '', dob: '', email: '', gender: '', age: '' });
      } else {
        toast.error('❌ Failed to save data.');
      }
    } catch (err) {
      toast.error('⚠️ Error connecting to server.');
      console.error(err);
    }
  };

  return (
    <div className="bg-container">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="glass-card p-5">
          <h2 className="text-center mb-4 text-white fw-bold">
            <FaWpforms className="me-2" />
            User Info Form
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              className="form-control mb-3 glowing-input"
              required
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-control mb-3 glowing-input"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email (must be @gmail.com)"
              pattern="[a-zA-Z0-9._%+-]+@gmail\\.com"
              title="Only @gmail.com emails allowed"
              onChange={handleChange}
              className="form-control mb-3 glowing-input"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control mb-3 glowing-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Age"
              onChange={handleChange}
              className="form-control mb-3 glowing-input"
              required
              min="1"
              max="120"
            />
            {error && <div className="text-danger mb-3">{error}</div>}
            <div className="text-center">
              <button type="submit" className="btn btn-outline-info px-4 fw-bold">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
