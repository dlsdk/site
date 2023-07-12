import {createSelector} from "reselect"

const selectProducts = (state) => state.totalreducer;

export const selectProductList = createSelector(
    [selectProducts],
    (products) => products.productslist
)

export const selecttotalPrice = createSelector(
    [selectProducts],
    (products) => products.totalprice
)

export const selectPersent = createSelector(
    [selectProducts],
    (products) => products.persent
)
