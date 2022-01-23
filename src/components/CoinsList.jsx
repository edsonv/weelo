import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useGetTop100CoinsQuery } from '../services/CoinLoreApi';
import '../scss/Table.scss';
import '../scss/SearchBar.scss';

function CoinsList() {
  const { data, isFetching } = useGetTop100CoinsQuery();
  const [filteredData, setFilteredData] = useState();

  const handleChangeSearchTerm = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      const filteredData = data.data.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(data.data)
    }
  }

  return isFetching ?
    <Loading /> :
    (
      <>
        <h2 className="title -text-center">First 100 coins</h2>
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
              <th>Rank</th>
              <th>Name</th>
              <th>Price (USD)</th>
              <th>Change % 24H</th>
              <th>Change % 1H</th>
              <th>Change % 7d</th>
              <th>Mk. Cap. (USD)</th>
              <th>Vol. 24H</th>
              <th>Coin Sply</th>
              <th>Token Sply.</th>
              <th>Mk. Sply.</th>
            </tr>
          </thead>
          <tbody>
            {
              (filteredData ? filteredData : data.data).map(coin => {
                return (
                  <tr key={ coin.id } className='row'>
                    <td className='cell -text-center'>{ coin.rank }</td>
                    <td className='cell -text-center'>
                      <Link to={ `/coin/${coin.id}` } title={ coin.name }>
                        { coin.symbol }
                      </Link>
                    </td>
                    <td className='cell -text-right'>
                      <Link to={ `/coin/markets/${coin.id}` }>
                        { `$${Number.parseFloat(coin.price_usd).toLocaleString('en-US')}` }
                      </Link>
                    </td>
                    <td className='cell -text-right'>{ `${coin.percent_change_24h} %` }</td>
                    <td className='cell -text-right'>{ `${coin.percent_change_1h} %` }</td>
                    <td className='cell -text-right'>{ `${coin.percent_change_7d} %` }</td>
                    <td className='cell -text-right'>{ `$${Number.parseFloat(coin.market_cap_usd).toLocaleString('en-US')}` }</td>
                    <td className='cell -text-right'>{ `$${Number.parseFloat(coin.volume24).toLocaleString('en-US')}` }</td>
                    <td className='cell -text-right'>{ `${Number.parseFloat(coin.csupply).toLocaleString('en-US')}` }</td>
                    <td className='cell -text-right'>{ `${Number.parseFloat(coin.tsupply).toLocaleString('en-US')}` }</td>
                    <td className='cell -text-right'>{ coin.msupply !== "" ? `${Number.parseFloat(coin.msupply).toLocaleString('en-US')}` : "" }</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    )

}

export default CoinsList;