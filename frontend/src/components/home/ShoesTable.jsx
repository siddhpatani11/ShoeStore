import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShoesTable = ({ shoes }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Brand
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Year
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {shoes.map((shoe, index) => (
          <tr key={shoe._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {shoe.name}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {shoe.brand}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {shoe.year}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/shoes/details/${shoe._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/shoes/edit/${shoe._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/shoes/delete/${shoe._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShoesTable;