import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import Products from '../../hooks/Productcall';
import Category from '../../hooks/categorycall';
import { UsersCall } from '../../hooks/UsersCall';
import AdminTable from './AdminTable';

const AdminNav = () => {
  const [data, setData] = useState(null); // Holds fetched data
  const [selectedItem, setSelectedItem] = useState('Home'); // Tracks selected item

  // Hook instances for fetching data
  const productHook = Products();
  const categoryHook = Category();
  const userHook = UsersCall();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (selectedItem === "Product") {
          response = productHook.productData.map((item) => ({
            id: item.id,
            Name: item.name,
            price: item.price,
            category: item.category,
          }));
        } else if (selectedItem === "Category") {
          response = categoryHook.categoryData.map((item) => ({
            id: item.id,
            Name: item.name,
          }));
        } else if (selectedItem === "User") {
          response = userHook.userData.map((user) => ({
            id: user.id,
            Name: user.displayed_name,
            username: user.username,
            email: user.email,
          }));
        }
        if (response) setData(response);
      } catch (error) {
        //console.error(`Error fetching ${selectedItem} data:`, error);
      }
    };
    fetchData();
  }, [selectedItem]);

  const handleItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="admin-dashboard">
      <nav className="nav flex-column my-3">
        <Link onClick={() => handleItem('Home')} className="nav-link">Home</Link>
        <Link onClick={() => handleItem('Product')} className="nav-link">Products</Link>
        <Link onClick={() => handleItem('Category')} className="nav-link">Category</Link>
        <Link onClick={() => handleItem('User')} className="nav-link">Users</Link>
      </nav>

      <div className="admin-content">
        {selectedItem === 'Home' ? (
          <h2>Welcome to the Admin Dashboard</h2>
        ) : (
          <AdminTable items={data} type={selectedItem} />
        )}
      </div>
    </div>
  );
};

export default AdminNav;
