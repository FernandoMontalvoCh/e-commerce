import { configureStore } from '@reduxjs/toolkit'
import  isLoadingSlice  from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import favoritesSlice from './slices/favorites.slice'

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
    favorites: favoritesSlice
	}
})