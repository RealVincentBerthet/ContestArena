<template>
  <div
    class="inline-flex flex-wrap text-center bg-neutral text-white rounded-full"
  >
    <div class="w-24" v-for="item in years" :key="item">
      <input
        type="radio"
        name="year"
        :id="item"
        class="peer w-full hidden"
        :value="item"
        v-model="year"
      />
      <label
        :for="item"
        class="inline-block cursor-pointer select-none rounded-full leading-10 capitalize h-full w-full peer-checked:bg-neutral-dark"
        >{{ item }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    year: {
      get() {
        return this.$store.getters.getYear;
      },
      set(value) {
        this.$store.dispatch("setYear", value);
      },
    },
    years: {
      get() {
        return this.$store.getters.getYears;
      },
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 0;
}
</style>
