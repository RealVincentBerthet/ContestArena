<template>
  <div class="flex justify-center px-6 py-2">
    <div class="flex-wrap overflow-x-auto">
      <ul class="flex">
        <li
          v-for="(item, key, index) in _tabs"
          v-if="item.active || item.active === undefined"
        >
          <input
            type="radio"
            :name="item.name ? item.name : key"
            :id="key"
            class="peer w-full hidden"
            :disabled="item.disabled !== undefined && item.disabled"
            :value="key"
            v-model="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />

          <label
            :for="key"
            class="block px-2 min-w-fit w-24 text-center select-none leading-10 h-full first-letter:capitalize"
            :class="[
              theme_text,
              item.disabled !== undefined && item.disabled
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
              key === modelValue
                ? theme_active
                : item.disabled !== undefined && item.disabled
                ? 'bg-gray-200'
                : theme_inactive,
              index === 0 ? 'rounded-l-full' : '',
              index === Object.keys(_tabs).length - 1 ? 'rounded-r-full' : '',
            ]"
          >
            {{ item.name ? item.name : key }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    tabs: {
      type: Object,
      default: {},
    },
    theme_active: {
      type: String,
      default: "bg-neutral-darkest",
    },
    theme_inactive: {
      type: String,
      default: "bg-neutral",
    },
    theme_text: {
      type: String,
      default: "text-white",
    },
  },
  computed: {
    _tabs: {
      get() {
        let tabs = {};
        for (const [key, value] of Object.entries(this.tabs)) {
          if (value.active === undefined || value.active) {
            tabs[key] = value;
          }
        }
        return tabs;
      },
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
