<template>
  <nav
    class="px-2 sm:px-4 py-3 w-full z-20 top-0 left-0 sticky"
    v-bind:class="{
      'bg-linen-lightest': theme == 'MissFrance',
    }"
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
          {{ full_title }}</span
        >
      </span>

      <span
        class="material-symbols-outlined pr-3 text-3xl select-none cursor-pointer"
        style="
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
        "
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
  name: "Navbar",
  props: {
    title: {
      default: "title",
      type: String,
    },
    title_prefix: {
      type: String,
    },
    title_suffix: {
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
    theme: {
      default: "",
      type: String,
    },
  },
  computed: {
    full_title: {
      get() {
        const prefix =
          this.title_prefix === undefined || this.title_prefix == ""
            ? ""
            : `${this.title_prefix} | `;

        const suffix =
          this.title_suffix === undefined || this.title_suffix == ""
            ? ""
            : ` | ${this.title_suffix}`;
        return prefix + this.title + suffix;
      },
    },
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
      if (this.$store.getters.getWatchAs != "") {
        this.$store.dispatch("setWatchAs", "");
      } else if (this.$store.getters.isAdmin) {
        this.$store.dispatch("toggleAdmin", this.$store.getters.getPlayer);
      } else {
        this.$router.push(this.backward);
      }
    },
    go_forward() {
      this.$router.push(this.forward);
    },
  },
};
</script>
