import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { GrCart, GrUser, GrNotification, GrSearch, GrHalt, GrHomeRounded } from "react-icons/gr";
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { searchURL } from './assets/constants/Urls/Url';
import axios from 'axios';
import { mainImageURI } from './assets/constants/Urls/Url';



const Navbar = () => {
  const [menu, setMenu] = useState("/");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [isSticky, setIsSticky] = useState(false)
  const [isStickyL, setIsStickyL] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    // Toggle body scroll based on modal visibility
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on component unmount or modal close
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    };
  
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 200);
      setIsStickyL(scrollPosition > 50);
    }, 100);
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  // close modal
  const closeModal = (e) => {
    if (e.target.className.includes("search-modal")) setShowModal(false);
  };
  
  const handleAccountClick = () => {
    const userId = JSON.parse(localStorage.getItem('id'));
    
    if (userId) {
      navigate('/profile');
      //console.log("profile")
    } else {
      navigate('/login');
      //console.log("login");
      
    }
  };

  

  const handleCardClick = (id) => {
    if (id) {
      navigate(`/product/${id}`);
      setShowModal(false)
    } else {
      //console.error("Invalid product ID: ", id);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${searchURL}?q=${searchQuery}`);
        setSearchResults(response.data || []);
        setShowModal(true);
      } catch (error) {
        //console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
    <nav className="navbar">
      
     
        
        
        <div className="navbar-content">

        <div className='logo-form'>
        <div className="navbar-brand-section">
          <img className="nav-logo" src="/images/logo/FoutaLib.jpeg" alt="logo" />
          <NavLink className="navbar-brand" to="/">FoutaLib</NavLink>
        </div>

        <div className="centered-form">
            <form className="form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <GrSearch onClick={handleSearch} type="submit" className="search-icon" size={24} />
            </form>
        </div>
        </div>

          {/* Navigation Links */}
          <ul className={`ul sticky `}>
          <li className="nav-item" onClick={() => setMenu("/")}>
              <NavLink to="/" className="nav-link">
                <GrHomeRounded size={20} color="gray" />
                {menu === "/" && <hr className="active-line" />}
              </NavLink>
            </li>
            <li className="nav-item" onClick={() =>setMenu("account")}>
              <span onClick={handleAccountClick} className="nav-link" style={{ cursor: 'pointer' }}>
                <GrUser size={20} color="gray" />
                {menu === "account" && <hr className="active-line" />}
              </span>
            </li>
            <li className="nav-item" onClick={() => setMenu("favorite")}>
              <NavLink to="/favorite" className="nav-link">
                <FaHeart size={20} color="gray" />
                {menu === "favorite" && <hr className="active-line" />}
              </NavLink>
            </li>
            
            <li className="nav-item" onClick={() => setMenu("cart")}>
              <NavLink to="/cart" className="nav-link">
                <GrCart size={20} color="gray" />
                {menu === "cart" && <hr className="active-line" />}
                <span className="cart-count"></span>
              </NavLink>
            </li>
          </ul> 
        </div>
      
    </nav>

    {showModal && (
        <div className="search-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <h3>Search Results</h3>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div key={result.id}
                 className="search-result-item"
                 onClick={() => handleCardClick(result.id)}
              style={{ cursor: 'pointer' }}
              >
                   <img 
                src={`${mainImageURI}${String(result.id + "_" + 0)}/${result.id}`} 
                className="card-img-top img-fluid" 
                alt={result.name} 
              />
                  <p>{result.name}</p>
                  {/* Display more details as needed */}
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
