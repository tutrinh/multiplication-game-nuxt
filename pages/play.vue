<template>
  <div>
    <section>
      <div class="container">
        <NuxtLink to="/">
          <svg
            class="svg-30"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15">
            <path d="M1.5 7.5l4-4m-4 4l4 4m-4-4H14" stroke="currentColor"></path>
          </svg>
        </NuxtLink>
        <h1 class="font-weight-bold heading-tight no-select">PLAY</h1>
      </div>
    </section>
    <section>
      <div class="container calculator">
        <div class="row display">
          <div class="w-100 d-flex flex-row justify-content-between align-items-baseline">
            <h2 class="no-select">Level {{selected_level}}</h2>
            <h5 class="display-total font-weight-semibold">{{correct_count}} / {{total_count}}</h5>
          </div>
          <div id="display-screen" class="input-screen w-100 d-flex flex-row mb-3">
            <div class="col-8">
              {{equation[0]}} <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.793 7.5L1.146 1.854l.708-.708L7.5 6.793l5.646-5.647.708.708L8.207 7.5l5.647 5.646-.707.707L7.5 8.207l-5.646 5.646-.708-.707L6.793 7.5z" fill="currentColor"></path></svg>
              {{equation[1]}}
            </div>
            <div class="col-4 p-0">
              <input class="input no-select" type="text" value="10" v-model="q" />
            </div>
          </div>
        </div>
        <!-- Calculator Buttons -->
        <div class="keypad row flex-row flex-wrap">
          <div class="col-4">
            <div class="key no-select" data-value="1" v-on:click="enterValue">
              1
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="2" v-on:click="enterValue">
              2
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="3" v-on:click="enterValue">
              3
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="4" v-on:click="enterValue">
              4
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="5" v-on:click="enterValue">
              5
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="6" v-on:click="enterValue">
              6
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="7" v-on:click="enterValue">
              7
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="8" v-on:click="enterValue">
              8
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="9" v-on:click="enterValue">
              9
            </div>
          </div>
          <div class="col-4">
            <div class="key key-enter color-bg-neon-green color-navy no-select" v-on:click="enteredAnswer">
              ENT
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="0" v-on:click="enterValue">
              0
            </div>
          </div>
          <div class="col-4">
            <div class="key key-delete color-bg-red color-navy no-select" v-on:click="deleteLast">
              DEL
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core'
const { Storage, NativeAudio, Haptics } = Plugins
export default {
  layout: 'main',
  data () {
    return {
      q: '',
      selected_level: null,
      mode: 'random', // random, regular
      total_count: 0,
      arr: [],
      missed: [],
      correct_count: 0,
      equation: [6, 2]
    }
  },
  mounted () {
    NativeAudio.preloadSimple({
      assetPath: 'public/assets/click1.mp3',
      assetId: 'chime_audio'
    })
    const keys = document.querySelectorAll('.key')
    for (const [i, key] of keys.entries()) {
      key.addEventListener('touchstart', function (e) {
        console.log(i)
        this.classList.add('pressed')
        // vm.snd_key.play()
        NativeAudio.play({
          assetId: 'chime_audio'
        })
      }, false)

      key.addEventListener('touchend', function () {
        this.classList.remove('pressed')
      }, false)
    }

    this.getLevel()

    this.createArray()

    this.$nextTick(
      this.createEquationArray()
    )

    document.querySelector('#display-screen').addEventListener('animationend', function (e) {
      e.target.classList.remove('vibrate-1')
      e.target.classList.remove('color-bg-red')
    }, false)
  },
  methods: {
    deleteLast () {
      if (this.q !== '0') {
        if (parseInt(this.q) < 10) {
          this.q = ''
        } else {
          this.q = this.q.split('')
          this.q.pop()
          const arr = this.q.join('')
          this.q = arr
        }
      }
    },
    enterValue (e) {
      if (this.q.length < 3) {
        if (this.q === '0') {
          this.q = e.target.dataset.value
        } else {
          this.q = this.q + e.target.dataset.value
        }
      }
    },
    async getLevel () {
      const { value } = await Storage.get({ key: 'selected_level' })
      this.selected_level = value
    },
    createArray () {
      const _arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      if (this.mode === 'random') {
        this.arr = this.shuffleArray(_arr)
      } else {
        this.arr = _arr
      }
      this.total_count = this.arr.length
      console.log(this.arr)
    },
    shuffleArray (array) {
      return array.sort(() => Math.random() - 0.5)
    },
    createEquationArray () {
      const FIRST_NUM = this.arr[0]
      const EQUATION_ARR = []
      console.log('ARRAY LENGTH: ', this.arr)
      this.arr.shift()
      Storage.get({ key: 'selected_level' }).then((value) => {
        EQUATION_ARR.push(parseInt(value.value))
        EQUATION_ARR.push(FIRST_NUM)
        this.equation = EQUATION_ARR
        if (this.mode === 'random') {
          this.shuffleArray(this.equation)
        }
        console.log(this.equation)
      })
    },
    enteredAnswer () {
      // enter answer
      console.log('ENTERED ANSWER')
      const ANSWER = parseInt(this.equation[0]) * parseInt(this.equation[1])
      console.log(ANSWER)
      if (parseInt(this.q) === ANSWER) {
        console.log('CORRECT')
        if (this.arr.length > 0) {
          this.createEquationArray()
          this.q = ''
          this.correct_count += 1
        } else {
          console.log('NO MORE EQUATIONS')
          // GO TO END SCREEN
        }
      } else {
        console.log('WRONG')
        this.q = ''
        document.querySelector('#display-screen').classList.add('vibrate-1')
        document.querySelector('#display-screen').classList.add('color-bg-red')
        Haptics.vibrate()
      }
    }
  }
}
</script>
