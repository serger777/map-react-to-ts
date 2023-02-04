import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMap } from './api';
import { TMapState } from './types';
import { mapPlace } from './store-utils';

const initialState: TMapState = {
  data: [],
  status: '',
  bound: 1,
  center: [60.048048, 30.386486],
  currentId: '',
  currentPlace:'',
  place: [],
  point: '',
  isOpenSidebar: false,
};
export const loadMap = createAsyncThunk(
  'fetchMap',
  async () => {
    return fetchMap();
  },
);

export const mapReducer = {};
const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSearchPoint: (state, action: PayloadAction<string>) => {
      state.point = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    setCurrentPlace: (state, action: PayloadAction<string>) => {
      state.currentPlace = action.payload;
    },
    setIsOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMap.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadMap.fulfilled, (state, action) => {
        state.status = 'ready';
        state.data = action.payload;
        state.place = mapPlace(action.payload);
        return state;
      })
      .addCase(loadMap.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchPoint, setSelectedId, setCurrentPlace, setIsOpenSidebar } = mapSlice.actions;
export default mapSlice.reducer;