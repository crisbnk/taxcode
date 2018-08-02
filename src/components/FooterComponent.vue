<template>
  <footer class="mastfoot mt-auto">
    <div class="inner">
      <p>Made with <icon name="wine-glass"></icon> & <icon name="beer"></icon> in <span class="flag-icon flag-icon-it"></span></p>
      <p>by <a href="https://github.com/lalessia" target="_blank">@lalessia</a> & <a href="https://github.com/crisbnk" target="_blank">@crisbnk</a></p>
    </div>
  </footer>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'FooterComponent',
  components: {
    Icon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.mastfoot {
  color: rgba(255, 255, 255, .5);
  height: 100px;
}
</style>
