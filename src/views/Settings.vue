<template>
  <div class="first-login-settings-wrap">
    <SettingsForm />
    <ChangePassForm />
  </div>
</template>

<script>
import SettingsForm from "@/components/SettingsForm.vue";
import ChangePassForm from "@/components/ChangePassForm.vue";
export default {
  name: "Settings",
  components: {
    SettingsForm,
    ChangePassForm,
  },
};
</script>

<style scoped>
.first-login-settings-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;
  height: 100vh;
}
</style>
