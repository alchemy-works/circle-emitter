export function readAsText(blob) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {

        reader.addEventListener('load', () => {
            resolve(reader.result)
        })

        reader.addEventListener('error', () => {
            reject(reader.error)
        })

        reader.readAsText(blob)
    })
}

export function openFileAndReadContent(callback = () => undefined) {
    const inputRef = document.createElement('input')
    inputRef.type = 'file'
    inputRef.addEventListener('change', async (ev) => {
        const file = ev.target.files[0]
        if (!file) {
            return
        }
        callback(await readAsText(file))
        inputRef.remove()
    })
    document.body.appendChild(inputRef)
    inputRef.click()
}