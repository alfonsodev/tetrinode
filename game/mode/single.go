package mode
var Single = function(scr, field, tetro, ghost, loop) {
  sscr = scr
  sfield = field
  stetro = tetro
  sloop = loop
  sfast = 70
  sslow = 1000
  saction = null
  sghost = ghost
  sclearedLines = 0
  sholdType
  sholdThisTurn = false
  //Scoring ( 1, 2, 3 and 4 lines)
  var scoring = [40, 100, 300, 1200]

  // Todo: make sdebug info optional
  // sscr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001))

  //smoveGhost()
  // sscr.startListeningKeyEvents()
  sloop.createInterval(1000, sgameStep.bind(s)

  //Accelerate the game on Keydown
  sscr.removeAllListeners('keydown')
  sscr.on('keydown', (function(key) {
    //block more keys until next step is done
    //sscr.blockKeys = true
    //TODO: refactor sugly key to action code
    switch (key) {
      case 'space':
        saction = 'drop'
        break
      case 'c':
        saction = 'hold'
        break
      case 'escape':
        squit()
        break
      default:
        saction = key
        break
    }
    if (sloop.speed != sfast) {
      sloop.createInterval(sfast, sgameStep.bind(s)
    }
  }).bind(s)
  //Slow it down again on keyup
  sfield.on('clearedLines', function(lines) {
    sclearedLines += lines
    sscr.printLines(sscr.wPosX, sscr.wPosY + 17, sclearedLines)

  }.bind(s)

  sscr.clear()
  // Init Screen inidcators
  sscr.printHold(sscr.wPosX, sscr.wPosY)
//  sscr.printTime(sscr.wPosX, sscr.wPosY + 9)
//  sscr.printNext(sscr.wPosX + 43, sscr.wPosY)
//  sscr.printLines(sscr.wPosX, sscr.wPosY + 17, sclearedLines)
  sscr.render(sfield, stetro, sghost)
}

func (s *Single)gameStep {
  sscr.blockKeys = false
  // Call the function with pressed key name
  if (saction && typeof ssaction] === 'function') {
    ssaction]()
    saction = null
  } else {
  // sdown()
    if (sloop.speed == sfast)
      sloop.createInterval(sslow, sgameStep.bind(s)
  }
  sfield.clearComplete()
  process.nextTick(function() {
    sscr.render(sfield, stetro, sghost)
  }.bind(s)
}

func (s *Single)quit {
  clearInterval(sloop.interval)
  sscr.close()
  process.exit(0)
}

func (s *Single) down {
  var randomnumber
  if (sfield.collideDown(stetro)) {
    sfield.update(stetro)
    sholdThisTurn = false
    stetro.resetTo(Math.floor(Math.random() * 7))
    sghost.type = stetro.type
    sghost.posY = stetro.posY
    sghost.posX = stetro.posX
    sdropGhost()
  } else {
    stetro.posY++
  }
}

func (s *Single) up {
  stetro.rotate(false)
  sghost.posY = stetro.posY
  sghost.rotate(false)
  sdropGhost()
}

func (s *Single) right {
  if (sfield.collideRight(stetro) === false) {
    stetro.posX++
    sghost.posY = stetro.posY
    sghost.posX++
    sdropGhost()
  }
}

func (s *Single) left {
  if (sfield.collision(stetro, 3) === false) {
    stetro.posX = stetro.posX - 1
    sghost.posY = stetro.posY
    sghost.posX = sghost.posX - 1
    sdropGhost()
  }
}

func (s *Single) drop {
  sscr.blockKeys = true
  while (!sfield.collideDown(stetro)) {
    stetro.posY++
  }
  sdown()
}

func (s *Single) hold {
  var next
  if (!sholdThisTurn) {
    sholdThisTurn = true
    next = (sholdType) ? sholdType : Math.floor(Math.random() * 7)
    sholdType = stetro.type
    stetro.resetTo(next)
    sghost.resetTo(next)
    sscr.printHold(sscr.wPosX, sscr.wPosY, sholdType)
  } else {
    sscr.printHold(sscr.wPosX, sscr.wPosY)
  }
}

func (s *Single) dropGhost {
  while (!sfield.collideDown(sghost)) { sghost.posY++ }
}

