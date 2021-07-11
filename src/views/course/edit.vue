<template>
  <div class="edit-course">
    <create-or-update :is-edit="true" :course-id="courseId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'EditCourse',
  components: { CreateOrUpdate },
  props: {
    courseId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      courseInfo: {}
    }
  }
})
</script>

<style lang="scss" scoped></style>
