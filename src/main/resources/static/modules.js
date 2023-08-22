export * from 'https://unpkg.com/vue@3.3.4/dist/vue.esm-browser.prod.js'
import 'https://unpkg.com/@emotion/css@11.11.2/dist/emotion-css.umd.min.js'
import 'https://unpkg.com/lu2@2023.6.26/theme/edge/js/common/safari-polyfill.js'
import 'https://unpkg.com/lu2@2023.6.26/theme/edge/js/common/all.js'
import lu2_animate from 'https://unpkg.com/lu2@2023.6.26/theme/edge/css/common/animate.css' assert { type: 'css' }
import lu2_ui from 'https://unpkg.com/lu2@2023.6.26/theme/edge/css/common/ui.css' assert { type: 'css' }
import globalStyle from './global.css' assert { type: 'css' }

document.adoptedStyleSheets = [globalStyle, lu2_animate, lu2_ui]

export const { css, cx, injectGlobal } = window.emotion
export const Dialog = window.Dialog
export const LightTip = window.LightTip