document.addEventListener('DOMContentLoaded', () => {
  const URL = 'https://pokeapi.co/api/v2/pokemon/'
  const pokemons = fetch(URL)
  .then(result=> result.json())
  .then(json=> json.results)
  .then(POKEMON=> { pokeGo(POKEMON)})


  function pokeGo(POKEMON) {

    //-----> display all pokemon in pokemon container
    const pokeContain = document.querySelector('#pokemon-container')
    POKEMON.forEach(pokemon => {

      // create DOM elements
      let div = document.createElement('div')
      let cardFront = document.createElement('div')
      let imgFront = document.createElement('img')
      let name = pokemon.name

      // adding classes to each card
      div.setAttribute('id', 'pokemon-card')
      cardFront.setAttribute('class', 'front')

      // add cards to DOM
      cardFront.innerHTML = name
      div.appendChild(cardFront)
      pokeContain.appendChild(div)

      //------> fetch each pokemon's details
      fetch(pokemon.url)
      .then(result=> result.json())
      .then(poke=> {
        imgFront.setAttribute('src', poke.sprites.front_default)
        div.appendChild(imgFront)

        // if (imgFront.src === "null") {
        //   debugger
        //   div.remove()
        // } else {

          // flip card over when mouse hovers over card
          div.addEventListener('click', function(event) {
            if (imgFront.src === poke.sprites.front_default) {
              imgFront.src = poke.sprites.back_default
              cardFront.innerText = "My Abilities:" + "\n"
              let i = 1
              poke.abilities.map(arr => {
                cardFront.innerText += `${i}. ${arr.ability.name} \n`
                i++
              })
              cardFront.style.fontSize = '1em'

            } else {
              imgFront.src = poke.sprites.front_default
              cardFront.innerText = name
              cardFront.style.color = 'grey'
              cardFront.style.fontSize = '1.5em'
              imgFront.style.filter = 'grayscale(100%)'
            }
          })
        // }
      }) // end of each pokemon's url fetch

      //------> search pokemon library per letter when typed in input field
      const input = document.querySelector('input')
      let filter = ""
      input.addEventListener('keydown', function(e) {
        let keyCode = e.keyCode

        // if input is backspace
        if (keyCode === 8) {
          filter = filter.slice(0, filter.length-1)
            if (name.includes(filter)) {
              pokeContain.appendChild(div)
            } else {
              div.remove()
            }
        // if input is an alphabet letter
        } else if (keyCode > 64 && keyCode < 91 || keyCode > 96 && keyCode < 123) {
          filter += e.key
            if (name.includes(filter)) {
              pokeContain.appendChild(div)
            } else {
              div.remove()
            }
        // if filter is empty
        } else if (filter = "") {
          pokeContain.appendChild(div)
        // if input is anything else
        } else {
          pokeContain.appendChild(div)
        }

      }) // end of input addEventListener

    }) // end of POKEMON.forEach

  } // end of pokeGo(POKEMON)

}) // end of addEventListener DOMContentLoaded
