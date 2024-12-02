export interface Product {
    id: number;
    title?: {
        rendered?: string
    };
}

export interface ProductState {
    loading: boolean;
    products: Product[];
    error: string | null;
}
