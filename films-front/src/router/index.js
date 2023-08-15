import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { Home, Login, Films, Credits, Register } from '@/views';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/films', component: Films },
        { path: '/films/:filmId', component: Credits },
        { path: '/register', component: Register },
        { path: '/', component: Home },
        { path: '/login', component: Login }
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});

export default router;