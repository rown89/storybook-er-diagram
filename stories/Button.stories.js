import React from "react";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    erDiagramList: {
      Primary: ["Project-A", "Project-B", "Project-C", "Project-D"],
      ["With Name"]: ["Project-A", "Project-C"],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  content: [
    [<>Val 1 </>, <>Val 1</>, <>Val 1</>, <>Val 1</>],
    [<>Val 2</>, <>Val 2</>, <>Val 2</>, <>Val 2</>],
    [<>Val 3</>, <>Val 3</>, <>Val 3</>, <>Val 3</>],
    [<>Val 4</>, <>Val 4</>, <>Val 4</>, <>Val 4</>],
    [<>Val 5</>, <>Val 5</>, <>Val 5</>, <>Val 5</>],
    [<>Val 6</>, <>Val 6</>, <>Val 6</>, <>Val 6</>],
    [<>Val 7</>, <>Val 7</>, <>Val 7</>, <>Val 7</>],
  ],
  image: (
    <img
      src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy"
      alt=""
    />
  ),
  title: <a href="#">Integratori per sportivi</a>,
  label: "Button",
  cta: "Read More",
  primdary: true,
  imagde: (
    <img
      src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy"
      alt=""
    />
  ),
  titdle: <a href="#">Integratori per sportivi</a>,
  labdel: "Button",
  ctda: "Read More",
  primsary: true,
  imasge: (
    <img
      src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy"
      alt=""
    />
  ),
  tistle: <a href="#">Integratori per sportivi</a>,
  lasbel: "Button",
  ctsa: "Read More",
  prim3ary: true,
  ima3ge: (
    <img
      src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy"
      alt=""
    />
  ),
  ti3tle: <a href="#">Integratori per sportivi</a>,
  la3bel: "Button",
  ct3a: "Read More",
};

export const withName = Template.bind({});
withName.args = {
  label: "Button",
};
