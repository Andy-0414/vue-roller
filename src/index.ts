import { App, defineCustomElement, Plugin } from "vue";
import Roller from "./components/Roller/Roller.vue";
import RollerItem from "./components/Roller/RollerItem.vue";

type VueWindow = (Window & typeof globalThis) & { Vue: App };

const install: Plugin = (Vue: App): void => {
    Vue.component(Roller.name, Roller);
    Vue.component(RollerItem.name, RollerItem);
};

if (typeof window !== "undefined" && (window as VueWindow).Vue) {
    install((window as VueWindow).Vue);
}

export default { install, Roller, RollerItem };
