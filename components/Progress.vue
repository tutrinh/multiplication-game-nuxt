<template>
  <div class="position-relative">
    <svg class="progress-ring position-absolute" :height="radius * 2" :width="radius * 2">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00bc9b" />
          <stop offset="100%" stop-color="#5eaefd" />
        </linearGradient>
      </defs>
      <circle
        class="progress-ring__circle"
        :stroke-width="stroke"
        :stroke="'url(#gradient)'"
        :stroke-dasharray="circumference + ' ' + circumference"
        :stroke-dashoffset="strokeDashoffset"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
    <svg class="progress-ring" :height="radius * 2" :width="radius * 2">
      <circle
        class="progress-ring__circle"
        :stroke-width="stroke"
        :stroke="underColor"
        :stroke-dasharray="circumference + ' ' + circumference"
        :stroke-dashoffset="0"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
    <div class="position-absolute d-flex justify-content-center align-items-center" :style="'top:0; width:'+ radius * 2 +'px;height:'+ radius * 2 + 'px'">
      <h3 class="mb-0 heading-tight font-weight-semibold no-select">
        {{ progress }}
      </h3>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ProgressRing',
  props: {
    radius: {
      type: Number,
      default: 0
    },
    progress: {
      type: Number,
      default: 0
    },
    stroke: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'black'
    },
    underColor: {
      type: String,
      default: 'white'
    }
  },
  data () {
    const normalizedRadius = this.radius - this.stroke * 1.5
    const circumference = normalizedRadius * 2 * Math.PI
    return {
      normalizedRadius,
      circumference,
      prog: 0
    }
  },
  computed: {
    strokeDashoffset () {
      return this.circumference - this.prog / 100 * this.circumference
    }
  },
  mounted () {
    var vm = this;
    setTimeout( function () {
       vm.prog = vm.progress
    }, 1000)
  }
}
</script>
