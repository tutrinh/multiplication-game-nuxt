<template>
  <div>
    <section>
      <div class="container">
        <h2 class="font-weight-bold">Level {{level}}</h2>
      </div>
    </section>
    <!-- confetti -->
    <section>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 id="score" class="score score--large no-select">{{ counter }}</h1>
        <h3 class="endmessage color-neon-blue no-select">
          {{title}}
          <span class="endmessage__underline"></span>
        </h3>
         <p class="color-neon-blue text-center no-select">
          You got {{counter}} correct out of {{total_count}}. <br> {{message}}
        </p>
        <ul class="d-none list-group list-group-flush">
          <li class="list-group-item" v-for="(item, index) in missed" :key="`missed-${index}`">{{item[0]}} x {{item[1]}}</li>
        </ul>
      </div>

      <transition name="fade">
        <div v-if="show" class="row flex-column justify-content-center align-items-center">
          <button class="btn btn-round btn__gamemode" @touchend="goto('/play')"><svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
<path xmlns="http://www.w3.org/2000/svg" d="M20.9241 5.61722C20.8753 5.49927 20.803 5.38877 20.7071 5.29289L17.7071 2.29289C17.3166 1.90237 16.6834 1.90237 16.2929 2.29289C15.9024 2.68342 15.9024 3.31658 16.2929 3.70711L17.5858 5L8 5C5.23858 5 3 7.23858 3 10V12C3 12.5523 3.44772 13 4 13C4.55228 13 5 12.5523 5 12L5 10C5 8.34315 6.34315 7 8 7L17.5858 7L16.2929 8.29289C15.9024 8.68342 15.9024 9.31658 16.2929 9.70711C16.6834 10.0976 17.3166 10.0976 17.7071 9.70711L20.7063 6.70787C20.7088 6.70544 20.7112 6.703 20.7136 6.70055C20.9045 6.50613 21 6.25307 21 6" fill="#0D0D0D"></path>
<path xmlns="http://www.w3.org/2000/svg" d="M20.9241 5.61722C20.9727 5.73425 20.9996 5.8625 21 5.997L20.9241 5.61722Z" fill="#0D0D0D"></path>
<path xmlns="http://www.w3.org/2000/svg" d="M3.07588 17.6172C3.02699 17.7351 3 17.8644 3 18C3 18.2761 3.11193 18.5261 3.29289 18.7071L6.29289 21.7071C6.68342 22.0976 7.31658 22.0976 7.70711 21.7071C8.09763 21.3166 8.09763 20.6834 7.70711 20.2929L6.41421 19L16 19C18.7614 19 21 16.7614 21 14V12C21 11.4477 20.5523 11 20 11C19.4477 11 19 11.4477 19 12V14C19 15.6569 17.6569 17 16 17L6.41421 17L7.70711 15.7071C8.09763 15.3166 8.09763 14.6834 7.70711 14.2929C7.31658 13.9024 6.68342 13.9024 6.29289 14.2929L3.29316 17.2926" fill="#0D0D0D"></path>
<path xmlns="http://www.w3.org/2000/svg" d="M3.07588 17.6172C3.12432 17.5001 3.19595 17.3904 3.29078 17.295L3.07588 17.6172Z" fill="#0D0D0D"></path>
</svg> Retry</button>
          <button class="btn btn-round btn__gamemode" @touchend="goto('/home')">Home</button>
        </div>
      </transition>

      <button id="button" class="ready d-none">
        <div class="message submitMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12.2">
            <polyline stroke="currentColor" points="2,7.1 6.5,11.1 11,7.1 "/>
            <line stroke="currentColor" x1="6.5" y1="1.2" x2="6.5" y2="10.3"/>
          </svg>
        </div>
        <div class="message loadingMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
            <circle class="loadingCircle" cx="2.2" cy="10" r="1.6"/>
            <circle class="loadingCircle" cx="9.5" cy="10" r="1.6"/>
            <circle class="loadingCircle" cx="16.8" cy="10" r="1.6"/>
          </svg>
        </div>
        <div class="message successMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
            <polyline stroke="currentColor" points="1.4,5.8 5.1,9.5 11.6,2.1 "/>
          </svg>
        </div>
    </button>
    <canvas id="canvas"></canvas>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    counter: {
      type: Number,
      default: 0
    },
    total_count: {
      type: Number,
      default: 0
    },
    level: {
      type: String,
      default: '0'
    },
    missed: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      message: 'Awesome',
      title: 'Awesome',
      messages: [
        {title: 'Perfect', message: 'Zero missed. Perfect. Perfect. Perfect. Keep it up.'},
        {title: 'Awesome', message: 'You\'re on your way becoming a math ninja. Keep it up.'},
        {title: 'Super', message: 'You\'re on your way becoming a math hero. Keep it up.'},
      ],
      show: true
    }
  },
  mounted () {
    console.log('END SCREEN MOUNTED');
    
    this.getMessage(this.counter)
    
    setTimeout( () => {
      this.$el.querySelector('.endmessage').classList.add('endmessage--active')
      this.show = true
    }, 2000)



    // https://codepen.io/coopergoeke/pen/wvaYMbJ
    // confetti button
    // ammount to add on each button press
    const confettiCount = 60
    const sequinCount = 10
    // "physics" variables
    const gravityConfetti = 0.2
    const gravitySequins = 0.55
    const dragConfetti = 0.075
    const dragSequins = 0.02
    const terminalVelocity = 3

    // init other global elements
    const button = document.getElementById('button')
    var disabled = false
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let cx = ctx.canvas.width / 2
    let cy = ctx.canvas.height / 2

    // add Confetto/Sequin objects to arrays to draw them
    let confetti = []
    let sequins = []

    // colors, back side is darker for confetti flipping
    const colors = [
      { front : 'red', back: 'maroon' }, // Purple
      { front : 'lightskyblue', back: 'royalblue' }, // Light Blue
      { front : 'gold', back: 'goldenrod' }  // Darker Blue
    ]

// helper function to pick a random number within a range
let randomRange = (min, max) => Math.random() * (max - min) + min

// helper function to get initial velocities for confetti
// this weighted spread helps the confetti look more realistic
const initConfettoVelocity = (xRange, yRange) => {
  const x = randomRange(xRange[0], xRange[1])
  const range = yRange[1] - yRange[0] + 1
  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
  if (y >= yRange[1] - 1) {
    // Occasional confetto goes higher than the max
    y += (Math.random() < .25) ? randomRange(1, 3) : 0
  }
  return {x: x, y: -y}
}

// Confetto Class
function Confetto() {
  this.randomModifier = randomRange(0, 99)
  this.color = colors[Math.floor(randomRange(0, colors.length))]
  this.dimensions = {
    x: randomRange(5, 9),
    y: randomRange(8, 15),
  }
  this.position = {
    x: randomRange(canvas.width/2 - button.offsetWidth/4, canvas.width/2 + button.offsetWidth/4),
    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
  }
  this.rotation = randomRange(0, 2 * Math.PI)
  this.scale = {
    x: 1.75,
    y: 1.75,
  }
  this.velocity = initConfettoVelocity([-9, 9], [6, 11])
}
Confetto.prototype.update = function() {
  // apply forces to velocity
  this.velocity.x -= this.velocity.x * dragConfetti
  this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity)
  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
  
  // set position
  this.position.x += this.velocity.x
  this.position.y += this.velocity.y

  // spin confetto by scaling y and set the color, .09 just slows cosine frequency
  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)    
}

