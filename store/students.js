/* eslint-disable */
// Students Store Module - import other modules
import { normalize, schema } from 'normalizr';

// import conteful client and tokens
import { createClient } from 'contentful-management';
import Configuration from '../services/configuration';


const studentSchema = new schema.Entity('students', {}, {
  idAttribute: (value) => {
    return value.fields.id[Configuration.locale]
  },
  processStrategy: function(value, parent) {
    var values = Object.keys(value.fields).reduce((prev, key) => {
      prev[key] = value.fields[key][Configuration.locale];
      return prev;
    }, {});
    return {
      ...values,
      sysId: value.sys.id,
      sys: value.sys
    }
  }
})

const studentList = new schema.Array(studentSchema)

export const state = () => ({
  studentsRaw: [],
  students: []
})

export const getters = {

}

const setStudentsRaw = 'setStudentsRaw'
const setStudents = 'setStudents'

export const mutations = {
  setStudentsRaw: (state, studentsRaw) => {
    state.studentsRaw = studentsRaw
  },

  setStudents: (state, students) => {
    state.students = students
  }
}

export const actions = {

  async init ({ commit }) {

    // import createClient directly
    const client = createClient({
      accessToken: Configuration.accessToken
    });
    const space = client.getSpace(Configuration.space)

    const [students] = await Promise.all([
      space.then(space => space.getEntries({'content_type': 'students'}))
    ])

    commit(setStudentsRaw, students.items)
    commit(setStudents, normalize(students.items, studentList))
  }
}

