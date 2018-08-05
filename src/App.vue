<template>
<div id="app">
  <div class="container-fluid d-flex h-100 mx-auto flex-column">
    <headerComponent></headerComponent>
    <!-- <router-view/> -->
    <taxCode></taxCode>
    <footerComponent></footerComponent>
  </div>
</div>
</template>

<script>

import HeaderComponent from './components/HeaderComponent.vue';
import TaxCode from './components/TaxCode.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    TaxCode,
    FooterComponent
  }
};
</script>

<style>
html,
body {
  height: 100%;
  background-color: #333;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  width: 100%;
}

</style>