// Sequin Class
function Sequin() {
  this.color = colors[Math.floor(randomRange(0, colors.length))].back,
  this.radius = randomRange(1, 2),
  this.position = {
    x: randomRange(canvas.width/2 - button.offsetWidth/3, canvas.width/2 + button.offsetWidth/3),
    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
  },
  this.velocity = {
    x: randomRange(-6, 6),
    y: randomRange(-8, -12)
  }
}
Sequin.prototype.update = function() {
  // apply forces to velocity
  this.velocity.x -= this.velocity.x * dragSequins
  this.velocity.y = this.velocity.y + gravitySequins
  
  // set position
  this.position.x += this.velocity.x
  this.position.y += this.velocity.y   
}

// add elements to arrays to be drawn
var initBurst = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto())
  }
  for (let i = 0; i < sequinCount; i++) {
    sequins.push(new Sequin())
  }
}

// draws the elements on the canvas
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  confetti.forEach((confetto, index) => {
    let width = (confetto.dimensions.x * confetto.scale.x)
    let height = (confetto.dimensions.y * confetto.scale.y)
    
    // move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y)
    ctx.rotate(confetto.rotation)

    // update confetto "physics" values
    confetto.update()
    
    // get front or back fill color
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
    
    // draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height)
    
    // reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // clear rectangle where button cuts off
    if (confetto.velocity.y < 0) {
      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
    }
  })

  sequins.forEach((sequin, index) => {  
    // move canvas to position
    ctx.translate(sequin.position.x, sequin.position.y)
    
    // update sequin "physics" values
    sequin.update()
    
    // set the color
    ctx.fillStyle = sequin.color
    
    // draw sequin
    ctx.beginPath()
    ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
    ctx.fill()

    // reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // clear rectangle where button cuts off
    if (sequin.velocity.y < 0) {
      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
    }
  })

  // remove confetti and sequins that fall off the screen
  // must be done in seperate loops to avoid noticeable flickering
  confetti.forEach((confetto, index) => {
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1)
  })
  sequins.forEach((sequin, index) => {
    if (sequin.position.y >= canvas.height) sequins.splice(index, 1)
  })

  window.requestAnimationFrame(render)
}

