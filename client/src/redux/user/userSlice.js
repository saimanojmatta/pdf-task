import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentuser:null,
    error:null,
    loading:false,
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signinstart:(state)=>{
            state.loading=true
        },
        signinsuccess:(state,action)=>{
            state.currentuser=action.payload
            state.loading=false
            state.error=null
        },
        signinfailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        signoutstart:(state)=>{
            state.loading=true
        },
        signoutsuccess:(state,action)=>{
            state.currentuser=null
            state.loading=false
            state.error=null
        },
        signoutfailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        deleteusersuccess:(state,action)=>{
            state.currentuser=null
            state.loading=false
            state.error=null
        },
        deleteuserfailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
       
    }
})
export const  {signinstart,signinfailure,signinsuccess
,signoutfailure,signoutsuccess,signoutstart,deleteuserfailure,deleteusersuccess}=userSlice.actions
export default userSlice.reducer