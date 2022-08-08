import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { useDispatch } from 'react-redux';

const ProductsDetail = () => {

    const productsList = useSelector(state => state.products);
    const [ productDetail, setProductDetail ] = useState({});
    const [ suggestedProducts, setSuggestedProducts ] = useState([]);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const products = productsList.find(productsItem => productsItem.id === Number(id));
        setProductDetail(products);
        const filteredProducts = productsList.filter(productsItem => productsItem.category.id === products.category.id);
        setSuggestedProducts(filteredProducts);
    }, [ productsList, id ])

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    return (
        <div>
            <h1>Products Detail</h1>
            <h1>{productDetail?.title}</h1>
            <img src={productDetail?.productImgs?.[0]} alt="" />
            <ul>
            {
                suggestedProducts.map(products => (
                    <li key={products.id} onClick={() => navigate(`/products/${products.id}`)}>
                        {products.title}
                    </li>
                ))
            }
            </ul>
         </div>
    );
};

export default ProductsDetail;