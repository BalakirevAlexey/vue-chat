<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notifier",
  computed: {
    ...mapGetters(["lastMessage"]),
  },
  watch: {
    lastMessage: "showMessage" /** первый вариант **/,
    // lastMessage: {
    //   /** для глубокого отслеживания объектов вариант **/
    //   handler: "showMessage",
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    showMessage(value) {
      this.$message({ ...value, showClose: true, duration: 5000 });
    },
  },
};
</script>
