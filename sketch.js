let centerRhomb
let rhombs = []
let colors = []
let userColors = [[255, 255, 255]]
let index = 0
let isPlaying = true
let colorScheme
let options

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  rectMode(CENTER)

  options = {
    shapeD: 'rect',
    rotation: false,
    centerShapeColor: [24, 10, 28],
    useDefaultColors: true,
    spawnRate: 60,
    expandSpeed: 4,
    startingAngle: PI / 4,
    rotationSpeed: 0.01,
    outerWidth: 150,
    innerWidth: 30,
    borders: false,
    randomColors: false,
    expandInnerRhomb: false,
    addColor: () => {
      options[`color${index}`] = [255, 255, 255]
      colorScheme.addColor(options, `color${index}`)
      index++
    },
    stop: () => {
      noLoop()
    },
    reset: () => {
      options.shapeD = 'rect'
      options.rotation = false
      options.centerShapeColor = [24, 10, 28]
      options.useDefaultColors = true
      options.spawnRate = 60
      options.expandSpeed = 4
      options.startingAngle = PI / 4
      options.rotationSpeed = 0.01
      options.outerWidth = 150
      options.innerWidth = 30
      options.borders = false
      options.randomColors = false
      options.expandInnerRhomb = false
      rhombs = []
      index = 0
      loop()
    },
  }
  colors = [
    color(24, 10, 28),
    color(253, 47, 45),
    color(251, 212, 45),
    color(251, 162, 43),
    color(121, 191, 56),
    color(152, 194, 62),
    color(2, 183, 179),
    color(255, 0, 111),
    color(247, 245, 247),
    color(51, 49, 53),
    color(207, 213, 219),
  ]

  let gui = new dat.GUI()
  let shapeFolder = gui.addFolder('Visual')
  shapeFolder
    .add(options, 'shapeD', ['rect', 'ellipse'])
    .setValue('rect')
    .onChange((value) => {
      rhombs = []
    })
  shapeFolder.addColor(options, 'centerShapeColor')

  colorScheme = gui.addFolder('Color schemes')
  colorScheme.add(options, 'useDefaultColors', true, false)
  colorScheme.add(options, 'addColor')

  let shapeOptions = gui.addFolder('Shape options')
  shapeOptions.add(options, 'startingAngle', 0, PI / 4).setValue(PI / 4)
  shapeOptions.add(options, 'rotation', true, false)
  shapeOptions.add(options, 'spawnRate', 30, 180)
  shapeOptions.add(options, 'expandSpeed', 1, 10)
  shapeOptions.add(options, 'rotationSpeed', 0.01, 0.05)
  shapeOptions
    .add(options, 'outerWidth', 50, 200)
    .setValue(150)
    .onChange(() => {
      rhombs = []
    })
  shapeOptions.add(options, 'innerWidth', 30, 100)
  shapeOptions.add(options, 'expandInnerRhomb', true, false)
  shapeOptions.add(options, 'borders', true, false)
  shapeOptions.add(options, 'randomColors', true, false)

  let guiOptions = gui.addFolder('Options')
  guiOptions.add(options, 'stop')
  guiOptions.add(options, 'reset')
}

function draw() {
  if (index > 0 && !options.useDefaultColors) {
    userColors = []
    for (let i = 0; i < index; i++) {
      userColors.push(color(options[`color${i}`]))
    }
  }
  init()
}

function init() {
  background(0)
  centerRhomb = new Rhomb({
    x: 0,
    y: 0,
    w: options.outerWidth,
    color: options.centerShapeColor,
    shape: options.shapeD,
  })
  centerRhomb.createInnerRhomb(options.centerShapeColor)
  centerRhomb.show()
  for (const rhomb of rhombs) {
    rhomb.show()
    rhomb.expand()
    if (options.rotation) rhomb.rotate()
    if (options.expandInnerRhomb) rhomb.expandInnerRhomb()
  }
  centerRhomb.show()
  if (frameCount % int(options.spawnRate) == 0 && isPlaying) {
    let newRhomb = new Rhomb({
      x: 0,
      y: 0,
      w: options.outerWidth,
      color: options.randomColors
        ? color(random(255), random(255), random(255))
        : random(!options.useDefaultColors ? userColors : colors),
    })
    newRhomb.createInnerRhomb(
      options.randomColors
        ? color(random(255), random(255), random(255))
        : random(!options.useDefaultColors ? userColors : colors)
    )
    rhombs.push(newRhomb)
  }
  for (let i = rhombs.length - 1; i >= 0; i--) {
    if (rhombs[i].outOfBound()) {
      rhombs.splice(i, 1)
    }
  }
}
