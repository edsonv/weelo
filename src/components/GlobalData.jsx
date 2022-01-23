import Loading from './Loading';
import { useGetGlobalCryptoDataQuery } from '../services/CoinLoreApi';

function GlobalData() {
  const { data, isFetching } = useGetGlobalCryptoDataQuery();

  return isFetching ?
    <Loading /> :
    (
      <>
        <h2 className='title -text-center'>Global Crypto Data</h2>
        <ul className='global-data-list'>
          <li className='item'>
            Coins: { data[0].coins_count }
          </li>
          <li className='item'>
            Act. Mks.: { data[0].active_markets }
          </li>
          <li className='item'>
            Total Mk. Cap: { `$${Number.parseFloat(data[0].total_mcap).toLocaleString('en-US')}` }
          </li>
          <li className='item'>
            Mk. Cap. Change: { `${data[0].mcap_change} %` }
          </li>
          <li className='item'>
            Mk. Cap. ATH: { `$${Number.parseFloat(data[0].mcap_ath).toLocaleString('en-US')}` }
          </li>
          <li className='item'>
            Total Vol.: { `$${Number.parseFloat(data[0].total_volume).toLocaleString('en-US')}` }
          </li>
          <li className='item'>
            Vol. Change: { `${data[0].volume_change} %` }
          </li>
          <li className='item'>
            Avg. Change: { `${data[0].avg_change_percent} %` }
          </li>
          <li className='item'>
            Vol. ATH: { `$${Number.parseFloat(data[0].volume_ath).toLocaleString('en-US')}` }
          </li>
          <li className='item'>
            Dominance: BTC { `${data[0].btc_d} %` }  ETH { `${data[0].eth_d} %` }
          </li>
        </ul >
      </>
    )
}

export default GlobalData;