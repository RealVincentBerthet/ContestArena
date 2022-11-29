<template>
  <section>
    <div class="block fixed inset-x-0 bottom-0 z-10">
      <!-- Player info -->
      <div
        class="flex-wrap justify-center w-full text-center text-white text-sm"
      >
        <div
          class="bg-danger-dark first-letter:capitalize"
          v-if="this.$store.getters.isAdmin === true"
        >
          Admin mode
        </div>
        <div
          class="bg-info-dark first-letter:capitalize"
          v-else-if="this.$store.getters.getPlayer === ''"
        >
          You are not logged
        </div>
        <div
          class="bg-info-dark first-letter:capitalize"
          v-if="this.$store.getters.getWatchAs != ''"
        >
          watching as {{ this.$store.getters.getWatchAs }}
        </div>
        <div class="w-full h-1" v-bind:class="{ hidden: score == 0 }">
          <div
            class="bg-gray-600 h-1"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{ width: score + '%' }"
          ></div>
        </div>
      </div>
      <!-- Navigation tabs -->
      <div class="bg-linen-darkest py-2">
        <ul class="flex justify-center gap-5">
          <li v-for="item in tabs_allowed" :key="item.to">
            <input
              type="radio"
              name="tan"
              :id="item.to"
              class="peer w-full hidden"
              :value="item.to"
              v-model="tab"
            />

            <label
              :for="item.to"
              class="flex cursor-pointer select-none rounded-full text-center capitalize h-full w-full peer-checked:bg-white"
            >
              <div>
                <div class="flex px-6 rounded-full">
                  <span
                    class="material-symbols-outlined"
                    v-bind:class="{ active: item.to == tab }"
                  >
                    {{ item.icon }}
                  </span>
                </div>
                <span class="flex justify-center text-xs capitalize">
                  {{ item.to }}
                </span>
              </div></label
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MissFranceNav",
  data() {
    return {
      tabs: [
        { to: "choices", icon: "diagnosis" },
        { to: "ranking", icon: "military_tech" },
        { to: "rules", icon: "info" },
      ],
    };
  },
  computed: {
    score: {
      get() {
        const max =
          this.$store.getters.getRounds[this.$store.getters.getRound].max;
        const likes_count = this.$store.getters.getLikes.length;

        return likes_count > 0 && this.$store.getters.getTab == "choices"
          ? (likes_count / max) * 100
          : 0;
      },
    },
    tab: {
      get() {
        return this.$store.getters.getTab;
      },
      set(value) {
        this.$store.dispatch("setTab", value);
      },
    },
    tabs_allowed: {
      get() {
        let tabs_available = this.tabs;
        if (
          this.$store.getters.getAdmins.includes(this.$store.getters.getPlayer)
        ) {
          tabs_available.push({ to: "admin", icon: "admin_panel_settings " });
        }
        return tabs_available;
      },
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
