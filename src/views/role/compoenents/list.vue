<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="form"
          ref="form"
          class="demo-form-inline"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="tableLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="tableLoading"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <el-button @click="addRole" :disabled="tableLoading">添加角色</el-button>

      <el-table
        :data="resourceList"
        style="width: 100%;marginBottom: 20px"
        v-loading="tableLoading"
      >
        <el-table-column type="index" label="编号" width="100" />
        <el-table-column prop="name" label="角色名称" width="100" />
        <el-table-column prop="description" label="描述" width="150" />
        <el-table-column prop="createdTime" label="添加时间" width="280" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                $router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })
              "
              >分配菜单</el-button
            >
            <el-button
              size="mini"
              @click="
                $router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })
              "
              >分配资源</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="editRoleId ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <create-or-edit
          v-if="dialogVisible"
          @success="onSuccess"
          @cancel="dialogVisible = false"
          :role-id="editRoleId"
        />
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import CreateOrEdit from './CreateOrEdit.vue'
import { getRolePage } from '@/service/role'
export default Vue.extend({
  name: 'RoleList',
  components: { CreateOrEdit },
  data () {
    return {
      resourceList: [],
      form: {
        name: '',
        current: 1,
        size: 10
      },
      total: 0,
      resourceCategory: [],
      tableLoading: false,
      dialogVisible: false,
      editRoleId: null
    }
  },
  created () {
    this.fetchListData()
  },
  methods: {
    onSubmit () {
      this.fetchListData()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.fetchListData()
    },
    async fetchListData () {
      this.tableLoading = true
      const { data } = await getRolePage(this.form)
      console.log(data)
      if (data.code === '000000') {
        this.resourceList = data.data.records
        this.total = data.data.total
        this.tableLoading = false
      }
    },
    allocMenu (row: any) {
      console.log(row)
    },
    handleEdit (row: any) {
      this.dialogVisible = true
      this.editRoleId = row.id
    },
    handleDelete () {
      console.log('')
    },
    onSuccess () {
      this.dialogVisible = false
      this.fetchListData()
    },
    addRole () {
      this.dialogVisible = true
      this.editRoleId = null
    }
  }
})
</script>

<style></style>
