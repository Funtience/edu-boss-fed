<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="form"
          ref="form"
          class="demo-form-inline"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              placeholder="资源分类"
              clearable
            >
              <el-option
                v-for="category in resourceCategory"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              ></el-option>
            </el-select>
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

      <el-table
        :data="resourceList"
        style="width: 100%;marginBottom: 20px"
        v-loading="tableLoading"
      >
        <el-table-column type="index" label="编号" width="100" />
        <el-table-column prop="name" label="资源名称" width="280" />
        <el-table-column prop="url" label="资源路径" width="380" />
        <el-table-column prop="description" label="描述" width="250" />
        <el-table-column prop="createdTime" label="添加时间" width="280" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
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

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="tableLoading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePages, getResourceCategory } from '@/service/resource'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resourceList: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      total: 0,
      resourceCategory: [],
      tableLoading: false
    }
  },
  created () {
    this.fetchResourceCategory()
    this.fetchListData()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.form.current = 1
      this.fetchListData()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.fetchListData()
    },
    async fetchListData () {
      this.tableLoading = true
      const { data } = await getResourcePages(this.form)
      console.log(data)
      if (data.code === '000000') {
        this.resourceList = data.data.records
        this.total = data.data.total
        this.tableLoading = false
      }
    },
    async fetchResourceCategory () {
      const { data } = await getResourceCategory()
      console.log(data)
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },
    handleEdit () {
      console.log('')
    },
    handleDelete () {
      console.log('')
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.fetchListData()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.fetchListData()
    }
  }
})
</script>

<style lang="scss" scoped></style>
