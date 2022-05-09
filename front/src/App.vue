<template>

  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 0;
}

header {
    padding-bottom: 10px;
    border-bottom: 2px solid black;
}

#main {
    background-color: #fdd7d7;
    border: 1px solid black;
    border-radius: 30px;
    margin: 20px auto 0 auto;
    display: flex;
    flex-direction: column;    
    width: 50%;
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
    border: 1px solid black; 
}

button:hover {
  background-color: white;
  color: black;
}

span {
  color: red;
}

div {
  padding: 10px auto 0 auto;
}

input {
  width: 50%;
  margin: 10px auto 0 auto;    
}

::placeholder {
    /* position: absolute; */
    font-family: 'Courier New', Courier, monospace;
}

p {
    margin: 5px;
} 

.msg {
    color: red;
    font-size: 14px;
    font-style: italic;
}

/* RESPONSIVE MOBILE */
 @media (max-width: 768px) {
   #main {
     width: 90%;
     margin: 5px auto 0 auto;
   }

   button {
     width: 80%;
   }
 }

</style>
