<template>
  <div class="container mx-auto px-4 pb-16">
    <Navbar
      title="Miss France"
      :title_prefix="this.$store.state.year_in_use"
      backward="/"
      theme="MissFrance"
    ></Navbar>
    <Nuxt />
    <MissFranceNav></MissFranceNav>
  </div>
</template>

<script>
export default {
  name: "missFrance",
  head() {
    return {
      title: "Contest Arena | Miss France",
      bodyAttrs: {
        class: "miss-france",
      },
    };
  },
};
</script>
