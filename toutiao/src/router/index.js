import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/Layout';

export default createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout
        }
    ]
});
