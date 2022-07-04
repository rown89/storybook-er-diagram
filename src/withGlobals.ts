import { DecoratorFunction, useArgs } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ erDiagram }, updateGlobals] = useGlobals();

  useEffect(() => {
    updateGlobals({
      erDiagram: context,
    });
  }, []);

  useEffect(() => {
    // console.log(context);
  }, []);

  return StoryFn();
};
