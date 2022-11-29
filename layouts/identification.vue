<template>
  <div class="container mx-auto px-4 pb-16">
    <Navbar
      title="Identification"
      backward="/"
    ></Navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "identification",
  head() {
    return {
      title: "Contest Arena | Identification",
      bodyAttrs: {
        class: "home",
      },
    };
  },
};
</script>


