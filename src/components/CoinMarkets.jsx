import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMarketsQuery } from '../services/CoinLoreApi';
import Loading from './Loading';
import '../scss/Table.scss';
import '../scss/SearchBar.scss';

const CoinMarkets = () => {
  let params = useParams();
  const { data, isFetching } = useGetMarketsQuery(params.id);
  const [filteredData, setFilteredData] = useState();

  const handleChangeSearchTerm = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      const filteredData = data.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.base.toLowerCase().includes(searchTerm.toLowerCase()) || e.quote.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(data)
    }
  }

  return isFetching ?
    <Loading /> :
    (
      <>
        <h2 className='title -text-center'>First 50 markets</h2>
        <form className='search-form'>
          <div className='input-group'>
            <label htmlFor="inputSearch" className='label'>Search</label>
            <input type="text" name="" id="inputSearch" className='input -search' onChange={ e => handleChangeSearchTerm(e.target.value) } />
          </div>
          <button type="submit" className='button -submit'><i className="fas fa-search"></i></button>
        </form >
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Pair</th>
              <th>Price</th>
              <th>Vol. (USD</th>
            </tr>
          </thead>
          <tbody>
            {
              (filteredData ? filteredData : data).map(market => {
                return (
                  <tr key={ `${market.name}:${market.base}${market.quote}` }>
                    <td className='cell -text-center'>{ market.name }</td>
                    <td className='cell -text-center'>{ `${market.base}/${market.quote}` }</td>
                    <td className='cell -text-center'>{ Number.parseFloat(market.price).toLocaleString('en-US') }</td>
                    <td className='cell -text-center'>{ Number.parseFloat(market.volume_usd).toLocaleString('en-US') }</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    )
}

export default CoinMarkets;