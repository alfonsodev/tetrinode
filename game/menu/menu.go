package "menu"

var Menu  struct {
  selected int
  options  Menuoptions
  display Display
}

func init() {
  display.startListeningKeyEvents()
  display.on('keydown', this.moveCursor.bind(this))
}

func(m *Menu) show() {
  display.menu(m.options, selected, 0, 0)
}

func (m *Menu)moveCursor(key int, num int) {
  if key == 'down' && m.selected < m.options.length - 1 {
    m.selected++
  } else if key == 'up' && m.selected > 0) {
    m.selected--
  } else if key == 'return' {
    m.emit('selection', this.options[this.selected])
  }
  m.show()
}

