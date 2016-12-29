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
    generation: '' 
  },
  reducers: {
    run: function (state, data) {
      var automaton = olivaw.set(101, data)
      var automata = olivaw.run(200, automaton)
      var life = html`<div></div>`

      automata.forEach(function (year) {
        var yr = html`<div class="year"></div>` 

        year.forEach(function (cell) {
          var single = html`<div class=${cell.state}></div>`
          yr.appendChild(single)
        })

        life.appendChild(yr)
      })

      return { generation: life }

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
            <div class="measure"
              <label for="rule" class="f6 b db mb2">Rule</label>
              <input id="rule" class=${inputBoxClass} type="text">
              <small id="rule-desc" class="f6 black-60 db mb2">A rule number between 0 to 256.</small>
              <input type="submit" class="dn">
          </form>
          <div class="automata">${state.generation}</div>
        </div>
      </main>
    </body>
  `
  function runAutomata (e) {
    e.preventDefault()
    send('run', e.target[0].value)
  }
}

app.router(['/', mainView])
mount('body', app.start())
