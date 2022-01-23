import Header from './Header';
import SearchBar from './SearchBar';

function Layout(props) {
  return (
    <>
      <Header />
      <main>
        { props.children }
      </main>
    </>
  )
}

export default Layout;