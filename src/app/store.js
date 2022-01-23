import { configureStore } from '@reduxjs/toolkit';
import { coinLoreApi } from '../services/CoinLoreApi'

export default configureStore({
  reducer: {
    [coinLoreApi.reducerPath]: coinLoreApi.reducer,
  }
})