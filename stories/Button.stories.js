import React from "react";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    erDiagramList: {
      Primary: ["Project-A", "Project-B", "Project-C", "Project-D"],
      Secondary: ["Project-A", "Project-C"],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
  image: (
    <img
      src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy"
      alt=""
    />
  ),
  title: <a href="#">Integratori per sportivi</a>,
  paragraph:
    "How do you create compelling presentations that wow your colleagues and impress your managers?",
  cta: "Leggi",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
