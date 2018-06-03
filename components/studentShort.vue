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
      :value="bibberNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="colorGuardShirtNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="guantletNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="jacketNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="shakoNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="trackSuitNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="uniformBagNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput">
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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

    ...mapGetters('equipment', [
      'allFormattedEquipment',
    ]),

    studentEquipment() {
      const vm = this;
      const { allFormattedEquipment } = this;
      const studentEquipment = [];

      Object.keys(allFormattedEquipment).forEach((key) => {
        if (allFormattedEquipment[key].assignedToStudentId === vm.student.sysId) {
          studentEquipment.push(allFormattedEquipment[key]);
        }
      });

      return studentEquipment;
    },

    bibberNumber() {
      const bibber = this.studentEquipment.filter(eqp => eqp.type === 'bibbers');
      return (bibber[0]) ? bibber[0].number : '';
    },

    colorGuardShirtNumber() {
      const colorGuardShirt = this.studentEquipment.filter(eqp => eqp.type === 'colorGuardShirts');
      return (colorGuardShirt[0]) ? colorGuardShirt[0].number : '';
    },

    guantletNumber() {
      const guantlet = this.studentEquipment.filter(eqp => eqp.type === 'guantlets');
      return (guantlet[0]) ? guantlet[0].number : '';
    },

    jacketNumber() {
      const jacket = this.studentEquipment.filter(eqp => eqp.type === 'jackets');
      return (jacket[0]) ? jacket[0].number : '';
    },

    shakoNumber() {
      const shako = this.studentEquipment.filter(eqp => eqp.type === 'shakos');
      return (shako[0]) ? shako[0].number : '';
    },

    trackSuitNumber() {
      const trackSuit = this.studentEquipment.filter(eqp => eqp.type === 'trackSuits');
      return (trackSuit[0]) ? trackSuit[0].number : '';
    },

    uniformBagNumber() {
      const uniformBag = this.studentEquipment.filter(eqp => eqp.type === 'uniformBags');
      return (uniformBag[0]) ? uniformBag[0].number : '';
    },
  },

  methods: {
    selectStudentRow() {
      this.$emit('selectStudentRow', this.student);
    },

    updateInput() {
      console.log('input updated');
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
