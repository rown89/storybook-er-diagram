import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ erDiagram }, updateGlobals] = useGlobals();

  useEffect(() => {
    updateGlobals({
      erDiagram: erDiagram ? undefined : context,
    });
  }, []);

  return StoryFn();
};
