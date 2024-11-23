// src/components/Categories.js
import React from 'react';
import './Categories.css';
import Category from '../hooks/categorycall';
import { categoryImage } from './assets/constants/Urls/Url';

const CategoryComponent = () => {
  const { categoryData, error, isLoading } = Category();

  return (
    <section className="categories"> 
      {isLoading && <p>Loading categories...</p>}
      {error && <p>Error loading categories: Newwork error</p>}

      <div className="category-list">
        {categoryData && categoryData.map((category, index) => (
          <div className="category-item" key={index}>
            <img src={`${categoryImage+category.name}/${category.image_uri}`} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryComponent;
