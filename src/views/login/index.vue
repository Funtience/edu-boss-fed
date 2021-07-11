<template>
  <div class="login">
    <h1 class="login-title">EDU BOSS 管理系统</h1>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
      class="login-form"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLogin"
          class="login-btn"
          type="primary"
          @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/service/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '15510792995',
        password: '111111'
      },
      isLogin: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.isLogin = true
        // 1. 表单验证
        await (this.$refs.form as Form).validate()
        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form)
        // 3. 处理请求结果
        if (data?.success !== false) {
          this.$store.commit('setUser', data.content)
          this.$router.push((this.$route.query.from as string) || '/')
          this.$message.success('登录成功')
        } else {
          this.$message.error(data.message)
        }
      } catch (error) {}
      this.isLogin = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-title {
    color: #999;
  }

  .login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
