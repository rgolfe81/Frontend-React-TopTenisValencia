import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../pages/userSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import tournamentSlice from '../pages/tournamentSlice';

const reducers = combineReducers({
    user: userSlice,
    tournamentId: tournamentSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});