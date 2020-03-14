import { useSelector, useEf, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import HeaderMenu from '../menu/HeaderMenu'
import ItemList from '../ItemList/itemList'
import Search from '../search/search'
import axios from 'axios';

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .post('/api/pizza/get/page/1')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SET_ITEMS", items: response.data })
        }
      })
      .catch(error => {
        console.log('Get pizza error')
      })
  }, [])

  const items = useSelector(store => store.items)

  const [searchResult, setSearchResult] = useState(items)

  const [isSearching, setSearching] = useState(false)

  const handleSearch = (searchString) => {
    if (searchString !== '') {
      setSearching(true)
      axios
        .get(`/api/pizza/search/${searchString}`)
        .then((response) => {
          if (response.status === 200) {
            setSearchResult(response.data)
          }
        })
    } else {
      setSearching(false)
    }
  }

  return (
    <div>
      <HeaderMenu />
      <Search handleSearch={handleSearch} />
      <ItemList data={isSearching ? searchResult : items} />
    </div>
  )
}