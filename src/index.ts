import Roller from "./components/Roller.vue";

// 설치
const install = (Vue: any) => {
	Vue.component(Roller.name, Roller);
};

// 브라우저 자동설치
if (typeof window !== "undefined" && window.Vue) {
	install(window.Vue);
}

export default Roller;
