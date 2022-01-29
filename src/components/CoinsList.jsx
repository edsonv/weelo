import { useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import Loading from './Loading';
import { useGetTop100CoinsQuery } from '../services/CoinLoreApi';
import '../scss/Table.scss';
import '../scss/SearchBar.scss';

function CoinsList() {
  const { data, isFetching } = useGetTop100CoinsQuery();
  const [filteredData, setFilteredData] = useState();
  const [order, setOrder] = useState('none');

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

  const sortParseNumbers = (activeFilter) => {
    let sorted;
    let toFilter = filteredData ? filteredData : data.data;
    switch (order) {
      case "none":
        sorted = toFilter.filter(e => e[activeFilter].length > 0).sort((a, b) => {
          if (JSON.parse(a[activeFilter]) > JSON.parse(b[activeFilter])) {
            return 1;
          }
          if (JSON.parse(a[activeFilter]) < JSON.parse(b[activeFilter])) {
            return -1;
          }
          return 0;
        })
        setOrder('ascendent');
        break;
      case "ascendent":
        sorted = toFilter.filter(e => e[activeFilter].length > 0).sort((a, b) => {
          if (JSON.parse(a[activeFilter]) < JSON.parse(b[activeFilter])) {
            return 1;
          }
          if (JSON.parse(a[activeFilter]) > JSON.parse(b[activeFilter])) {
            return -1;
          }
          return 0;
        })
        setOrder('descendent');
        break;
      case "descendent":
        sorted = filteredData
        setOrder('none');
        break;
      default:
        break;
    }

    setFilteredData(sorted);
  }

  const sortNumbers = (activeFilter) => {
    let sorted;
    let toFilter = filteredData ? filteredData : data.data;
    switch (order) {
      case "none":
        sorted = toFilter.filter(e => e[activeFilter] >= 0).sort((a, b) => {
          if (a[activeFilter] > b[activeFilter]) {
            return 1;
          }
          if (a[activeFilter] < b[activeFilter]) {
            return -1;
          }
          return 0;
        })
        setOrder('ascendent');
        break;
      case "ascendent":
        sorted = toFilter.filter(e => e[activeFilter] >= 0).sort((a, b) => {
          if (a[activeFilter] < b[activeFilter]) {
            return 1;
          }
          if (a[activeFilter] > b[activeFilter]) {
            return -1;
          }
          return 0;
        })
        setOrder('descendent');
        break;
      case "descendent":
        sorted = filteredData
        setOrder('none');
        break;
      default:
        break;
    }

    setFilteredData(sorted);
  }

  const sortStrings = (activeFilter) => {
    let sorted;
    let toFilter = filteredData ? filteredData : data.data;
    switch (order) {
      case "none":
        sorted = toFilter.filter(e => e[activeFilter].length > 0).sort((a, b) => {
          if (a[activeFilter] > b[activeFilter]) {
            return 1;
          }
          if (a[activeFilter] < b[activeFilter]) {
            return -1;
          }
          return 0;
        })
        setOrder('ascendent');
        break;
      case "ascendent":
        sorted = toFilter.filter(e => e[activeFilter].length > 0).sort((a, b) => {
          if (a[activeFilter] < b[activeFilter]) {
            return 1;
          }
          if (a[activeFilter] > b[activeFilter]) {
            return -1;
          }
          return 0;
        })
        setOrder('descendent');
        break;
      case "descendent":
        sorted = filteredData
        setOrder('none');
        break;
      default:
        break;
    }

    setFilteredData(sorted);
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
              <th className='column-title'>Rank <button className='button -showOnMouseOver' onClick={ () => sortNumbers("rank") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Name <button className='button -showOnMouseOver' onClick={ () => sortStrings("symbol") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Price (USD) <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("price_usd") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>% 1H <button className='button -showOnMouseOver' onClick={ () => sortNumbers("percent_change_1h") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>% 24H <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("percent_change_24h") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>% 7d <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("percent_change_7d") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Mk. Cap. (USD) <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("market_cap_usd") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Vol. 24H <button className='button -showOnMouseOver' onClick={ () => sortNumbers("volume24") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Coin Sply. <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("csupply") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Token Sply. <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("csupply") }><i className="fas fa-sort"></i></button></th>
              <th className='column-title'>Mk. Sply. <button className='button -showOnMouseOver' onClick={ () => sortParseNumbers("msupply") }><i className="fas fa-sort"></i></button></th>
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
                        { `$${millify(coin.price_usd)}` }
                      </Link>
                    </td>
                    <td className='cell -text-right'>{ `${Number.parseFloat(coin.percent_change_1h)} %` }</td>
                    <td className='cell -text-right'>{ `${Number.parseFloat(coin.percent_change_24h)} %` }</td>
                    <td className='cell -text-right'>{ `${Number.parseFloat(coin.percent_change_7d)} %` }</td>
                    <td className='cell -text-right'>{ `$${millify(coin.market_cap_usd)}` }</td>
                    {/* <td className='cell -text-right'>{ `$${Number.parseFloat(coin.market_cap_usd).toLocaleString('en-US')}` }</td> */ }
                    <td className='cell -text-right'>{ `$${millify(coin.volume24)}` }</td>
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