<template>
  <div class="create-update">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, index) in steps"
            @click.native="activeStep = index"
            :key="index"
            :title="item.title"
            :icon="item.icon"
          ></el-step>
        </el-steps>
      </div>

      <el-form label-width="80px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="form.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              style="margin-bottom:10px"
              type="textarea"
              v-model="form.previewFirstField"
              placeholder="概述1"
            ></el-input>
            <el-input
              type="textarea"
              v-model="form.previewSecondField"
              placeholder="概述2"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师名称">
            <el-input v-model="form.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="form.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number v-model="form.sortNum"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <course-image v-model="form.courseListImg" />
          </el-form-item>
          <el-form-item label="解锁封面">
            <course-image v-model="form.courseImgUrl" />
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input placeholder="请输入价格" v-model="form.discountsTag">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input placeholder="请输入价格" v-model="form.priceTag">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input
              placeholder="请输入销量"
              type="number"
              v-model="form.sales"
            >
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input placeholder="请输入活动标签" v-model="form.discountsTag">
            </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="form.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="form.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.activityCourseDTO.beginTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.activityCourseDTO.endTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input
                placeholder="请输入价格"
                type="number"
                v-model="form.activityCourseDTO.amount"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input
                placeholder="请输入库存"
                type="number"
                v-model="form.activityCourseDTO.stock"
              >
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <!-- <el-input type="textarea"></el-input> -->
            <text-editor v-model="form.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="上架开关">
            <el-switch
              v-model="form.status"
              active-color="#51cf66"
              inactive-color="#ff6b6b"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'
import { saveOrUpdateCourse, getCourseById } from '@/service/course'
import moment from 'moment'
export default Vue.extend({
  name: 'CreateCourse',
  components: { CourseImage, TextEditor },
  props: {
    courseId: {
      type: String,
      default: undefined
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '销售信息', icon: 'el-icon-edit' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' }
      ],
      imageUrl: '',
      isSeckill: false
    }
  },
  created () {
    if (this.isEdit) {
      this.fetchDetail()
    }
  },
  methods: {
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.form)
      if (data.code === '000000') {
        const { activityCourseDTO } = data.data.activityCourseDTO
        activityCourseDTO.beginTime = moment(
          activityCourseDTO.beginTime
        ).format('YYYY-MM-DD')
        activityCourseDTO.startTime = moment(
          activityCourseDTO.startTime
        ).format('YYYY-MM-DD')
        this.$message.success('课程添加成功')
      }
    },
    async fetchDetail () {
      const params = {
        courseId: this.courseId
      }
      const { data } = await getCourseById(params)
      if (data.code === '000000') {
        this.form = data.data
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
