"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var vue_2 = require("@ionic/vue");
/* Core CSS required for Ionic components to work properly */
require("@ionic/vue/css/core.css");
/* Basic CSS for apps built with Ionic */
require("@ionic/vue/css/normalize.css");
require("@ionic/vue/css/structure.css");
require("@ionic/vue/css/typography.css");
/* Optional CSS utils that can be commented out */
require("@ionic/vue/css/padding.css");
require("@ionic/vue/css/float-elements.css");
require("@ionic/vue/css/text-alignment.css");
require("@ionic/vue/css/text-transformation.css");
require("@ionic/vue/css/flex-utils.css");
require("@ionic/vue/css/display.css");
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
require("@ionic/vue/css/palettes/dark.system.css");
/* Theme variables */
require("./theme/variables.css");
var app = vue_1.createApp(App_vue_1["default"])
    .use(vue_2.IonicVue)
    .use(router_1["default"]);
router_1["default"].isReady().then(function () {
    app.mount('#app');
});
