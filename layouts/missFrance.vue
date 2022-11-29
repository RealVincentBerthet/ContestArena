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
        class: "missFrance",
      },
    };
  },
};
</script>

<style>
.missFrance {
  background-color: #fdfaf7;
}

.missFrance .btn-secondary,
.missFrance .btn-secondary:not(:disabled):not(.disabled) {
  background-color: #f7efe5;
  color: #09072e;
}

.missFrance .btn-secondary:not(:disabled):not(.disabled).active {
  background-color: #f0dcc3;
  color: #09072e;
}
</style>
