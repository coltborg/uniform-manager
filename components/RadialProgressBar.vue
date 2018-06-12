<template>
  <div class="p-4 radial-progress-bar-grid max-w-full h-64 overflow-auto">
    <svg
      viewBox="0 0 140 140"
      preserveAspectRatio="xMinYMin meet"
      class="h-full"
      style="justify-self: center;">
      <g>
        <circle
          ref="backgroundCircle"
          :stroke="background"
          r="48%"
          cx="50%"
          cy="50%"
          stroke-width="4"
          class="fill-transparent"
          style="transform-origin: center; transform: rotate(270deg);" />
        <circle
          ref="foregroundCircle"
          :stroke="foreground"
          r="48%"
          cx="50%"
          cy="50%"
          stroke-width="4"
          class="fill-transparent"
          style="transform-origin: center; transform: rotate(270deg);" />
        <text
          :fill="foreground"
          x="50%"
          y="50%"
          text-anchor="middle"
          dy="0.3em"
          class="text-3xl font-light">
          {{ percentage }}%
        </text>
        <text
          :fill="background"
          x="50%"
          y="70%"
          text-anchor="middle"
          dy="0.3em"
          class="text-xs font-regular">
          Assigned
        </text>
      </g>
    </svg>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div
          :style="`background-color: ${foreground};`"
          class="mr-2 w-3 h-3 rounded-full" />
        {{ assigned }} Assigned
      </div>
      <div class="flex items-center">
        <div
          :style="`background-color: ${background};`"
          class="mr-2 w-3 h-3 rounded-full" />
        {{ total }} Students
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadialProgressBar',
  props: {
    total: {
      type: Number,
      required: true,
    },
    assigned: {
      type: Number,
      required: true,
    },
    background: {
      type: String,
      default: '#b8c2cc',
    },
    foreground: {
      type: String,
      default: '#38c172',
    },
  },
  data() {
    return {
      backgroundLength: null,
      foregroundLength: null,
      percentLength: null,
    };
  },
  computed: {
    percent() {
      return 100 - this.percentage;
    },
    percentage() {
      return Math.floor((this.assigned / this.total) * 100);
    },
  },
  watch: {
    percentage() {
      this.calculatePercent();
      this.applyForeground();
    },
  },
  mounted() {
    this.setLengths();
    this.setDashArray();
    this.calculatePercent();
    this.applyForeground();
  },
  methods: {
    setLengths() {
      this.backgroundLength = this.$refs.backgroundCircle.getTotalLength();
      this.foregroundLength = this.$refs.foregroundCircle.getTotalLength();
    },
    setDashArray() {
      this.$refs.foregroundCircle.setAttribute('stroke-dasharray', `${this.backgroundLength}, ${this.backgroundLength}`);
    },
    calculatePercent() {
      this.percentLength = Math.floor((this.percent / 100) * this.backgroundLength);
    },
    applyForeground() {
      this.$refs.foregroundCircle.setAttribute('stroke-dashoffset', `${this.percentLength}`);
    },
  },
};
</script>

<style scoped>
.radial-progress-bar-grid {
  display: grid;
  grid-template:
    1fr
    auto
    / 1fr;
  grid-row-gap: 1rem;
}
</style>
