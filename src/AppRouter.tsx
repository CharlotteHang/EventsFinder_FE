import  React  from  'react'
import { BrowserRouter, Route} from  "react-router-dom";
import  WelcomePage  from  './WelcomePage/App'
import {EventsPage} from "./Nearby/EventsPage";
import {LoginPage} from "./Nearby/LoginPage";
import { getTransactions, getAccounts, getCategories, getLocation, getEventsByLocation, getRecommendations, getFavouriteItems, setFavouriteItems } from "./API/API";

const  AppRouter = () => (
    <BrowserRouter>
            <Route path="/NearbyEvents" exact component={()=>EventsPage(getEventsByLocation, false, true)} />
            <Route path="/RecommendedEvents" component={()=>EventsPage(getRecommendations, false, false)} />
            <Route path="/FavoriteEvents" component={()=>EventsPage(getFavouriteItems, true, false)} />
            <Route path="/Login" component={()=>LoginPage(true)} />
            <Route path="/Signup" component={()=>LoginPage(false)} />
    </BrowserRouter>
);

export  default  AppRouter;