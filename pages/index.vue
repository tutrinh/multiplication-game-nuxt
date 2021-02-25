<template>
  <div>
    <section>
      <div class="container flex-column">
        <h1 class="no-select">
          Evelyn T.
        </h1>
        <p class="no-select">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum corporis magnam facere fugiat nihil, id quia, impedit tempore eligendi totam beatae incidunt eius. Enim consequuntur fuga alias velit? Maxime, est.
        </p>
      </div>
    </section>
    <section>
      <Card>
        <Progress :radius="60" :progress="90" :stroke="14" color="hotpink" under-color="pink" />
        <div class="no-select">
          <h4 class="mb-0 font-weight-bold heading-tight">
            Your Score
          </h4>
          <p class="small font-weight-bold ">
            You got <span class="text-success">12</span> out of <span class="text-danger">12</span> correct on the multiplication table of 3x.
          </p>
        </div>
      </Card>
    </section>
    <section>
      <div class="container container-fluid py-2">
        <NuxtLink to="/play" class="btn btn-round btn-dark btn-block">PLAY</NuxtLink>
        <a id="wrong" @click.prevent="wrong" class="btn btn-round btn-danger btn-block my-4">WRONG</a>
        <audio id="clickSnd" class="d-none" preload="auto" controls="none" src="click.mp3" />
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import { Print } from '~/utils/print';
import { Plugins } from '@capacitor/core';
const { Haptics } = Plugins;

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

    const wrongBtn = document.querySelector('#wrong');
    const clickSnd = document.querySelector('#clickSnd');

    console.log(wrongBtn);
    wrongBtn.addEventListener('animationend', function(e) {
      console.log('THIS');
      console.log('ANIMATION ENDED');
      e.target.classList.remove('vibrate-1');
      
    });

  },
  methods: {
    wrong: function(e) {
      console.log('WRONG BUTTON CLICKED', e);
      // Haptics.vibrate();
      e.target.classList.add('vibrate-1');
      // this.playSound('click.mp3');
      clickSnd.play();
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
    }
  }
}
</script>


