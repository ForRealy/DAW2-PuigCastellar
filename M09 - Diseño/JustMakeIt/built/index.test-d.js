"use strict";
exports.__esModule = true;
var tsd_1 = require("tsd");
var rfdc = require(".");
var clone = rfdc();
tsd_1.expectType(clone(5));
tsd_1.expectType(clone({ lorem: "ipsum" }));
var cloneHandlers = rfdc({
    constructorHandlers: [
        [RegExp, function (o) { return new RegExp(o); }],
    ]
});
