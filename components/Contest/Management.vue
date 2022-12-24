<template>
  <div class="max-w-4xl pb-8 px-2">
    <!-- Info -->
    <div class="flex-wrap gap-2 pt-6">
      <h3 class="font-bold">Info</h3>
      <div v-if="data && data.info">
        <div class="border rounded-xl px-4 py-4 my-4" :class="theme_border">
          <div class="flex gap-2">
            <FormField
              label="name"
              :modelValue="data.info.name"
              input_min="3"
              input_max="10"
              :required="true"
              :theme_bg="theme_bg"
              :theme_text="theme_text"
              :theme_label="theme_text"
              :theme_border="theme_border"
            ></FormField>
            <FormField
              label="date"
              input_type="datetime-local"
              :modelValue="data.info.date"
              :required="true"
              :theme_bg="theme_bg"
              :theme_text="theme_text"
              :theme_label="theme_text"
              :theme_border="theme_border"
            ></FormField>
          </div>
          <div class="flex">
            <FormTextarea
              label="abstract"
              :modelValue="data.info.abstract"
              input_max="100"
              :theme_bg="theme_bg"
              :theme_text="theme_text"
              :theme_label="theme_text"
              :theme_border="theme_border"
            ></FormTextarea>
          </div>
        </div>
      </div>
    </div>
    <!-- Event -->
    <div class="flex-wrap gap-2 pt-6">
      <h3 class="font-bold">Event</h3>
      <div v-if="data && data.event && data.event">
        <div class="border rounded-xl px-4 py-4 my-4" :class="theme_border">
          <div class="flex">
            <FormToggle
              label="enabled"
              :modelValue="data.event.enabled"
              :theme_text="theme_text"
              :theme_bg="theme_bg"
            ></FormToggle>
          </div>
          <div class="inline-flex my-4">
            <FormToggle
              label="admin propagate"
              :modelValue="data.event.propagate"
              :theme_text="theme_text"
              :theme_bg="theme_bg"
            ></FormToggle>
          </div>
          <details>
            <summary class="cursor-pointer">Candidates</summary>
            <table class="table-fixed w-full">
              <tbody>
                <tr :class="theme_text">
                  <th scope="col"></th>
                  <th scope="col" class="w-8"></th>
                </tr>
                <tr
                  class="h-14"
                  v-for="(element, key, index) in data.candidates"
                  :class="[theme_text, index % 2 ? theme_even : theme_odd]"
                >
                  <td class="text-left text-sm pl-3">
                    <details>
                      <summary class="cursor-pointer">{{ key }}</summary>
                      <table class="table-auto w-full my-2">
                        <tbody>
                          <tr v-for="(value, element_key) in element">
                            <td
                              class="border first-letter:capitalize"
                              :class="[theme_text, theme_border]"
                            >
                              {{ element_key }}
                            </td>
                            <td
                              class="border first-letter:capitalize"
                              :class="[theme_text, theme_border]"
                            >
                              <a
                                v-if="element_key === 'link'"
                                :href="value"
                                style="text-decoration: underline"
                                >{{ value }}</a
                              >
                              <img
                                v-else-if="element_key === 'asset'"
                                class="bg-clip-content object-cover h-[360px] w-[360px]"
                                :src="value"
                              />
                              <div class="first-letter:capitalize" v-else>
                                {{ value }}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </details>
                  </td>
                  <td class="text-right text-sm pr-3">
                    <FormButton label="-" :minimal="true"></FormButton>
                  </td>
                </tr>
                <tr>
                  <td
                    v-if="!data.candidates"
                    class="w-full select-none px-2 py-3 text-xs bg-gray-200 text-gray-500"
                  >
                    Empty list
                  </td>
                  <td class="text-right text-sm pr-3"></td>
                </tr>
              </tbody>
            </table>
          </details>
        </div>
      </div>
    </div>
    <!-- Rounds -->
    <div class="flex-wrap gap-2 pt-6">
      <h3 class="font-bold">Rounds</h3>
      <div
        v-if="data && data.event && data.event.rounds"
        v-for="(round, index) in data.event.rounds"
      >
        <div class="border rounded-xl px-4 py-4 my-4" :class="theme_border">
          <div class="flex">
            <FormToggle
              label="locked"
              :modelValue="round.locked"
              :theme_text="theme_text"
              :theme_bg="theme_bg"
            ></FormToggle>
          </div>
          <div class="flex my-4">
            <FormToggle
              label="watch"
              :modelValue="round.watch"
              :theme_text="theme_text"
              :theme_bg="theme_bg"
            ></FormToggle>
          </div>
          <div class="inline-flex gap-2">
            <FormField
              label="name"
              :modelValue="round.name"
              input_min="3"
              input_max="10"
              :required="true"
              :theme_bg="theme_bg"
              :theme_text="theme_text"
              :theme_label="theme_text"
              :theme_border="theme_border"
            ></FormField>
            <FormField
              label="max"
              input_type="number"
              :modelValue="round.max"
              :input_min="
                data &&
                data.event &&
                data.event.rounds &&
                data.event.rounds[index] &&
                data.event.rounds[index].qualified &&
                data.event.rounds[index].qualified.length
                  ? data.event.rounds[index].qualified.length.toString()
                  : '1'
              "
              :required="true"
              :theme_bg="theme_bg"
              :theme_text="theme_text"
              :theme_label="theme_text"
              :theme_border="theme_border"
            ></FormField>
            <FormField
              label="points"
              input_type="number"
              :modelValue="round.points"
              input_min="1"
              :required="true"
              :theme_bg="theme_bg"
              :theme_text="theme_text"
              :theme_label="theme_text"
              :theme_border="theme_border"
            ></FormField>
          </div>
          <div>
            <details>
              <summary class="cursor-pointer">Pool</summary>

              <div class="flex px-2 py-2">
                <FormList
                  :data="
                    data &&
                    data.event &&
                    data.event.rounds &&
                    data.event.rounds[index] &&
                    data.event.rounds[index].pool
                      ? data.event.rounds[index].pool
                      : []
                  "
                  :pool="
                    filter(
                      data && data.candidates ? data.candidates : {},
                      data &&
                        data.event &&
                        data.event.rounds &&
                        data.event.rounds[index] &&
                        data.event.rounds[index].pool
                        ? data.event.rounds[index].pool
                        : []
                    )
                  "
                  :theme_bg="theme_bg"
                  :theme_text="theme_text"
                  :theme_border="theme_border"
                  :theme_odd="theme_odd"
                  :theme_even="theme_even"
                ></FormList>
              </div>
            </details>
            <details>
              <summary class="cursor-pointer">Qualified</summary>

              <div class="flex px-2 py-2">
                <FormList
                  :max="round.max"
                  :data="
                    data &&
                    data.event &&
                    data.event.rounds &&
                    data.event.rounds[index] &&
                    data.event.rounds[index].qualified
                      ? data.event.rounds[index].qualified
                      : []
                  "
                  :pool="
                    filter(
                      data &&
                        data.event &&
                        data.event.rounds &&
                        data.event.rounds[index] &&
                        data.event.rounds[index].pool
                        ? data.event.rounds[index].pool
                        : [],
                      data &&
                        data.event &&
                        data.event.rounds &&
                        data.event.rounds[index] &&
                        data.event.rounds[index].qualified
                        ? data.event.rounds[index].qualified
                        : []
                    )
                  "
                  :theme_bg="theme_bg"
                  :theme_text="theme_text"
                  :theme_border="theme_border"
                  :theme_odd="theme_odd"
                  :theme_even="theme_even"
                ></FormList>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //@TODO faire un id qui correspond a un endpoint ?
  props: {
    data: {
      type: Object,
      required: true,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_bg: {
      default: "bg-white",
      type: String,
    },
    theme_border: {
      default: "border-neutral",
      type: String,
    },
    theme_even: {
      default: "bg-neutral-lightest",
      type: String,
    },
    theme_odd: {
      default: "bg-neutral",
      type: String,
    },
  },
  methods: {
    filter(data_1, data_2) {
      let ret = [];
      if (data_1) {
        for (const [key, value] of Object.entries(data_1)) {
          let k = value;
          if (typeof value === "object") {
            k = key;
          }
          if (!data_2.includes(k)) {
            ret.push({ title: k, value: k });
          }
        }
      }
      return ret;
    },
    urlify(url) {
      return `<a href='${url}' style='text-decoration: underline;'>${url}</a>`;
    },
  },
};
</script>
