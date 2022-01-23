import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { useGetExchangeQuery } from '../services/CoinLoreApi';
import '../scss/Table.scss'

function ExchangeDetails() {
  let params = useParams();
  const { data, isFetching } = useGetExchangeQuery(params.id);

  return isFetching ?
    <Loading /> :
    (
      <>
        <h2 className='title -text-center'>Exchange Details</h2>
        <ul>
          <li>Name: { data[0].name }</li>
          <li>URL (external): <a href={ data[0].url } target="_blank" rel="noopener noreferrer">{ data[0].url }</a></li>
          <li>Date Live: { data[0].date_live }</li>
        </ul>
        <table className='table'>
          <thead>
            <tr>
              <th colSpan="5">Top 100 Pairs</th>
            </tr>
            <tr>
              <th>Base</th>
              <th>Quote</th>
              <th>Vol.</th>
              <th>Price</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            { data.pairs.map(pair => {
              return (
                <tr key={ `${pair.base}/${pair.quote}/${pair.volume}` }>
                  <td className='cell -text-center'>{ pair.base }</td>
                  <td className='cell -text-center'>{ pair.quote }</td>
                  <td className='cell -text-center'>{ `$${Number.parseFloat(pair.volume).toLocaleString('en-US')}` }</td>
                  <td className='cell -text-center'>{ `$${Number.parseFloat(pair.price).toLocaleString('en-US')}` }</td>
                  <td className='cell -text-center'>{ `$${Number.parseFloat(pair.price_usd).toLocaleString('en-US')}` }</td>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </>
    )
}

export default ExchangeDetails;