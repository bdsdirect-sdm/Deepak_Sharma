import { createSlice } from "@reduxjs/toolkit";


const intilaState = {
    user_type:localStorage.getItem("user_type") ? JSON.parse(localStorage.getItem("user_type") as string): null,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
}

const userSlice = createSlice({
    name:"user",
    initialState: intilaState,
    reducers:{
        setUserType:(state,value) =>{
            state.user_type = value.payload;
        },
        setToken:(state,value) =>{
            state.token = value.payload;
        },
        logout:(state) => {
            state.token = null;
            state.user_type = null;
        }
        

    }

})

export const {setToken,setUserType,logout} = userSlice.actions;

export default userSlice.reducer;