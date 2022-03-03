<template>
  <div class="login-form">
    <h1 class="login-form-title">Forgot password ?</h1>
    <p class="login-form-description">
      specify your E-mail and we will send your password
    </p>
    <el-form
      @submit.native.prevent="submitForm"
      size="small"
      label-position="top"
      label-width="120px"
      :model="formData"
      :rules="rules"
      ref="formData"
      status-icon
    >
      <el-form-item label="E-mail" prop="email">
        <el-input
          type="text"
          :rules="rules"
          v-model.trim="formData.email"
        ></el-input>
      </el-form-item>

      <router-link :to="{ name: 'Login' }">
        <ElLink type="info">Go to login page</ElLink>
      </router-link>

      <div class="form-action">
        <el-button
          :loading="loagingInProgress"
          native-type="submit"
          type="success"
          plain
        >
          Send
        </el-button>
      </div>

      <router-link :to="{ name: 'SignUp' }">
        <ElLink type="primary">Don't have account? Sign Up</ElLink>
      </router-link>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LoginForm",
  data: () => ({
    formData: {
      email: "",
    },
    rules: {
      email: [
        {
          required: true,
          message: "Please input email address",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur"],
        },
      ],
    },
  }),
  computed: {
    ...mapGetters("auth", ["loagingInProgress"]),
  },
  methods: {
    ...mapActions("auth", ["sendPass"]),

    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.sendPass(this.formData.email);
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.login-form {
  padding: 20px 80px;
  width: 350px;
}
.login-form-description {
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
.form-action {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
