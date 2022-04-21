<template>

  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  justify-content: center;
  margin: auto;
  width: 70%;
}

header {
    padding-bottom: 10px;
    border-bottom: 2px solid black;
}

#main {
    background-color: #fdd7d7;
    border: 1px solid black;
    border-radius: 30px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

button {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
    padding: 5px;
    width: 30%;
    align-items: center;
    border-style: none;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 20px;
}

button:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
}

span {
  color: red;
}

div {
  padding: 20px;
}

input {
    margin: 5px;
}

p {
    margin: 5px;
} 

/* RESPONSIVE MOBILE */
 @media (max-width: 768px) {
   #app {
     width: 90%;
   }

   button {
     width: 80%;
   }

   
 }

</style>
