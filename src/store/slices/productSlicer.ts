import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/product.ts'
import { RootState } from '../store';
import axiosInstance from '../../api/axiosInstance';

interface ProductState {
    loading: boolean;
    products: Product[];
    error: string | null;
}

const initialState: ProductState = {
    loading: false,
    products: [],
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit = 10 }: { limit?: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/products?&per_page=${limit}&_embed`);
            const totalRecords = response.headers['x-wp-total'];
            const totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
            return { data: response.data, totalRecords, totalPages };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

// Селектори
export const selectProducts = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;

export default productSlice.reducer;
