import axios from 'axios';
import { 
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS 
} from '../constants/userConstants';

export const userRegisterAction = (input) => async(dispatch) => {
  const {name, email, password} = input;

  try {
    dispatch({type: USER_REGISTER_REQUEST})

    const config = {
      headers : {
        "Content-Type" : "application/json"
      }
    }

    const {data} = await axios.post(
      '/api/user/register', 
      {name, email, password},
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
    
    localStorage.setItem('userDetails', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.resnponse && error.resnponse.data.message ?
        error.resnponse.data.message : error.resnponse
    })
  }
}

export const userLoginAction = (login) => async(dispatch) => {
  try {
    const {email, password} = login;

    dispatch({type: USER_LOGIN_REQUEST})
  
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
  
    const {data} = await axios.post(
      `/api/user/login`,
      {email, password},
      config
      )
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      })

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      })
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data
      })

      localStorage.setItem('userDetails', JSON.stringify(data))
    
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.resnponse && error.resnponse.data.message ? 
        error.resnponse.data.message : error.resnponse
    })
  }
}

export const logoutAction = () => async(dispatch) =>{
  localStorage.clear();
  dispatch({type: USER_LOGOUT})
}

export const userProfileAction = () => async(dispatch, getState) =>{
  try {
    dispatch({type: USER_PROFILE_REQUEST})

  const {userLoginReducer:{userDetails:{token}}} = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const {data} = await axios.get('/api/user/profile', config)

  dispatch({
    type: USER_PROFILE_SUCCESS,
    payload: data
  })

  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: data
  })

  dispatch({
    type: USER_REGISTER_SUCCESS,
    payload: data
  })
    
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const userUpdateAction = (input) => async(dispatch, getState) => {
  try {

    const {name, password, id} = input

    dispatch({type: USER_UPDATE_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();
    const config = {
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    }

    const {data} = await axios.post(
      `/api/user/update/${id}`,
      {name, password},
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
  
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
  
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    localStorage.setItem('userDetails', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}