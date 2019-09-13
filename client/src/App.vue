<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  created() {
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      //token存储到vuex中
      this.$store.dispatch("setAutnenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


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
