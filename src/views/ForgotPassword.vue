<template>
  <div class="forgotpas-page">
    <div class="forgotpas-form-wrap">
      <div class="forgotpas-form-img">
        <img src="@/assets/login-page-bg.png" alt="login-page" />
      </div>
      <ForgotPasswordForm />
    </div>
  </div>
</template>
<script>
import ForgotPasswordForm from "@/components/ForgotPasswordForm.vue";
export default {
  components: { ForgotPasswordForm },
  name: "ForgotPassword",
};
</script>
<style scooped>
.forgotpas-page {
  background-color: #d5e4e4;
  height: 100vh;
  min-height: 780px;
  display: flex;
  justify-content: center;
  padding-top: 80px;
}
.forgotpas-form-wrap {
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
.forgotpas-form-img {
  height: 100%;
  overflow: hidden;
}
.forgotpas-form-img img {
  display: block;
  overflow: hidden;
  transform: scale(1.2);
}
</style>
