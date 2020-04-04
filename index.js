import Timer from './src/Index.vue';
let timer = {};
timer.install = function (Vue, options) {
    Vue.component('Timer', Timer)
}
export default timer;