import { createApp } from './modules.js'
import App from './App.js'

async function main() {
    const app = createApp(App)
    app.mount('#app')
}

main().catch((err) => {
    console.error(err)
})