import { createModel } from "@rematch/core";
import type { RootModel } from "./index";

interface IPageInitState {
  isLoading: boolean;
}

const PageInitState = {
  isLoading: false,
};

export const PageState = createModel<RootModel>()({
  state: PageInitState as IPageInitState,
  reducers: {
    setLoading(state, payload: { type: string; data: boolean }) {
      const { type, data } = payload;
      return { ...state, [type]: data };
    },
  },
  // effects: (dispatch) => ({}),
});

export const SET_LOADING = "isLoading";
