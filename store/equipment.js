/* eslint-disable */
// Students Store Module - import other modules
import { normalize, schema } from 'normalizr'

// import contentful client and tokens
import { createClient } from 'contentful-management'
import Configuration from '../services/configuration';

function formatType(type) {
  const pascalCase = type[0].toUpperCase() + type.substring(1);
  const singular = pascalCase.substring(0, pascalCase.length - 1)
  const words = singular.match(/[A-z][a-z]*/g);
  return words.join(' ');
}

function formattedEquipment(value, description) {
  return {
    id: value.id,
    number: value.number,
    assignedToStudentId: value.assignedToStudentId,
    type: value.type,
    description: description,
  }
}

function toFormattedEquipment(equipment, descriptionFormat) {
    const formatted = Object.keys(equipment).reduce((prev, curr) => {
      const value = equipment[curr];
      prev[value.id] = formattedEquipment(
        value,
        descriptionFormat(value)
      );
      return prev;
    }, {})
    return formatted;
}

const equipmentSchema = new schema.Entity('items', {}, {
  idAttribute: (value) => {
    return value.sys.id;
  },
  processStrategy: function(value, parent) {
    var values = Object.keys(value.fields).reduce((prev, key) => {
      prev[key] = value.fields[key][Configuration.locale];
      if (key === 'assignedToStudentId') {
        prev[key] = prev[key].sys.id;
      }
      return prev;
    }, {});
    return {
      ...values,
      sys: value.sys,
      id: value.sys.id,
      type: formatType(value.sys.contentType.sys.id)
    }
  }
})

const equipmentList = new schema.Array(equipmentSchema)

const uniformBagsSchema = new schema.Entity('formatted', {}, {
  idAttribute: (value) => {
    return value.sys.id;
  },
  processStrategy: function(value, parent) {

  }
});

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
  allEquipmentRaw(state, getters) {

    const mergedArrays = [].concat.apply([],
      [
        state.uniformBagsRaw,
        state.trackSuitsRaw,
        state.shakosRaw,
        state.jacketsRaw,
        state.guantletsRaw,
        state.colorGuardShirtsRaw,
        state.bibbersRaw,
      ]
    )

    return mergedArrays
  },

  bibbersFormatted(state, getters) {
    const { ...equipment } = state.bibbers;
    return toFormattedEquipment(equipment, value => `Size: ${value.waist} W ${value.inseam} L`)
  },
  colorGuardShirtsFormatted(state, getters) {
    const { ...equipment } = state.colorGuardShirts;
    return toFormattedEquipment(equipment, value => `Size: ${value.size}`)
  },
  guantletsFormatted(state, getters) {
    const { ...equipment } = state.guantlets;
    return toFormattedEquipment(equipment, value => `Number: ${value.number}`)
  },
  jacketsFormatted(state, getters) {
    const { ...equipment } = state.jackets;
    return toFormattedEquipment(equipment, value => `Size: ${value.height}H/${value.chest}C Gender: ${value.gender}`)
  },
  shakosFormatted(state, getters) {
    const { ...equipment } = state.shakos;
    return toFormattedEquipment(equipment, value => `Size: ${value.hatSize}`)
  },
  trackSuitsFormatted(state, getters) {
    const { ...equipment } = state.trackSuits;
    return toFormattedEquipment(equipment, value => `Size: ${value.size}`)
  },
  uniformBagsFormatted(state, getters) {
    const { ...equipment } = state.uniformBags;
    return toFormattedEquipment(equipment, value => `Number: ${value.number}`)
  },

  allFormattedEquipment(state, getters) {

    const mergedStates = 
      {
        ...getters.uniformBagsFormatted,
        ...getters.trackSuitsFormatted,
        ...getters.shakosFormatted,
        ...getters.jacketsFormatted,
        ...getters.guantletsFormatted,
        ...getters.colorGuardShirtsFormatted,
        ...getters.bibbersFormatted,
      };

    return mergedStates
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

    // import createClient directly
    const client = createClient({
      accessToken: Configuration.accessToken
    });
    const space = client.getSpace(Configuration.space)

    const [
      uniformBags,
      trackSuits,
      shakos,
      jackets,
      gauntlets,
      colorGuardShirts,
      bibbers
    ] = await Promise.all([
      space.then(space => space.getEntries({'content_type': 'uniformBags'})),
      space.then(space => space.getEntries({'content_type': 'trackSuits'})),
      space.then(space => space.getEntries({'content_type': 'shakos'})),
      space.then(space => space.getEntries({'content_type': 'jackets'})),
      space.then(space => space.getEntries({'content_type': 'gauntlets'})),
      space.then(space => space.getEntries({'content_type': 'colorGuardShirts'})),
      space.then(space => space.getEntries({'content_type': 'bibbers'}))
    ])

    commit('setUniformBagsRaw', uniformBags.items)
    commit('setUniformBags', normalize(uniformBags.items, equipmentList).entities.items || [])

    commit('setTrackSuitsRaw', trackSuits.items)
    commit('setTrackSuits', normalize(trackSuits.items, equipmentList).entities.items || [])

    commit('setShakosRaw', shakos.items)
    commit('setShakos', normalize(shakos.items, equipmentList).entities.items || [])

    commit('setJacketsRaw', jackets.items)
    commit('setJackets', normalize(jackets.items, equipmentList).entities.items || [])

    commit('setGuantletsRaw', gauntlets.items)
    commit('setGuantlets', normalize(gauntlets.items, equipmentList).entities.items || [])

    commit('setColorGuardShirtsRaw', colorGuardShirts.items)
    commit('setColorGuardShirts', normalize(colorGuardShirts.items, equipmentList).entities.items || [])

    commit('setBibbersRaw', bibbers.items)
    commit('setBibbers', normalize(bibbers.items, equipmentList).entities.items || [])
  }
}

