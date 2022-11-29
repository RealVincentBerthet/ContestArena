<template>
  <div>
    <div>
      <b-form-group class="d-flex justify-content-center mt-2">
        <b-form-radio-group
          v-model="year"
          :options="years"
          buttons
        ></b-form-radio-group>
      </b-form-group>
    </div>
    <div class="mt-2">
      <b-card-group deck class="justify-content-center">
        <CardImage
          v-for="item in concours"
          :key="item.asset"
          :asset="item.asset"
          :to="item.to"
        ></CardImage>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "2022",
      years: [
        { text: "2021", value: "2021" },
        { text: "2022", value: "2022" },
        { text: "2023", value: "2023", disabled: true },
      ],
      concours: [
        {
          asset: require("/assets/images/miss_france/logo.jpg"),
          to: "/MissFrance",
        },
        { asset: require("/assets/images/eurovision/logo.jpg"), to: "/#" },
      ],
    };
  },
};
</script>

