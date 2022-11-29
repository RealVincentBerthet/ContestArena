<template>
  <section>
    <div class="flex-block">
      <div>
        <img
          class="flex-block object-scale-down h-60 w-24 my-11 mx-auto"
          src="https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fruler.svg?alt=media&token=1022768a-f079-492e-8abd-fcbbd143a02c"
        />
      </div>
      <div>
        <div
          v-for="item in rounds"
          :key="item.name"
          class="flex-block text-center mb-4 w-full"
        >
          <div class="py-2">
            <h2 class="font-bold">{{ item.name }}</h2>
          </div>
          <p>{{ formatText(item) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MissFranceRules",
  layout: "missFrance",
  props:{
    rounds: {
      default:[],
      type: Array
    }
  },
  methods: {
    formatText(round) {
      let text = round["points"];
      text += round["points"] > 1 ? " points" : " point";
      text += round["max"] > 1 ? " per good choice" : " for the good choice";

      return text;
    },
  },
};
</script>
