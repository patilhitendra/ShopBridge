import * as ActionType from './ActionTypes';

const initialState = {
    loading : false,
    products : [
        {
           "productId":1,
           "categoryId":1,
           "productName":"Carrot(Gajar)",
           "description":"Description Baby Potato is a starchy vegetable which is popularly used in many recipes.",
           "price":20,
        },
        {
           "productId":2,
           "categoryId":1,
           "productName":"Cauliflower",
           "description":"Description Baby Potato is a starchy vegetable which is popularly used in many recipes.",
           "price":25,
        },
        {
           "productId":3,
           "categoryId":2,
           "productName":"Chili",
           "description":"Description Baby Potato is a starchy vegetable which is popularly used in many recipes.",
           "price":15,
        },
        {
           "productId":4,
           "categoryId":2,
           "productName":"coconut",
           "description":"Description Baby Potato is a starchy vegetable which is popularly used in many recipes.",
           "price":40,
        },
     ],
    singleProduct : {},
    error : null,
}

const inventoryReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ActionType.GET_ALL_PRODUCT:
            return {
                ...state,
                products : state.products
            }
        case ActionType.GET_PRODUCT_BY_ID:
            
            const singleProduct = state.products.filter(product=>action.payload == product.productId);
            return {
                ...state,
                singleProduct: singleProduct.length > 0 ? singleProduct[0] : {}
            }
        case ActionType.ADD_PRODUCT:
            action.payload.productId = state.products.length + 1;
            const addProduct = [...state.products, action.payload]
            return {
                ...state,
                products : addProduct
            }
        case ActionType.UPDATE_PRODUCT:
            const updateProduct = state.products.map(product=>{
                if (action.payload.productId !== product.productId) return product;
                return action.payload;
            });
            return {
                ...state,
                products : updateProduct
            }
        case ActionType.DELETE_PRODUCT:
            const updatedProduct = state.products.filter(product=>action.payload !== product.productId);
            return {
                ...state,
                products : updatedProduct,
            }
        default:
            return state;
    }
}


export default inventoryReducer;
 