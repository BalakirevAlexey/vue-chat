<template>
  <div class="login-form">
    <h1 class="login-form-title">Welcome</h1>
    <p class="login-form-description">
      Welcome to the live chat! Please sign up to join.
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
        <el-input type="text" :rules="rules" v-model.trim="formData.email">
        </el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          :show-password="true"
          type="password"
          v-model.trim="formData.password"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="Confirm" prop="checkPass">
        <el-input
          :show-password="true"
          type="password"
          v-model.trim="formData.checkPass"
        >
        </el-input>
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

      <router-link :to="{ name: 'Login' }">
        <ElLink type="primary">Go to login page</ElLink>
      </router-link>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUpForm",

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.formData.checkPass !== "") {
          this.$refs.formData.validateField("checkPass");
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.formData.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        email: "",
        password: "",
        checkPass: "",
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
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "Length should be more then 6", trigger: "blur" },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { min: 6, message: "Length should be more then 6", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["loagingInProgress", "isFirstLogin"]),
  },
  watch: {
    isFirstLogin: "redirectToFirstLogin",
  },
  methods: {
    ...mapActions("auth", ["signUp"]),

    redirectToFirstLogin(val) {
      if (val) {
        this.$router.push({ name: "FirstLoginSettings" });
      }
    },

    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.signUp({
            email: this.formData.email,
            password: this.formData.password,
          });
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
