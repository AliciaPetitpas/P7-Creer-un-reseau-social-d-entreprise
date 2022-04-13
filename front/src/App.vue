<template>

  <div class="login">
    <router-link to="/">Se connecteiir</router-link> |
    <router-link to="/about">S'inscrire</router-link>
  </div>
  
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

div {
  padding: 30px;
}

div a {
  font-weight: bold;
  color: #2c3e50;
}

div a.router-link-exact-active {
  color: #42b983;
}
</style>
