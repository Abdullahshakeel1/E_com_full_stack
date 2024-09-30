import React, { useEffect, useState } from 'react';
import { SummaryApi } from '../common';
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryLoader = new Array(13).fill(null);

  const getCategory = async () => {
    try {
      const response = await axios.get(SummaryApi.GetProductByCategory.url);
      if (response?.data?.success) {
        setCategory(response.data.data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while fetching categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {loading ? (
          categoryLoader.map((el, i) => (
            <div key={i} className='rounded-full overflow-hidden md:h-20 md:w-20 h-16 w-16 p-4 bg-slate-200 animate-pulse'>{el}</div>
          ))
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : (
          category.map((product, index) => (
            <Link  to={"/product-category?category=" + product?.category}  key={index} className='cursor-pointer'>
              <div className='rounded-full overflow-hidden md:h-20 md:w-20 h-16 w-16 p-4 bg-slate-200 flex justify-center items-center'>
                <img
                  className='object-scale-down h-full mix-blend-multiply hover:scale-125 transition-all'
                  src={product?.productImage[0]} alt={product?.category} 
                />
              </div>
              <p className='text-center text-sm md:text-base capitalize'>
                {product?.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
