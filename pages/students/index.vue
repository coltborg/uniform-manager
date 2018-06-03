<template>
  <div>
    <section class="mt-8 mx-4">
      <h1
        v-if="editMode"
        class="mt-0 mb-4 text-5xl font-bold text-red">Edit Mode BIATCH</h1>
      <h1 class="mt-0 mb-4 text-3xl font-bold">Students</h1>
      <div v-if="students &amp;&amp; students.entities">
        <div class="grid bg-grey-lightest">
          <div class="p-2 text-grey-dark font-bold">Student Name</div>
          <div class="p-2 text-grey-dark font-bold">Bibber</div>
          <div class="p-2 text-grey-dark font-bold">Shirts</div>
          <div class="p-2 text-grey-dark font-bold">Gauntlets</div>
          <div class="p-2 text-grey-dark font-bold">Jackets</div>
          <div class="p-2 text-grey-dark font-bold">Shakos</div>
          <div class="p-2 text-grey-dark font-bold">Track Suits</div>
          <div class="p-2 text-grey-dark font-bold">Uniform Bags</div>
        </div>
        <student-short
          v-for="student in students.entities.students"
          :key="student.id"
          :student="student"
          :active-student-row-id="activeStudentRowId"
          :edit-mode="editMode"
          @selectStudentRow="handleSelectStudentRow" />
      </div>

      <div
        class="flex flex-no-wrap justify-between mt-4">
        <button
          v-if="!editMode"
          class="btn btn-blue mr-2"
          @click="bulkEdit">
          Bulk Edit
        </button>

        <div
          v-if="editMode">
          <button
            class="btn btn-green mr-2"
            @click="saveUpdates">
            Save Updates
          </button>

          <button
            class="btn btn-red mr-2"
            @click="cancelUpdates">
            Cancel Updates
          </button>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import studentShort from '~/components/studentShort.vue';

export default {
  components: {
    studentShort,
  },

  data: () => ({
    activeStudentRow: null,
    editMode: false,
  }),

  computed: {
    ...mapState('students', {
      students: state => state.students,
      studentRaw: state => state.studentsRaw,
    }),

    ...mapState('equipment', {
      equipment: state => state.equipment,
    }),

    activeStudentRowId() {
      const { activeStudentRow } = this;
      return (activeStudentRow) ? activeStudentRow.id : false;
    },
  },

  methods: {
    handleSelectStudentRow(student) {
      this.activeStudentRow = student;
    },

    bulkEdit() {
      this.editMode = true;
    },

    saveUpdates() {
      this.editMode = false;

      // updateEntry() {

      //   let updateFields = this.updateFields
      //   let entryId = this.entryId

      //   client.getSpace(contentfulSpace)
      //   .then((space) => space.getEntry(entryId))
      //   .then((entry) => {
      //     entry.fields.title['en-US'] = 'New entry title'

      //     Object.keys(updateFields).forEach(function( key ) {
      //         entry.fields[key]['en-US'] = updateFields[key]
      //         console.log(`${key}: ${updateFields[key]}`)
      //     });

      //     return entry.update()
      //   })
      //   .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
      //   .catch(console.error)
      // },
    },

    cancelUpdates() {
      this.editMode = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.grid {
  display: grid;
  grid-template:
    1fr
    / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
}
</style>
