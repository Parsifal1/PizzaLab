const initialState = {
    bookList: [],
    book: null,
    user: null,
    cart: [],
    itemsAmount: 0,
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_BOOKS":
            return {
                ...state,
                bookList: action.books
            }
        case "SET_BOOK":
            return {
                ...state,
                book: action.book
            }
        case "DELETE_BOOK":
            return {
                ...state,
                book: null
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