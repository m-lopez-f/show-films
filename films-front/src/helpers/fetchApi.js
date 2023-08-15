import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api`;
console.log(baseUrl)
const fetchApi = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const headers = authHeader(url)
        console.log(headers)
        const requestOptions = {
            method,
            headers: headers
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        console.log(requestOptions)
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user;
    const isApiUrl = url.startsWith(baseUrl);
    console.log("isApiUrl")
    console.log(isApiUrl)
    console.log(isApiUrl)
    console.log(isApiUrl)
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user}`,
        'Access-Control-Allow-Origin': '*'
    };
    } else {
        return {'Access-Control-Allow-Origin': '*'};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const { user, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export default fetchApi;