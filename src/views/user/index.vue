<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-position="top"
    >
      <el-form-item label="手机号">
        <el-input
          v-model="formInline.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          @change="filterDateChange"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="150"> </el-table-column>
      <el-table-column prop="portrait" label="头像" width="80">
        <template slot-scope="scope">
          <img
            class="avatar"
            :src="
              scope.row.portrit ||
                'http://www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg'
            "
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <i
            :class="[
              'status',
              scope.row.status === 'ENABLE' ? 'status-success' : 'status-fail'
            ]"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="forbidenUser(scope.row)"
            v-if="scope.row.status === 'ENABLE'"
            >禁用</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="activeUser(scope.row)"
            v-else
            >启用</el-button
          >
          <el-button size="mini" type="text" @click="handleAllocate(scope.row)"
            >分配角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="userRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocateRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, enableUser, forbidUser } from '@/service/user'
import { getAllRole, getUserRole, allocateUserRoles } from '@/service/role'
export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      formInline: {
        phone: '',
        region: '',
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 10
      },
      userRoles: [],
      tableData: [],
      roleOptions: [],
      dialogVisible: false,
      currentAllocateUserId: '',
      value1: ''
    }
  },
  created () {
    this.fetchData()
    this.fetchRoleData()
  },
  methods: {
    async fetchData () {
      const { data } = await getUserPages(this.formInline)
      if (data.code === '000000') {
        this.tableData = data.data.records
      }
    },
    filterDateChange (val: string[]) {
      [this.formInline.startCreateTime, this.formInline.endCreateTime] = val
    },
    async handleAllocate (row: any) {
      this.dialogVisible = true
      this.currentAllocateUserId = row.id
      await this.getUserRole(row.id)
    },
    async allocateRole () {
      const params = {
        userId: this.currentAllocateUserId,
        roleIdList: this.userRoles.map((role: any) => role.id || role)
      }
      const { data } = await allocateUserRoles(params)
      if (data.code === '000000') {
        this.$message.success('角色分配成功')
        this.dialogVisible = false
      }
    },
    async getUserRole (userId: string) {
      const { data } = await getUserRole(userId)
      console.log('getUserRole', data)
      if (data.code === '000000') {
        this.userRoles = data.data
      }
    },
    async activeUser (row: any) {
      const params = {
        userId: row.id
      }
      const { data } = await enableUser(params)
      if (data.code === '000000') {
        this.$message.success('启用成功')
        this.fetchData()
      }
    },
    async forbidenUser (row: any) {
      const params = {
        userId: row.id
      }
      const { data } = await forbidUser(params)
      if (data.code === '000000') {
        this.$message.success('禁用成功')
        this.fetchData()
      }
    },
    async fetchRoleData () {
      const { data } = await getAllRole()
      if (data.code === '000000') {
        this.roleOptions = data.data
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  vertical-align: middle;
}
.status {
  display: inline-block;
  cursor: pointer;
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: middle;
  border-radius: 50%;
}
.status-success {
  background: #51cf66;
}
.status-fail {
  background: #ff6b6b;
}
</style>
