import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowShoe = () => {
  const [shoe, setShoe] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/shoes/${id}`)
      .then((response) => {
        setShoe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Shoe</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{shoe._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{shoe.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Brand</span>
            <span>{shoe.brand}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Year</span>
            <span>{shoe.year}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(shoe.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(shoe.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowShoe