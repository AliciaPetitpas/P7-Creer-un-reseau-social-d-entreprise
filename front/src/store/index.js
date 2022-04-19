import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export default createStore({
    state: {},
    actions: {
        //Récupère les données du formulaire d'inscription dans le store
        createAccount: ({ commit }, userInfo) => {
            commit;
            instance.post('/auth/signup', userInfo)
                .then(function(response) {
                    console.log(response)
                        // commit('setStatus', 'created');
                        // resolve(response);
                })
                .catch(function(error) {
                    console.log(error)
                        // commit('setStatus', 'error_create');
                        // reject(error);
                })
        }
    }
})