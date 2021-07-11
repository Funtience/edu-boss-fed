<template>
  <div class="course-list">
    <div class="query-form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="课程名称">
          <el-input
            v-model="form.courseName"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>

      <el-button
        icon="el-icon-plus"
        type="primary"
        @click="$router.push({ name: 'course-create' })"
        >新建课程</el-button
      >
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="250">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="150"> </el-table-column>
      <el-table-column prop="sortNum" label="排序" width="200">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#51cf66"
            inactive-color="#ff6b6b"
            :active-value="1"
            :inactive-value="0"
            :disabled="scope.row.isStatusLoading"
            @change="changeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              $router.push({
                name: 'course-edit',
                params: { courseId: scope.row.id }
              })
            "
            >编辑</el-button
          >

          <el-button size="mini" @click="
              $router.push({
                name: 'course-section',
                params: { courseId: scope.row.id }
              })
            "
            >内容管理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/service/course'
export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      form: {
        courseName: '',
        status: undefined,
        currentPage: 1,
        pageSize: 10
      },
      statusOptions: [
        {
          label: '全部',
          value: undefined
        },
        {
          label: '已上架',
          value: 0
        },
        {
          label: '已下架',
          value: 1
        }
      ],
      tableData: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const { data } = await getQueryCourses(this.form)
      if (data.code === '000000') {
        data.data.records.forEach((record: any) => {
          record.isStatusLoading = false
        })
        this.tableData = data.data.records
      }
    },
    async changeStatus (row: any) {
      row.isStatusLoading = true
      const params = {
        courseId: row.id,
        status: row.status
      }
      const { data } = await changeState(params)
      if (data.code === '000000') {
        this.$message.success(`${row.status === 1 ? '上架' : '下架'}成功`)
        row.isStatusLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.query-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
