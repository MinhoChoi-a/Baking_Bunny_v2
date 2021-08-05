const noteReducer1 = (state = [], action) => {
    switch(action.type) {
      case 'NEW_NOTE':
        return state.concat(action.data)
      case 'TOGGLE_IMPORTANCE': {
        const id = action.data.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = { 
          ...noteToChange, 
          important: !noteToChange.important 
        }
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )
       }
      default:
        return state
    }
  }


const noteReducer2 = (state = [], action) => {
    switch(action.type) {
      case 'NEW_NOTE':
        return [...state, action.data] //using speard syntax
      case 'TOGGLE_IMPORTANCE':
        // ...
      default:
      return state
    }
  }

/*
  const numbers = [1, 2, 3, 4, 5, 6]

  const [first, second, ...rest] = numbers
  
  console.log(first)     // prints 1
  console.log(second)   // prints 2
  console.log(rest)     // prints [3, 4, 5, 6]
*/