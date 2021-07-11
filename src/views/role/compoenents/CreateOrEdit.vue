<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="form.code" placeholder="请输入角色编码"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="form.description"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="$emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateRole, getRoleInfo } from '@/service/role'
export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    roleId: {
      type: [String, Object, Number]
    }
  },
  data () {
    return {
      form: {
        code: '',
        name: '',
        description: ''
      }
    }
  },
  created () {
    if (this.roleId) {
      this.fetchRoleDetail()
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdateRole(this.form)
      if (data.code === '000000') {
        console.log(data)
        this.$message.success('操作成功')
        this.$emit('success')
      }
    },
    async fetchRoleDetail () {
      const { data } = await getRoleInfo(this.roleId)
      if (data.code === '000000') {
        this.form = data.data
      }
    }
  }
})
</script>

<style></style>
