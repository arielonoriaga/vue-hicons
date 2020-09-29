import VueHicons from "./VueHicons.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("VueHicons", VueHicons);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

VueHicons.install = install;

export default VueHicons;
