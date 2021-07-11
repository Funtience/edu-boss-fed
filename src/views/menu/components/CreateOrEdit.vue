<template>
  <div class="create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              :label="menu.name"
              :value="menu.id"
              v-for="menu in parentMenuList"
              :key="menu.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="form.orderNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveMenu, getEditMenuInfo } from '@/service/menu'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'MenuCreate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        href: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
        icon: [{ required: true, message: '请输入前端图标', trigger: 'blur' }],
        orderNum: [
          { required: true, message: '请输入排序值', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      parentMenuList: []
    }
  },
  created () {
    this.fetchParentList()
  },
  methods: {
    async onSubmit () {
      try {
        const valid = await (this.$refs.form as Form).validate()
        if (valid) {
          const { data } = await saveMenu(this.form)
          console.log(data)
          if (data.data) {
            this.$message.success('提交成功')
            this.$router.back()
          }
        }
      } catch (error) {}
    },
    async fetchParentList () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      console.log(data)
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
        data.data.menuInfo && (this.form = data.data.menuInfo)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
