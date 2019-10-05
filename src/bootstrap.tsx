import { h, render } from 'preact'
import { App } from './app'

let g = document.createElement('div')
g.setAttribute('id', 'app')
let body = document.getElementsByTagName('body')
body[0].appendChild(g)

render(<App />, document.getElementById('app'))
