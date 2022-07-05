<div align="center">
  <img src="./assets/logo.png" width="400" alt="storybook-er-diagram">
  <br/>
</div>

<hr/>

## storybook-er-diagram

A [Storybook](https://github.com/storybooks/storybook) addon who manages links between component stories and the projects that use them.

## Getting started

### 1. Install

```sh
npm install --save-dev storybook-er-diagram
# yarn add -D storybook-er-diagram
```

### 2. Register the addon in `main.js`

```js
module.exports = {
  addons: ["storybook-er-diagram"],
};
```

### 3. Add it to story!

add `erDiagramList` object to the story default export parameters and use the template name as key.
The name must be equal to the story template.

```js
export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    erDiagramList: {
      Primary: ["Project-A", "Project-B", "Project-C", "Project-D"],
      Secondary: ["Project-B", "Project-C"],
    },
  },

const Template = (args) => <Button {...args} />;
export const Primary = Template.bind({});
export const Secondary = Template.bind({});
};
```
