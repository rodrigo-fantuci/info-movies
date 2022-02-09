const imgPath = 'https://image.tmdb.org/t/p/w1280'
const mainPage = document.getElementById('movie-info')

getData()

async function getData() {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=e7063b0b3862abb221912557713e4474&language=pt-BR&sort_by=popularity.desc&include_adult=true&include_video=true&page=1'
  const res = await fetch(url)
  const data = await res.json()
  createMovieInfo(data.results)
}

function createMovieInfo(data) {
  const movieIdx = localStorage.getItem("index")
  const movie = data[movieIdx]

  const { title, overview, poster_path, backdrop_path, release_date, genre_ids, vote_average } = movie

  mainPage.innerHTML = `
    <div class="banner">
      <img src="${imgPath + backdrop_path}">
      <div class="title">
        <h3>${title}</h3>
      </div>
    </div>
    <div class="infos">
      <img src="${imgPath + movie.poster_path}">
      <div class="infos-movie">
        <p>${overview ? overview : "Resumo não encontrado."}</p>

        <div class="rating">
          <img src="assets/svg/star.svg" id="star">
          ${vote_average}
        </div>

        <div class="info">
          <h5>Release Date</h5>
          <h4>${release_date}</h4>
        </div>

        <div class="info">
          <h5>Genres</h5>
          <h4>${genre_ids}</h4>
        </div>
      </div>
    </div>
  `

}