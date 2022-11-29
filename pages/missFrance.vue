<template>
  <div>
    <h1>Miss France Test</h1>
    <div>
      <div>
        <b-form-group class="d-flex justify-content-center mt-2">
          <b-form-radio-group
            v-model="top"
            :options="tops"
            buttons
          ></b-form-radio-group>
        </b-form-group>
      </div>
      <div class="mt-1">
        <b-card-group deck class="justify-content-center"> </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "missFrance",
  layout: "missFrance",
  data() {
    return {
      year: "",
      top: "15",
      tops: [
        { text: "Top 15", value: "15" },
        { text: "Top 5", value: "5" },
        { text: "Top 1", value: "1" },
      ],
    };
  },
};
</script>

<style scoped></style>
