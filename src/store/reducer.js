const initialState = {
    items:[],
    user: null,
    cart: [],
    itemsAmount: 0,
    requestCount: 0
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ITEMS":
            return {
                ...state,
                items: action.items
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SET_CART":
            const reducer = (totalCount, value) => totalCount + value.count
            const totalAmount = action.cart ? action.cart.reduce(reducer, 0) : 0
            return {
                ...state,
                itemsAmount: totalAmount,
                cart: action.cart
            }
        case "SET_REQUEST_COUNT":
            console.log(action.requestCount)
            return {
                ...state,
                requestCount: action.requestCount
            }
        default:
            return state
    }
}