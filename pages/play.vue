<template>
  <div>
    <section>
      <div class="container">
        <h1 class="font-weight-bold heading-tight">PLAY</h1>
      </div>
    </section>
    <section>
      <div class="container calculator">
        <div class="row display">
          <h2>Display</h2>
          <input class="input no-select" type="text" value="10" v-model="q" />
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
            <div class="key"  data-value="5" v-on:click="enterValue">
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
            <div class="key key-enter color-bg-neon-green color-navy no-select">
              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M13.5.5h-12a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-12a1 1 0 00-1-1z" stroke="currentColor"></path></svg>
            </div>
          </div>
          <div class="col-4">
            <div class="key no-select"  data-value="0" v-on:click="enterValue">
              0
            </div>
          </div>
          <div class="col-4">
            <div class="key key-delete color-bg-red color-navy no-select" v-on:click="deleteLast">
              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M4.5 12.5l-.39.312A.5.5 0 004.5 13v-.5zm-4-5l-.39-.312a.5.5 0 000 .624L.5 7.5zm4-5V2a.5.5 0 00-.39.188l.39.312zm9.5 1v8h1v-8h-1zm-.5 8.5h-9v1h9v-1zm-8.61.188l-4-5-.78.624 4 5 .78-.624zm-4-4.376l4-5-.78-.624-4 5 .78.624zM4.5 3h9V2h-9v1zm9.5 8.5a.5.5 0 01-.5.5v1a1.5 1.5 0 001.5-1.5h-1zm1-8A1.5 1.5 0 0013.5 2v1a.5.5 0 01.5.5h1zM6.146 5.854l4 4 .708-.708-4-4-.708.708zm4-.708l-4 4 .708.708 4-4-.708-.708z" fill="currentColor"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container container-fluid py-4">
        <NuxtLink to="/" class="btn btn-round btn-dark btn-block">Home</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data () {
    return {
      q: '22'
    }
  },
  mounted () {
    const keys = document.querySelectorAll('.key')
    for (const key of keys) {
      key.addEventListener('touchstart', function () {
        this.classList.add('pressed')
      }, false)

      key.addEventListener('touchend', function () {
        this.classList.remove('pressed')
      }, false)
    }

    this.q = this.q + '333'
    console.log(this.q)
    this.q = this.q.split('')
    console.log(this.q)
    this.q.pop()
    console.log(this.q)
    const arr = this.q.join('')
    console.log(arr)
    this.q = arr
    console.log(this.q)
  },
  methods: {
    deleteLast () {
      if (this.q !== '0') {
        if (parseInt(this.q) < 10) {
          this.q = '0'
        } else {
          this.q = this.q.split('')
          this.q.pop()
          const arr = this.q.join('')
          this.q = arr
        }
      }
    },
    enterValue (e) {
      if (this.q.length < 10) {
        if (this.q === '0') {
          this.q = e.target.dataset.value
        } else {
          this.q = this.q + e.target.dataset.value
        }
      }
    }
  }
}
</script>
