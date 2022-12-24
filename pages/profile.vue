<template>
  <div>
    <!-- profile image -->
    <div class="flex">
      <div class="w-full text-center material-symbols-outlined">
        <div class="text-8xl text-center">account_circle</div>
      </div>
    </div>
    <!-- profile -->
    <section v-if="tab == 'profile'">
      <div class="w-full max-w-lg items-center mx-auto">
        <div>
          <div class="text-right">
            <span @click="edit()">
              <FormButton
                label="edit"
                class="w-[75px] material-symbols-outlined"
              ></FormButton>
            </span>
          </div>
          <FormField
            :modelValue="mail"
            label="email"
            input_type="email"
            :disabled="true"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormField>
          <FormField
            :modelValue="this.$store.getters['user/pseudo']"
            label="pseudo"
            input_type="text"
            :disabled="true"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormField>
          <FormCountry
            :modelValue="this.$store.getters['user/country']"
            label="country"
            :disabled="true"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormCountry>
          <span class="w-full" @click="logout()">
            <FormButton class="my-8" label="logout"></FormButton>
          </span>
        </div>
      </div>
    </section>
    <!-- edit profile -->
    <section v-else-if="tab == 'profile_edit'">
      <div class="w-full max-w-lg items-center mx-auto">
        <form @submit.prevent="submitAction">
          <FormField
            :modelValue="mail"
            label="email"
            input_type="email"
            :disabled="true"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormField>
          <FormField
            :modelValue="pseudo_input"
            @update:modelValue="(v) => (pseudo_input = v)"
            label="pseudo"
            input_type="text"
            input_min="3"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormField>
          <FormCountry
            :modelValue="country_input"
            @update:modelValue="(v) => (country_input = v)"
            label="country"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormCountry>
          <FormField
            :modelValue="password_input"
            @update:modelValue="(v) => (password_input = v)"
            label="password"
            input_type="password"
            input_min="6"
            theme_bg="bg-neutral"
            theme_text="text-black"
            theme_label="text-black"
            theme_border="border-neutral"
          ></FormField>
          <FormButton
            type="submit"
            label="Update"
            :disabled="_is_submit_disabled"
            class="my-8"
          ></FormButton>
        </form>
        <span class="w-full" @click="tab = 'profile'">
          <FormButton label="cancel"></FormButton>
        </span>
      </div>
    </section>
  </div>
</template>

<script scoped>
export default {
  layout: "contest",
  head() {
    return {
      title: "Contest Arena | Profile",
      bodyAttrs: {
        class: "bg-default-lightest",
      },
    };
  },
  data() {
    return {
      mail: "",
      pseudo_input: "",
      country_input: "",
      password_input: "",
      tab: "",
    };
  },
  async fetch() {
    try {
      if (this.$fire.auth.currentUser !== null) {
        this.tab = "profile";
        this.mail = this.$fire.auth.currentUser.email;
      } else {
        this.$router.push("/identification");
      }
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    _is_submit_disabled: {
      get() {
        return !(this._user_changed || this._password_changed);
      },
    },
    _user_changed: {
      get() {
        return (
          this.pseudo_input != this.$store.getters["user/pseudo"] || this.country_input != this.$store.getters["user/country"]
        );
      },
    },
    _password_changed: {
      get() {
        return this.password_input.length > 0;
      },
    },
  },
  methods: {
    edit() {
      this.pseudo_input = this.$store.getters["user/pseudo"];
      this.country_input = this.$store.getters["user/country"];
      this.password_input = "";
      this.tab = "profile_edit";
    },
    submitAction() {
      if (this.tab == "profile_edit") {
        this.update(this.password_input, {
          pseudo: this.pseudo_input,
          country: this.country_input,
        });
      } else {
        alert(`No valid submit action for '${this.tab}'`);
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut();
        this.$store.commit("user/setUser", {});
        this.$toast.show(`You have been disconnected`, {
          duration: 1500,
          type: "success",
        });
        this.$router.push("/identification");
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    async update(password, user) {
      try {
        // update password
        if (this._password_changed) {
          await this.$fire.auth.currentUser.updatePassword(password);
        }
        // update user informations
        await this.$fire.database
          .ref(`/users/${this.$fire.auth.currentUser.uid}`)
          .set(user);
        this.$toast.show("You profile have been updated", {
          duration: 3000,
          type: "success",
        });

        this.tab = "profile";
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
