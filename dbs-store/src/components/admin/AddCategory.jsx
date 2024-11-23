// AddCategory.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../assets/constants/Urls/Url';

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    image_uri: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('image_uri', category.image_uri);

    try {
      await axios.post(addCategory, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Category added successfully!');
      setCategory({ name: '', image_uri: '' });
      setImagePreview(null);
      setTimeout(() => navigate('/admins'), 2000); // Navigate back after success
    } catch (err) {
      setError('Failed to add category. Try again.');
    }
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image_uri: file });
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  return (
    <div className="add-category container m4">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            className="row"
            type="text"
            id="categoryName"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image_uri">Category Image:</label>
          <input
            className="row"
            type="file"
            accept=".jpg, .jpeg, .png"
            id="image_uri"
            onChange={imageChange}
            required
          />
        </div>
        {imagePreview && <img src={imagePreview} alt="Category preview" className="image-preview" />}
        <button type="submit" className="btn btn-primary">Add Category</button>
      </form>
      {error && <p className="error">{"Newwork Error"}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AddCategory;
