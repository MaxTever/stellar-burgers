
import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";


const initialState: TUser = {
  email: "",
  name: "",
}


const 
userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
  selectors: {
    getUser: (state) => state,
  }
})
