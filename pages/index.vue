<template>
  <div>
    <section>
      <div class="container flex-column">
        <h1 class="no-select">
          Evelyn T.
        </h1>
        <h4>VUEX State: Counter {{count}} / mapState {{counter}}</h4>
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
    <section class="">
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

    NativeAudio.preloadSimple({
      assetPath: "public/assets/click1.mp3",
      assetId: "chime_audio"
    })

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

  }
}
</script>
