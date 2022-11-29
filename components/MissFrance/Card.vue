<template>
  <div
    class="w-[360px] bg-white border-gray-200 border rounded-xl"
    v-bind:class="{
      hidden: is_pool == false,
      'bg-success-lightest':
        qualified.length > 0 &&
        !is_admin &&
        is_qualified == true &&
        is_liked == true,
      'bg-danger-lightest':
        qualified.length > 0 &&
        !is_admin &&
        is_qualified == false &&
        is_liked == true,
      'bg-info-lightest':
        qualified.length > 0 &&
        !is_admin &&
        is_qualified == true &&
        is_liked == false,
    }"
  >
    <div class="p-3 flex">
      <div class="w-11/12">
        <a :href="external_link" target="_blank"
          ><h1 class="mb-2 font-bold text-gray-900 capitalize">
            {{ title }}
          </h1></a
        >
        <h3 class="text-gray-400 uppercase text-sm">{{ subtitle }}</h3>
      </div>
      <div>
        <span
          class="material-symbols-outlined text-4xl cursor-pointer select-none"
          v-bind:class="{
            active: is_liked,
            hidden:
              (qualified.length > 0 && !is_admin) ||
              (is_watching && !is_liked) ||
              this.$store.getters.getPlayer == '',
          }"
          @click="likeOrDislike()"
          >favorite</span
        >
        <span
          class="material-symbols-outlined text-4xl text-success-dark select-none"
          v-bind:class="{
            hidden:
              qualified.length < 1 ||
              is_admin ||
              !(is_qualified == true && is_liked == true),
          }"
        >
          check_circle
        </span>
        <span
          class="material-symbols-outlined text-4xl text-danger-dark select-none"
          v-bind:class="{
            hidden:
              qualified.length < 1 ||
              is_admin ||
              !(is_qualified == false && is_liked == true),
          }"
        >
          block
        </span>
      </div>
    </div>
    <img
      class="object-cover object-top h-[360px] w-[360px] bg-clip-content"
      :src="asset"
    />
    <div class="p-3">
      <p class="text-gray-700 first-letter:capitalize">{{ abstract }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MissFranceCard",
  props: {
    id: {
      type: String,
    },
    name: {
      default: "",
      type: String,
    },
    surname: {
      default: "",
      type: String,
    },
    age: {
      type: Number,
    },
    asset: {
      default:
        "https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fdefault_card.png?alt=media&token=ab4675ab-29df-4e75-99ee-a070840909c4",
      type: String,
    },
    abstract: {
      default: "abstract",
      type: String,
    },
    instagram: {
      default: "",
      type: String,
    },
    pool: {
      default: [],
      type: Array,
    },
    likes: {
      default: [],
      type: Array,
    },
    qualified: {
      default: [],
      type: Array,
    },
  },
  computed: {
    title: {
      get() {
        return `${this.name} ${this.surname}`;
      },
    },
    subtitle: {
      get() {
        return `${this.id} | ${this.age} years old`;
      },
    },
    external_link: {
      get() {
        if (this.instagram != "") {
          return `https://www.instagram.com/${this.instagram}`;
        }
      },
    },
    is_pool: {
      get() {
        return this.pool.includes(this.id); //@TODO faire des getters qui font le backend plutôt
      },
    },
    is_liked: {
      get() {
        let ret = this.likes.includes(this.id);
        if (this.is_admin) {
          ret = this.qualified.includes(this.id);
        }
        return ret;
      },
    },
    is_qualified: {
      get() {
        return this.qualified.includes(this.id);
      },
    },
    is_admin: {
      get() {
        return this.$store.getters.isAdmin;
      },
    },
    is_watching: {
      get() {
        return this.$store.getters.getWatchAs != "";
      },
    },
  },
  methods: {
    likeOrDislike() {
      if (!this.is_watching) {
        const endpoint_max = `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/rounds/${this.$store.getters.getRound}/max`;
        this.$fire.database.ref(endpoint_max).once("value", (data) => {
          let max = data.val();
          max = max == undefined ? -1 : max;
          let endpoints = [];
          if (this.is_admin) {
            endpoints.push(
              `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/rounds/${this.$store.getters.getRound}/qualified`
            );
            if (
              this.$store.getters.getRound + 1 <
              this.$store.getters.getRounds.length
            ) {
              endpoints.push(
                `/contest/${this.$store.getters.getYear}/${
                  this.$store.getters.getEvent
                }/event/rounds/${this.$store.getters.getRound + 1}/pool`
              );
            }
          } else {
            endpoints.push(
              `/contest/${this.$store.getters.getYear}/${this.$store.getters.getEvent}/event/players/${this.$store.getters.getPlayer}/likes/${this.$store.getters.getRound}`
            );
          }

          endpoints.forEach((endpoint) => {
            this.$fire.database.ref(endpoint).once("value", (data2) => {
              let error = false;
              let values = data2.val();
              if (values == undefined) {
                values = [];
              }

              if (this.is_liked == true) {
                // remove
                const index = values.indexOf(this.id);
                if (index > -1) {
                  values.splice(index, 1);
                }
              } else if (this.is_liked == false && !values.includes(this.id)) {
                // add
                if (values.length < max) {
                  values.push(this.id);
                } else {
                  this.$toast.show(
                    `Maximum number of choices reached for this round (only ${max})`,
                    {
                      duration: 1500,
                      className: "toast-theme",
                    }
                  );
                  error = true;
                }
              }
              if (!error) {
                this.$fire.database.ref(endpoint).set(values);
              }
            });
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  color: #b22222;
}
</style>
