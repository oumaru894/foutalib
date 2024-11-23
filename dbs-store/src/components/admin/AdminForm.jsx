import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'

const AdminForm = ({ item, setItems }) => {
  const [formData, setFormData] = useState({ name: '' });

  /* useEffect(() => {
    if (item) {
      setFormData({ name: item.name });
    } else {
      setFormData({ name: '' });
    }
  }, [item]); */

  useEffect(() => {
    // Mock data to display in the absence of an actual API
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    setItems(mockData);

    if (item) {
      setFormData({ name: item.name });
    } else {
      setFormData({ name: '' });
    }
  }, [item, setItems]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      // Update item
      axios.put(`/api/items/${item.id}`, formData).then((response) => {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? response.data : i))
        );
      });
    } else {
      // Add new item
      axios.post('/api/items', formData).then((response) => {
        setItems((prev) => [...prev, response.data]);
      });
    }
  };

  return (
    <div className="my-4">
      <div className="mb-3">
        {/*<label htmlFor="name" className="form-label">
          Name
        </label>
         <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /> */}
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        {item ? 'Update' : 'Add'} Item
      </button>
    </div>
  );
};

export default AdminForm;
