<template>
  <div>
    <div class="w-24">
      <input
        type="radio"
        name="rounds"
        :id="round_name"
        class="peer w-full hidden"
        :value="round_idx"
        v-model="round"
        :disabled="!is_active"
      />
      <label
        :for="round_name"
        class="inline-block cursor-pointer select-none rounded-full leading-10 capitalize h-full w-full peer-checked:bg-linen-darkest peer-disabled:bg-paris-darkest/10"
        >{{ round_name }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    round_idx: {
      type: Number,
    },
    rounds: { default: {} },
  },
  computed: {
    round: {
      get() {
        return this.$store.getters.getRound;
      },
      set(value) {
        this.$store.dispatch("setRound", value);
      },
    },
    round_name: {
      get() {
        return this.rounds[this.round_idx].name;
      },
    },
    is_active: {
      get() {
        return this.rounds[this.round_idx].pool != undefined;
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
