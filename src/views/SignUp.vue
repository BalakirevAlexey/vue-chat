<template>
  <div class="sign-up-page">
    <div class="sign-up-form-wrap">
      <div class="sign-up-form-img">
        <img src="@/assets/login-page-bg.png" alt="login-page" />
      </div>
      <SignUpForm />
    </div>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
export default {
  components: { SignUpForm },
  name: "Login",
};
</script>

<style scooped>
.sign-up-page {
  background-color: #d5e4e4;
  height: 100vh;
  min-height: 780px;
  display: flex;
  justify-content: center;
  padding-top: 80px;
}
.sign-up-form-wrap {
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
.sign-up-form-img {
  height: 100%;
  overflow: hidden;
}
.sign-up-form-img img {
  display: block;
  overflow: hidden;
  transform: scale(1.2);
}
</style>
