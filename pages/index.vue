<template>
  <div>
    <section>
      <!-- year selection -->
      <div class="block fixed inset-x-0 top-14 z-10 bg-default-lightest">
        <NavSubBar
          :modelValue="tab"
          @update:modelValue="(v) => (tab = v)"
          :tabs="_tabs"
        ></NavSubBar>
      </div>
    </section>
    <!-- event selection -->
    <div class="flex flex-wrap justify-center gap-4 my-16 w-full">
      <NuxtLink
        v-for="(item, key) in _event"
        :to="'contest?id=' + key"
        :key="key"
      >
        <ContestCard
          :id="key"
          :title="item.info.name"
          :state="contestStatus(item)"
          :subtitle="date(item.info.date)"
          :asset="item.info.asset"
          :abstract="item.info.abstract"
          :voting="false"
        ></ContestCard>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  //@TODO wall of fame + champion en titre "mettre des badges a coté du pseudo"
  layout: "contest",
  head() {
    return {
      title: "Contest Arena",
      bodyAttrs: {
        class: "bg-default-lightest",
      },
    };
  },
  data() {
    return {
      data: {},
      tab: "",
    };
  },
  async fetch() {
    try {
      await this.$fire.database.ref("/contest").on("value", (snapshot) => {
        this.data = snapshot.val();
        this.tab = Object.keys(this._tabs)[Object.keys(this._tabs).length - 1];
      });
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    _event: {
      get() {
        let ret = {};
        for (const [key, value] of Object.entries(this.data)) {
          const date = new Date(
            value.info && value.info.date ? value.info.date : ""
          );

          if (date.getFullYear() == this.tab) {
            ret[key] = value;
          }
        }
        return ret;
      },
    },
    _tabs: {
      get() {
        let ret = {};
        for (const value of Object.values(this.data)) {
          const date = new Date(
            value.info && value.info.date ? value.info.date : ""
          ).getFullYear();
          ret[date] = {};
        }
        return ret;
      },
    },
  },
  methods: {
    date(date) {
      return new Date(date).toLocaleString("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
      });
    },
    eventPerYear(year) {
      let ret = {};

      return ret;
    },
    contestStatus(item) {
      let ret = "disabled";
      if (item && item.event && item.event.enabled && item.event.rounds) {
        let locked = [];
        let qualified = [];

        item.event.rounds.forEach((element) => {
          locked.push(element.locked);
          qualified.push(
            element.qualified && element.qualified.length ? true : false
          );
        });
        if (qualified.includes(true) && !qualified.includes(false)) {
          ret = "archived";
        } else if (
          locked.includes(true) &&
          !locked.includes(false) &&
          !qualified.includes(true)
        ) {
          ret = "coming";
        } else if (
          (qualified.includes(true) && qualified.includes(false)) ||
          locked.includes(false)
        ) {
          ret = "live";
        }
      }
      return ret;
    },
  },
};
</script>
