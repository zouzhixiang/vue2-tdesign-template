<template>
  <div class="container">
    <t-card title="登录" shadow>
      <t-form :data="formData" ref="form" @reset="onReset" @submit="onSubmit" :colon="true" :labelWidth="0">
        <t-form-item name="account">
          <t-input clearable v-model="formData.username" placeholder="请输入账户名">
            <t-icon name="desktop" slot="prefix-icon"></t-icon>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input type="password" clearable v-model="formData.password" placeholder="请输入密码">
            <t-icon name="lock-on" slot="prefix-icon"></t-icon>
          </t-input>
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit" block :loading="loading">登录</t-button>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    onReset () {
      this.$message.success('重置成功')
    },
    onSubmit ({ validateResult, firstError }) {
      this.loading = true
      if (validateResult === true) {
        this.$store
          .dispatch('app/login', this.formData)
          .then(() => {
            this.loading = false
            this.$router.replace({ path: '/' })
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        console.log('Errors: ', validateResult)
        this.$message.warning(firstError)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
