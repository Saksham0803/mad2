import AddTheater from "./components/add_theater.js"
import AddMovies from "./components/add_movies.js"
import AddShow from "./components/add_shows.js"
import BookTickets from "./components/book_ticket.js"
// import DeleteMovies from "./components/delete_movies.js"
// import DeleteShows from "./components/delete_show.js"
// import DeleteTheaters from "./components/delete_theaters.js"
import Login from "./components/login.js"
import Movies from "./components/movies.js"
import MyTheaters from "./components/my_theater.js"
import MyTickets from "./components/my_tickets.js"
import SelectTheater from "./components/select_theaters.js"
// import ShowTickets from "./components/show_tickets.js"
import Signup from "./components/signup.js"
import UpdateShow from "./components/update_show.js"
import UpdateTheater from "./components/update_theatre.js"
import UpdateMovie from "./components/update_movies.js"
import Home from "./components/admin_home.js"
import UserHome  from "./components/user_home.js"
import UpdateMovies from "./components/update_movies.js"

// import Summary from "./components/summary.js"
// import AddTheater from "./components/add_theater"
// import UpdateVenue from "./components/updatevenue.js"
// import AddShow from "./components/addshow.js"
// import UpdateShow from "./components/updateshow.js"
// import AddMovies from "./components/add_movies.js"
// import UserHome from "./components/userhome.js"
// import MyBookings from "./components/bookings.js"
// import Search from "./components/search.js"
// import BookTicket from "./components/bookticket.js"
// import Login from "./components/login.js"
// import Signup from "./components/signup.js"
// import AdminLogin from "./components/adminlogin.js"
// import AdminSignup from "./components/adminsignup.js"


const routes = [
    // {
    //     path: "/admin",
    //     component: AdminHome,
    //     name: 'adminhome'
    // },
    // {
    //   path: "/adminlogin",
    //   component: AdminLogin,
    //   name: 'adminlogin'
    // },
    // {
    //   path: "/adminsignup",
    //   component: AdminSignup,
    //   name: 'adminsignup'
    // },
    {
      path: "/sign_up",
      component: Signup,
      name: 'signup'
    },
    // {
    //   path: "/home",
    //   component: Home,
    //   name: 'userhome'
    // },
    {
        path: "/home",
        component: Home,
        name: 'adminhome'
      },
      {
        path: "/user_home",
        component: UserHome,
        name: 'userhome'
      },
    {
        path: "/my_theaters",
        component: MyTheaters,
        name: 'MyTheaters'
    },
    {
        path: "/add_theaters",
        component: AddTheater,
        name: 'AddTheater'
    },
    {
        path: "/add_shows",
        component: AddShow,
        name: 'Add'
    },
    {
        path: "/movies",
        component: Movies,
        name: 'Movies'
    },
    {
        path: "/add_movies",
        component: AddMovies,
        name: 'AddMovies'
    },
    {
        path: "/update_theatre/:id",
        component: UpdateTheater,
        name: 'UpdateTheater',
        props: true
    },
    {
        path: "/update_show/:id",
        component: UpdateShow,
        name: 'UpdateShow',
        props: true
    },
    {
        path: "/update_movies/:id",
        component: UpdateMovie,
        name: 'UpdateMovie',
        props: true
    },
    {
        path: "/select_theaters/:id",
        component: SelectTheater,
        name: 'SelectTheater',
        props: true
    },
    {
        path: "/book_ticket/:id",
        component: BookTickets,
        name: 'BookTickets',
        props: true
    },
    {
        path: "/my_ticket",
        component: MyTickets,
        name: 'MyTickets',
        props: true
    },
    // {
    //     path: "/summary",
    //     component: Summary,
    // },
    // {
    //     path: "/newtheater",
    //     component: AddTheater,
    // },
    // {
    //     path: '/update-venue/:id',
    //     name: 'update-venue',
    //     component: UpdateVenue,
    //     props: true
    // },
    // {
    //     path: '/venues/:id/shows/new',
    //     name: 'add-show',
    //     component: AddShow,
    //     props: true
    // },
    // {
    //     path: '/shows/:id/edit',
    //     name: 'update-show',
    //     component: UpdateShow,
    //     props: true
    // },

    {
        path: "/",
        component: Login,
    },
    // {
    //     path: "/mybookings",
    //     component: MyBookings,
    // },
    // { 
    //     path: '/search',
    //     component: Search 
    // },
    // {
    //     path: '/book/:showId',
    //     name: 'book-ticket',
    //     component: BookTicket,
    //     props: true
    // }
]

const router = new VueRouter({
    routes
})

export default router;