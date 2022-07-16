import VueRouter from 'vue-router'

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'index',
            component: ()=>import('@/views/Index.vue'),
            meta: {
                keepalive: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: ()=>import('@/views/About.vue')
        },
    ]
})

// 全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	// 保持获取token
	// store.commit('user/loadToken')

	if(to.fullPath==="/index"){ //判断当前路由是否需要进行权限控制
		router.push("/")
	}
	else{
		next() //放行
	}
})

export default router