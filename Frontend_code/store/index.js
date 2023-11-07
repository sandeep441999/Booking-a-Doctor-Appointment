import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import { createWrapper } from "next-redux-wrapper";


// const initialState = {
//   timeslots: {
//     "10-11 am": true,
//     "11-12 am": true,
//     "2-3 pm": true,
//     "3-4 pm": true,
//   },
//   isAuthorized: false,
// };

// const timeSlotSlice = createSlice({
//     name: 'timeslots',
//     initialState,
//     reducers: {
//         bookalot(state, action) {
//             state.timeslots[action.timeslot] = !state.timeslots[action.timeslot];
//         },
//     }
// });

const store = () => configureStore({
  reducer: {
    auth: authSlice.reducer,
  }
});


// export const timeSlotActions = timeSlotSlice.actions;

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

export const authActions = authSlice.actions;
export const wrapper = createWrapper(store);



// export const wrapper = createWrapper(store);
// export default store;
