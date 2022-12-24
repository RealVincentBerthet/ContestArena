<template>
  <div class="container mx-auto pb-16">
    <NavBar title="TODO" theme_bg="bg-linen-lightest"></NavBar>
    <Nuxt />
    <!-- @TODO NAV BAr au lieu que dans le contest ?-->
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      // fetch player info if logged
      if (this.$fire.auth.currentUser !== null) {
        this.$fire.database
          .ref(`/users/${this.$fire.auth.currentUser.uid}`)
          .on("value", (snapshot) => {
            this.$store.commit("user/setUser", snapshot.val());
          });
      } else {
        this.$store.commit("user/setUser", {});
      }
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
