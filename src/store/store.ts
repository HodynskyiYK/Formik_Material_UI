import { configureStore } from "@reduxjs/toolkit";
import usersSlice, {createNewUser, fetchUserById, fetchUsers, updateUser} from "./slices/usersSlice";


export const store = configureStore({
    reducer: {
        users: usersSlice.reducer
    },
})

export const actions = {
    ...usersSlice.actions,
    fetchUsers,
    fetchUserById,
    createNewUser,
    updateUser
}


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;