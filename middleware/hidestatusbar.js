import { Plugins } from '@capacitor/core'

export default function () {
  // middleware file are execute before page render
  const { StatusBar } = Plugins
  StatusBar.hide()
}
