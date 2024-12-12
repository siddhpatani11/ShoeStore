import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ShoesTable from '../components/home/ShoesTable';
import ShoesCard from '../components/home/ShoesCard';

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    setLoading(true);

    const yearQuery = selectedYear ? `?year=${selectedYear}` : '';

    axios
      .get(`http://localhost:5555/shoes${yearQuery}`)
      .then((response) => {
        setShoes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error fetching shoes:', error);
        setLoading(false);
      });
  }, [selectedYear]);

  const uniqueYears = Array.from(new Set(shoes.map((shoe) => shoe.year)));

  const filteredShoes = selectedYear
    ? shoes.filter((shoe) => shoe.year === selectedYear)
    : shoes;

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      {/* Add Year Filter Dropdown */}
      <div className='my-4'>
        <label htmlFor="yearFilter" className='mr-2'>Filter by Year:</label>
        <select
          id="yearFilter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className='p-2 rounded-md border border-gray-300'
        >
          <option value="">All Years</option>
          {/* Dynamically generate years from the shoes data */}
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Shoes List</h1>
        <Link to='/shoes/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Brand</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Year</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((shoe, index) => (
              <tr key={shoe._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{shoe.name}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{shoe.brand}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{shoe.year}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/shoes/details/${shoe._id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/shoes/edit/${shoe._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/shoes/delete/${shoe._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
