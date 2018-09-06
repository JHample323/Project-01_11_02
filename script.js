/*  Project 01_11_02

    Author: Jaggar Hample
    Date: 9/5/18  

    Filename: script.js
*/

"use strict";

// Global Variable
var httpRequest = false;
var entry = "^IXIC";

// Create a function for getRequestObject
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    return httpRequest;
}

// function to stop default submission
function stopSubmission(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}

// set up temporary event handler
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", getRequestObject);
}

form
