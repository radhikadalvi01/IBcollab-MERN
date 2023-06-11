
import "./components/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login.jsx";
import BrandLogin from "./components/Brands/BrandLogin";
import InfluencerLogin from "./components/Influencers/InfluencerLogin";
import RegisterBrand from "./components/Brands/RegisterBrand";
import RegisterInfluencer from "./components/Influencers/RegisterInfluencer";
import BrandDashboard from "./components/Brands/BrandDashboard"
import InfluencerDashboard from "./components/Influencers/InfluencerDashboard"
import RegisterAdmin from "./components/Admin/RegisterAdmin";
import AdminLogin from "./components/Admin/AdminLogin"
import AdminDashboard from "./components/Admin/AdminDashboard"

import Home from './components/Home';
import AdminLogut from './components/Admin/AdminLogout';
import BrandLogut from './components/Brands/BrandLogout'
import InfluencerLogut from './components/Influencers/InfluencerLogout'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import InfluencerProfilePage from "./components/Influencers/InfluencerProfilePage";
import BrandProfilePage from "./components/Brands/BrandProfilePage";

import Test from './Test'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/" component={Home} />

          <Route exact path="/login" component={Login} />
          <Route path="/brand-login" component={BrandLogin} />
          <Route path="/brand-registration" component={RegisterBrand} />
          <Route path="/brand-dashboard" component={BrandDashboard} />
          <Route path="/brand-profile-page" component={BrandProfilePage} />
          <Route path="/brand-logout" component={BrandLogut} />


          <Route path="/influencer-login" component={InfluencerLogin} />
          <Route path="/influencer-registration" component={RegisterInfluencer} />
          <Route path="/influencer-dashboard" component={InfluencerDashboard} />
          <Route path="/influencer-profile-page" component={InfluencerProfilePage} />
          <Route path="/influencer-logout" component={InfluencerLogut} />



          <Route path="/admin-registration" component={RegisterAdmin} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/admin-logout" component={AdminLogut} />

          <Route path='/test' component={Test} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
