const movies = document.querySelector('.movies')
const navBtn = document.getElementById('hamburger')
const navUl = document.getElementById('nav-ul')
const body = document.querySelector('body')

const imgPath = 'https://image.tmdb.org/t/p/w1280'

navBtn.addEventListener('click', () => navUl.classList.toggle('show'))

getData()
highlightInput()

async function getData() {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=e7063b0b3862abb221912557713e4474&language=pt-BR&sort_by=popularity.desc&include_adult=true&include_video=true&page=1'
  const res = await fetch(url)
  const data = await res.json()
  createMovieCard(data.results)
}

async function createMovieCard(data) {
  const titleCount = 40

  data.forEach((movie, idx) => {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')

    const { adult, backdrop_path, genre_ids, overview, poster_path, release_date, title, vote_average } = movie

    movieCard.innerHTML = `
      <div class="rating">
        <img src="assets/svg/star.svg">
        ${vote_average}
      </div>
      <div class="image"><img src="${imgPath + poster_path}"></div>
      <h4>${title.length > titleCount ? title.slice(0, titleCount) + '...' : title}</h4>
    `

    movieCard.addEventListener('click', () => {
      if (body.id === 'main-page') {
        body.id = 'movie-page'
        createInfoPage(idx)
      }
    })
    movies.appendChild(movieCard)
  })
}

function createInfoPage(index) {

  localStorage.setItem('index', JSON.stringify(index))
  open('movie.html', '_self')

  const main = document.getElementById('main-page')
  main.classList.add('movie-info')

  main.innerHTML = `
    <div class="banner">
      <img src="${imgPath + movie.backdrop_path}">
      <div class="title">
        <h3>${movie.title}</h3>
      </div>
    </div>
    <div class="infos">
      <img src="${imgPath + movie.poster_path}">
      <div class="infos-movie">
        <p>${movie.overview}</p>

        <div class="rating">
          <img src="assets/svg/star.svg" id="star">
          ${movie.vote_average}
        </div>

        <div class="info">
          <h5>Release Date</h5>
          <h4>${movie.release_date}</h4>
        </div>

        <div class="info">
          <h5>Genres</h5>
          <h4>${movie.genre_ids}</h4>
        </div>
      </div>
    </div>
  `

  const backMainBtn = document.getElementById('back-main')
  backMainBtn.addEventListener('click', () => {
    body.id = 'main-page'
    createMovieCard()
  })
}

function highlightInput() {
  const input = document.getElementById('input')
  const inputArea = document.querySelector('.input-area')

  window.addEventListener('click', () => {
    if (input === document.activeElement) {
      inputArea.classList.add('active')
    } else {
      inputArea.classList.remove('active')
    }
})
}

