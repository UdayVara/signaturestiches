import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: "",
    isLogin: false,
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        login : (state,action) => {
            state.id = action.payload
            state.isLogin = true
        },
        logout: (state) => {
            state.id = ""
            state.isLogin = false
        }
    }
})

export const {login,logout} = loginSlice.actions

export default loginSlice.reducer