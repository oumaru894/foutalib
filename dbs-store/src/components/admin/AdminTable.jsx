import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { deleteProductURL } from '../assets/constants/Urls/Url';

const AdminTable = ({ items: initialItems, type = '' }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems || []);
  const [selectedItem,  setSelectedItem] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  

  // Generate headers dynamically based on the first item's keys
  const headers = items && items.length > 0 ? Object.keys(items[0]) : [];
  
  // Capitalize type for display if it exists
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Item';

  const handleDelete = (id) => {

    if (displayType && displayType==='Product'){
    axios.delete(`${deleteProductURL}${id}`).then(() => {
      setItems(items.filter((item) => item.id !== id));
    }).catch(()=>{
      setError('error deleting product')
    });
  }
  else if(displayType && displayType==='Category')
    axios.delete(deleteProductURL).then(() => {
      setItems(items.filter((item) => item.id !== id));
    }).catch(()=>{
      setError('error deleteing category')
      
    });
  };
  
  return (
    <>
      {items && items.length > 0 ? (
        <div className="admin-table-container">
          <div className='row'>
            <h2 className="admin-table-title col add">{displayType}</h2>

            <button onClick={() => navigate(`/admins/add-${type.toLowerCase()}`)} className="btn btn-primary col add">
              Add {displayType}
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <table className="admin-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {headers.map((header) => (
                    <td key={header}>{item[header]}</td>
                  ))}
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => setSelectedItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <button onClick={() => navigate(`/admins/add-${type.toLowerCase()}`)} className="btn btn-primary col add">
              Add {displayType}
            </button>
      )}
    </>
  );
};

export default AdminTable;
