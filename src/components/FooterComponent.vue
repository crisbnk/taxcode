<template>
  <footer class="mastfoot">
    <div class="row">
      <div class="col-md-2 language">
        <icon name="globe"></icon>
        <select class="set-lang" v-model="lang" id="lang" @change="setLang">
          <option value='EN' selected>EN</option>
          <option value='IT'>IT</option>
        </select>
      </div>
      <div class="col-md-8 text-center">
        <p><icon name="code"></icon> {{ translations[`lang${lang}`].FOOTER.WITH }} <icon name="wine-glass"></icon> & <icon name="beer"></icon> in <span class="flag-icon flag-icon-it"></span></p>
        <p>{{ translations[`lang${lang}`].FOOTER.BY }} <a href="https://github.com/lalessia" target="_blank">@lalessia</a> & <a href="https://github.com/crisbnk" target="_blank">@crisbnk</a></p>
      </div>
      <div class="col-md-2"></div>
    </div>
  </footer>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import { serverBus } from '../main';
import { translations } from '../translations';

export default {
  name: 'FooterComponent',
  data() {
    return {
      lang: 'EN',
      translations: translations
    };
  },
  methods: {
    setLang: function() {
      serverBus.$emit("setLang", this.lang);
    }
  },
  components: {
    Icon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.mastfoot {
  color: rgba(255, 255, 255, .5);
  border-top: 2px solid #42b983;
  margin-top: 1rem;
  padding: 3px;
}

.mastfoot div p {
  margin-bottom: 0px;
}

.language {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.set-lang {
  background-color: transparent;
  color: rgba(255, 255, 255, .5);
  border: none;
}
</style>
