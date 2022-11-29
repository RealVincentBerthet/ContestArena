<template>
  <section>
    <!-- Identification register or login -->
    <div class="flex justify-center items-center py-4">
      <div
        class="inline-flex flex-wrap text-center bg-neutral text-white rounded-full"
      >
        <div class="w-24" v-for="item in tabs_allowed" :key="item">
          <input
            type="radio"
            name="identification"
            :id="item"
            class="peer w-full hidden"
            :value="item"
            v-model="tab"
          />
          <label
            :for="item"
            class="inline-block cursor-pointer select-none rounded-full leading-10 first-letter:capitalize h-full w-full peer-checked:bg-neutral-dark"
            >{{ item }}</label
          >
        </div>
      </div>
    </div>
    <div>
      <!-- @TODO nok alginement en large -->
      <div>
        <div class="w-full max-w-lg items-center mx-auto py-8">
          <div class="w-full" v-if="tab != 'profile'">
            <!-- email -->
            <div>
              <label for="email" class="block">
                <span
                  class="block font-medium after:content-['*'] after:ml-0.5 first-letter:capitalize after:text-red-500"
                  >mail</span
                >
                <input
                  type="email"
                  id="email"
                  v-model="mail"
                  class="px-1 py-3 w-full bg-inherit border-transparent focus:border-transparent border rounded-md border-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-100 first-letter:invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 invalid:focus:bg-pink-100 peer"
                />
                <p
                  class="text-xs m-1 text-pink-700 invisible first-letter:capitalize peer-invalid:visible"
                >
                  Not a valid email
                </p>
              </label>
            </div>
            <!--pseudo -->
            <div v-if="tab == 'register'">
              <label for="pseudo" class="block">
                <span
                  class="block font-medium after:content-['*'] after:ml-0.5 first-letter:capitalize after:text-red-500"
                  >Pseudo</span
                >
                <input
                  type="text"
                  v-model="pseudo"
                  id="pseudo"
                  minlength="3"
                  class="px-1 py-3 w-full bg-inherit border-transparent focus:border-transparent border rounded-md border-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-100 first-letter:invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 invalid:focus:bg-pink-100 peer"
                />
                <p
                  class="text-xs m-1 text-pink-700 invisible first-letter:capitalize peer-invalid:visible"
                >
                  cannot be less than 3 characters
                </p>
              </label>
            </div>
            <!-- password -->
            <div class="relative">
              <div
                class="absolute flex right-4 mt-1.5 items-center ml-2 h-full"
              >
                <button class="px-1 block focus:outline-none">
                  <span class="material-symbols-outlined"> visibility </span>
                </button>
              </div>
              <label for="password" class="block">
                <span
                  class="block font-medium after:content-['*'] after:ml-0.5 first-letter:capitalize after:text-red-500"
                  >Password</span
                >
                <input
                  type="password"
                  id="password"
                  v-model="pwd"
                  minlength="5"
                  class="px-1 py-3 w-full bg-inherit border-transparent focus:border-transparent border rounded-md border-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-info-500 focus:border-blue-500 focus:bg-blue-100 first-letter:invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 invalid:focus:bg-pink-100 peer"
                />
                <p
                  class="text-xs m-1 text-pink-700 invisible first-letter:capitalize peer-invalid:visible"
                >
                  cannot be less than 6 characters
                </p>
              </label>
            </div>
          </div>
          <!-- <div v-if="tab_in_use == 'login'">
          <button class="underline">Forgot password ?</button>
          </div> -->
          <div v-if="tab == 'profile'">
            You are logged as
            <span class="font-bold">{{ this.$store.getters.getPlayer }}</span>
            on
            <span class="font-bold">
              {{ this.$store.getters.getPlayerMail }}</span
            >
          </div>
          <div class="py-12">
            <button
              class="bg-paris-darkest hover:bg-paris-dark py-3 text-white rounded-full max-w-lg justify-center w-full first-letter:capitalize"
              @click="register()"
            >
              {{ tabs[tab].button }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "identification",
  data() {
    return {
      mail: "",
      pseudo: "",
      pwd: "",
      tabs: {
        register: { button: "register" },
        login: { button: "login" },
        profile: { button: "logout" },
      },
      tab_in_use: "",
    };
  },
  computed: {
    tabs_allowed: {
      get() {
        if (this.$store.getters.getPlayer != "") {
          this.tab_in_use = "profile";
        }
        return this.tab_in_use == "profile"
          ? ["profile"]
          : ["register", "login"];
      },
    },
    tab: {
      get() {
        return this.tab_in_use != "" ? this.tab_in_use : this.tabs_allowed[0];
      },
      set(value) {
        this.tab_in_use = value;
      },
    },
  },
  methods: {
    register() {
      if (this.tab == "profile" && this.$store.getters.getPlayer != "") {
        this.$store.commit("setPlayer", "");
        this.$store.commit("setPlayerMail", "");
        this.$store.commit("setPlayerUid", "");
        this.$toast.show(`You have been disconnected`, {
          duration: 1500,
          type: "success",
        });
        this.tab = "register";
      } else if (this.tab == "login") {
        this.login();
      } else if (this.tab == "register") {
        this.createUser();
      }
    },
    async pushUserInDB(uid, pseudo, mail) {
      let values = { pseudo: pseudo, mail: mail };
      this.$fire.database.ref(`/users/${uid}`).set(values);
      //TODO mettre des try catch de partout bordel
    },
    async createUser() {
      if (this.pwd.length >= 5 && this.pseudo.length > 3) {
        try {
          const userCredential =
            await this.$fire.auth.createUserWithEmailAndPassword(
              this.mail,
              this.pwd
            );
          this.$store.commit("setPlayer", this.pseudo);
          this.$store.commit("setPlayerMail", this.mail);
          this.$store.commit("setPlayerUid", userCredential.user.uid);
          this.tab = "profile";
          this.pushUserInDB(
            this.$store.getters.getPlayerUid,
            this.$store.getters.getPlayer,
            this.$store.getters.getPlayerMail
          );
          this.$toast.show(
            `You have been register and logged as ${this.mail}`,
            {
              duration: 3000,
              type: "success",
            }
          );
        } catch (e) {
          this.$toast.show(`${e.message}`, {
            duration: 5000,
            type: "error",
          });
        }
      } else {
        this.$toast.show(`Form not completed`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    async login() {
      try {
        const ret = await this.$fire.auth
          .signInWithEmailAndPassword(this.mail, this.pwd)
          .then((userCredential) => {
            // Signed in
            this.$toast.show(`You have been logged with ${this.mail}`, {
              duration: 1500,
              type: "success",
            });

            this.$fire.database
              .ref(`/users/${userCredential.user.uid}/pseudo`)
              .once("value", (data) => {
                this.$store.commit("setPlayer", data.val());
                this.$store.commit(
                  "setPlayerUid",
                  JSON.stringify(userCredential.user.uid)
                );
                this.$store.commit("setPlayerMail", this.mail);
                this.tab = "profile";
              });
          });
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 0;
}
</style>
