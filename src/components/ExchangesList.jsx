import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useGetExchangesQuery } from '../services/CoinLoreApi';
import '../scss/Table.scss';
import '../scss/SearchBar.scss';

const ExchangesList = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const [filteredData, setFilteredData] = useState();

  const handleChangeSearchTerm = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      const filteredData = Object.values(data).filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(Object.values(data))
    }
  }

  return isFetching ?
    <Loading /> :
    (
      <>
        <h2 className="title -text-center">Exchanges</h2>
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
              <th>URL (external)</th>
              <th>Country</th>
              <th>Date Live</th>
              <th>Vol.</th>
              <th>Pairs</th>
            </tr>
          </thead>
          <tbody>
            { (filteredData ? filteredData : Object.values(data)).map(exchange => {
              return (
                <tr key={ exchange.id } className='row'>
                  <td className='cell -text-center'>
                    <Link to={ `/exchange/${exchange.id}` }>{ exchange.name }</Link>
                  </td>
                  <td className='cell -text-center'>
                    <a href={ exchange.url }>{ exchange.url }</a>
                  </td>
                  <td className='cell -text-center'>{ exchange.country }</td>
                  <td className='cell -text-center'>{ exchange.date_live }</td>
                  <td className='cell -text-right'>{ `$${Number.parseFloat(exchange.volume_usd).toLocaleString('en-US')}` }</td>
                  <td className='cell -text-center'>{ exchange.pairs }</td>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </>
    )
}

export default ExchangesList;