import JSZip from 'jszip'
import { loadFromXMind, SnowbrushRenderer } from '../src/index'

if (typeof getVscodeEvent != 'undefined') {
  const vscodeEvent = getVscodeEvent();
  vscodeEvent.emit("init")
  vscodeEvent.on("open", value => {
    const jszip = new JSZip()
    jszip.loadAsync(new Uint8Array(value.data)).then(zip => {
      loadFromXMind(zip).then(result => {
        load(result.sheets)
      })
    })
  })
}

function load(data) {
  const container = document.getElementById('page-content')
  if (container.children.length > 0) {
    container.innerHTML = ''
  }

  const renderer = new SnowbrushRenderer(data)
  renderer.render()
  const rendererBounds = renderer.bounds

  const clientWidth = container.clientWidth
  const clientHeight = container.clientHeight
  const width = Math.max(clientWidth, rendererBounds.width)
  const height = Math.max(clientHeight, rendererBounds.height)

  const rendererContainer = document.createElement('div')
  rendererContainer.setAttribute('style', `width: ${width * 2}; height: ${height * 2}; position: relative;`)
  rendererContainer.className = 'sheet-container'
  renderer.svg.addTo(rendererContainer)
  rendererContainer.style.backgroundColor = renderer.svg.node.style.backgroundColor
  container.append(rendererContainer)

  // renderer.transform(width + rendererBounds.x, height + rendererBounds.y)
  container.scrollTo(width - clientWidth / 2, height - clientHeight / 2)
}