<template>
    <header class="masthead">
      <div class="inner">
        <div class="masthead-brand brand-centered">
          <h3 class="inline brand-content">
            Tax Code
            <span class="flag-icon flag-icon-it"></span>
          </h3>
        </div>
        <nav class="nav nav-masthead justify-content-center">
          <a class="nav-link active" href="#">{{ translations[`lang${lang}`].HEADER.CALCULATE }}</a>
          <a class="nav-link" href="#">{{ translations[`lang${lang}`].HEADER.REVERSE }}</a>
          <a class="nav-link" href="#">{{ translations[`lang${lang}`].HEADER.INFO }}</a>
        </nav>
      </div>
    </header>
</template>

<script>
import Vue from 'vue';
import bNav from 'bootstrap-vue/es/components/nav/nav';
import { serverBus } from '../main';
import { translations } from '../translations';

Vue.component('b-nav', bNav);

export default {
  name: 'HeaderComponent',
  data() {
    return {
      lang: 'EN',
      translations: translations
    };
  },
  components: {
    bNav
  },
  created() {
    serverBus.$on('setLang', (lang) => {
      this.lang = lang;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .masthead {
    margin-bottom: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #42b983;
  }

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

    .brand-content {
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .brand-centered {
      text-align: center;
    }
  }
</style>
