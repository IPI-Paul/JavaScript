import React, { createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const AppContext = createContext()
const allMealsUrl = 'http://localhost:5000/meals?strMeal_like='
const randomMealUrl = 'http://localhost:5000/meals?idMeal='

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourites')) || []
  )

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const {data} = await axios(url)
      if(data) {
        setMeals(data)
      } else {
        setMeals([])
      }
    } catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals(`${randomMealUrl}${parseInt(Math.random() * 284 + 52767)}`)
  }
  
  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal
    if(favouriteMeal) {
      meal = favourites.find(meal => meal.idMeal === idMeal)
    } else {
      meal = meals.find(meal => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  const addToFavourites = (idMeal) => {
    const alreadyFavourite = favourites.find(meal => meal.idMeal === idMeal)
    if(alreadyFavourite) return
    const meal = meals.find(meal => meal.idMeal === idMeal)
    const updatedFavourites = [...favourites, meal]
    setFavourites(updatedFavourites)
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
  }

  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter(meal => meal.idMeal !== idMeal)
    setFavourites(updatedFavourites)
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
  }

  return (
    <AppContext.Provider
      value={{
        loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, 
        selectedMeal, closeModal, favourites, addToFavourites, 
        removeFromFavourites
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => (
  useContext(AppContext)
)

export { AppContext, AppProvider }