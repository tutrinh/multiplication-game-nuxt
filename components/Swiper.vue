<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide data-value="1">Slide 1</swiper-slide>
    <swiper-slide data-value="2">Slide 2</swiper-slide>
    <swiper-slide data-value="3">Slide 3</swiper-slide>
    <swiper-slide data-value="4">Slide 4</swiper-slide>
    <swiper-slide data-value="5">Slide 5</swiper-slide>
    <swiper-slide data-value="6">Slide 6</swiper-slide>
    <swiper-slide data-value="7">Slide 7</swiper-slide>
    <swiper-slide data-value="8">Slide 8</swiper-slide>
    <swiper-slide data-value="9">Slide 9</swiper-slide>
    <swiper-slide data-value="10">Slide 10</swiper-slide>
    <swiper-slide data-value="11">Slide 11</swiper-slide>
    <swiper-slide data-value="12">Slide 12</swiper-slide>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </swiper>
</template>

<script>
/* eslint-disable */
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/assets/css/swiper-bundle.css'

export default {
  name: 'Slider',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      banners: ['/slider-1.png', '/slider-2.png', '/slider-3.png'],
      swiperOptions: {
        slidesPerView: 2.1,
        spaceBetween: -10,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        centeredSlides: false,
        freeMode: true,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: false,
          type: 'bullets'
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 2.5,
            spaceBetween: 15,
            centeredSlides: false
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    this.$nextTick(() => {
      console.log('NEXT TICK')
      console.log(document.querySelectorAll('.swiper-slide'))

      const slides = document.querySelectorAll('.swiper-slide')
      for (const slide of slides) {
        slide.addEventListener('click', (e) => {
          e.preventDefault()
          const value = e.target.dataset.value
          console.log(value)
          this.$parent.setLevel({level:value})
          this.$router.push({
            path: '/play'
          })
        })
      }
    })
  }
}
</script>
<style scoped>
.swiper-slide {
  background-color: pink;
  min-height: 200px;
  border-radius: 10px;
}
.swiper-pagination {
  margin-top: 10px;
  position: relative;
}
</style>
