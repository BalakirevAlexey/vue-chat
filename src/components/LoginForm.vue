<template>
  <div class="login-form">
    <h1 class="login-form-title">Welcome</h1>
    <p class="login-form-description">
      Welcome to the live chat! Please login to join.
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

      <el-form-item label="Password" prop="password">
        <el-input
          :show-password="true"
          type="password"
          v-model.trim="formData.password"
        ></el-input>
      </el-form-item>

      <router-link :to="{ name: 'ForgotPassword' }">
        <ElLink type="info">Forgot password? Reset password</ElLink>
      </router-link>

      <div class="form-action">
        <el-button
          :loading="loagingInProgress"
          native-type="submit"
          type="success"
          plain
        >
          Login
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
      password: "",
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
      password: [
        {
          required: true,
          message: "Please input the password",
          trigger: "blur",
        },
        { min: 6, message: "Length should be more then 6", trigger: "blur" },
      ],
    },
  }),
  computed: {
    ...mapGetters("auth", ["loagingInProgress", "isLogedIn"]),
  },
  watch: {
    isLogedIn: "redirectToHome",
  },
  methods: {
    ...mapActions("auth", ["login"]),

    redirectToHome(val) {
      if (val) {
        this.$router.push({ name: "Home" });
      }
    },
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.login({ ...this.formData });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
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
