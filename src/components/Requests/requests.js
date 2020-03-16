import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import HeaderMenu from '../menu/HeaderMenu'
import ItemList from '../ItemList/itemList'
import Search from '../search/search'
import axios from 'axios';
import styled from 'styled-components'
import { Container } from '@material-ui/core';
import StatTable from './table'

const RequestBackground = styled(Container)`
`

export default function Requests() {

  const [stat, setStat] = useState([])

  useEffect(() => {

    console.log('kek')
    axios
      .get('/api/requests/allstat')
      .then((response) => {
        if (response.status === 200) {
          setStat(response.data)
        }
      })
      .catch(error => {
        console.log('Cant get stat', error)
      })
  }, [])

  const handleTableChange = (id) => {
    axios
      .get(`/api/requests/confirm/${id}`)
      .then(response => {
        axios
          .get('/api/requests/allstat')
          .then((response) => {
            if (response.status === 200) {
              setStat(response.data)
            }
          })
          .catch(error => {
            console.log('Cant get stat', error)
          })
      })
  }

  return (
    <div>
      <HeaderMenu />
      <RequestBackground>
        <StatTable data={stat} handleChange={handleTableChange} />
      </RequestBackground>
    </div>
  )
}