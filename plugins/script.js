/* eslint-disable */
console.log('script plugin called global')

// Preloading audio
import { Plugins } from '@capacitor/core'
const { NativeAudio } = Plugins

NativeAudio.preloadSimple({
  assetPath: 'public/assets/click1.mp3',
  assetId: 'chime_audio'
})

NativeAudio.preloadComplex({
  assetPath: "public/assets/game-audio-loop-mono.wav",
  assetId: "bg_audio",
  volume: 1.0,
  audioChannelNum: 1,
});

// NativeAudio.loop({
//   assetId: "bg_audio",
// });

