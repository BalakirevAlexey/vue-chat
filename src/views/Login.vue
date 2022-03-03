<template>
  <div class="login-page">
    <div class="login-form-wrap">
      <div class="login-form-img">
        <img src="@/assets/login-page-bg.png" alt="login-page" />
      </div>
      <LoginForm />
      <!-- login-form  -->
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  components: { LoginForm },
  name: "Login",
};
</script>

<style scooped>
.login-page {
  background-color: #d5e4e4;
  height: 100vh;
  min-height: 780px;
  display: flex;
  justify-content: center;
  padding-top: 80px;
}
.login-form-wrap {
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 30px 90px #a7d7d9;
  height: 600px;
  overflow: hidden;
}
.login-form-img {
  height: 100%;
  overflow: hidden;
}
.login-form-img img {
  display: block;
  overflow: hidden;
  transform: scale(1.2);
}
</style>
