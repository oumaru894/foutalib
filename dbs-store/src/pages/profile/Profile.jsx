import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css'; // Ensure your CSS matches the updated structure
import { FaBell, FaHeart, FaShoppingCart, FaBox, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('id'));
    const user = JSON.parse(localStorage.getItem(`user_${userId}`));
    if (user) {
      setUserData(user);
    }

    if (!userId) {
      navigate('/login'); // Redirect if user is not logged in
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Clear all cached data
    navigate('/login');
  };

  if (!userData) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div className="profile">
      <h1>Welcome, {userData.displayed_name || "John Doe"}</h1>
      <div className="profile-details">
        <div className="profile-picture">
          <img src="/images/space.jpg" alt="profile" />
        </div>
        <p>{userData.displayed_name || "John Doe"}</p>
      </div>

      <hr />
      <div>
        <ul className="profile-menu">
          <li>
            <a href="/notification">
              <FaBell size={18} /> Notification
            </a>
          </li>
          <hr />
          <li>
            <a href="/favorite">
              <FaHeart size={18} /> Favorites
            </a>
          </li>
          <hr />
          <li>
            <a href="/orders">
              <FaBox size={18} /> Orders
            </a>
          </li>
          <hr />
          <li>
            <a href="/cart">
              <FaShoppingCart size={18} /> Cart
            </a>
          </li>
          <hr />
          <li>
            <a
              href="#"
              onClick={() => {
                localStorage.clear();
                alert('Cache cleared!');
              }}
            >
              <FaTrashAlt size={18} /> Clear Cache
            </a>
          </li>
          <hr />
          <li>
            <a href="#" onClick={handleLogout}>
              <FaSignOutAlt size={18} /> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
