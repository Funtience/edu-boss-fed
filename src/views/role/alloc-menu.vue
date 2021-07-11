<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header">
        <h1>分配菜单</h1>
      </div>
      <el-tree
        ref="menuTree"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        @node-click="handleNodeClick"
      ></el-tree>

      <div class="bottom-btn">
        <el-button @click="resetCheckedKeys">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/service/menu'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      defaultCheckedKeys: []
    }
  },
  created () {
    this.fetchTreeData()
    this.fetchRoleMenus()
  },
  methods: {
    handleNodeClick (data: any) {
      console.log(data)
    },
    async fetchTreeData () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.treeData = data.data
      }
    },
    async fetchRoleMenus () {
      const params = {
        roleId: this.roleId
      }
      const { data } = await getRoleMenus(params)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      }
    },
    getCheckedKeys (menus: any) {
      if (!menus.length) return
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.defaultCheckedKeys.push(menu.id as never)
          this.defaultCheckedKeys = [...this.defaultCheckedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async onSave () {
      const menuIdList = (this.$refs.menuTree as Tree).getCheckedKeys()
      const params = {
        roleId: this.roleId,
        menuIdList
      }
      const { data } = await allocateRoleMenus(params)
      if (data.code === '000000') {
        this.$message.success('角色菜单分配成功')
        this.$router.back()
      }
    },
    async resetCheckedKeys () {
      (this.$refs.menuTree as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
.alloc-menu {
  .bottom-btn {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
