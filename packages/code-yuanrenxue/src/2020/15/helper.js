import fs from 'fs'

const window = {}

export const genSign = () => {
  const wasmBuffer = fs.readFileSync('./main.wasm')

  return new Promise(resolve => {
    WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
      const instance = wasmModule.instance.exports

      window.q = instance.encode
      window.m = function () {
        const t1 = parseInt(Date.parse(new Date()) / 1000 / 2)
        const t2 = parseInt(Date.parse(new Date()) / 1000 / 2 - Math.floor(Math.random() * 50 + 1))
        return window.q(t1, t2).toString() + '|' + t1 + '|' + t2
      }

      resolve(window.m())
    })
  })
}
