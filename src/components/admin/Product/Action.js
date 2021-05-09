import * as ActionType from './ActionTypes';

//Get all products
export const getAllProducts = () => {
    return {
        type: ActionType.GET_ALL_PRODUCT,
    };
};

export const AddProduct = (product) => {
    return {
        type: ActionType.ADD_PRODUCT,
        payload : product,
    };
};


export const getProductById = (productId) => {
    return {
        type: ActionType.GET_PRODUCT_BY_ID,
        payload : productId,
    };
};

export const updateProduct = (product) => {
    return {
        type: ActionType.UPDATE_PRODUCT,
        payload : product
    };
};

export const deleteProduct = (productId) => {
    return {
        type: ActionType.DELETE_PRODUCT,
        payload : productId,
    };
};


