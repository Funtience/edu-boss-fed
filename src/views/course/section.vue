<template>
  <div class="course-section">
    <el-card>
      <div slot="header">
        课程名称
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleDrop"
      >
        <div slot-scope="{ node, data }" class="inner">
          <span>{{ node.label }}</span>
          <!-- section -->
          <span v-if="data.sectionName">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="primary">添加课时</el-button>
            <el-button size="mini">状态</el-button>
          </span>
          <span v-else>
            <el-button size="mini">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="
                $router.push({
                  name: 'course-video',
                  params: {
                    courseId
                  },
                  query:{
                    sectionId: node.parent.id,
                    lessonId: data.id
                  }
                })
              "
              >上传视频</el-button
            >
            <el-button size="mini">状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  saveOrUpdateLesson
} from '@/service/course'
export default Vue.extend({
  name: 'courseSection',
  props: {
    courseId: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => data.sectionName || data.theme
      }
    }
  },
  created () {
    this.fetchLessonInfo()
  },
  methods: {
    async handleDrop (draggingNode: any, dropNode: any, dropType: any) {
      console.log('tree drop: ', draggingNode, dropNode, dropType)
      await Promise.all(
        dropNode.parent.childNodes.map((item: any, index: number) => {
          if (item.data.lessonDTOS) {
            // 阶段
            saveOrUpdateSection({
              id: item.data.id,
              orderNum: index
            })
          } else {
            // 课时
            saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index
            })
          }
        })
      )
    },
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      return (
        draggingNode.data.sectionId === dropNode.data.sectionId &&
        type !== 'inner'
      )
    },
    async fetchLessonInfo () {
      const params = {
        courseId: this.courseId
      }
      const { data } = await getSectionAndLesson(params)
      if (data.code === '000000') {
        this.sections = data.data
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.inner {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
