// Students Store Module - import other modules
import { normalize, schema } from 'normalizr'

// import conteful client and tokens
import { createClient } from 'contentful'
import tokens from '~/tokens/'

// import createClient directly
const client = createClient({
  space: tokens.contentful.space,
  accessToken: tokens.contentful.deliveryAPIToken
})

const studentSchema = new schema.Entity('students', {}, {
  idAttribute: (value) => {
    return value.fields.id
  },
  processStrategy: function(value, parent) {
    return {
      ...value.fields,
      sysId: value.sys.id
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

    // console.log('students init')

    const [students] = await Promise.all([
      client.getEntries({'content_type': 'students'})
    ])

    commit(setStudentsRaw, students.items)
    commit(setStudents, normalize(students.items, studentList))
  }
}

