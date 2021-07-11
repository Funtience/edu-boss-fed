<template>
  <div class="alloc-resource">
    <el-card class="box-card">
      <div slot="header">
        <h1>分配资源</h1>
      </div>
      <el-tree
        ref="resourceTree"
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
  getResourceCategory,
  getResourceAll,
  getRoleResources,
  allocateRoleResources
} from '@/service/resource'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'AllocResource',
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
        children: 'resourceList',
        label: 'name'
      },
      defaultCheckedKeys: []
    }
  },
  created () {
    // this.fetchResource()
    this.fetchRoleResources()
  },
  methods: {
    handleNodeClick (data: any) {
      console.log(data)
    },
    async fetchResource () {
      const [parent, children] = await Promise.all([
        await getResourceCategory(),
        await getResourceAll()
      ])
      this.treeData = parent.data.data
      this.getTreeData(children.data.data)
    },
    getTreeData (children: any) {
      this.treeData.forEach((category: any) => {
        category.children = children.filter(
          (resource: any) => resource.categoryId === category.id
        )
      })
    },
    getCheckedKeys (menus: any) {
      if (!menus.length) return
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.defaultCheckedKeys.push(menu.id as never)
          this.defaultCheckedKeys = [...this.defaultCheckedKeys, menu.id] as any
        }
        if (menu.resourceList) {
          this.getCheckedKeys(menu.resourceList)
        }
      })
    },
    async fetchRoleResources () {
      const params = {
        roleId: this.roleId
      }
      const { data } = await getRoleResources(params)
      if (data.code === '000000') {
        this.treeData = data.data
        this.getCheckedKeys(data.data)
      }
    },
    async onSave () {
      const menuIdList = (this.$refs.resourceTree as Tree).getCheckedKeys()
      const params = {
        roleId: this.roleId,
        menuIdList
      }
      const { data } = await allocateRoleResources(params)
      if (data.code === '000000') {
        this.$message.success('角色资源分配成功')
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
.alloc-resource {
  .bottom-btn {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
