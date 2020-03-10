const initialState = {
    items:[],
    user: null,
    cart: [],
    itemsAmount: 0,
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
        default:
            return state
    }
}