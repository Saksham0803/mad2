import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const Login = Vue.component('Login', {
    template : `

<div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif" href="/">Ticker</a>
    <!-- ... other nav items ... -->
    <ul class="navbar-nav navbar-nav mr-auto">
    <!--  <li class="nav-item">
        <router-link class="nav-link" to="/home">Home</router-link>
      </li>  -->
      <!-- ... other nav items ... -->
      <li class="nav-item">
        <router-link class="nav-link active" to="/sign_up">Register</router-link>
      </li>
    </ul>
  </div>
</nav>

<h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Login</h3>
<div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:20px;padding-bottom:130px">
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email" name="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" name="password">
    </div>
    <p>Are You Registered? <router-link to="/sign_up"> Register</router-link> </p>
    <button type="submit" class="btn btn-primary" >Login</button>
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
    `,
    data() {
        return {
            password: '',
            email: '',
            is_admin:''
        }
    },
    methods: {
        login() {
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.email,
                    password: this.password,
                })
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(username)
                    throw new Error("Invalid credentials");
                }
            })
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('is_admin', data.is_admin);
                console.log(data.access_token)
                if (data.is_admin) {
                  this.$router.push('/home');
                } else {
                  this.$router.push('/user_home');
                }
                
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Invalid credentials. Please try again.");
            })
        }
    }
})


export default Login