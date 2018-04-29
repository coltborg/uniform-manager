<template lang="pug">
  section
    h1 Students Listing
    .studentsListing(
      v-if="students && students.entities"
    )
      student-short(
        v-for="student in students.entities.students"
        :key="student.id"
        :student="student"
        v-on:studentClicked="handleClickedStudent"
      )
</template>

<script>
import { mapState } from 'vuex'
import studentShort from '~/components/studentShort.vue'

export default {
  components: {
    studentShort
  },

  data: () => {
    return {
      activeStudent: {}
    }
  },

  computed: {
    ...mapState('students', {
      'students': state => state.students,
      'studentRaw': state => state.studentsRaw
    })
  },

  methods: {
    handleClickedStudent(student) {
      this.activeStudent = student
    }
  }
}
</script>

<style>

</style>
