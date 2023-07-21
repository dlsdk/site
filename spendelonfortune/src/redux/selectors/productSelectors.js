import {createSelector} from "reselect"

const selectProducts = (state) => state.totalreducer;


export const selectProductList = createSelector(
    [selectProducts],
    (products) => products.productsList
)

export const selectcurrentTotalBalance = createSelector(
    [selectProducts],
    (products) => products.currentTotalBalance
)

export const selectpersentOfFortune = createSelector(
    [selectProducts],
    (products) => products.persentOfFortune
)

export const selectShoppingBasket = createSelector(
    [selectProducts],
    (products) => products.shoppingBasket
)

export const selectFortuneStatus = createSelector(
    [selectProducts],
    (products) => products.isFortuneFinish
)

export const selectUserShoppingStatus = createSelector(
    [selectProducts],
    (products) => products.isUserStartShopping
)

export const selectTotalFortune = createSelector(
    [selectProducts],
    (products) => products.totalFortune
) 