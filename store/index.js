// Primary Store Module - import other modules

export const state = () => ({

})

export const getters = {

}

export const mutations = {

}

export const actions = {

  // loads data from server only
  async nuxtServerInit ({ dispatch }) {
      await dispatch('students/init')
      await dispatch('equipment/init')
  }
}

