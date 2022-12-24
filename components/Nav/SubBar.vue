<template>
  <div class="py-2">
    <ul class="flex justify-center">
      <li
        v-for="(item, key, index) in tabs"
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
              ? ''
              : 'cursor-pointer',
            key === modelValue
              ? theme_active
              : item.disabled !== undefined && item.disabled
              ? 'bg-gray-200'
              : theme_inactive,
            index === 0 ? 'rounded-l-full' : '',
            index === Object.keys(tabs).length - 1 ? 'rounded-r-full' : '',
          ]"
        >
          {{ item.name ? item.name : key }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script scoped>
export default {
  //@TODO mettre en nav si pas besoin de fix
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
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
