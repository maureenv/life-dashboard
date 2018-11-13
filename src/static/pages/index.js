import React, { Component } from 'react'
import Link from 'next/link'
import Main from '../components/pageLayout'
import heroBG from '../_res/images/hero-background.jpg'
import styled from 'styled-components'
import Recipes from '../container/Recipes'

const Hero = styled.div`
  background: url(${ heroBG }) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 30vh;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  }
`

const HeroTitle = styled.h1`
  color: #f5f5f5;
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  font-size: 80px;
  margin-bottom: -10px;
  font-family: 'Anton', sans-serif;
  text-shadow: -3px 0px 11px rgba(0,0,0,0.7);
`


class Index extends Component {
  render() {
    return (
      <Main>
        <Hero>
          <HeroTitle>Maureen’s Recipes</HeroTitle>
        </Hero>
        <Link href={{ pathname: '/recipe', query: { isNew: true } }}> New Menu </Link>
        <Recipes />
      </Main>
    )
  }
}


export default Index
