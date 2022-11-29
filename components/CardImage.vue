<template>
  <NuxtLink :to="`${to}`">
    <b-card :img-src="`${asset}`" img-alt="Image" overlay></b-card>
  </NuxtLink>
</template>

<script>
export default {
  props: ["asset", "to"],
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  border: 0px;
}

.card:hover {
  opacity: 0.7;
}

.card-img {
  border-radius: 12px;
  width: 360px;
  height: 188px;
}
</style>
