<template>
  <nav
    class="px-2 sm:px-4 py-3 w-full z-20 top-0 left-0 sticky"
    v-bind:class="[theme_bg ? theme_bg : null]"
  >
    <div class="flex">
      <span
        class="material-symbols-outlined pr-3 text-3xl select-none cursor-pointer"
        v-if="have_back"
        @click="go_back()"
      >
        {{ backward_icon }}
      </span>

      <span class="w-full text-center">
        <span
          class="text-2xl"
          v-bind:class="{
            'pr-9': have_back && !have_forward,
            'pl-9': have_forward && !have_back,
          }"
        >
          {{ title }}</span
        >
      </span>

      <span
        class="material-symbols-outlined pr-3 text-3xl select-none cursor-pointer"
        v-if="have_forward"
        @click="go_forward()"
      >
        {{ forward_icon }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  //@TODO hide return when no mobile mais faire un menu deroulan plutot sur la droite
  props: {
    title: {
      default: "title",
      type: String,
    },
    theme_bg: {
      type: String,
    },
    backward: {
      default: "",
      type: String,
    },
    backward_icon: {
      default: "arrow_back",
      type: String,
    },
    forward: {
      default: "",
      type: String,
    },
    forward_icon: {
      default: "arrow_forward ",
      type: String,
    },
  },
  computed: {
    have_back: {
      get() {
        return this.backward != "";
      },
    },
    have_forward: {
      get() {
        return this.forward != "";
      },
    },
  },
  methods: {
    go_back() {
      // if (this.$store.getters.watch != "") {
      //   this.$store.dispatch("setWatchAs", "");
      // } else if (this.$store.getters.isAdmin) {
      //   this.$store.dispatch("toggleAdmin", this.$store.getters.getPlayer);
      // } else {
      //   this.$router.push(this.backward);
      // }
      alert("not implemented");
    },
    go_forward() {
      alert("not implemented");
      //this.$router.push(this.forward);
    },
  },
};
</script>
