import { createSlice } from '@reduxjs/toolkit';
import { refreshTokenApi, signInApi, signOutApi } from 'src/api/authApi';
import { getUsersApi } from 'src/api/userApi';
import tokenService from 'src/services/tokenService';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  userInfo: {}
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    _signIn(state, {payload}) {
      state.userInfo = payload
    },

    _refreshToken(state, {payload}) {
      state.userInfo = payload
    },

    _getUsers(state, {payload}) {
      state.userInfo = {...state.userInfo, payload}
    },



    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
const {
  _signIn,
  _refreshToken,
  _getUsers,
  startLoading,
  getLabelsSuccess,
  hasError
} = slice.actions
// ----------------------------------------------------------------------

export const signIn =  (data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await signInApi(data)
      console.log("signin response====", response);
      // dispatch(_signIn(response.data))
      tokenService.setUser(response.data.user)
      // dispatch(getLabelsSuccess(response.data.labels));
    } catch (error) {
      // dispatch(hasError(error));
    }
}

export const signOut =  (data) => async (dispatch) => {
    // dispatch(startLoading());
    const refreshToken = tokenService.getLocalRefreshToken()
      console.log("refreshToken ****====", refreshToken);
      try {
      const response = await signOutApi(refreshToken)
      console.log("signout **** response====", response);
      // dispatch(_signIn(response.data))
      // tokenService.setUser(response.data.user)
      // dispatch(getLabelsSuccess(response.data.labels));
    } catch (error) {
      // dispatch(hasError(error));
    }
}

export const refreshToken = (data) => async (dispatch) => {
  // dispatch(startLoading());
  try {
    const response = await refreshTokenApi(data)
    console.log("refreshToken response====", response);
    dispatch(_refreshToken(response))
    // dispatch(getLabelsSuccess(response.data.labels));
  } catch (error) {
    // dispatch(hasError(error));
  }
}

export const getUsers = (data) => async (dispatch) => {
  // dispatch(startLoading());
  try {
    const response = await getUsersApi(data)
    console.log("get allusers response====", response);
    // dispatch(_getUsers(response))
    // dispatch(getLabelsSuccess(response.data.labels));
  } catch (error) {
    // dispatch(hasError(error));
  }
}