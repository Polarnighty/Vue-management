<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}
#app {
  width: 100%;
  height: 100%;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