// cycle through button states when clicked
var clickButton = () => {
  if (!disabled) {
    // disabled = true
    // Loading stage
    button.classList.add('loading')
    button.classList.remove('ready')
    setTimeout(() => {
      // Completed stage
      button.classList.add('complete')
      button.classList.remove('loading')
      setTimeout(() => {
        initBurst()
        setTimeout(() => {
          // Reset button so user can select it again
          disabled = false
          button.classList.add('ready')
          button.classList.remove('complete')
        }, 4000)
      }, 320)
    }, 1800)
  }
}

// re-init canvas if the window size changes
const resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  cx = ctx.canvas.width / 2
  cy = ctx.canvas.height / 2
}

// resize listenter
// window.addEventListener('resize', () => {
//   resizeCanvas()
// })

// click button on spacebar or return keypress




// kick off the render loop
  setTimeout (function () {
    initBurst()
    document.querySelector('#score').classList.add('text-pop-up-top')
    setTimeout (function () {
      initBurst()
      
    }, 500)
  }, 500)
render()

button.addEventListener('click', function( ) {
  clickButton()
})

  },
  methods: {
    getMessage (counter) {
      let i
      if (counter === this.total_count) {
        i = 0
      }

      if (counter < this.total_count) {
        i = 1
      }

      if (counter <=  9) {
        i = 2
      }

      this.title = this.messages[i].title
      this.message = this.messages[i].message
    },
    goto (page) {
      if(page === '/play') {
        this.$parent.replayGame()
        return
      }
      this.$router.push({
            path: page
          })
    }
  }
}
</script>


<style scoped lang="scss">



h2 {
  text-align: center;
}

@keyframes loading {
  0%   { cy: 10; }
  25%  { cy: 3; }
  50%  { cy: 10; }
}

/* ----------------------------------------------
 * Generated by Animista on 2021-3-1 15:37:41
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-pop-up-top
 * ----------------------------------------
 */
