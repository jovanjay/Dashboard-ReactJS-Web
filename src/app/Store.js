import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './reducers';

const store = configureStore({ reducer: AppReducer });

export default store;
