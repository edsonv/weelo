import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const coinLoreApiHeaders = {
  // "Content-type": "application/json",
}

const baseUrl = 'https://api.coinlore.net/api';

const createRequest = (url) => ({ url, headers: coinLoreApiHeaders })
export const coinLoreApi = createApi({
  reducerPath: 'coinLoreApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getGlobalCryptoData: builder.query({
      query: () => createRequest('/global/')
    }),

    getTop100Coins: builder.query({
      query: () => createRequest('/tickers/')
    }),

    getCoinDetails: builder.query({
      query: (id) => createRequest(`/ticker/?id=${id}`)
    }),

    getExchanges: builder.query({
      query: () => createRequest('/exchanges/')
    }),

    getExchange: builder.query({
      query: (id) => createRequest(`/exchange/?id=${id}`)
    }),

    getMarkets: builder.query({
      query: (id) => createRequest(`/coin/markets/?id=${id}`)
    })

  })
})

export const {
  useGetGlobalCryptoDataQuery,
  useGetTop100CoinsQuery,
  useGetCoinDetailsQuery,
  useGetExchangesQuery,
  useGetExchangeQuery,
  useGetMarketsQuery
} = coinLoreApi;
