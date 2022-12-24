<template>
  <div
    v-if="
      data && data.info && data.event && data.candidates && data.event.enabled
    "
  >
    <div>
      <!-- choices -->
      <section v-if="['choices', 'watching'].includes(tab)">
        <!-- round selection -->
        <div
          class="block fixed inset-x-0 top-14 z-10"
          :class="theme.bg.lightest"
        >
          <NavSubBar
            :modelValue="round"
            @update:modelValue="(v) => (round = v)"
            :tabs="_tabs_rounds"
            :theme_active="theme.bg.darkest"
            :theme_inactive="theme.bg.default"
            :theme_text="theme.text.default"
          ></NavSubBar>
        </div>
        <!-- cards -->
        <div class="flex flex-wrap justify-center gap-4 my-16 w-full">
          <ContestCard
            v-for="(candidate, key) in event_candidates"
            v-if="event_pool.includes(key)"
            :key="key"
            :id="key"
            :title="`${candidate.name} ${candidate.surname}`"
            :subtitle="`${key} | ${candidate.age} years old`"
            :link="candidate.link"
            :asset="candidate.asset"
            :abstract="candidate.abstract"
            :voting="
              ((!event_round.locked && !event_qualified.length) || _admin_on) &&
              event_pool.includes(key)
            "
            :liked="_likes.includes(key)"
            :qualified="event_qualified.includes(key)"
            :theme_text="theme.text.default"
            :theme_subtext="theme.text.lightest"
            theme_img="object-cover h-[360px] w-[360px]"
            @action:vote="(v) => vote(v)"
          ></ContestCard>
        </div>
      </section>
      <!-- ranking -->
      <section v-else-if="tab === 'ranking'">
        <div
          class="block fixed inset-x-0 top-14 z-10"
          :class="theme.bg.lightest"
        >
          <NavSubBar
            :modelValue="subtab"
            @update:modelValue="(v) => (subtab = v)"
            :tabs="_tabs_ranking"
            :theme_active="theme.bg.darkest"
            :theme_inactive="theme.bg.default"
            :theme_text="theme.text.default"
          ></NavSubBar>
        </div>
        <div
          v-if="subtab === 'ranks'"
          class="flex flex-wrap justify-center gap-4 my-16 w-full"
        >
          <ContestRanking
            :rounds="event_rounds"
            :players="event_players"
            @action:watch="(v) => watch(v)"
            :theme_odd="theme.bg.default"
            :theme_even="theme.bg.lightest"
            :theme_text="theme.text.default"
          ></ContestRanking>
        </div>
        <div v-else-if="subtab === 'advanced'">aa</div>
      </section>
      <!-- rules -->
      <section v-else-if="tab === 'rules'">
        <div>
          <ContestRules
            :rounds="event_rounds"
            :theme_text="theme.text.default"
          ></ContestRules>
        </div>
      </section>
      <!-- admin -->
      <section v-else-if="tab == 'admin'">
        <div class="flex items-center justify-center w-full mt-12 mb-12">
          <FormToggle
            label="Administrator"
            :modelValue="_admin_on"
            @update:modelValue="(v) => (_admin_on = v)"
            :theme_text="theme.text.default"
            :theme_bg="theme.bg.darkest"
          ></FormToggle>
        </div>
        <div class="flex justify-center">
          <ContestManagement
            :data="data"
            :theme_bg="theme.bg.default"
            :theme_text="theme.text.default"
            :theme_border="theme.border.default"
            :theme_odd="theme.bg.default"
            :theme_even="theme.bg.lightest"
          ></ContestManagement>
        </div>
      </section>
      <!-- none-->
      <section v-else class="flex">
        <span
          class="material-symbols-outlined text-center w-full text-9xl"
          :class="[theme.text.lightest]"
        >
          sentiment_very_dissatisfied
        </span>
      </section>
    </div>
    <NavStatus
      :statuses="_statuses"
      @status:id="(v) => (_statuses = v)"
    ></NavStatus>
    <div>
      <!-- Navigation bottom bar-->
      <NavBottomBar
        :modelValue="tab"
        @update:modelValue="(v) => (tab = v)"
        :progress="_progress"
        :tabs="_tabs"
        :theme_bg="theme.bg.darkest"
        :theme_active="theme.bg.lightest"
        :theme_text="theme.text.default"
      ></NavBottomBar>
    </div>
  </div>
  <div v-else class="mt-16">
    <span
      class="material-symbols-outlined text-center w-full text-9xl"
      :class="[theme.text.lightest]"
    >
      sentiment_very_dissatisfied
    </span>
    <span class="flex justify-center w-full" :class="[theme.text.lightest]"
      >Contest doesn't exists</span
    >
  </div>
