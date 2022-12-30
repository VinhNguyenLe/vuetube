import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fontLibrary } from "./utils/fontLibrary";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./assets/scss/index.scss";
import "element-plus/dist/index.css";

library.add(...fontLibrary);

const app = createApp(App);

app
  .use(store)
  .use(ElementPlus)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
