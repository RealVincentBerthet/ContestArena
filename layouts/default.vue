<template>
  <div class="container mx-auto px-4">
    <Navbar
      title="Contest"
      forward="/identification"
      forward_icon="account_circle"
    ></Navbar>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "default",
  head() {
    return {
      title: "Contest Arena",
      bodyAttrs: {
        class: "home",
      },
    };
  },
};
</script>
