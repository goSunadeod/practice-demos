<template>
  <main>
    <Header></Header>
    <nav-bar></nav-bar>
    <nav-bar1></nav-bar1>
    <div class="resize-demo">
      <h1>Hello world!</h1>
      <resize-observer @notify="handleResize" />
    </div>
  </main>
</template>

<script>
import Header from "@/components/header";
import NavBar from "@/components/nav-bar";
import NavBar1 from "@/components/nav-bar1";
import ResizeObserver from "@/components/resize-observer";

export default {
  name: "layout",
  components: {
    Header,
    NavBar,
    NavBar1,
    ResizeObserver,
  },
  setup() {
    const handleResize = (data) => {
      console.log(data);
    };
    return { handleResize };
  },
};
</script>

<style>
</style>
