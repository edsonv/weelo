import { useState } from 'react';
import '../scss/SearchBar.scss'

function SearchBar(props) {
  const [results, setResults] = useState(props.data);

  const sendFilteredData = () => {
    props.parentCallback(results);
  }

  const handleChangeSearchTerm = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      const filteredData = props.data.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredData);
    }
    sendFilteredData();
  }

  return (
    <form className='search-form'>
      <div className='input-group'>
        <label htmlFor="inputSearch" className='label'>Search</label>
        <input type="text" name="" id="inputSearch" className='input -search' onChange={ e => handleChangeSearchTerm(e.target.value) } />
      </div>
      <button type="submit" className='button -submit'><i className="fas fa-search"></i></button>
    </form >
  )
}

export default SearchBar;