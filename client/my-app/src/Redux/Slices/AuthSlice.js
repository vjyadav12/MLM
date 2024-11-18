import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
 
// isLoggedIn data comes from the DB role, and etc or when user register the data it will simply loged in 
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

export const LoginAuthentication = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5656/Login", { email, password });

        // Show toast for promise
        toast.promise(response, {
            loading: "User Authentication is in process, please wait ",
            success: (res) => res?.data?.message,
            error: "User Authentication Failed, Please try Again"
        });

        // Return data
        return response.data;
        
    } catch (error) {
        // Show error toast
        toast.error(error?.response?.data?.message || "An error occurred");

        // Return the error as rejected value to handle it in the Redux state
        return rejectWithValue(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        // addCasee
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;