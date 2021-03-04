<template>
  <div class="main-screen">
    <section>
      <div class="container flex-column">
        <h1 class="no-select">
          Evelyn T.
        </h1>
        <!-- <h4>VUEX State: Counter {{count}} / mapState {{counter}}</h4> -->
        <svg
          width="60px"
          height="60px"
          viewBox="0 0 60 60"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
            <title>redbox</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd">
                <g id="redbox">
                    <rect
                    id="Rectangle"
                    fill="#D0021B"
                    x="0"
                    y="0"
                    width="60"
                    height="60"></rect>
                    <circle id="Oval" fill="#4A90E2" cx="30" cy="30" r="15"></circle>
                </g>
            </g>
        </svg>
        <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
    <title>redbox2</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <rect id="path-1" x="0" y="0" width="60" height="60"></rect>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="redbox2">
            <mask id="mask-2" fill="white">
                <use xlink:href="#path-1"></use>
            </mask>
            <use id="Rectangle" fill="#D0021B" xlink:href="#path-1"></use>
            <circle id="Oval" fill="#F196A1" mask="url(#mask-2)" cx="0" cy="60" r="30"></circle>
        </g>
    </g>
</svg>


<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
    <title>target</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="target">
            <rect id="Rectangle-2" fill="#4A90E2" x="0" y="0" width="60" height="60"></rect>
            <circle id="Oval-2" fill="#50E3C2" cx="30" cy="30" r="20"></circle>
            <circle id="Oval-3" fill="#D8D8D8" cx="30" cy="30" r="10"></circle>
        </g>
    </g>
</svg>

<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
    <title>leaf</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="leaf">
            <rect id="Rectangle-3" fill="#F5A623" x="0" y="0" width="60" height="60"></rect>
            <path d="M60,0 L60,0 C60,33.137085 33.137085,60 3.6739404e-15,60 L0,60 C-4.05812251e-15,26.862915 26.862915,6.08718376e-15 60,0 Z" id="Rectangle-3-Copy" fill="#223C89"></path>
        </g>
    </g>
</svg>

      </div>
    </section>
    <section>
      <Card>
        <Progress :radius="60" :progress="90" :stroke="14" color="hotpink" under-color="pink" />
        <div class="no-select">
          <h4 class="mb-0 heading-tight">
            Your Score
          </h4>
          <p class="small font-weight-bold ">
            You got <span class="text-success">12</span> out of <span class="text-danger">12</span> correct on the multiplication table of 3x.
          </p>
        </div>
      </Card>
    </section>
    <section class="p-0">
      <div class="container p-0">
        <Swiper />
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import { Print } from '~/utils/print'
import { Plugins } from '@capacitor/core'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
const { Storage, Haptics, NativeAudio } = Plugins;


export default {
  layout: "main",
  transition: 'page',
  //middleware: 'hidestatusbar',
  data() {
    return {
      audio: null
    }
  },
  mounted() {
    Print.printName('Tu');

    // const wrongBtn = document.querySelector('#wrong');
    // const clickSnd = document.querySelector('#clickSnd');

    // console.log(wrongBtn);
    // wrongBtn.addEventListener('animationend', function(e) {
    //   console.log('THIS');
    //   console.log('ANIMATION ENDED');
    //   e.target.classList.remove('vibrate-1');
      
    // });
    // NativeAudio.play({
    //   assetId: "bg_audio",
    // });

    // NativeAudio.loop({
    //   assetId: "bg_audio",
    // });

    

    // Store API
    this.setLevel('6')

    // VUEX increment counter by 1 with mutations
    this.$store.commit('increment')
    this.$store.commit('increment')
    this.incrementBy({amount:10}) // store mutation with payload object with key amount

  },
  computed: {
    count () {
      return this.$store.state.counter
    },
    ...mapState({
      counter: 'counter'
    })
  },
  methods: {
    ...mapMutations([
      'increment',
      'incrementBy',
      'setLevel'
    ]),
    wrong: function(e) {
      console.log('WRONG BUTTON CLICKED', e);
      Haptics.vibrate();
      e.target.classList.add('vibrate-1');
      // this.playSound('click.mp3');
      // clickSnd.play();
      NativeAudio.play({
        assetId: "chime_audio"
      })
    },
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play()
        .then(() => {
          console.log('AUDIO IS PLAYING');
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    /*async setLevel (level) {
      await Storage.set({
        key: 'selected_level',
        value: level
      })
    },*/

  },
  beforeDestroy() {
  }
}
</script>
