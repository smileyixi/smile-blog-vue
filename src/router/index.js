import VueRouter from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const site_title = '霜冷的秘密基地'

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'index',
            component: ()=>import('../views/Index.vue'),
            meta: {
                keepalive: true,
                title: site_title
            },
            children: [
                {
                    path: 'article',
                    components: {
                        index_view:()=>import('@/components/Article.vue')
                    },
                    meta: {
                        title: site_title
                    }
                },
                {
                    path: 'category/:cid',
                    components: {
                        index_view:()=>import('@/components/Category.vue')
                    },
                    meta: {
                        title: `分类 - ${site_title}`
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
                    },
                    meta: {
                        title: `关于 - ${site_title}`
                    }
                },
                {
                    path: 'pages/:page',
                    name: 'pages',
                    components: {
                        index_view:()=>import('@/components/TemplatePage.vue')
                    }
                },
            ]
        },
        {
            path: '/login',
            component: ()=>import('@/views/Login.vue'),
            meta: {
                title: `Login - ${site_title}`
            }
        },
        {
            path: '/frostdock',
            name: 'frostdock',
            component: ()=>import('../views/FrostDock.vue'),
            meta: {
                title: site_title
            },
            children: [
                {
                    path: 'writeblog',
                    components: {
                        frost_view:()=>import('@/components/frostdock/WriteBlog.vue')
                    },
                    meta: {
                        title: '新的文章'
                    }
                },
                {
                    path: 'writepage',
                    components: {
                        frost_view:()=>import('@/components/frostdock/WritePage.vue')
                    },
                    meta: {
                        title: '创建新页面'
                    }
                },
                {
                    path: 'manageArticle',
                    components: {
                        frost_view:()=>import('@/components/frostdock/ManageArticle.vue')
                    },
                    meta: {
                        title: '管理文章'
                    }
                },
                // {
                //     path: 'manageArticle',
                //     components: {
                //         frost_view:()=>import('@/components/frostdock/ManageArticle.vue')
                //     },
                //     meta: {
                //         title: '管理文章'
                //     }
                // }
            ]
        }
        
    ]
})

// 全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	// 保持获取token
	store.commit('loadToken')

    // 设置固定标题
    if(to.meta.title) document.title = to.meta.title

    //判断当前路由是否需要进行权限控制
	if(to.fullPath==="/index"){ 
		router.push("/")
	}
    else if(to.fullpath==="/frostdock") {
        if(this.$store.state.token !== '' || 1) {

        }
    }
	else{
		next() //放行
	}
})

export default router