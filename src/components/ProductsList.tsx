import {useEffect} from "react";
import useProductsStore from '../store/useProductsStore';


const ProductsList = () => {
    const {products, loading, error, fetchProducts} = useProductsStore();

    useEffect(() => {
        void fetchProducts();
    }, [fetchProducts]);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <ol className='product-list'>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title?.rendered}
                    </li>
                ))}
            </ol>
        </>
    );
};

export default ProductsList;