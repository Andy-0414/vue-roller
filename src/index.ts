import { App, Plugin } from "vue";
import Roller from "./components/Roller/Roller.vue";
import RollerItem from "./components/Roller/RollerItem.vue";

export const install: Plugin = (Vue: App): void => {
    Vue.component(Roller.name, Roller);
    Vue.component(RollerItem.name, RollerItem);
};

type VueWindow = (Window & typeof globalThis) & { Vue: App };
if (typeof window !== "undefined" && (window as VueWindow).Vue) {
    install((window as VueWindow).Vue);
}

export { default as Roller } from "./components/Roller/Roller.vue";
export { default as RollerItem } from "./components/Roller/RollerItem.vue";
