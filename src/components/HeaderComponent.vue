<template>
    <header class="masthead mb-auto">
      <div class="inner">
        <h3 class="masthead-brand">
          <span class="flag-icon flag-icon-it"></span>
          Tax Code Generator
        </h3>
        <nav class="nav nav-masthead justify-content-center">
          <a class="nav-link active" href="#">Home</a>
          <a class="nav-link" href="#">Features</a>
          <a class="nav-link" href="#">Contact</a>
        </nav>
      </div>
    </header>
</template>

<script>
import Vue from 'vue';
import bNav from 'bootstrap-vue/es/components/nav/nav';

Vue.component('b-nav', bNav);

export default {
  name: 'HeaderComponent',
  components: {
    bNav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #headerComponent {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
  .masthead {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #42b983;
  }
  /* .mb-auto, .my-auto {
    margin-bottom: auto!important;
} */
  .masthead-brand {
    margin-bottom: 0;
  }
  .nav-masthead .nav-link {
    padding: .25rem 0;
    font-weight: 700;
    color: rgba(255, 255, 255, .5);
    background-color: transparent;
    border-bottom: .25rem solid transparent;
  }
  .nav-masthead .nav-link:hover,
  .nav-masthead .nav-link:focus {
    border-bottom-color: rgba(255, 255, 255, .25);
  }
  .nav-masthead .nav-link + .nav-link {
    margin-left: 1rem;
  }
  .nav-masthead .active {
    color: #fff;
    border-bottom-color: #fff;
  }
  @media (min-width: 48em) {
    .masthead-brand {
      float: left;
    }
    .nav-masthead {
      float: right;
    }
  }
</style>
