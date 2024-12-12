import ShoeSingleCard from './ShoeSingleCard';

const ShoesCard = ({ shoes }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {shoes.map((item) => (
        <ShoeSingleCard key={item._id} shoe={item} />
      ))}
    </div>
  );
};

export default ShoesCard;