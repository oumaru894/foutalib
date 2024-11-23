import React from 'react'

export const usersession = () => {

    const getUserId = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return user ? user.id : null; // Return user ID if user exists
    };
    
    const getUser = () => {
        return JSON.parse(sessionStorage.getItem('user')); // Get full user object
    };
    
    return { getUserId, getUser };
};
      