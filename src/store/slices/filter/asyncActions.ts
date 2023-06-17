import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {ISort} from "./types";

export const fetchCategories = createAsyncThunk<string[]>(
  'filter/categories',
  async () => {
      const response = await axios.get('https://63f1bdc6f28929a9df4c8e71.mockapi.io/categories')
    return response.data
  }
)

export const fetchSorts = createAsyncThunk<ISort[]>(
  'filter/sorts',
  async () => {
    const response = await axios.get('https://6456731b2e41ccf1691d725c.mockapi.io/sorts')
    return response.data
  }
)