const ShowTickets = Vue.component('ShowTickets', {
    data() {
        return {
            user: {}, // replace this with actual user data
            tickets: [],
            show: {},
            ticket_count: 0,
            messages: []  // replace this with actual messages
        };
    },
    created() {
        this.fetchTickets();
    },
    methods: {
        fetchTickets() {
            axios.get('/api/show_tickets/' + this.id)
                .then(response => {
                    this.tickets = response.data.tickets;
                    this.show = response.data.show;
                    this.ticket_count = response.data.ticket_count;
                });
        },
    },
    template: `
        <div>
            <!-- Put your HTML code here -->
            <!-- Remember to replace Flask template syntax with Vue.js template syntax -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <!-- ... -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{ user.is_admin ? user.name + ', Admin' : user.name }}
                    </a>
                    <!-- ... -->
                </li>
                <!-- ... -->
            </nav>
            <div v-for="(category, message) in messages" :key="message" class="alert" :class="'alert-' + category" role="alert">
                {{ message }}
                <!-- ... -->
            </div>
            <div class="container-fluid align-self-center">
                <!-- ... -->
                <div class="card" v-for="ticket in tickets" :key="ticket.id" style="margin-right:24px">
                    <!-- ... -->
                </div>
                <!-- ... -->
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

export default ShowTickets