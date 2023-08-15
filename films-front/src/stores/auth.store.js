import { defineStore } from 'pinia';

import fetchApi from '@/helpers/fetchApi';
import router from '@/router';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            const apiURL = `${baseUrl}/login`
            const user = await fetchApi.post(apiURL, { email, password });

            this.user = user.data.token;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(this.user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});