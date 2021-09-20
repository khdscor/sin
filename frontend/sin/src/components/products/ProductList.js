import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import findProductListApi from "./FindProductListApi";
import queryString from "query-string";

const ProductsListWrap = styled.div`
  width: 1050px;
  margin: 0 auto;
  border: 2px solid rgb(90, 155, 213);
  padding: 10px;
`;
const Container = styled.div`
  display: inline-block;
  width: 320px;
  margin:11px;
  height: 500px;
  border: 2px solid rgb(90, 155, 213);
`;
const ProductImg = styled.img`
  display: inline-block;
  width: 320px;
  height: 400px;
`;
const ProductName = styled.div`
`;
const ProductDiscountPercent = styled.div`
  display: inline-block;
`;
const ProductPrevPrice = styled.div`
  display: inline-block;
  margin-left:10px;
`;
const ProductPrice = styled.div`
`;
const ProductSummary = styled.div`
`;
const ProductList = (props) => {
  const category = queryString.parse(props.location.search).category;
  const list = queryString.parse(props.location.search).list;
  const [products,setProducts] = useState(null);

  useEffect(()=> {
    setProducts(null)
    findProductListApi(category, list).then(prodictPromises => {
      setProducts(prodictPromises)
    });
  },[category, list]);

  const productLists = products ? products.map((product)=>{
    return <Container>
             <ProductImg src= {product.imageUrl} />
             <ProductName>{product.name}</ProductName>
             <ProductDiscountPercent>{product.discountPercent}</ProductDiscountPercent>
             <ProductPrevPrice>{product.price}</ProductPrevPrice>
             <ProductPrice>할인적용가격</ProductPrice>
             <ProductSummary>{product.contentSummary}</ProductSummary>
           </Container>;
  }) : "";

console.log(products)
  return (
      <ProductsListWrap>
        {productLists}
      </ProductsListWrap>
  );
};

export default ProductList;