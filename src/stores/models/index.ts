// @filename: models.ts
import { Models } from "@rematch/core";
import { PageState } from "./pageState";

export interface RootModel extends Models<RootModel> {
  PageState: typeof PageState;
}

export const models: RootModel = {
  PageState,
};
