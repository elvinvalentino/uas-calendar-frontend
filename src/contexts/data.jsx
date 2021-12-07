import { useState } from 'react'
import { createContext, useReducer, useCallback } from 'react'

const SET_CATEGORIES = 'SET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

const SET_EVENTS = 'SET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
const CHANGE_EVENT_COLOR = 'CHANGE_EVENT_COLOR'
const CHANGE_EVENT_COLOR_TO_PRESET = 'CHANGE_EVENT_COLOR_TO_PRESET'

const eventInitialState = []
const categoryInitialState = []

const DataContext = createContext({
  events: [],
  categories: [],
  isFetchData: false,
  setIsFetchData: false,
  setData: () => null,
  addData: () => null,
  updateData: () => null,
  deleteData: () => null,
  changeEventColor: () => null,
  changeEventColorToPreset: () => null
});

const eventReducer = (state, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.payload
    case ADD_EVENT:
      return [...state, action.payload]
    case UPDATE_EVENT: {
      const temp = [...state]
      let index = temp.findIndex(e => e._id === action.payload._id)
      temp[index] = action.payload
      return temp
    }
    case DELETE_EVENT:
      return state.filter(e => e._id !== action.payload)
    case CHANGE_EVENT_COLOR: {
      const temp = [...state]
      const changedEvents = temp.filter(e => e.category._id === action.payload._id);
      for (const changedEvent of changedEvents) {
        let index = temp.findIndex(e => e._id === changedEvent._id)
        temp[index].category = action.payload
        temp[index].categoryId = action.payload._id
      }
      return temp
    }
    case CHANGE_EVENT_COLOR_TO_PRESET: {
      const temp = [...state]
      const changedEvents = temp.filter(e => e.category._id === action.payload.oldCategoryId);
      for (const changedEvent of changedEvents) {
        let index = temp.findIndex(e => e._id === changedEvent._id)
        temp[index].category = action.payload.newCategory
        temp[index].categoryId = action.payload.newCategory._id
      }
      return temp
    }
    default:
      return state
  }
}

const categoryReducer = (state, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload
    case ADD_CATEGORY:
      return [...state, action.payload]
    case UPDATE_CATEGORY:
      const temp = [...state]
      let index = temp.findIndex(c => c._id === action.payload._id)
      temp[index] = action.payload
      return temp
    case DELETE_CATEGORY:
      return state.filter(c => c._id !== action.payload)
    default:
      return state
  }
}

const DataProvider = ({ ...props }) => {
  const [events, eventDispatch] = useReducer(eventReducer, eventInitialState)
  const [categories, categoryDispatch] = useReducer(categoryReducer, categoryInitialState)
  const [isFetchData, setIsFetchData] = useState(false)

  const setData = useCallback((data, payload) => {
    if (data === 'event') {
      eventDispatch({ type: SET_EVENTS, payload })
    } else {
      categoryDispatch({ type: SET_CATEGORIES, payload })
    }
  }, [])

  const addData = useCallback((data, payload) => {
    if (data === 'event') {
      eventDispatch({ type: ADD_EVENT, payload })
    } else {
      categoryDispatch({ type: ADD_CATEGORY, payload })
    }
  }, [])

  const updateData = useCallback((data, payload) => {
    if (data === 'event') {
      eventDispatch({ type: UPDATE_EVENT, payload })
    } else {
      categoryDispatch({ type: UPDATE_CATEGORY, payload })
    }
  }, [])

  const deleteData = useCallback((data, payload) => {
    if (data === 'event') {
      eventDispatch({ type: DELETE_EVENT, payload })
    } else {
      categoryDispatch({ type: DELETE_CATEGORY, payload })
    }
  }, [])

  const changeEventColor = useCallback((payload) => {
    eventDispatch({ type: CHANGE_EVENT_COLOR, payload })
  }, [])

  const changeEventColorToPreset = useCallback((payload) => {
    eventDispatch({
      type: CHANGE_EVENT_COLOR_TO_PRESET,
      payload: {
        oldCategoryId: payload,
        newCategory: categories[0]
      }
    })
  }, [categories])

  return (
    <DataContext.Provider
      value={{
        events,
        categories,
        setData,
        addData,
        updateData,
        deleteData,
        isFetchData,
        setIsFetchData,
        changeEventColor,
        changeEventColorToPreset
      }}
      {...props}
    />
  )
}

export { DataContext, DataProvider }

