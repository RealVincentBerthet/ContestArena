<template>
  <div class="container">
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: "home",
      },
    };
  },
};
</script>

<style>
.home {
  background-color: #f5f5f5;
}

.home .btn-secondary,
.home .btn-secondary:not(:disabled):not(.disabled) {
  background-color: #859bb9;
}

.home .btn-secondary:not(:disabled):not(.disabled).active {
  background-color: #1e3c63;
}
</style>
