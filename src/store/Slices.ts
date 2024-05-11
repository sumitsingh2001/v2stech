import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    error: "",
    stories: [],
    loading: ""
}

export const fetchStories: any = createAsyncThunk(
    'stories/fetchdata',
    async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        } catch (error) {
            return error
        }
    }
)

const ApiSlice = createSlice({
    name: "Apidata",
    initialState,
    reducers: {
        getStoriesStart(state: any) {
            state.loading = true;
            state.error = null
        },
        getStoriesSuccess(state: any, action: any) {
            state.loading = false;
            state.stories = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(fetchStories.pending, (state: any) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(fetchStories.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.stories = action.payload
        })
        builder.addCase(fetchStories.rejected, (state: any, action: any) => {
            state.loading = true;
            state.stories = null;
            state.error = action.error.message ?? "Somehthing wrong happened"
        })
    }
})

export const { getStoriesStart, getStoriesSuccess } = ApiSlice.actions
export default ApiSlice.reducer