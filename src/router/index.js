import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from './../views/LoginPage.vue';
import PostPage from './../views/PostPage.vue';
import AlbumPage from './../views/AlbumPage.vue';
import PostAddPage from './../views/PostAddPage.vue';

const routes = [
  { path: '/', name: 'LoginPage', component: LoginPage  },
  { path: '/post', name: 'PostPage', component: PostPage  },
  { path: '/album', name: 'AlbumPage', component: AlbumPage  },
  { path: '/postAddPage', name: 'postAddPage', component: PostAddPage  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  if (localStorage.getItem('user')  == null && to.name !== 'LoginPage') {
    // redirect the user to the login page
    return { name: 'LoginPage' }
  } 
})

export default router