</template>

<script>
export default {
  layout: "contest",
  head() {
    return {
      title: "Contest Arena | @TODO",
      bodyAttrs: {
        class: this.theme.bg.lightest,
      },
    };
  },
  data() {
    return {
      tab: "",
      subtab: "",
      round: "0",
      endpoint: "",
      data: {},
      watching: {},
      admin: {},
      theme: {
        bg: {
          darkest: "bg-linen-darkest",
          default: "bg-linen",
          lightest: "bg-linen-lightest",
        },
        text: { default: "text-black", lightest: "text-gray-400" },
        border: {
          darkest: "border-neutral-darkest",
          default: "border-neutral",
          lightest: "border-neutral-lightest",
        },
      },
    };
  },
  watch: {
    tab(new_tab, old_tab) {
      if (old_tab === "watching") {
        this._watching = {};
      }
    },
  },
  created() {
    if (this._tabs) {
      this.tab = Object.keys(this._tabs)[0];
    }
    if (this._tabs_ranking) {
      this.subtab = Object.keys(this._tabs_ranking)[0];
    }
  },
  async fetch() {
    try {
      if (this.$route.query && this.$route.query.id) {
        this.endpoint = `/contest/${this.$route.query.id}`;
        await this.$fire.database.ref(this.endpoint).on("value", (snapshot) => {
          this.data = snapshot.val();
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    _tabs: {
      get() {
        return {
          choices: { icon: "diagnosis", active: true },
          ranking: {
            icon: "military_tech",
            active: !this._watching,
          },
          watching: {
            name: "ranking",
            icon: "military_tech",
            active: this._watching,
          },
          rules: { icon: "info", active: true },
          admin: {
            icon: "admin_panel_settings",
            active: this._admin,
          },
        };
      },
    },
    _tabs_rounds: {
      get() {
        let ret = {};

        if (this.event_rounds.length) {
          this.event_rounds.forEach((element, index) => {
            ret[index.toString()] = {
              name: element.name,
              disabled: !element.pool,
            };
          });
        }

        return ret;
      },
    },
    _tabs_ranking: {
      get() {
        let ret = { ranks: {}, advanced: { disabled: true } };

        return ret;
      },
    },
    _statuses: {
      //@TODO transition duration-150 ease-in-out status
      get() {
        let ret = [];

        if (["choices", "ranking", "watching"].includes(this.tab)) {
          if (this._admin_on) {
            ret.push({
              msg: "Administrator is used",
              type: "alert",
              id: "admin",
            });
          }
        }

        if (["choices"].includes(this.tab)) {
          if (this.event_qualified.length) {
            ret.push({ msg: "Round is over" });
          } else if (this.event_round.locked) {
            ret.push({ msg: "Round is locked" });
          }
        }

        if (["ranking"].includes(this.tab)) {
          if (Object.keys(this.event_players).length < 1) {
            ret.push({ msg: "No ranking available yet" });
          }
        }

        if (["watching"].includes(this.tab)) {
          if (this._watching) {
            ret.push({ msg: `Watching as ${this.watching.name}`, id: "watch" });
          }
        }

        return ret;
      },
      set(value) {
        if (value.id) {
          if (value.id === "watch") {
            this._watching = "";
            this.tab = "ranking";
          } else if (value.id === "admin") {
            this._admin_on = false;
          }
        }
      },
    },
    _admin: {
      get() {
        let ret = false;
        if (this.$fire.auth.currentUser) {
          const admins =
            this.data.event && this.data.event.admins
              ? this.data.event.admins
              : [];
          ret = admins.includes(this.$fire.auth.currentUser.uid);
        }
        return ret;
      },
    },
    _admin_on: {
      get() {
        return (
          this._admin &&
          this.admin.hasOwnProperty("enabled") &&
          this.admin.enabled
        );
      },
      set(value) {
        if (value) {
          this.admin = { enabled: value };
        } else {
          this.admin = {};
        }
      },
    },
    _watching: {
      get() {
        return Object.keys(this.watching).length > 0;
      },
      set(value) {
        this.watching = value;
        if (this._watching) {
          this.tab = "watching";
        }
      },
    },
    _progress: {
      get() {
        const max =
          this.event_round && this.event_round.max ? this.event_round.max : -1;
        const likes_count = this._likes ? this._likes.length : 0;

        return likes_count > 0 && ["choices", "watching"].includes(this.tab)
          ? (likes_count / max) * 100
          : 0;
      },
    },
    _likes: {
      //@TODO une option pour hide likes de la manche en cours.
      get() {
        let likes = [];
        if (this.$fire.auth.currentUser) {
          if (this._admin_on && !this._watching) {
            return this.event_qualified;
          } else {
            let uid = this._watching
              ? this.watching.uid
              : this.$fire.auth.currentUser.uid;

            likes =
              this.event_players &&
              this.event_players[uid] &&
              this.event_players[uid].likes &&
              this.event_players[uid].likes[this.round] &&
              (this.event_round.watch ||
                this._admin_on ||
                (this.event_qualified && this.event_qualified.length > 0))
                ? this.event_players[uid].likes[this.round]
                : [];
          }
        }

        return likes;
      },
    },
    event_candidates: {
      get() {
        return this.data && this.data.candidates ? this.data.candidates : {};
      },
    },
    event_rounds: {
      get() {
        return this.data && this.data.event && this.data.event.rounds
          ? this.data.event.rounds
          : [];
      },
    },
    event_round: {
      get() {
        return this.event_rounds && this.event_rounds[this.round]
          ? this.event_rounds[this.round]
          : {};
      },
    },
    event_pool: {
      get() {
        return this.event_round && this.event_round.pool
          ? this.event_round.pool
          : [];
      },
    },
    event_qualified: {
      get() {
        return this.event_round && this.event_round.qualified
          ? this.event_round.qualified
          : [];
      },
    },
    event_players: {
      get() {
        return this.data && this.data.event && this.data.event.players
          ? this.data.event.players
          : {};
      },
    },
  },
  methods: {
    vote(key) {
      let toasts = [];
      if (this.$fire.auth.currentUser) {
        if ((!this._watching && !this.event_round.locked) || this._admin_on) {
          try {
            // initialize
            let endpoints = [];
            const propagate =
              this.data.event && this.data.event.propagate
                ? this.data.event.propagate
                : false;
            const max =
              this.data.event &&
              this.data.event.rounds &&
              this.data.event.rounds[this.round] &&
              this.data.event.rounds[this.round].max
                ? this.data.event.rounds[this.round].max
                : -1;

            if (this._admin_on) {
              if (!this._watching) {
                endpoints.push(
                  `${this.endpoint}/event/rounds/${this.round}/qualified`
                );
                if (propagate && this.round + 1 < this.event_rounds.length) {
                  endpoints.push(
                    `${this.endpoint}/event/rounds/${this.round + 1}/pool`
                  );
                }
              } else {
                endpoints.push(
                  `${this.endpoint}/event/players/${this.watching.uid}/likes/${this.round}`
                );
              }
            } else {
              this.$fire.database
                .ref(
                  `${this.endpoint}/event/players/${this.$fire.auth.currentUser.uid}/user_info`
                )
                .set(this.$store.getters["user/getUser"]);
              endpoints.push(
                `${this.endpoint}/event/players/${this.$fire.auth.currentUser.uid}/likes/${this.round}`
              );
            }
            // update vote
            let values = this._likes.filter((x) => x); // remove empty slot
            if (values.includes(key)) {
              values.splice(values.indexOf(key), 1);
            } else {
              if (values.length < max) {
                values.push(key);
              } else {
                toasts.push({
                  msg: `You reached the max number of choices for this round (${max})`,
                });
              }
            }
            if (toasts.length < 1) {
              // update database
              endpoints.forEach((e) => {
                this.$fire.database.ref(e).set(values);
              });
            }
          } catch (e) {
            toasts.push({
              msg: e,
              type: "error",
            });
          }
        }
      } else {
        toasts.push({
          msg: "You need to be&nbsp;<a href='/identification' style='text-decoration: underline;'>logged</a>",
        });
      }

      toasts.forEach((toast) => {
        this.$toast.show(toast.msg, {
          duration: toast.duration ? toast.duration : 1500,
          type: toast.type,
          className: "toast-theme",
        });
      });
    },
    watch(player) {
      if (
        !this.$fire.auth.currentUse ||
        this.$fire.auth.currentUser.uid != player.uid ||
        this._admin_on
      ) {
        this._watching = player;
      }
    },
  },
};
</script>

<style scoped></style>
