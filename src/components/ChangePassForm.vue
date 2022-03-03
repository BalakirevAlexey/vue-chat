<template>
  <div class="change-pass-form-wrap">
    <ElCard class="change-pass-form">
      <div slot="header" class="clearfix">
        <p class="card-description">Do you want to change your password?</p>
      </div>
      <ElForm
        :model="formData"
        @submit.native.prevent="onSubmit"
        ref="formData"
        :rules="rules"
        status-icon
      >
        <ElFormItem
          label="Enter the old password"
          prop="oldPassword"
          size="small"
          required
        >
          <ElInput
            :show-password="true"
            type="password"
            v-model.trim="formData.oldPassword"
          />
        </ElFormItem>
        <ElFormItem
          label="Enter a new password"
          prop="password"
          size="small"
          required
        >
          <ElInput
            :show-password="true"
            type="password"
            v-model.trim="formData.password"
          />
        </ElFormItem>
        <ElFormItem
          label="Repeat a new password"
          prop="checkPass"
          size="small"
          required
        >
          <ElInput
            :show-password="true"
            type="password"
            v-model.trim="formData.checkPass"
          />
        </ElFormItem>
        <ElButton
          :loading="loagingInProgress"
          native-type="submit"
          type="primary"
          >Submit</ElButton
        >
      </ElForm>
    </ElCard>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ChangePassForm",
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
        oldPassword: "",
        password: "",
        checkPass: "",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "Please input the old password",
            trigger: "blur",
          },
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            message: "Length should be more then 6",
            trigger: "change",
          },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          {
            min: 6,
            message: "Length should be more then 6",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["loagingInProgress"]),
  },
  methods: {
    ...mapActions("user", [
      "createUserInfo",
      "checkCurrentPass",
      "updatePassword",
    ]),
    onSubmit() {
      this.$refs.formData.validate(async (isValid) => {
        if (!isValid) return;
        let currPass = await this.checkCurrentPass(this.formData.oldPassword);
        if (currPass) {
          this.updatePassword(this.formData.password);
        }
      });
    },
  },
};
</script>

<style scoped>
.change-pass-form-wrap {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin-top: 40px;
}
.change-pass-form {
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
