export const formatNumberWithComma = (val) => {
    return  val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export const toFixedVal = (val) => {
    return val.toFixed(6);
}
