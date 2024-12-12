
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateShoe = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveShoe = () => {
    const data = {
      name,
      brand,
      year,
    };
    console.log('Data to be sent for shoe creation:', data);
    setLoading(true);
    axios
      .post('http://localhost:5555/shoes', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Shoe Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log('Error creating shoe:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Shoe</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Brand</label>
          <input
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Year</label>
          <input
            type='number'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveShoe}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateShoe
