import { createApp } from './modules.js'
import App from './App.js'

async function main() {
    window.__userscript__ = true
    const app = createApp(App)
    document.body.innerHTML = '<div id="app"></div>'
    app.mount('#app')
}

main().catch((err) => {
    console.error(err)
})