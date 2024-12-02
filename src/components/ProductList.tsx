import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts, selectProducts, selectLoading, selectError} from '../store/slices/productSlicer.ts';
import {AppDispatch} from '../store/store.ts';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchProducts({limit: 15}));
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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

export default ProductList;
