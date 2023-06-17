import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPizzaBlock} from "./types";
import axios from "axios";


export const fetchPizzas = createAsyncThunk<IPizzaBlock[]>(
  'pizzas/items',
  async () => {
    const { data } = await axios.get('https://6456731b2e41ccf1691d725c.mockapi.io/pizzas')
    return data
  }
)

