<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang='ts'>
import Vue from 'vue'
import E from 'wangeditor'
import { upload } from '@/service/course'
export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const editor = new E(this.$refs.editor as any)

    editor.config.onchange = (newHtml:string) => {
      this.$emit('input', newHtml)
    }

    editor.config.customUploadImg = async function (resultFiles:any, insertImgFn:any) {
      const fd = new FormData()
      fd.append('file', resultFiles[0])
      const { data } = await upload(fd)
      if (data.code === '000000') {
        insertImgFn(data.data.name)
      }
    }

    editor.create()
    editor.txt.html(this.value)
  }
})
</script>

<style>

</style>
