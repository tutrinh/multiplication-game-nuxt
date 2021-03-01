export const state = () => ({
  counter: 0,
  level: 0,
  gameState: 'begin', // begin, playing, end
  gameMode: 'normal' // normal, hard
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  incrementBy (state, payload) {
    state.counter += payload.amount
  },
  resetCounter (state) {
    state.counter = 0
  },
  setLevel (state, payload) {
    state.level = payload.level
  },
  setGameState (state, payload) {
    state.gameState = payload.gameState
  },
  setGameMode (state, payload) {
    state.gameMode = payload.gameMode
  }
}
