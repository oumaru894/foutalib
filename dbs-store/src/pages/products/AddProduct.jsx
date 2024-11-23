import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addImageURL, addProductURL } from '../../components/assets/constants/Urls/Url';
import axios from 'axios';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';
import Category from '../../hooks/categorycall';

// Reusable form input component
const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, min = 0 }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={type === 'number' ? min : undefined}
    />
  </div>
);

function AddProduct() {
  const navigate = useNavigate()
  const {categoryData} = Category();
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    status: 'In Stock',
    category: 'select',
    type: 'Physical',
    price: 100,
    costPerItem: 50,
    description: '',
    images: [],
    trackQuantity: true,
    maxOrderQuantity: 0,
    sku: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  


  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      // Make sure the selected category is an integer
      setProduct({
        ...product,
        category: parseInt(selectedCategory, 10),  // Ensure the category is an integer
      });
      //console.log(selectedCategory);
    }
  };
  
  

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...product.images];

    // Store both the file and a preview URL
    newImages[index] = {
      file: file,
      preview: URL.createObjectURL(file), // Temporary URL for the preview
    };
    
    setProduct({
      ...product,
      images: newImages,
    });
  };

  const removeImageField = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct({
      ...product,
      images: newImages,
    });
  };

  const addImageField = () => {
    setProduct({
      ...product,
      images: [...product.images, ''],
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const productRes = await axios.post(addProductURL, {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        status: product.status === 'In Stock' ? true : false,
      });
      
     

      // Create a FormData object to handle the image uploads
      const formData = new FormData();
      product.images.forEach((imageObj, index) => {
        if (imageObj && imageObj.file) {
          formData.append('images', imageObj.file); // Append the file
        }
      });

      const imagesRes = await axios.post(addImageURL + `${productRes.data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //console.log('Images uploaded:', imagesRes);
      navigate('/admins')
      setIsLoading(false)
      // Clear form or show success message here
    } catch (error) {
      //console.error('Error:', error.response ? error.response.data : error.message);
      //console.log('catevvvvvvgory:',product.category)
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add Product</h3>

      <div className="mb-3">
        <label className="form-label">Images</label>
        {product.images.map((imageObj, index) => (
          <div key={index} className="mb-2">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
            {imageObj && imageObj.preview && (
              <>
                <img
                  src={imageObj.preview}
                  alt={`Product ${index + 1}`}
                  className="img-thumbnail mt-2"
                  style={{ width: '150px' }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeImageField(index)}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addImageField}>
          Add Another Image
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Item name"
        />

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            value={product.status}
            onChange={handleChange}
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
          >
            <option value="select" disabled>Select Category</option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-control"
            name="type"
            value={product.type}
            onChange={handleChange}
          >
            <option value="Physical">Physical</option>
            <option value="Digital">Digital</option>
          </select>
        </div>

        <FormInput
          label="Price ($)"
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          min={0}
        />

        <FormInput
          label="Cost per Item ($)"
          type="number"
          name="costPerItem"
          value={product.costPerItem}
          onChange={handleChange}
          min={0}
        />

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Add product description here"
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="trackQuantity"
            checked={product.trackQuantity}
            onChange={handleChange}
          />
          <label className="form-check-label">Track Quantity</label>
        </div>

        <FormInput
          label="SKU"
          name="sku"
          value={product.sku}
          onChange={handleChange}
          placeholder="SKU"
        />

        {isLoading?"Loading...":
        <button type="submit" className="btn btn-primary">
        Add Item
      </button>}
      </form>
    </div>
  );
}

export default AddProduct;
