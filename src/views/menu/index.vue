<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push('/menu/create')">添加按钮</el-button>
      </div>
      <el-table :data="menuList" style="width: 100%">
        <el-table-column type="index" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <el-table-column prop="icon" label="前端图标" width="180">
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" width="180">
        </el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, delMenu } from '@/service/menu'

export default Vue.extend({
  name: 'Menu',
  data () {
    return {
      menuList: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {
    this.fetchMenuList()
  },
  methods: {
    async fetchMenuList () {
      const { data } = await getAllMenus()
      console.log(data)
      if (data.code === '000000') {
        this.menuList = data.data
      }
    },
    handleEdit (row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗?', '删除提示', {})
        .then(async () => {
          const { data } = await delMenu(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.fetchMenuList()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>
