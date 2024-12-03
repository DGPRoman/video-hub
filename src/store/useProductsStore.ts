import {create} from "zustand";
import {Product} from "../types/product";
import {fetchProductsData} from "../services/api.ts";


interface ProductsState {
    products: Product[];
    fetchProducts: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    loading: false,
    error: null,
    fetchProducts: async (): Promise<void> => {
        try {
            set({loading: true, error: null});
            const productsData = await fetchProductsData({limit: 15});

            set({products: productsData})
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({error: error.message});
            } else {
                set({error: "An unknown error occurred."});
            }
        } finally {
            set({loading: false});
        }
    },
}));

export default useProductsStore;