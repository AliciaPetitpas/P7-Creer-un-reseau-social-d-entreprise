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
        userInfo: {},
        posts: [],
        postInfo: {},
        comments: [],
        commentInfo: {},
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
        DELETE_USER: function(state) {
            state.userInfo = {
                ...state.userInfo,
                enabled: 0,
            }
        },
        SET_POSTS: function(state, posts) {
            state.posts = posts
        },
        UPDATE_POST_INFO: function(state, postInfo) {
            state.postInfo = postInfo
        },
        SET_COMMENTS: function(state, comments) {
            state.comments = comments
        },
        UPDATE_COMMENT_INFO: function(state, commentInfo) {
            state.commentInfo = commentInfo
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
                        commit('UPDATE_USER_INFO', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        deactivateAccount: ({ commit }, userId) => {
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
        updatePassword: ({ commit }, user) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.put('/auth/updatePassword/' + user.userId, user)
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
        createPost: ({ commit }, postInfo) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.post('/posts/createPost/', postInfo)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        getPost: ({ commit }, postId) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get('/posts/getPost/' + postId)
                    .then(function(response) {
                        commit('UPDATE_POST_INFO', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        getPosts: ({ commit }) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get('/posts/getPosts/')
                    .then(function(response) {
                        commit('SET_POSTS', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        updatePost: ({ commit }, postId) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get('/posts/updatePost/' + postId)
                    .then(function(response) {
                        commit('UPDATE_POST_INFO', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        deletePost: ({ commit }, postId) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.put('/posts/deletePost/' + postId)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        getComments: ({ commit }, postId) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get('/comments/getComments/' + postId)
                    .then(function(response) {
                        commit('SET_COMMENTS', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
        createComment: ({ commit }, postInfo) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.post('/comments/createComment', postInfo)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
    }
})