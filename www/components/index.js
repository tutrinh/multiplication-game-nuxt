export { default as Card } from '../../components/Card.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Progress } from '../../components/Progress.vue'

export const LazyCard = import('../../components/Card.vue' /* webpackChunkName: "components/card" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazyProgress = import('../../components/Progress.vue' /* webpackChunkName: "components/progress" */).then(c => c.default || c)
