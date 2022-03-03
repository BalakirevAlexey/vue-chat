<template>
  <div class="first-setup-form-wrap">
    <ElCard class="first-setup-form">
      <div slot="header" class="clearfix">
        <h6 class="card-title">Welcome! 😜</h6>
        <p class="card-description">Make changes to the questionnaire</p>
      </div>
      <ElForm
        :model="formData"
        @submit.native.prevent="onSubmit"
        ref="settingsForm"
      >
        <ElFormItem label="First name" prop="firstName" size="small">
          <ElInput type="text" v-model="formData.firstName" />
        </ElFormItem>
        <ElFormItem label="Last name" prop="lastName" size="small">
          <ElInput type="text" v-model="formData.lastName" />
        </ElFormItem>
        <ElFormItem label="Country" prop="country" size="small">
          <ElInput type="text" v-model="formData.country" />
        </ElFormItem>
        <ElFormItem label="City" prop="city" size="small">
          <ElInput type="text" v-model="formData.city" />
        </ElFormItem>
        <ElButton native-type="submit" type="primary">Submit</ElButton>
      </ElForm>
    </ElCard>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SettingsForm",
  data: () => ({
    formData: {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
    },
  }),
  methods: {
    ...mapActions("user", ["createUserInfo"]),
    onSubmit() {
      this.$refs.settingsForm.validate((isValid) => {
        if (!isValid) return;
        this.createUserInfo({ ...this.formData });
      });
    },
  },
};
</script>

<style scoped>
.first-setup-form-wrap {
  position: relative;
  max-width: 500px;
  width: 100%;
}
.first-setup-form {
  width: 100%;
  max-width: 400px;
}

.card-title {
  font-size: 20px;
  text-transform: uppercase;
}
.card-description {
  margin-top: 10px;
  color: gray;
  letter-spacing: 0.7px;
}
</style>
