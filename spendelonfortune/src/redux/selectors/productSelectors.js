import {createSelector} from "reselect"

const selectProducts = (state) => state.totalreducer;

export const selectProductList = createSelector(
    [selectProducts],
    (products) => products.productsList
)

export const selecttotalPrice = createSelector(
    [selectProducts],
    (products) => products.totalPrice
)

export const selectPersent = createSelector(
    [selectProducts],
    (products) => products.persent
)
