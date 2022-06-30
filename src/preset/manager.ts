import { addons, types } from "@storybook/addons";

import { ADDON_ID, TAB_ID } from "../constants";

import { Tab } from "../Tab";

// Register the addon
addons.register(ADDON_ID, () => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: "ER Diagram",
    //👇 Checks the current route for the story
    route: ({ storyId }) => `/erdiagram/${storyId}`,
    //👇 Shows the Tab UI element in erdiagram view mode
    match: ({ viewMode }) => viewMode === "erdiagram",
    render: Tab,
  });
});
