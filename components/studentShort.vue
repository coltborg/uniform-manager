<template>
  <div
    :class="{
      'bg-orange-lightest border-orange': activeStudentRowId === student.id,
      'rowGrid--editMode': editMode
    }"
    class="rowGrid cursor-default"
    @click="selectStudentRow">
    <span class="w-full bg-transparent px-2 py-2 text-black">{{ student.name }}</span>
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="#01">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="Md">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="#45">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="#40">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="#40">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="Md">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      value="#105">
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  props: {
    editMode: {
      type: Boolean,
      default: false,
    },

    student: {
      type: Object,
      required: true,
    },

    activeStudentRowId: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  computed: {
    ...mapState('students', {
      students: state => state.students,
      studentRaw: state => state.studentsRaw,
    }),
  },

  methods: {
    selectStudentRow() {
      this.$emit('selectStudentRow', this.student);
    },
  },
};
</script>

<style lang="postcss" scoped>
.rowGrid {
  display: grid;
  grid-template:
    1fr
    / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
  /* cursor: pointer; */
  border: 1px solid;
  border-bottom: none;
  padding: .5rem;

  &:last-of-type {
    border-bottom: 1px solid;
  }
}


.input--editMode {
  background-color: #fff;
  cursor: pointer;
}
</style>
