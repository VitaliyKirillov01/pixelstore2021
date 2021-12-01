import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen1';
import ProductScreen from './screens/ProductScreen1';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import AboutUs from './screens/AboutUs';
import Exeption from './screens/404';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
        </button>
            <Link to="/" >Pixel Store</Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3 style={{padding: "4px 10px"}}>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <Link to="/category/Smartphones">Smartphones</Link>
            </li>

            <li>
              <Link to="/category/Notebooks">Notebooks</Link>
            </li>

            <li>
              <Link to="/category/Desktops">Desktops</Link>
            </li>

            <li>
              <Link to="/category/Tablets">Tablets</Link>
            </li>

            <li>
              <Link to="/category/Watches">Watches</Link>
            </li>

            <h3 style={{padding: "4px 10px"}}>Other</h3>

            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>


          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/" exact={true} component={HomeScreen} />
            {/* <Route path='/404' component={Exeption} />
            <Redirect from='*' to='/404' /> */}
          </div>
        </main>
        <footer className="footer">
          Made by Vitaliy Kirillov
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
