import { createSlice } from '@reduxjs/toolkit';

export const canisterSlice = createSlice({
	name: 'canisters',
	initialState: [],
	reducers: {
		addCanister: (state, action) => {
			state.push(action.payload.canister);
		},

	},
});


export const { addCanister } = canisterSlice.actions;

export default canisterSlice.reducer;