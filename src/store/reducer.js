const testAvatar = `data:image/png;base64,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`

const initialState = {
    bookList: [],
    book: null,
    user: {
        avatar: testAvatar,
        firstName: "Илья",
        secondName: "Киселев",
        email: "ily4368@gmail.com",
        address: "г.Калуга, ул.Тепличная, д.7 кв.97",
        phone_number: "+79533226617",
        password: "202cb962ac59075b964b07152d234b70",
        gender: "Мужской",
        role: "admin"
    },
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