// const UpdateMovies = Vue.component('UpdateMovies', {
//     data() {
//         return {
//             movie: {},
//             messages: [],
//         };
//     },
//     created() {
//         this.fetchMovie();
//     },
//     methods: {
//         fetchMovie() {
//             axios.get(`/api/movies/${this.$route.params.id}`)
//                 .then(response => {
//                     this.movie = response.data.movie;
//                     this.messages = response.data.messages;
//                 });
//         },
//         updateMovie() {
//             let formData = new FormData();
//             formData.append('title', this.movie.title);
//             formData.append('Genre', this.movie.Genre);
//             formData.append('rating', this.movie.rating);
//             formData.append('poster', this.movie.poster);

//             axios.post(`/api/update_movies/${this.movie.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             }).then(response => {
//                 this.messages.push(response.data.message);
//             });
//         }
//     },
//     template: `
//         <div>
//             <navbar-component :user="user" @logout="logout"></navbar-component>
//             <alert-component :messages="messages"></alert-component>
            
//             <div class="container">
//                 <form @submit.prevent="updateMovie">
//                     <div>
//                         <label>Title</label>
//                         <input v-model="movie.title" required>
//                     </div>
//                     <div>
//                         <label>Genre</label>
//                         <input v-model="movie.Genre" required>
//                     </div>
//                     <div>
//                         <label>Rating (out of 5)</label>
//                         <input v-model="movie.rating" min="0" max="5" step="0.01" required>
//                     </div>
//                     <div>
//                         <label>Poster</label>
//                         <input type="file" @change="onFileChange">
//                     </div>
//                     <button type="submit">Update</button>
//                 </form>
//             </div>
//         </div>
//     `,
//     components: {
//         'navbar-component': NavbarComponent,
//         'alert-component': AlertComponent
//     }
// });

// export default UpdateMovies

import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const UpdateMovie = Vue.component('UpdateMovie', {
    data() {
        return {
            user: {
                isAuthenticated: false,
                isAdmin: false,
                name: '',
            },
            movie: {
                title: '',
                rating: '',
                genre: '',
                poster: null
            },
            is_ad: false,
            movies:{},
            messages: [],
        }
    },
   
    methods: {
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.movie.poster = e.target.result;
        };
        reader.readAsDataURL(file);
      },
        updateMovie() {
          const id = this.$route.params.id;
          // console.log(id);
      axios.put(`/update_movies/${id}`, this.movie, { headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
         })
        .then(response => {
          this.$router.push(`/movies`);
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
        //     let rating = parseFloat(this.movie.rating);
        //     if (isNaN(rating)) {
        //         rating = 0; // or another default value
        //     }
        //     const movie = { ...this.movie, rating };
        //     axios.put('/update_movies/' + this.movie.id, this.movie, { headers: {
        //         'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        //     }
        // })
        //     .then(response => {
        //         this.$router.push('/movies');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        
        },
        submitForm() {
            this.updateMovie();
        },
        // handleFileSelect(event) {
        //     const file = event.target.files[0];
        //     const reader = new FileReader();
    
        //     reader.onload = (e) => {
        //         this.movie.poster = e.target.result;
        //     };
    
        //     reader.readAsDataURL(file);
        // },
        fetchData() {
          const id = this.$route.params.id;
          // console.log(id);
            axios.get('/api/my_movie/' + id,{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
                .then(response => {
                    this.movies = response.data.movies;

                    console.log(this.movies)
                this.movie = this.movies;
                    this.messages = response.data.messages;
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        },
    },
    created() {
      const id = this.$route.params.id;
      axios.get(`/movies`,{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
        .then(response => {
          this.movie = response.data;
          // console.log(this.movie)
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    },
    mounted() {
        axios.get('/api/check_admin',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
      .then(response => {
          this.is_ad = response.data.is_admin
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
      this.fetchData();
    },
    template: `
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif;color:rgb(192, 25, 192)" to="/home">Ticker</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
          <ul class="navbar-nav navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" v-if="is_ad" to="/movies">Movies</router-link>
            </li>
            <li class="nav-item dropdown" >  <!-- v-if="user.is_authenticated" -->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <!-- Use v-if to conditionally render elements -->
              <span v-if="is_ad">Admin</span>
              <span v-else>User</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="nav-link" to="/">Logout</router-link></li>
            </ul>
          </li>
          </ul>
        </div>
      </div>
    </nav>
    <h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Update Movie</h3>

    <div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:10px;padding-bottom:70px">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input type="text" class="form-control" placeholder="Title of movie" v-model="movie.title" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Rating</label>
          <input type="number" class="form-control" min=0 max=5 placeholder="Rating of movie" v-model="movie.rating" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Genre</label>
          <input type="text" class="form-control" placeholder="Genre of movie" v-model="movie.genre" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Poster</label>
          <input type="file" class="form-control" accept="image/*" @change="onFileChange">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
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
    `
});

export default UpdateMovie