@-webkit-keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: 0 1px 0 goldenrod, 0 2px 0 goldenrod, 0 3px 0 goldenrod, 0 4px 0 goldenrod, 0 5px 0 goldenrod, 0 6px 0 goldenrod, 0 7px 0 goldenrod, 0 8px 0 goldenrod, 0 9px 0 goldenrod, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
@keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: 0 1px 0 darkgoldenrod, 0 2px 0 darkgoldenrod, 0 3px 0 darkgoldenrod, 0 4px 0 darkgoldenrod, 0 5px 0 darkgoldenrod, 0 6px 0 darkgoldenrod, 0 7px 0 darkgoldenrod, 0 8px 0 darkgoldenrod, 0 9px 0 darkgoldenrod, 0 50px 30px rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
}

body {
  -webkit-font-smoothing: antialiased;
  background-color: #f4f7ff;
}

canvas {
  height: 100vh;
  pointer-events: none;
  position: absolute;
  width: 100%;
  z-index: 200;
  top: 0;
  left: 0;
}

#button {
  background: none;
  border: none;
  color: #f4f7ff;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  left: 50%;
  outline: none;
  overflow: hidden;
  padding: 0 10px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 190px;
  -webkit-tap-highlight-color: transparent;
  z-index: 1;

  &::before {
    background: #1f2335;
    border-radius: 50px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .4) inset;
    content: '';
    display: block;
    height: 100%;
    margin: 0 auto;
    position: relative;
    transition: width .2s cubic-bezier(.39,1.86,.64,1) .3s;
    width: 100%;
  }
}

// READY STATE
#button.ready {
  .submitMessage svg {
    opacity: 1;
    top: 1px;
    transition: top .4s ease 600ms, opacity .3s linear 600ms;
  }

 
}

// LOADING STATE
#button.loading {
  &::before {
    transition: width .3s ease;
    width: 80%;
  }

  .loadingMessage {
    opacity: 1;
  }

  .loadingCircle {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: loading;
    cy: 10;
  }
}

// COMPLETE STATE
#button.complete {
  .submitMessage svg {
    top: -30px;
    transition: none;
  }

  .loadingMessage {
    top: 80px;
  }

  .successMessage svg { 
    stroke-dashoffset: 0;
    transition: stroke-dashoffset .3s ease-in-out 1.4s;
  }
}

.message {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.message svg {
  display: inline-block;
  fill: none;
  margin-right: 5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.submitMessage {
  svg {
    color: #5c86ff;
    margin-left: -1px;
    opacity: 0;
    position: relative;
    top: 30px;
    transition: top .4s ease, opacity .3s linear;
    width: 14px;
  }
}

.loadingMessage {
  opacity: 0;
  transition: opacity .3s linear .3s, top .4s cubic-bezier(.22,0,.41,-0.57);

  svg {
    fill: #5c86ff;
    margin: 0;
    width: 22px;
  }
}

.successMessage {
  svg {
    color: #5cffa1;
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    transition: stroke-dashoffset .3s ease-in-out;
    width: 14px;
  }
}

.loadingCircle:nth-child(2) { animation-delay: .1s }
.loadingCircle:nth-child(3) { animation-delay: .2s }

.score {
  opacity: 0;
  margin-bottom: -20px;
  &--large {
    font-size: 180px;
    font-weight: 700;
    color: gold;
  }
  &--3d {
    color: gold;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}

.text-pop-up-top {
	-webkit-animation: text-pop-up-top 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: text-pop-up-top 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          animation-delay: 0.5s;
}


.endmessage {
  text-align: center;
  font-size: 45px;
  &__underline {
    content: '';
    background-color: gold;
    height: 6px;
    width: 100%;
    display: block;
    transform: translateY(0px);
    transition: all 0.5s ease 0s; 
    opacity: 0;
  }
}
.endmessage--active {
  .endmessage__underline {
    opacity: 1;
    transform: translateY(-4px);
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1.15s cubic-bezier(0.250, 0.460, 0.450, 0.940) 3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
