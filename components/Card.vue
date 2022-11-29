<template>
  <div class="max-w-sm bg-white border border-gray-200 rounded-xl">
    <NuxtLink :to="to">
      <div class="p-3">
        <h1 class="mb-2 font-bold text-gray-900 capitalize">{{ title }}</h1>
        <h3 class="text-gray-400 uppercase">{{ subtitle }}</h3>
      </div>
      <img class="object-scale-down h-48 w-96" :src="asset" />
    </NuxtLink>
    <div class="p-3">
      <p class="text-gray-700 first-letter:capitalize">{{ abstract }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      default: "title",
      type: String,
    },
    subtitle: {
      default: "dd/mm",
      type: String,
    },
    asset: {
      default:
        "https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fdefault_card.png?alt=media&token=ab4675ab-29df-4e75-99ee-a070840909c4",
      type: String,
    },
    to: {
      default: "#",
      type: String,
    },
    abstract: {
      default: "abstract",
      type: String,
    },
  },
};
</script>
