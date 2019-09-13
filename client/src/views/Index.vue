<template>
  <div class="index">
    <HeadNav />
    <LeftMenu />

    <router-view></router-view>
  </div>
</template>
<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";
export default {
  name: "index",
  components: { HeadNav, LeftMenu }
};
</script>

<style >
.index {
  height: 100vh;
  overflow: hidden;
}
</style>