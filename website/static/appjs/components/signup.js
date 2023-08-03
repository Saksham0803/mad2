
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

  const Signup = Vue.component('Signup', {
    data() {
      return {
        name: '',
        email: '',
        password1: '',
        password2: '',
        alertMessage: null,
        alertClass: null,
        user: {
          isAuthenticated: false,
        }
      };
    },
    methods: {
      register() {
        if (this.password1 !== this.password2) {
          this.alertMessage = 'Passwords do not match';
          this.alertClass = 'alert-danger';
        } else {
          axios.post('/api/sign_up', {
            name: this.name,
            email: this.email,
            password: this.password1
          })
          .then(response => {
            this.alertMessage = 'Success!!!'
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.user.isAuthenticated = true;
            this.$router.push('/');
          })
          .catch(error => {
            this.alertMessage = 'Registration failed';
            this.alertClass = 'alert-danger';
          });
        }
      },
    },
    template: `
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Ticker</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
          <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item">
            <router-link to="/home" class="nav-link active"> Home</router-link> </p>
            </li> -->
            <li class="nav-item" v-if="user.isAuthenticated">
              <!-- content omitted for brevity -->
            </li>
            <li class="nav-item" v-else>
            <router-link to="/" class="nav-link active"> Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="alertMessage" class="alert" :class="alertClass" role="alert">
      {{ alertMessage }}
      <button type="button" class="btn-close" @click="alertMessage = null"></button>
    </div>
    <div class="container mt-5">
      <h3 class="text-center">Register</h3>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="register">
            <!-- form fields -->
            <div class="mb-3">
  <label class="form-label">Name</label>
  <input type="name" class="form-control" name="name" minlength="3" v-model="name">
</div>
<div class="mb-3">
<label class="form-label">Email address</label>
<input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" v-model="email">
</div>
<div class="mb-3">
<label for="password1" class="form-label">Password</label>
<input type="password" class="form-control" id="password1" name="password1" minlength="6" placeholder="Minimum 6 Characters" v-model="password1">
</div>
<div class="mb-3">
<input type="password" class="form-control" id="password2" name="password2" minlength="6" placeholder="Confirm password" v-model="password2">
</div>
          <p>Already registered? <router-link to="/"> Login</router-link> </p> </p>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
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
  
  export default Signup