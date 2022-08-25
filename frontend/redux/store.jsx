import { configureStore } from '@reduxjs/toolkit';
import canisterSlice from './canisterSlice';

export default configureStore({
	reducer: {
        canisters: canisterSlice
    },
});