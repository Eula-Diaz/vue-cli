import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { Button, Select, Container, Aside, Main, Header, Menu, MenuItem, Submenu, MenuItemGroup } from 'element-ui';

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.component(Container.name, Container);
// Vue.component(Aside.name, Aside);
// Vue.component(Main.name, Main);
// Vue.component(Header.name, Header);
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Submenu)
// Vue.use(MenuItemGroup)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
