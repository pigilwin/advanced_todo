<template>
    <div data-cy="error-message-container" class="row" v-if="shown">
        <div class="col-md-12 alert alert-danger">
            {{errorMessage}}
            <span @click="hideMessage()" class="float-right cursor-pointer" aria-hidden="true">&times;</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ErrorBox",
    props: {
      message: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        errorMessage: this.message,
        shown: false
      }
    },
    watch: {
      message: function (value) {
        this.shown = true;
        this.errorMessage = value;
      }
    },
    methods: {
      hideMessage () {
        this.shown = false;
        this.errorMessage = '';
        this.$emit('errorMessageClosed');
      }
    }
  }
</script>

<style scoped>
.cursor-pointer{
    cursor: pointer;
}
</style>