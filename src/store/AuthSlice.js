import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  login: false,
  admin:false

};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLoginState: (state,action)=>{
            state.login =action.payload;
        },
        setAdminState: (state,action)=>{
            state.admin =action.payload;
        },
        setAminState: (state,action)=>{
            state.admin =action.payload;
        },
        setUserName: (state,action)=>{
            state.username =action.payload;
        },
    }
})

export const { setLoginState,setAdminState, setAminState, setUserName } = AuthSlice.actions;
export default AuthSlice.reducer;
