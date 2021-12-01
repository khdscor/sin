import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Event from './components/event/Event';
import Shoppinglist from './components/Shoppinglist';
import Item from './components/Item';
import Signup from './components/login/Signup';
import Login from './components/login/Login';
import Mypage from './components/Mypage';
import Notice from './components/notice/Notice';
import Footer from './components/Footer';
import Noticepage from './components/notice/Noticepage';
import NonProductEvent from "./components/event/NonProductEvent";
import ProductList from "./components/products/ProductList";
import PopupPostCode from "./components/login/address/PopupPostCode";

const GlobalStyle = createGlobalStyle`
* {padding: 0; margin: 0;}
a {text-decoration: none; color: black;}

.clearfix{*zoom:1;}
.clearfix:before, .clearfix:after {display: block; content: '';line-height: 0;}
.clearfix:after {clear: both;}

ul,li,ol {list-style:none;}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.swiper-container {
  width: 1440px;
}

`

function App() {
  return (
    <>
    <GlobalStyle />
      <Route path='/' exact component={Home} />
    <Route path='/shop/main/index' exact component={Home} />
    <Route path='/shop/main/event' exact component={NonProductEvent} />
    <Route path='/shop/goods/event' exact component={Event} />
    <Route path='/shop/goods/goods_cart' exact component={Shoppinglist} />
    <Route path='/shop/goods/goods_list' exact component={ProductList} />
    <Route path='/shop/goods/goods_view' exact component={Item} />
    <Route path='/shop/member/join' exact component={Signup} />
    <Route path='/shop/member/login' exact component={Login} />
    <Route path='/shop/mypage/:mypageparams' component={Mypage} />
    <Route path='/shop/board/list' exact component={Notice} />
    <Route path='/shop/service/faq' exact component={Notice} />
    <Route path='/shop/board/view' exact component={Noticepage} />
    <Route path='/shop/address' exact component={PopupPostCode} />
    </>
  );
}

export default App;
