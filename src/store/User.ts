import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'user',
  initialState: {
    data: {}
  },
  reducers: {
    setUser: (
      state, {payload: user},
    ) => {
      state.data = user
    },
  },
})

export const { setUser } = slice.actions

export default slice.reducer
