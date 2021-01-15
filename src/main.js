import VueHicons from "./VueHicons.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("VueHicons", VueHicons);
}

const plugin = { install };

let GlobalVue = null;

globalVue = typeof window !== "undefined"
  ? window.Vue
  : typeof global !== "undefined"
    ? global.vue
    : null;

if (GlobalVue)
  GlobalVue.use(plugin);

VueHicons.install = install;

export default VueHicons;
