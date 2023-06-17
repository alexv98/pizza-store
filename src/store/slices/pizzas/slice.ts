import {IPizzaBlock, IPizzasSlice} from "./types";
import {Status} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPizzas} from "./asyncActions";

const initialState: IPizzasSlice = {
  status: Status.IDLE,
  itemsPizzas: [],
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.PENDING
      state.itemsPizzas = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizzaBlock[]>) => {
      state.itemsPizzas = action.payload
      state.status = Status.SUCCEEDED
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.FAILED
      state.itemsPizzas = []
    });
  }
})

export const {} = pizzasSlice.actions
export default pizzasSlice.reducer