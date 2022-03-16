/*
 * Filename: getTotalOfAmountArray.js
 * Created Date: Wednesday, March 16th 2022, 11:53:34 pm
 * Author: Md Numan Ahmed
 * 
 * Copyright (c) 2022 @mdnmnahmed
 */


/**
 * Get Total Of Amount Array
 * @param {Array} arrayOfObject 
 * @returns {Number} -> Total Amount
 */
export const getTotalOfAmountArray = (arrayOfObject) => {
    const totalAmount = arrayOfObject.reduce((accumulator, item) => {
        if (item.transactionType === "receive") {
            return accumulator - item.amount;
        } else {
            return accumulator + item.amount;
        }
    }, 0);

    return totalAmount;
}

export const getTotalOfReceiveAmountArray = (arrayOfObject) => {
    const totalAmount = arrayOfObject.reduce((accumulator, item) => {
        if (item.transactionType === "receive") {
            return accumulator + item.amount;
        }
    }, 0);

    return totalAmount;
}

export const getTotalOfSendAmountArray = (arrayOfObject) => {
    const totalAmount = arrayOfObject.reduce((accumulator, item) => {

        if (item?.transactionType == "send") {
            console.log(item);
            return accumulator + item.amount;
        }
    }, 0);

    console.log('totalAmount: ', totalAmount);
    return totalAmount;
}