import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const UserHome = Vue.component('UserHome', {
  template: `
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Similar navbar code as before -->
    <div class="container-fluid">
      <router-link to="/user_home" class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif">Ticker</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="search-bar">
  <i class="fa-solid fa-magnifying-glass"></i>
  <input type="search" placeholder="Search for anything" v-model="searchQuery">
  <button @click="search">Search</button>
</div>
<div class="select">
  <select class="form-select" v-model="option">
    <option value="Movie Name">Movie Name</option>
    <option value="rating greater than">rating greater than</option>
    <option value="rating less or equal to">rating less or equal to</option>
    <option value="Genre">Genre</option>
  </select>
</div>

      <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
        <ul class="navbar-nav navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/user_home" class="nav-link active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item" >   <!-- v-if="user.isAuthenticated" -->
            <!-- <div v-if="user.isAdmin">
              <router-link to="/my_theaters" class="nav-link">Theater</router-link>
              <router-link to="/movies" class="nav-link">Movies</router-link>
            </div> -->
            <div>
              <router-link to="/my_ticket" class="nav-link">My Tickets</router-link>
            </div>
          </li>
          <li class="nav-item dropdown" >  <!-- v-if="user.isAuthenticated"  -->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ 'User' }}
            </a> 
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/" class="nav-link">Logout</router-link></li>
            </ul>
          </li>
         <!-- <li class="nav-item justify-content-end" v-else>
            <router-link to="/" class="nav-link">Login</router-link>
          </li>  -->
        </ul>
      </div>
    </div>
    </nav>
    <div class="banner">
      <img src="../static/banner.png" alt="banner">
    </div>
    <div class="cards-list">
      <div v-if="movies.length > 0" v-for="movie in movies" :key="movie.id" class="card">
        <!-- Similar movie card code as before -->
        <div class="card_image">
        <img :src="'static/' + movie.title+'.jpg'">
        </div>
        <router-link :to="'/select_theaters/' + movie.id" class="link-dark">
          <div class="card_title" style="padding-bottom:10px">
            <p>{{ movie.title }}</p>
          </div>
          <div class="card_title">
            rating - {{ movie.rating }}
          </div>
          <div class="card_title">
            Genre - {{ movie.genre }}
          </div>
          </router-link>
      </div>
      <h2 v-else>No Movies Yet</h2>
    </div>
    <footer class="footer">
  <div class="footer__addr">
    <h1 class="footer__logo"><h2 class="logo-text"><img class="logo footer_logo" src="../static/logo.png">Ticker</h2></h1>
  </div>

  <ul class="footer__nav">
    <li class="nav__item">
      <h2 class="nav__title"><i class="fa-solid fa-phone"></i>  Call 24x7</h2>

      <ul class="nav__ul">
        <li><a>+91 9549994869</a></li>
        <li><a>+91 9909909909</a></li>
        <li><a>+91 9054005109</a></li>
      </ul>
    </li>

    <li class="nav_item footer-address nav_item--extra">
      <h2 class="nav__title"><i class="fa-solid fa-envelope"></i> Post</h2>
      <p class="nav__ul">Rohini ,<br> Delhi-110011 ,<br> India</p>
    </li>

    <li class="nav__item">
      <h2 class="nav__title">Legal</h2>

      <ul class="nav__ul">
        <li>
        Privacy Policy
        </li>

        <li>
          Terms And Conditions
        </li>

        <li>
            Site
        </li>
      </ul>
    </li>
  </ul>

  <div class="legal">
    <p>&copy; 2019  All rights reserved.</p>
  </div>
</footer>
  </div>
  `,
  data: function() {
    return {
      searchQuery: '',
      option: 'Movie Name',
      user_id:'',
      movies: {},
    };
  },
  methods: {
    search: function() {
      console.log('Search method called');
      axios.post('/api/search', {
        searching: this.searchQuery,
        options: this.option
      },{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
      .then(response => {
        console.log(response.data);
        this.movies = response.data.movies
        // update your component's data with the response...
      })
      .catch(error => {
        console.error('API request error:', error);
      });
    },
    fetchMovies: function() {
      axios.get('movies_user')
        .then(response => {
          // console.log(response.data);
          this.movies = response.data.movies;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchUser(){
      axios.get('/user_id')
          .then(response => {
              this.user_id = response.data.user;
              console.log(this.user_id);
          });
  },
},
  created: function() {
    this.fetchMovies();
    this.fetchUser()
  },
});

export default UserHome
