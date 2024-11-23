import React from 'react';
import AdminNav from './AdminNav';
import AdminTable from './AdminTable';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard container">
      <AdminNav />
      {/* <h2 className="my-4">Admin Dashboard</h2> */}
      {/* <AdminTable /> */}
    </div>
  );
};

export default AdminDashboard;
