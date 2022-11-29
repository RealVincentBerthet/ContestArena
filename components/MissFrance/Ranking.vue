<template>
  <div>
    <table class="w-full max-w-lg table-fixed">
      <tbody>
        <tr
          class="odd:bg-linen even:bg-linen-lightest h-14"
          v-for="(player, key) in ranking"
          v-bind:class="{
            'cursor-pointer': !is_me(player.name),
          }"
          :key="key"
          @click="watch(player.name)"
        >
          <td class="text-left pl-7 w-20"># {{ key + 1 }}</td>
          <td class="w-8 text-center">
            <span
              class="material-symbols-outlined e pt-[6px]"
              v-bind:class="{
                active: is_me(player.name),
              }"
            >
              person
            </span>
          </td>
          <td class="text-left first-letter:capitalize">{{ player.name }}</td>
          <td class="text-xs text-right pr-7 w-24">
            {{ player.points }} points
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    players: { default: {} },
    rounds: { default: {} },
  },
  computed: {
    ranking: {
      get() {
        let ranking_list = [];
        for (const [player_name, value] of Object.entries(this.players)) {
          let player = { name: player_name, points: 0 };
          if (value.likes) {
            for (const [round_idx, player_likes] of Object.entries(
              value.likes
            )) {
              let round = this.rounds[round_idx];
              player_likes.forEach((element) => {
                if (round.qualified && round.qualified.includes(element)) {
                  player.points += round.points;
                }
              });
            }
          }
          ranking_list.push(player);
        }

        ranking_list.sort(
          (a, b) => parseFloat(b.points) - parseFloat(a.points)
        );
        return ranking_list;
      },
    },
  },
  methods: {
    watch(player) {
      if (!this.is_me(player) && !this.$store.getters.isAdmin) {
        this.$store.dispatch("setWatchAs", player);
        this.$store.dispatch("setTab", this.$store.getters.getTabs[0]);
      }
    },
    is_me(player) {
      const current_player = this.$store.getters.getPlayer;
      return current_player != "" && current_player == player;
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
