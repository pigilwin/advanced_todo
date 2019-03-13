<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Utilities Navbar</a>
        <div class="collapse navbar-collapse">
            <div class="my-2 my-lg-0 m-1">
                <input class="form-control mr-sm-2" @keypress="emitKeyPressEvent" type="search" placeholder="Search" aria-label="Search">
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheLightButton">
                <button @click="changeToLightView" class="btn btn-block btn-lg btn-info">Light Mode</button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheDarkButton">
                <button @click="changeToDarkView" class="btn btn-block btn-lg btn-info">Dark Mode</button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheRevealAllHiddenItemsButton">
                <button @click="revealAllHiddenItems" class="btn btn-block btn-lg btn-info">Show all hidden items</button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheHideAllHiddenItemsButton">
                <button @click="hideAllRevealedHiddenItems" class="btn btn-block btn-lg btn-info">Hide all revealed hidden items</button>
            </div>
            <div class="my-2 my-lg-0 m-1">
                <button @click="clearData" class="btn btn-block btn-lg btn-danger">Wipe data</button>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
    name: "navbar",
    props: {
      showLightButton: {
        type: Boolean,
        default: false
      },
      showDarkButton: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        shouldWeShowTheLightButton: false,
        shouldWeShowTheDarkButton: false,
        shouldWeShowTheRevealAllHiddenItemsButton: true,
        shouldWeShowTheHideAllHiddenItemsButton: false,
      };
    },
    created () {
      this.shouldWeShowTheDarkButton = this.showDarkButton;
      this.shouldWeShowTheLightButton = this.showLightButton;
    },
    methods: {
      changeToLightView () {
        this.shouldWeShowTheLightButton = false;
        this.shouldWeShowTheDarkButton = true;
        const classObserver = document.body.classList;
        classObserver.remove('dark-mode');
        classObserver.add('light-mode');
      },
      changeToDarkView () {
        this.shouldWeShowTheDarkButton = false;
        this.shouldWeShowTheLightButton = true;
        const classObserver = document.body.classList;
        classObserver.remove('light-mode');
        classObserver.add('dark-mode');
      },
      emitKeyPressEvent (event) {
        this.$emit('searchBarKeyPressed', event.target.value);
      },
      revealAllHiddenItems () {
        this.shouldWeShowTheHideAllHiddenItemsButton = true;
        this.shouldWeShowTheRevealAllHiddenItemsButton = false;
        this.$emit('revealAllHiddenItems');
      },
      hideAllRevealedHiddenItems () {
        this.shouldWeShowTheHideAllHiddenItemsButton = false;
        this.shouldWeShowTheRevealAllHiddenItemsButton = true;
        this.$emit('hideAllRevealedHiddenItems');
      },
      clearData () {
        this.$emit('clearData');
      }
    }
  }
</script>

<style scoped>

</style>