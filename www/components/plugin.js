import Vue from 'vue'

const components = {
  Card: () => import('../../components/Card.vue' /* webpackChunkName: "components/card" */).then(c => c.default || c),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  Progress: () => import('../../components/Progress.vue' /* webpackChunkName: "components/progress" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
