import { SET_CANISTERS } from "./constants"
const initState = {
    canisters: {}
}

function reducer(state, action) {
    switch (action.type) {
        case SET_CANISTERS:
            return {
                ...state,
                canisters: action.payload
            }
        default:
            throw new Error('wrong!!!!')
    }
}

export { initState }
export default reducer