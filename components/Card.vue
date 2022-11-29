<template>
  <NuxtLink class="" to="/MissFrance">
    <b-card no-body>
      <b-card-body>
        <b-card-title>Miss France</b-card-title>
        <b-card-sub-title class="mb-2">2022</b-card-sub-title>
      </b-card-body>
      <b-card-img
        src="./../assets/images/miss_france/logo.jpg"
        alt="Image"
        class="rounded-0"
      ></b-card-img>
      <b-card-body> Description </b-card-body>
    </b-card>
  </NuxtLink>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style scoped>
.card {
  background-color: #faf5ef;
  border-radius: 12px;
  /* border : 0; */
  /* disabled card griser tout */
}

img {
  width: 360px;
  height: 188px;
}

a {
  color: inherit;
  text-decoration: none;
}
/*class="border-success" */
</style>
