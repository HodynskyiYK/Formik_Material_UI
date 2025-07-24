import { configureStore } from "@reduxjs/toolkit";
import usersSlice, {createNewUser, fetchUsers} from "./slices/usersSlice";


export const store = configureStore({
    reducer: {
        users: usersSlice.reducer
    },
})

export const actions = {
    ...usersSlice.actions,
    fetchUsers,
    createNewUser,
}


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;