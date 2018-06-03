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
      @change="updateInput('bibber', $event)">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="colorGuardShirtNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput('colorGuardShirt', $event)">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="guantletNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput('guantlet', $event)">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="jacketNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput('jacket', $event)">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="shakoNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput('shako', $event)">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="trackSuitNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput('trackSuit', $event)">
    <input
      :disabled="editMode == false"
      :class="{'input--editMode': editMode}"
      :value="uniformBagNumber"
      class="w-full bg-transparent px-2 py-2 text-black cursor-default"
      @change="updateInput('uniformBag', $event)">
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

  data: () => ({
    updateValues: {
      bibber: '',
      colorGuardShirt: '',
      guantlet: '',
      jacket: '',
      shako: '',
      trackSuit: '',
      uniformBag: '',
    },
    updateRequired: false,
  }),
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
      const { updateValues } = this;

      if (updateValues.bibber) {
        return updateValues.bibber;
      }
      return (bibber[0]) ? bibber[0].number : '';
    },

    colorGuardShirtNumber() {
      const colorGuardShirt = this.studentEquipment.filter(eqp => eqp.type === 'colorGuardShirts');
      const { updateValues } = this;

      if (updateValues.colorGuardShirt) {
        return updateValues.colorGuardShirt;
      }
      return (colorGuardShirt[0]) ? colorGuardShirt[0].number : '';
    },

    guantletNumber() {
      const guantlet = this.studentEquipment.filter(eqp => eqp.type === 'guantlets');
      const { updateValues } = this;

      if (updateValues.guantlet) {
        return updateValues.guantlet;
      }
      return (guantlet[0]) ? guantlet[0].number : '';
    },

    jacketNumber() {
      const jacket = this.studentEquipment.filter(eqp => eqp.type === 'jackets');
      const { updateValues } = this;

      if (updateValues.jacket) {
        return updateValues.jacket;
      }
      return (jacket[0]) ? jacket[0].number : '';
    },

    shakoNumber() {
      const shako = this.studentEquipment.filter(eqp => eqp.type === 'shakos');
      const { updateValues } = this;

      if (updateValues.shako) {
        return updateValues.shako;
      }
      return (shako[0]) ? shako[0].number : '';
    },

    trackSuitNumber() {
      const trackSuit = this.studentEquipment.filter(eqp => eqp.type === 'trackSuits');
      const { updateValues } = this;

      if (updateValues.trackSuit) {
        return updateValues.trackSuit;
      }
      return (trackSuit[0]) ? trackSuit[0].number : '';
    },

    uniformBagNumber() {
      const uniformBag = this.studentEquipment.filter(eqp => eqp.type === 'uniformBags');
      const { updateValues } = this;

      if (updateValues.uniformBag) {
        return updateValues.uniformBag;
      }
      return (uniformBag[0]) ? uniformBag[0].number : '';
    },
  },

  methods: {
    selectStudentRow() {
      this.$emit('selectStudentRow', this.student);
    },

    updateInput(type, $event) {
      const newValue = $event.target.value;
      this.updateRequired = true;
      this.updateValues[type] = newValue;
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
