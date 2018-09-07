/*  Project 01_11_02

    Author: Jaggar Hample
    Date: 9/5/18  

    Filename: script.js
*/

"use strict";

// Global Variable
var httpRequest = false;
var entry = "MSFT";

// Create a function for getRequestObject
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    return httpRequest;
}

// Removes empty strings
for (var i = stockItems.length - 1; i >= 0; i--) {
    if (stockItems[i] === "") {
        stockItems.splice(i, 1);
    }
}

// function to stop default submission
function stopSubmission(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}

// function to get quotes
function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    } else {
        document.getElementsByTagName("input")[0].value = entry;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
    clearTimeout(updateQuote);
    var updateQuote = setTimeout('getQuote()', 1000);
}

// create function to display data
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
    }
}

var stockResults = httpRequest.responseText;
var stockItems = JSON.parse(stockResults);


// Grabs data from stocks
document.getElementById("ticker").innerHTML = stockItems.symbol;
document.getElementById("openingPrice").innerHTML = stockItems.open;
document.getElementById("lastTrade").innerHTML = stockItems.latestPrice;
var date = new Date(stockItems.latestUpdate);
document.getElementById("lastTradeDT").innerHTML = date.toDateString() + "<br>" + date.toTimeString;
document.getElementById("change").innerHTML = (stockItems.latestPrice - stockItems.open).toFixed(2);
document.getElementById("range").innerHTML = "Low " + (stockItems.low * 1).toFixed(2) + "<br>High " + (stockItems.high * 1).toFixed(2);
document.getElementById("volume").innerHTML = (stockItems.latestVolume * 1).toLocaleString(2);

// function that formats the table
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i + i + 2) {
        rows[i].style.background = "#9FE098"
    }
}


// set up temporary event handler
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("onload", formatTable, false);
    window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}
