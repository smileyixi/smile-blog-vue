import VueRouter from 'vue-router'
import store from '@/store'

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'index',
            component: ()=>import('../views/Index.vue'),
            meta: {
                keepalive: true
            },
            children: [
                {
                    path: 'article',
                    components: {
                        index_view:()=>import('@/components/Article.vue')
                    }
                },
                {
                    path: 'category/:cid',
                    components: {
                        index_view:()=>import('@/components/Category.vue')
                    }
                },
                {
                    path: 'search',
                    components: {
                        index_view:()=>import('@/components/ArticleListBySearch.vue')
                    }
                },
                {
                    path: 'archive',
                    name: 'archive',
                    components: {
                        index_view:()=>import('@/views/Archive.vue')
                    }
                },
                {
                    path: 'about',
                    name: 'about',
                    components: {
                        index_view:()=>import('@/views/About.vue')
                    }
                },
            ]
        },
        {
            path: '/login',
            component: ()=>import('@/views/Login.vue')
        },
        {
            path: '/404',
            name: '404',
            component: ()=>import('@/views/404.vue')
        },
        {
            name: "refresh",
            path: `/refresh`,
            component: () => import('@/components/Refresh.vue')    
        }
        
    ]
})


// 全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	// 保持获取token
	store.commit('loadToken')

	if(to.fullPath==="/index"){ //判断当前路由是否需要进行权限控制
		router.push("/")
	}
	else{
		next() //放行
	}
})

export default router