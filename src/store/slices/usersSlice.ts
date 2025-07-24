import axios from "axios";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../types/common.type";
import type {TUser} from "../../types/users.type";
import {API_URL} from "../../constants/api";

interface initialStateType {
    users: TUser[];
    status: LoadingState;
    error: string | null | undefined;
}

const initialState: initialStateType = {
    users: [],
    status: 'idle',
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = await axios.get<TUser[]>(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch users:", error);
            throw error;
        }
    }
)

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (user: Omit<TUser, 'id' | 'avatar'>) => {
        try {
            const response = await axios.post<TUser>(`${API_URL}/users`, user)
            return response.data;
        } catch (error) {
            console.error("Failed to add user:", error);
            throw error;
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // Get all users
            .addCase(fetchUsers.pending, (state) => {
                state.status = LoadingState.LOADING;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TUser[]>) => {
                state.status = LoadingState.SUCCESS;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = LoadingState.FAILED;
                state.users = [];
                state.error = action.error.message || "Failed to fetch users";
            })
            // Create new user
            .addCase(createNewUser.pending, (state) => {
                state.status = LoadingState.LOADING
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
                state.status = LoadingState.SUCCESS
                state.users = [...state.users, action.payload]
            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.status = LoadingState.FAILED
                state.error = action.error.message || "Failed to create user"
            })
    }
})

export default usersSlice;