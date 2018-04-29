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

const equipmentSchema = new schema.Entity('item', {}, {
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

const equipmentList = new schema.Array(equipmentSchema)

export const state = () => ({
  uniformBags: {},
  uniformBagsRaw: {},
  trackSuits: {},
  trackSuitsRaw: {},
  shakos: {},
  shakosRaw: {},
  jackets: {},
  jacketsRaw: {},
  guantlets: {},
  guantletsRaw: {},
  colorGuardShirts: {},
  colorGuardShirtsRaw: {},
  bibbers: {},
  bibbersRaw: {}
})

export const getters = {
  allEquipmentIds(state, getters) {

  },

  allEquipmentByIds( state, getters) {

  },

  allEquipmentRaw(state, getters) {

    // console.log(this.uniformBagsRaw,
    //     this.trackSuitsRaw,
    //     this.shakosRaw,
    //     this.jacketsRaw,
    //     this.guantletsRaw,
    //     this.colorGuardShirtsRaw,
    //     this.bibbersRaw)

    const mergedArrays = [].concat.apply([],
      [
        state.uniformBagsRaw,
        state.trackSuitsRaw,
        state.shakosRaw,
        state.jacketsRaw,
        state.guantletsRaw,
        state.colorGuardShirtsRaw,
        // state.bibbersRaw
      ]
    )

    return mergedArrays
  },
}

export const mutations = {
  setUniformBags: (state, uniformBags) => {
    state.uniformBags = uniformBags
  },
  setUniformBagsRaw: (state, uniformBagsRaw) => {
    state.uniformBagsRaw = uniformBagsRaw
  },

  setTrackSuits: (state, trackSuits) => {
    state.trackSuits = trackSuits
  },
  setTrackSuitsRaw: (state, trackSuitsRaw) => {
    state.trackSuitsRaw = trackSuitsRaw
  },

  setShakos: (state, shakos) => {
    state.shakos = shakos
  },
  setShakosRaw: (state, shakosRaw) => {
    state.shakosRaw = shakosRaw
  },

  setJackets: (state, jackets) => {
    state.jackets = jackets
  },
  setJacketsRaw: (state, jacketsRaw) => {
    state.jacketsRaw = jacketsRaw
  },

  setGuantlets: (state, guantlets) => {
    state.guantlets = guantlets
  },
  setGuantletsRaw: (state, guantletsRaw) => {
    state.guantletsRaw = guantletsRaw
  },

  setColorGuardShirts: (state, colorGuardShirts) => {
    state.colorGuardShirts = colorGuardShirts
  },
  setColorGuardShirtsRaw: (state, colorGuardShirtsRaw) => {
    state.colorGuardShirtsRaw = colorGuardShirtsRaw
  },

  setBibbers: (state, bibbers) => {
    state.bibbers = bibbers
  },
  setBibbersRaw: (state, bibbersRaw) => {
    state.bibbersRaw = bibbersRaw
  },
}

export const actions = {

  async init ({ commit }) {

    const [
      uniformBags,
      trackSuits,
      shakos,
      jackets,
      gauntlets,
      colorGuardShirts,
      bibbers
    ] = await Promise.all([
      client.getEntries({'content_type': 'uniformBags'}),
      client.getEntries({'content_type': 'trackSuits'}),
      client.getEntries({'content_type': 'shakos'}),
      client.getEntries({'content_type': 'jackets'}),
      client.getEntries({'content_type': 'gauntlets'}),
      client.getEntries({'content_type': 'colorGuardShirts'}),
      client.getEntries({'content_type': 'bibbers'})
    ])

    commit('setUniformBagsRaw', uniformBags.items)
    commit('setUniformBags', normalize(uniformBags.items, equipmentList))

    commit('setTrackSuitsRaw', trackSuits.items)
    commit('setTrackSuits', normalize(trackSuits.items, equipmentList))

    commit('setShakosRaw', shakos.items)
    commit('setShakos', normalize(shakos.items, equipmentList))

    commit('setJacketsRaw', jackets.items)
    commit('setJackets', normalize(jackets.items, equipmentList))

    commit('setGuantletsRaw', gauntlets.items)
    commit('setGuantlets', normalize(gauntlets.items, equipmentList))

    commit('setColorGuardShirtsRaw', colorGuardShirts.items)
    commit('setColorGuardShirts', normalize(colorGuardShirts.items, equipmentList))
  }
}

