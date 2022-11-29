<template>
  <div>
    <!-- Date selection   -->
    <div class="flex justify-center items-center py-4">
      <YearsRadios />
    </div>

    <!-- Contest cards    -->
    <div class="flex flex-wrap justify-center gap-4 mb-4 w-full">
      <Card
        v-for="item in concours"
        :key="item.asset"
        :to="item.to"
        :title="item.title"
        :subtitle="item.date"
        :asset="item.asset"
        :description="item.description"
        :abstract="item.abstract"
      ></Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      concours: [
        {
          to: "/MissFrance",
          title: "Miss France",
          date: "17/12",
          asset:
            "https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/contest%2F2023%2FMissFrance%2Fevent.png?alt=media&token=42c57de9-651b-4e84-a746-e30b37db4589",
          abstract: "",
        },
        {
          to: "#",
          title: "Eurovision",
          asset:
            "https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/contest%2F2023%2FEurovison%2Fevent.png?alt=media&token=628aedcf-89f8-49ca-a18f-9b88a95af7da",
          abstract: "WIP",
        },
      ],
    };
  },
};
</script>
