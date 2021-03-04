<template>
  <div class="color-bg-navy main-screen">
    <section>
      <div class="container d-flex flex-column justify-content-center align-items-center">
        <h1 class="text-center main-title no-select">Tiny</h1>
        <h1 class="text-center main-title-2 no-select">Math</h1>
        <h3 class="text-center main-title-ribbon no-select">
          <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="currentColor"></path>
          </svg>
          
        Multiplication 

         <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="currentColor"></path>
          </svg>
        </h3>
        <h4 class="text-center main-title-desc no-select color-neutral">
          <svg class="color-neutral" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M0 3.5h15m-15 8h15m-15-4h15" stroke="currentColor"></path></svg> 
          
          Math Speed Drill 
<svg class="color-neutral" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M0 3.5h15m-15 8h15m-15-4h15" stroke="currentColor"></path></svg>
         
        </h4>
      </div>
     
    </section>
    <section>
      <div class="container d-flex flex-column justify-content-center align-items-center">
        <button class="btn btn-text" v-on:touchend="goToPlay" v-on:touchstart="onTouched">
          <h1 class="text-center main-title-play no-select">Play</h1>
        </button>
      </div>
    </section>
    <section class="footer">
      <div class="container d-flex justify-content-center align-items-center">
        <div class="info-wrapper">
          <div class="info no-select">
          <h5 class="no-select">An Educational Game</h5>
          <h6 class="no-select mb-0">Tiny Touch Games</h6>
          </div>
          <div class="icon">
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.5A3.5 3.5 0 013.5 2h8A3.5 3.5 0 0115 5.5v4.528a2.972 2.972 0 01-5.63 1.329L9.19 11H5.809l-.179.357A2.972 2.972 0 010 10.027V5.5zM4 8V7H3V6h1V5h1v1h1v1H5v1H4zm6 0H9V7h1v1zm1-2h1V5h-1v1z" fill="currentColor"></path></svg>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import { Plugins } from '@capacitor/core'
const { Storage, Haptics, NativeAudio } = Plugins;


export default {
  layout: "main",
  transition: 'page',
  //middleware: 'hidestatusbar',
  data() {
    return {}
  },
  mounted() {
    // NativeAudio.play({
    //   assetId: "bg_audio",
    // });

    // NativeAudio.loop({
    //   assetId: "bg_audio",
    // });
  },
  computed: {
  },
  methods: {
    goToPlay(e) {
      const btn = e.currentTarget
      console.log(btn);
      btn.querySelector('h1').classList.remove('main-title-play--pressed')
      setTimeout(() => {
        this.$router.push({
          path: '/home'
        })
      }, 250)
    },
    onTouched(e) {
      const btn = e.currentTarget
      console.log(btn);
      btn.querySelector('h1').classList.add('main-title-play--pressed')
     
    }
  },
  beforeDestroy() {
  }
}
</script>
