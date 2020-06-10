import Vue from "vue";
import App from "./App.vue";
import Roller from "@/components/Roller.vue";

Vue.config.productionTip = false;
// 설치
const install = (Vue: any) => {
	Vue.component(Roller.name, Roller);
};

// 브라우저 자동설치
if (typeof window !== "undefined" && window.Vue) {
	install(window.Vue);
}

new Vue({
	render: (h) => h(App),
}).$mount("#app");

export { Roller };
export default install;
