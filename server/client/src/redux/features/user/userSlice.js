import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  profile: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      reducer(state, action) {
        state.active = true;
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        state.profile.push(action.payload);
      },
    },

    logout: {
      reducer(state) {
        state.active = false;
        localStorage.clear();
        state.profile.pop();
      },
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
