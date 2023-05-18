<template>
  <div class="container mx-auto">
    <NavLoader
      type="dots"
      v-if="$store.getters['loader/visible']"
    ></NavLoader>
    <Nuxt v-if="!$store.getters['loader/visible']" />
  </div>
</template>

<script>
export default {
  async fetch() {
    this.$store.commit("loader/setVisible", 1);
    try {
      // fetch player info if logged
      if (this.$fire.auth.currentUser !== null) {
        this.$fire.database
          .ref(`/users/${this.$fire.auth.currentUser.uid}`)
          .on("value", (snapshot) => {
            this.$store.commit("user/setUser", snapshot.val());
            this.$store.commit("loader/setVisible", -1);
          });
      } else {
        this.$store.commit("loader/setVisible", -1);
        this.$store.commit("user/setUser", {});
      }
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
