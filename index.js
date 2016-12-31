var mount = require('choo/mount')
var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')
var olivaw = require('olivaw')()

css('tachyons')
var style = css('./index.css')

var app = choo()

app.model({
  state: {
    generation: "generation",
    year: [],
    cell: null 
  },
  reducers: {
    run: function (state, data) {
      return { generation: data}
    }
  },
  effects: {
    automata: function (state, data, send, done) {
      var automaton = olivaw.set(101, data)
      var automata = olivaw.run(20, automaton)
      
      send('run', automata, function(err, val) {
        if (err) return done(err)
        done(null, val)
      })
    }
  }
})

function mainView (state, prev, send) {
  var inputBoxClass = 'input-reset ba b--black-20 pa2 mb2 db w-50'

  return html`
    <body>
      <main class="pa4">
        <div class=${style}>
          <form class="black-80" onsubmit=${runAutomata}>
            <div class="measure">
              <label for="rule" class="f6 b db mb2">Rule</label>
              <input id="rule" class=${inputBoxClass} type="text">
              <small id="rule-desc" class="f6 black-60 db mb2">A rule number between 0 to 256.</small>
              <input type="submit" class="dn">
            </div>
          </form>
          <div class="generation">${getGeneration(state, prev, send)}</div>
        </div>
      </main>
    </body>
  `
  function runAutomata (e) {
    e.preventDefault()
    send('automata', e.target[0].value)
  }
}

function getGeneration (state, prev, send) {
  if (!Array.isArray(state.generation)) return
  state.generation.forEach(function (year) {
    console.log(year)
    getYear(year)
  })
}

function getYear (year) {
  return html`<div class="year">${getCell(year)}</div>`
}

function getCell (year) {
  return html`<div class=${year.state}></div>`
}

app.router(['/', mainView])
mount('body', app.start())
