"use strict";
exports.__esModule = true;
var test_utils_1 = require("@vue/test-utils");
var HomePage_vue_1 = require("@/views/HomePage.vue");
var vitest_1 = require("vitest");
vitest_1.describe('HomePage.vue', function () {
    vitest_1.test('renders home vue', function () {
        var wrapper = test_utils_1.mount(HomePage_vue_1["default"]);
        vitest_1.expect(wrapper.text()).toMatch('Ready to create an app?');
    });
});
