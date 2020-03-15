import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import HeaderMenu from '../menu/HeaderMenu'
import ItemList from '../ItemList/itemList'
import Search from '../search/search'
import axios from 'axios';
import styled from 'styled-components'
import { Container } from '@material-ui/core';

const RequestBackground = styled(Container)`
`

export default function Requests() {

  return (
    <div>
      <HeaderMenu/>
      <RequestBackground>
          Скоро...
      </RequestBackground>
    </div>
  )
}