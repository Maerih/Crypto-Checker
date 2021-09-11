import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  FaRegArrowAltCircleRight, FaAngleLeft, FaMicrophone, FaRegSun,
} from 'react-icons/fa';
import List from './List';
import { getCoins } from '../../redux/coins/coins';
import Header from '../header/Header';
import Banner from '../banner/Banner';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state) => state);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!coins.length) {
      dispatch(getCoins());
    }
  }, []);

  useEffect(() => {
    const results = coins.filter(
      (coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm]);

  const today = new Date();
  const [day, month, year] = [today.getDate(), today.getMonth(), today.getFullYear()];
  const date = `${day}.${month}.${year}`;

  return (
    <section>
      <Header
        backIcon={<FaAngleLeft />}
        date={date}
        text="Crypto Stats"
        micIcon={<FaMicrophone />}
        settingsIcon={<FaRegSun />}
      />
      <Banner
        logo="https://res.cloudinary.com/dssc4mht3/image/upload/v1631322600/banner-img-crypto_a3cma6.png"
        coinName="CRYPTO-STATS"
        coinStat={46313.68}
        info="Current market Leader - Bitcon: at "
        details={false}
      />
      <input
        type="text"
        placeholder="Filter by currency name..."
        value={searchTerm}
        onChange={handleChange}
      />
      <List
        coins={!searchResults.length ? coins : searchResults}
        arrowIcon={<FaRegArrowAltCircleRight />}
      />
    </section>
  );
};

export default Home;
