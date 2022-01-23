import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Coin from './pages/Coin';
import Exchanges from './pages/Exchanges';
import Exchange from './pages/Exchange';
import GlobalData from './components/GlobalData';
import './scss/main.scss'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route index element={ <Home /> } />
          <Route
            path='/coin/:id'
            element={ <Coin /> }
          />
          <Route
            path="/coin/markets/:id"
            element={ <Markets /> }
          />
          <Route
            path="/exchanges"
            element={ <Exchanges /> } />
          <Route
            path="/exchange/:id"
            element={ <Exchange /> }
          />
          <Route
            path="/globaldata"
            element={ <GlobalData /> }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
