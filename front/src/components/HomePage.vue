<template>
  <div class="homepage">
    <h1>Connexion à votre compte</h1>

    <div class="card">
    <div class="form-login">
      <input type="text" class="form-login_input" placeholder="Adresse mail"/>
      <input type="password" class="form-login_input" placeholder="Mot de passe"/>
    </div>
    <div class="form-login">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-login">
      <button class="button">
        <span>Connexion</span>
        <!-- <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span> -->
      </button>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
  // data: function () {
  //   return {
  //     mode: 'login',
  //     email: '',
  //     name: '',
  //     lastname: '',
  //     password: '',
  //   }
  // },
  // mounted: function () {
  //   if (this.$store.state.user.userId != -1) {
  //     this/$router.push('/profile');
  //     return;
  //   }
  // },
  //   methods: {
  //   switchToLogin: function () {
  //     this.mode = 'login';
  //   },
  //   login: function () {
  //     const self = this;
  //     this.$store.dispatch('login', {
  //       email: this.email,
  //       password: this.password,
  //     }).then(function () {
  //       self.$router.push('/profile');
  //     }, function (error) {
  //       console.log(error);
  //     })
  //   },
  // }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
