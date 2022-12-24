<template>
  <div>
    <section>
      <!-- identification selection -->
      <div class="block fixed inset-x-0 top-14 z-10 bg-default-lightest">
        <NavSubBar
          :modelValue="tab"
          @update:modelValue="(v) => (tab = v)"
          :tabs="tabs"
        ></NavSubBar>
      </div>
    </section>
    <!-- register / login / reset -->
    <section class="my-16">
      <div class="w-full max-w-lg items-center mx-auto">
        <form @submit.prevent="submitAction">
          <FormField
            :modelValue="mail"
            @update:modelValue="(v) => (mail = v)"
            label="email"
            input_type="email"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormField>
          <FormField
            :modelValue="pseudo"
            @update:modelValue="(v) => (pseudo = v)"
            label="pseudo"
            input_type="text"
            input_min="3"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
            v-if="tab.includes('register')"
          ></FormField>
          <FormCountry
            :modelValue="country"
            @update:modelValue="(v) => (country = v)"
            label="country"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
            v-if="tab.includes('register')"
          ></FormCountry>
          <FormField
            :modelValue="password"
            @update:modelValue="(v) => (password = v)"
            label="password"
            input_type="password"
            input_min="6"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
            v-if="tab.includes('register') || tab == 'login'"
          ></FormField>
          <div
            class="text-neutral text-xs underline first-letter:capitalize cursor-pointer"
            v-if="tab == 'login'"
            @click="tab = 'login_reset'"
          >
            forgot password?
          </div>
          <FormButton
            type="submit"
            :label="tabs[tab].name"
            :disabled="_is_submit_disabled"
            class="my-8"
          ></FormButton>
        </form>
      </div>
    </section>
  </div>
</template>

<script scoped>
export default {
  layout: "contest",
  head() {
    return {
      title: "Contest Arena | Identification",
      bodyAttrs: {
        class: "bg-default-lightest",
      },
    };
  },
  data() {
    return {
      tabs: {
        login: { name: "login" },
        login_reset: { name: "reset", active: false },
        register: { name: "register" },
      },
      tab: "",
      mail: "",
      pseudo: "",
      country: "",
      password: "",
    };
  },
  async fetch() {
    try {
      if (this.$fire.auth.currentUser === null) {
        this.$store.commit("user/setUser", {});
      } else {
        this.$router.push("/profile");
      }
    } catch (e) {
      console.error(e);
    }
  },
  created() {
    this.tab = Object.keys(this.tabs)[0];
  },
  //@TODO google login
  computed: {
    _is_submit_disabled: {
      get() {
        let state = false;
        if (this.tab == "register") {
          state = !(this.mail && this.pseudo && this.country && this.password);
        } else if (this.tab == "login") {
          state = !(this.mail && this.password);
        } else if (this.tab == "login_reset") {
          state = !this.mail;
        }
        return state;
      },
    },
  },
  methods: {
    submitAction() {
      if (this.tab == "register") {
        this.register(this.mail, this.password, this.pseudo, this.country);
      } else if (this.tab == "login") {
        this.login(this.mail, this.password);
      } else if (this.tab == "login_reset") {
        this.passwordReset(this.mail);
      } else {
        alert(`No valid submit action for '${this.tab}'`);
      }
    },
    async register(mail, password, pseudo, country) {
      try {
        // register user
        const user_credential =
          await this.$fire.auth.createUserWithEmailAndPassword(mail, password);
        // push user profile
        this.$fire.database
          .ref(`/users/${user_credential.user.uid}`)
          .set({ pseudo: pseudo, country: country });

        this.$toast.show("You have been register and logged", {
          duration: 3000,
          type: "success",
        });
        this.$router.push("/profile");
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    async login(mail, password) {
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(mail, password)
          .then((userCredential) => {
            // Signed in
            this.$fire.database
              .ref(`/users/${userCredential.user.uid}`)
              .once("value", (data) => {
                const user_data = data.val();
                this.$store.commit("user/setUser", user_data);
              });
            this.$toast.show("You have been correctly logged", {
              duration: 1500,
              type: "success",
            });
            this.$router.push("/profile");
          });
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    async passwordReset(mail) {
      this.$fire.auth
        .sendPasswordResetEmail(mail)
        .then(() => {
          this.$toast.show("An email has been sent to reset your password", {
            duration: 1500,
            type: "success",
          });
        })
        .catch((e) => {
          this.$toast.show(`${e.message}`, {
            duration: 5000,
            type: "error",
          });
        });
    },
  },
};
</script>
