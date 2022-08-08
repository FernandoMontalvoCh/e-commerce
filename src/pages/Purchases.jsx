import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFavoritesThunk } from '../store/slices/favorites.slice';
import { useSelector } from 'react-redux';

const Purchases = () => {

    const dispatch = useDispatch();

    const favorites = useSelector(state=> state.favorites)

    useEffect(() => {
        dispatch(getFavoritesThunk())
    }, [])
    
    console.log(favorites);
    return (
        <div>
            <h1>Purchase</h1>
{/*             {
                favorites.map(favorite=>(
                    <div></div>
                ))
            } */}
        </div>
    );
};

export default Purchases;