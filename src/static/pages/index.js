import React, { Component } from 'react'
import Link from 'next/link'
import Main from '../components/pageLayout'
import heroBG from '../_res/images/hero-background.jpg'
import styled from 'styled-components'

const Hero = styled.div`
  background: url(${ heroBG }) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
`

const HeroTitle = styled.h1`
  color: #f5f5f5;
  text-transform: uppercase;
  font-size: 80px;
  line-height: 0.7;
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
      </Main>
    )
  }
}

export default Index
