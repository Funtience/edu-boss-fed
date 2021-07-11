<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        上传视频
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input ref="video" type="file" />
        </el-form-item>
        <el-form-item label="封面上传">
          <input ref="image-file" type="file" />
        </el-form-item>
        <el-form-item label="封面上传">
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  getImageUploadAuthToken,
  getVideoUploadAuthToken,
  aliyunTransCode,
  aliyunTransCodePercent
} from '@/service/course'
import Vue from 'vue'

export default Vue.extend({
  name: 'courseVideo',
  props: {
    courseId: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      uploader: null,
      imageUrl: '',
      videoId: null
    }
  },
  // computed: {
  //   video () {
  //     return this.$refs.video
  //   },
  //   image () {
  //     // return this.$refs['image-file']
  //   }
  // },
  created () {
    this.initUploader()
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // userID，必填，只需有值即可。
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async function (uploadInfo: any) {
          console.log('onUploadstarted', uploadInfo)
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            const { data } = await getImageUploadAuthToken()
            this.imageUrl = data.data.imageUrl
            uploadAddressAndAuth = data.data
          } else {
            const { data } = await getVideoUploadAuthToken({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            uploadAddressAndAuth = data.data
            this.videoId = data.data.videoId
          }
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.videoId || uploadAddressAndAuth.imageId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed', uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: function (
          uploadInfo: any,
          totalSize: any,
          loadedPercent: any
        ) {
          console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired', uploadInfo)
          // resumeUploadWithAuth(uploadAuth)
        },
        // 全部文件上传结束
        onUploadEnd: async function (uploadInfo: any) {
          console.log('onUploadEnd', uploadInfo)
          const { lessonId } = this.$route.query
          const { data } = await aliyunTransCode({
            lessonId,
            coverImageUrl: this.imageUrl,
            fileName: this.$refs['video-file'].files[0].name,
            fileId: this.videoId
          })
          console.log(data)

          const timer = setInterval(async () => {
            const { data } = await aliyunTransCodePercent(lessonId)
            console.log('进度', data.data)
            if (data.data === 100) {
              window.clearInterval(timer)
              console.log('转码成功')
            }
          }, 1000)
        }
      })
    },
    handleUpload () {
      const videoFile = (this.$refs['video-file'] as any).files[0]
      const imageFile = (this.$refs['image-file'] as any).files[0]

      const paramData = '{"Vod":{}}'

      const uploader = this.uploader as any
      uploader.addFile(videoFile, null, null, null, paramData)
      uploader.addFile(imageFile, null, null, null, paramData)
      uploader.startUpload()
    }
  }
})
</script>

<style></style>
