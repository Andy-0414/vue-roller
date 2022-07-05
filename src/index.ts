import { defineCustomElement } from "vue";
import Roller from "./components/Roller/Roller.ce.vue";
import RollerItem from "./components/Roller/RollerItem.ce.vue";

customElements.define("vue-roller", defineCustomElement(Roller));
customElements.define("vue-roller-item", defineCustomElement(RollerItem));

export default { Roller, RollerItem };
