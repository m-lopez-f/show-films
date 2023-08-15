import { defineStore } from 'pinia';

import fetchApi from '@/helpers/fetchApi';
import { useAuthStore } from './auth.store'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user'))
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            fetchApi.get(apiUrl)
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        },
        async register(userData) {
             
            const user = fetchApi.post(`${baseUrl}/register`, userData).then(user => {
                const auth = useAuthStore()
                auth.user = user.data.token;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(auth.user));
            })
            
        }
    }
});