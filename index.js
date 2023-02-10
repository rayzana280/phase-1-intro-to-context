// Your code here

const { interfaces } = require("mocha")

// [ray, zana, student, 15]
function callBack(acc, element, index) {
    if (index === 0) {
        acc.firstName = element
        return acc
    } else if (index === 1) {
        acc.familyName = element
        return acc
    } else if (index === 2) {
        acc.title = element
        return acc
    } else if (index === 3) {
        acc.payPerHour = element
        return acc
    }
    return acc
}

function createEmployeeRecord(array) {
    const newObject = array.reduce(callBack, {})
    newObject.timeInEvents = []
    newObject.timeOutEvents = []
    return newObject
}


function callBackForMap(element) {
    return createEmployeeRecord(element)
}

function createEmployeeRecords(arrays) {
    return arrays.map(callBackForMap)
}

function createTimeInEvent(recordObject, dateStamps) {
    const newArrayDates = dateStamps.split(' ')
    const turnToNumber = parseInt(newArrayDates[1])
    recordObject.timeInEvents.push({ type: 'TimeIn', hour: turnToNumber, date: newArrayDates[0] })
    return recordObject
}

function createTimeOutEvent(recordObject, dateStamps) {
    const newArrayDates = dateStamps.split(' ')
    const turnToNumber = parseInt(newArrayDates[1])
    recordObject.timeOutEvents.push({ type: 'TimeOut', hour: turnToNumber, date: newArrayDates[0] })
    return recordObject
}

function hoursWorkedOnDate(empolyeeRecord, date) {
    function callBackForTimeIn(element) {
        if (element.date === date) {
            return true;
        } else {
            return false;
        }
    }

    function callBackForTimeOut(element) {
        if (element.date === date) {
            return true;
        } else {
            return false;
        }
    }
    const timeInDate = empolyeeRecord.timeInEvents.filter(callBackForTimeIn)
    const timeOutDate = empolyeeRecord.timeOutEvents.filter(callBackForTimeOut)
    const integer = timeInDate[0].hour - timeOutDate[0].hour
    const stringToNumber = Math.abs(integer)//1200
    const string = stringToNumber.toString()
    const split = string.split('')
        split.splice(-2)
    const joinWords = split.join('')
    // Remove the last 2 items instead of the return the first item.
    // join the array back to a string
    // turn it back into an integer
    return parseInt(joinWords)
    
}

function wagesEarnedOnDate(employeeRecordObject, dateForm) {
    const hours = hoursWorkedOnDate(employeeRecordObject, dateForm);
    const payForDay = hours * employeeRecordObject.payPerHour
    console.log(hours, employeeRecordObject.payPerHour);
    return payForDay
}

function allWagesFor(empolyeeRecord) {
    function callBackForMap(element) {
        return element.date
    }

    let sumOfPay = 0
    const dates = empolyeeRecord.timeInEvents.map(callBackForMap)
    for (let i = 0; i < dates.length; i++) {
        const pay = wagesEarnedOnDate(empolyeeRecord, dates[i]);
        sumOfPay += pay;
    }
    return sumOfPay
}

function calculatePayroll(arrayOfEmployeeRecords){
 //get the sum pay for all employee
    function callBackForReduce(acc, element){
       acc += allWagesFor(element) // acc = allWagesFor(element) + acc;
        return acc
    }
    return arrayOfEmployeeRecords.reduce(callBackForReduce, 0)

}
