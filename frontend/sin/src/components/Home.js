import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Swiper, SwiperSlide} from "swiper/react";

import SwiperCore, {Navigation, Autoplay} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import mainBannerApi from "./api/home/MainBannerApi";
import Header from "./Header";
import cheapProductApi from "./api/home/CheapProductApi";
import mdChoiceApi from "./api/home/MDChoiceApi";
import todayRecommendationAPi from "./api/home/TodayRecommendationAPi";

SwiperCore.use([Navigation, Autoplay])

const Wrap = styled.div``
const ContainerSlide = styled.div`width: 1050px; margin: 30px auto;`
const Row = styled.div``

const SubTitle = styled.div`text-align:center; margin-top:100px; font-size:30px; font-weight:bold;`

const MdBlock = styled.div`
  margin: 0 auto;
  margin-bottom: -50px;
  width: 1000px;
  height: 100px;
  padding-left:300px;
 `;
const MdButton = styled.div`
  display: inline-block;
  margin: 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50px;
  font-size: 15px; 
  cursor: pointer;
`;
const Slide = styled.div`height: 300px; background: #999;`
const SectionSlide = styled.div`height: 440px;`

const Container = styled.div`
  position: relative;
  width: 240px;
  margin:11px;
  height: 400px;
  cursor: pointer;
`;
const ProductImg = styled.img`
  position: absolute;
  width: 240px;
  height: 300px;
`;

const ProductDetails = styled.div`
  position: absolute;
  top: 310px;
`;

const ProductName = styled.div`
  font-size: 18px;
`;

const ProductDiscountPercent = styled.div`
  display: inline-block;
  font-size: 15px;
  color: red;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  display: inline-block;
  font-size: 14px;
  margin-left:10px;
  font-weight: bold;
`;

const ProductPrevPrice = styled.div`
  color: gray;
  text-decoration:line-through
`;

const Home = (props) => {
  const [banners, setBanners] = useState(null)
  const [cheapProducts, setCheapProducts] = useState(null)
  const [mdChoices, setMdChoices] = useState(null)
  const [mdShow, setMdShow] = useState('910')
  const [choices, setChoices] = useState(null)
  const [recommendations, setRecommendations] = useState(null)

  useEffect(() => {
    cheapProductApi().then(productsPromise => {
      setCheapProducts(productsPromise)
    })
    mainBannerApi().then(bannersPromise => {
      setBanners(bannersPromise)
    })
    mdChoiceApi().then(productsPromise => {
      setMdChoices(productsPromise)
    })
    todayRecommendationAPi().then(productsPromise => {
      setRecommendations(productsPromise)
    })
  }, [])

  useEffect(() => {
      for (let choice in mdChoices) {
        if (choice === mdShow) {
          document.getElementById(choice).style.background = 'rgb(112,48,160)'
          document.getElementById(choice).style.color = 'white'
          setChoices(mdChoices[choice]);
        } else {
          document.getElementById(choice).style.background = 'rgb(242,242,242)'
          document.getElementById(choice).style.color = 'black'
        }
      }
  }, [mdShow, mdChoices])

  const bannerList = banners ? banners.map((banner) => {
    return <SwiperSlide><img style={{height: '300px', width: "1050px"}}
                             src={banner.imageUrl}/></SwiperSlide>;
  }) : "";

  const cheapProductList = cheapProducts ? cheapProducts.map((product) => {
    return <SwiperSlide><Container>
      <ProductImg src={product.imageUrl}/>
      <ProductDetails>
        <ProductName>{product.name}</ProductName>
        <ProductDiscountPercent>{product.discountPercent}%</ProductDiscountPercent>
        <ProductPrice>{Math.floor(product.price * (1 - product.discountPercent
            / 100))}원</ProductPrice>
        <ProductPrevPrice>{product.price}원</ProductPrevPrice>
      </ProductDetails>
    </Container></SwiperSlide>;
  }) : "";

  const recommendationList = recommendations ? recommendations.map(
      (product) => {
        return <SwiperSlide><Container>
          <ProductImg src={product.imageUrl}/>
          <ProductDetails>
            <ProductName>{product.name}</ProductName>
            <ProductDiscountPercent>{product.discountPercent}%</ProductDiscountPercent>
            <ProductPrice>{Math.floor(
                product.price * (1 - product.discountPercent
                    / 100))}원</ProductPrice>
            <ProductPrevPrice>{product.price}원</ProductPrevPrice>
          </ProductDetails>
        </Container></SwiperSlide>;
      }) : "";

  const mdChoiceList = choices ? choices.map(
      (product) => {
        return <SwiperSlide><Container>
          <ProductImg src={product.imageUrl}/>
          <ProductDetails>
            <ProductName>{product.name}</ProductName>
            <ProductDiscountPercent>{product.discountPercent}%</ProductDiscountPercent>
            <ProductPrice>{Math.floor(
                product.price * (1 - product.discountPercent
                    / 100))}원</ProductPrice>
            <ProductPrevPrice>{product.price}원</ProductPrevPrice>
          </ProductDetails>
        </Container></SwiperSlide>;
      }) : "";

  return (
      <>
        <Header/>
        <Wrap>
          <ContainerSlide>
            <Row>
              <Slide>
                <Swiper
                    style={{height: '300px', width: "1050px"}}
                    className='banner'
                    slidesPerView={1}
                    navigation
                    loop={true}
                    autoplay={{delay: 2000}}
                >
                  {bannerList}
                </Swiper>
              </Slide>
            </Row>
          </ContainerSlide>
          <SubTitle>이 상품 어때요?</SubTitle>
          <ContainerSlide>
            <Row>
              <SectionSlide>
                <Swiper
                    style={{height: '440px', width: "1050px"}}
                    className='recommendation'
                    slidesPerView={4}
                    slidesPerGroup={4}
                    navigation
                    loop={true}
                >
                  {recommendationList}
                </Swiper>
              </SectionSlide>
            </Row>
          </ContainerSlide>
          <SubTitle
              style={{cursor: 'pointer'}}
              onClick={() => props.history.push(
                  "/shop/goods/goods_list?list=sale")}>
            놓치면 후회할 가격 〉</SubTitle>
          <ContainerSlide>
            <Row>
              <SectionSlide>
                <Swiper
                    style={{height: '440px', width: "1050px"}}
                    className='cheapProduct'
                    slidesPerView={4}
                    slidesPerGroup={4}
                    navigation
                    loop={true}
                >
                  {cheapProductList}
                </Swiper>
              </SectionSlide>
            </Row>
          </ContainerSlide>
          <SubTitle>MD의 추천</SubTitle>
          <MdBlock>
            <MdButton id={'907'} onClick={()=>{setMdShow('907')}}>채소</MdButton>
            <MdButton id={'908'} onClick={()=>{setMdShow('908')}}>과일·견과·쌀</MdButton>
            <MdButton id={'909'} onClick={()=>{setMdShow('909')}}>수산·해산·건어물</MdButton>
            <MdButton id={'910'} onClick={()=>{setMdShow('910')}}>정육·계란</MdButton>
            <MdButton id={'911'} onClick={()=>{setMdShow('911')}}>국·반찬·메인요리</MdButton>
          </MdBlock>
          <ContainerSlide>
            <Row>
              <SectionSlide>
                <Swiper
                    style={{height: '440px', width: "1050px"}}
                    className='mdProducts'
                    slidesPerView={4}
                    slidesPerGroup={4}
                    navigation
                    loop={true}
                >
                  {mdChoiceList}
                </Swiper>
              </SectionSlide>
            </Row>
          </ContainerSlide>
        </Wrap>
      </>
  )
}

export default Home;