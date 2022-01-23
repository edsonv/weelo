import { Link } from 'react-router-dom';
import '../scss/Header.scss'

function Header() {
  return (
    <header className='header'>
      <h1 className='header-title'>
        <Link to="/">Coin Lore Crypto Data</Link>
      </h1>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li className='list-item'>
            <Link to="/">First 100 coins</Link>
          </li>
          <li className='list-item'>
            <Link to="/exchanges">Exchanges</Link>
          </li>
          <li className="list-item">
            <Link to="/globaldata">Global Crypto Data</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header