import router from "./"

// 路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})

// 路由后置守卫
router.afterEach((to, from, failure) => {})
