import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../../types/app'

interface IAuthState {
    user: IProfile | null | undefined
    token: string
}

const initialState: IAuthState = {
    user: undefined,
    token: '',
}

export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      Login: (state, action: PayloadAction<{ user: IProfile; token: string }>) => {
        state.user = action.payload.user
        state.token = action.payload.token
        
        
      },
      Logout: (state) => {
        localStorage.removeItem('token')
        state.user = undefined
        state.token = ''
      },
    },
  })

  export const {Login, Logout} = counterSlice.actions;

  export default counterSlice.reducer