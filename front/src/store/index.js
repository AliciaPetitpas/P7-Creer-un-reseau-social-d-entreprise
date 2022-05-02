import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: ''
    }
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

export default createStore({
    state: {
        user: user,
        userInfo: {}
    },
    mutations: {
        LOGIN: function(state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        UPDATE_USER_INFO: function(state, userInfo) {
            state.userInfo = userInfo;
        },
        UPDATE_IMAGE: function(state, user) {
            state.user.fdImage = user;
            //REVOIR
        },
        DELETE_USER: function(state) {
            state.userInfo = {
                ...state.userInfo,
                enabled: 0,
            }
        },
        CREATE_POST: function(state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
        //Récupère les données du formulaire d'inscription dans le store
        createAccount: ({ commit }, userInfo) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.post('/auth/signup', userInfo)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        loginAccount: ({ commit }, userInfo) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userInfo)
                    .then(function(response) {
                        commit('LOGIN', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        getUserInfo: ({ commit }, userId) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get('/auth/getUserInfo/' + userId)
                    .then(function(response) {
                        commit('UPDATE_USER_INFO', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        updateImage: ({ commit }, user) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.put('/auth/updateImage/' + user.userId, user.fdImage)
                    .then(function(response) {
                        commit('UPDATE_IMAGE', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        deactivateAccount: ({ commit }, userId) => {
            // console.log(userId);
            commit;
            return new Promise((resolve, reject) => {
                instance.put('/auth/deactivateAccount/' + userId)
                    .then(function(response) {
                        commit('DELETE_USER', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        updateUser: ({ commit }, user) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.put('/auth/updateUser/' + user.userId, user)
                    .then(function(response) {
                        commit('UPDATE_USER_INFO', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        goAdmin: ({ commit }, info) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.put('/auth/goAdmin/' + info.userId, info)
                    .then(function(response) {
                        commit('UPDATE_USER_INFO', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        createPost: ({ commit }) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get('/auth/createPost/')
                    .then(function(response) {
                        commit('CREATE_POST', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
    }
})