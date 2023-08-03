import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';


const MyTickets = Vue.component('MyTickets', {
    data() {
        return {
            user_id:'',
            user: {}, // replace this with actual user data
            tickets: [],
            messages: []  // replace this with actual messages
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        fetchUser(){
            axios.get('/user_id')
                .then(response => {
                    this.user_id = response.data.user;
                    console.log(this.user_id);
                    this.fetchTickets();
                });
        },
        fetchTickets() {
            axios.get('/api/my_tickets/' + this.user_id)
                .then(response => {
                    this.tickets = response.data.tickets;
                    console.log(this.tickets)
                });

        },
    },
    template: `
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif" to="/">Ticker</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
            <ul class="navbar-nav navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/user_home">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/my_tickets">My Tickets</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ 'User' }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><router-link class="nav-link" to="/">Logout</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container-fluid align-self-center">
        <br/>
        <p><strong>My Tickets</strong></p> 
        <hr/>
        <div class="container pt-4 pb-4">
          <div class="row row-cols-auto">
          <div class="card" style="margin-right:24px" v-for="ticket in tickets" :key="ticket.id">
          <div class="card-body">
              <p class="card-text">ID <strong>{{ ticket.id }}</strong></p>
              <h5 class="card-title"><div class="fw-bold">{{ ticket.movie_name }}</div></h5>
              <p class="card-text">{{ ticket.t }}</p>
              <hr/>
              <p class="card-text">No. seats <strong>{{ ticket.total_seats }}</strong></p>
              <hr/>
              Total Cost <div class="fw-bold">{{ ticket.cost }} Rs</div>
          </div>
      </div>
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

export default MyTickets