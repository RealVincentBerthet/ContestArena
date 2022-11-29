<template>
  <div>
    <section v-if="this.$store.getters.getTab == 'choices'">
      <!-- Round selection   -->
      <div class="flex justify-center items-center pb-4 z-20 top-[60px] bg-linen-lightest left-0 sticky">
        <div class="inline-flex flex-wrap text-center bg-linen rounded-full">
          <MissFranceRadio
            v-for="(round, key) in rounds"
            :key="key"
            :round_idx="key"
            :rounds="rounds"
          ></MissFranceRadio>
        </div>
      </div>
      <!-- Contest cards    -->
      <div class="flex flex-wrap justify-center gap-4 mb-4 w-full">
        <MissFranceCard
          v-for="(candidate, key) in candidates"
          :key="candidate.region"
          :id="key"
          :name="candidate.name"
          :surname="candidate.surname"
          :age="candidate.age"
          :asset="candidate.asset"
          :abstract="candidate.abstract"
          :instagram="candidate.instagram"
          :pool="pool"
          :likes="likes"
          :qualified="qualified"
        ></MissFranceCard>
      </div>
    </section>
    <section v-if="this.$store.getters.getTab == 'ranking'">
      <div class="flex flex-wrap justify-center gap-4 my-4 w-full">
        <MissFranceRanking :rounds="rounds" :players="players"></MissFranceRanking>
      </div>
    </section>
    <section v-if="this.$store.getters.getTab == 'rules'">
      <MissFranceRules :rounds="rounds"></MissFranceRules>
    </section>
    <section v-if="this.$store.getters.getTab == 'admin'">
      <div class="flex flex-wrap justify-center gap-4 my-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="adminToggle()"
        >
          Toggle admin mode
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "missFrance",
  head() {
    return {
      title: "Contest Arena | Miss France " + this.$store.getters.getYear,
    };
  },
  // async fetch() {
  //   this.mountains = await fetch("https://api.nuxtjs.dev/mountains").then(
  //     (res) => res.json()
  //   );
  // },
  computed: {
    rounds: {
      get() {
        this.$fire.database
          .ref(
            `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/rounds`
          )
          .on("value", (snapshot) => {
            const data = snapshot.val();
            this.rounds = data;
          });
        return this.$store.getters.getRounds;
      },
      set(value) {
        this.$store.dispatch("setRounds", value);
      },
    },
    candidates: {
      get() {
        this.$fire.database
          .ref(
            `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/candidates`
          )
          .on("value", (snapshot) => {
            const data = snapshot.val();
            this.candidates = data;
          });
        return this.$store.getters.getCandidates;
      },
      set(value) {
        this.$store.dispatch("setCandidates", value);
      },
    },
    pool: {
      get() {
        this.$fire.database
          .ref(
            `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/rounds/${this.$store.getters.getRound}/pool`
          )
          .on("value", (snapshot) => {
            const data = snapshot.val();
            this.pool = data;
          });

        return this.$store.getters.getPool;
      },
      set(value) {
        this.$store.dispatch("setPool", value);
      },
    },
    likes: {
      get() {
        const player_to_use =
          this.$store.getters.getWatchAs != ""
            ? this.$store.getters.getWatchAs
            : this.$store.getters.getPlayer;
        this.$fire.database
          .ref(
            `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/players/${player_to_use}/likes/${this.$store.getters.getRound}`
          )
          .on("value", (snapshot) => {
            const data = snapshot.val();
            this.likes = data;
          });
        return this.$store.getters.getLikes;
      },
      set(value) {
        this.$store.dispatch("setLikes", value);
      },
    },
    players: {
      get() {
        this.$fire.database
          .ref(
            `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/players`
          )
          .on("value", (snapshot) => {
            const data = snapshot.val();
            this.players = data;
          });
        return this.$store.getters.getPlayers;
      },
      set(value) {
        this.$store.dispatch("setPlayers", value);
      },
    },
    qualified: {
      get() {
        this.$fire.database
          .ref(
            `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/rounds/${this.$store.getters.getRound}/qualified`
          )
          .on("value", (snapshot) => {
            const data = snapshot.val();
            this.qualified = data;
          });
        return this.$store.getters.getQualified;
      },
      set(value) {
        this.$store.dispatch("setQualified", value);
      },
    },
  },
  methods: {
    adminToggle() {
      this.$store.dispatch("toggleAdmin", this.$store.getters.getPlayer);
    },
  },
};
</script>

<style scoped></style>
