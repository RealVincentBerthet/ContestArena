<template>
  <table class="table-fixed w-full">
    <tbody>
      <tr :class="theme_text">
        <th scope="col"></th>
        <th scope="col" class="w-8"></th>
      </tr>
      <tr
        class="h-14"
        v-for="(element, index) in data"
        :key="element"
        :class="[theme_text, index % 2 ? theme_even : theme_odd]"
      >
        <td class="text-left text-sm pl-3">{{ element }}</td>
        <td class="text-right text-sm pr-3">
          <FormButton label="-" :minimal="true"></FormButton>
        </td>
      </tr>
      <tr>
        <td
          v-if="!data.length"
          class="w-full select-none px-2 py-3 text-xs bg-gray-200 text-gray-500"
        >
          Empty list
        </td>
        <td class="text-right text-sm pr-3"></td>
      </tr>
      <tr>
        <td class="text-left text-sm">
          <FormSelect
            :elements="pool"
            :disabled="max !== null ? data.length >= max : null"
          ></FormSelect>
        </td>
        <td class="text-right text-sm pr-3">
          <FormButton
            class="mb-5"
            label="+"
            :minimal="true"
            :disabled="max !== null? data.length >= max : null"
          ></FormButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: [],
    },
    pool: {
      type: Array,
      required: true,
      default: [],
    },
    max: {
      type: Number,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_bg: {
      default: "bg-white",
      type: String,
    },
    theme_border: {
      default: "border-neutral",
      type: String,
    },
    theme_odd: {
      default: "bg-neutral",
      type: String,
    },
    theme_even: {
      default: "bg-neutral-lightest",
      type: String,
    },
  },
};
</script>
