import { Link, useParams } from 'react-router-dom';
import { useGetCoinDetailsQuery } from '../services/CoinLoreApi';
import Loading from './Loading';
import '../scss/Table.scss'

function CoinDetails() {
  let params = useParams();
  const { data, isFetching } = useGetCoinDetailsQuery(params.id);

  return isFetching ?
    <Loading /> :
    (
      <>
        <h2 className='title -text-center'>Coin details</h2>
        <Link to={ `/coin/markets/${data[0].id}` }>See Markets</Link>
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
              <th>Coin Sply.</th>
              <th>Token Sply.</th>
              <th>Mk. Sply.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='cell -text-center'>{ data[0].rank }</td>
              <td className='cell -text-center'>
                <Link to={ `/weelo/coin/${data[0].id}` }>
                  { `${data[0].name} ${data[0].symbol}` }
                </Link>
              </td>
              <td className='cell -text-center'>{ Number.parseFloat(data[0].price_usd).toLocaleString('en-US') }</td>
              <td className='cell -text-center'>{ `${data[0].percent_change_24h} %` }</td>
              <td className='cell -text-center'>{ `${data[0].percent_change_1h} %` }</td>
              <td className='cell -text-center'>{ `${data[0].percent_change_7d} %` }</td>
              <td className='cell -text-center'>{ `$${Number.parseFloat(data[0].market_cap_usd).toLocaleString('en-US')}` }</td>
              <td className='cell -text-center'>{ `$${Number.parseFloat(data[0].volume24).toLocaleString('en-US')}` }</td>
              <td className='cell -text-center'>{ Number.parseFloat(data[0].csupply).toLocaleString('en-US') }</td>
              <td className='cell -text-center'>{ Number.parseFloat(data[0].tsupply).toLocaleString('en-US') }</td>
              <td className='cell -text-center'>{ data[0].msupply !== "" ? `${Number.parseFloat(data[0].msupply).toLocaleString('en-US')}` : "" }</td>
            </tr>

          </tbody>
        </table>

      </>
    )
}

export default CoinDetails;