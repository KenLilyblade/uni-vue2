import { RouterMount, createRouter } from 'uni-simple-router'
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: to => ({ name: '404' })
    }
  ]
})


export { router, RouterMount }
