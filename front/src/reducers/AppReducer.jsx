import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './UserReducer/UserReducer';

const appReducer = combineReducers({
    user: userReducer
});

export default appReducer