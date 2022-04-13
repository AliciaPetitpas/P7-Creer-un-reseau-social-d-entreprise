<template>
  <div class="register">
    <h1>Créer un compte</h1>

    <div class="card">
        <div class="form-registration">
      <input type="text" class="form-registration_input" placeholder="Prénom"/>
      <input type="text" class="form-registration_input" placeholder="Nom"/>
      <input type="text" class="form-registration_input" placeholder="Adresse mail"/>
      <input type="password" class="form-registration_input" placeholder="Mot de passe"/>
    </div>
    <div class="form-registration">
      Adresse mail déjà utilisée
    </div>
    <div class="form-registration">
      <button class="button">
        <span>Création</span>
        <!-- <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span> -->
      </button>
    </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

// export default {
//   mounted: function () {
//     if (this.$store.state.user.userId != -1) {
//       this.$router.push('/profile');
//       return ;
//     }
//   },
//   computed: {
//     validatedFields: function () {
//       if (this.mode == 'create') {
//         if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
//           return true;
//         } else {
//           return false;
//         }
//       } else {
//         if (this.email != "" && this.password != "") {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     },
//     ...mapState(['status'])
//   },
//   methods: {
//     switchToCreateAccount: function () {
//       this.mode = 'create';
//     },
//     createAccount: function () {
//       const self = this;
//       this.$store.dispatch('createAccount', {
//         email: this.email,
//         name: this.name,
//         lastname: this.lastname,
//         password: this.password,
//       }).then(function () {
//         self.login();
//       }, function (error) {
//         console.log(error);
//       })
//     },
//   }
// }
</script>
