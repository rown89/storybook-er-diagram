import React, { lazy, useCallback, useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import { Title, Source, Link } from "@storybook/components";
import { addons } from "@storybook/addons";
import { STORY_CHANGED, GLOBALS_UPDATED } from "@storybook/core-events";
import {
  useGlobals,
  useArgs,
  useParameter,
  useStorybookApi,
} from "@storybook/api";
import { PARAM_KEY } from "./constants";
import createEngine, {
  DiagramEngine,
  DefaultLinkModel,
  LinkModel,
  LinkModelGenerics,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

interface TabProps {
  active: boolean;
}

interface BuildModelInterface {
  nodes: { [key: string]: string[] };
  erDiagram: { [key: string]: any };
  storyArgs: typeof useArgs["arguments"];
}

const defaultNodeColor = "#F24581";

const Wrapper = styled.div({
  width: "100%",
  height: "100%",
  background:
    "conic-gradient(from 90deg at 1px 1px,#0000 90deg,#474747 0) 0 0/50px 50px",
  backgroundColor: "#333333",
});

const StyledCanvasWidget = styled(CanvasWidget)({
  width: "100%",
  height: "100%",
});

const updateModel = ({ erDiagram, nodes, storyArgs }: BuildModelInterface) => {
  const StoryNode = new DefaultNodeModel({
    name: erDiagram.story,
    color: "#029bf4",
  });
  StoryNode.setPosition(100, 50);
  const StoryNodePort = StoryNode.addOutPort(JSON.stringify(storyArgs));

  let buildedNodes = nodes[erDiagram.story]
    ? nodes[erDiagram.story].map((brand, index) => {
        const brandNode = new DefaultNodeModel({
          name: brand,
          color: defaultNodeColor,
        });
        brandNode.setPosition(index + 2 * 260, index * 120 + index);
        return brandNode;
      })
    : [];

  buildedNodes = [StoryNode, ...buildedNodes];

  const links = buildedNodes.map((item, index) => {
    if (index > 0) return item.addInPort("brand").link(StoryNodePort);
  });

  const result: (DefaultNodeModel | LinkModel<LinkModelGenerics>)[] = [
    ...buildedNodes,
    ...links,
  ].filter((item) => item !== undefined);
  return result;
};

export const Tab: React.FC<TabProps> = ({ active }) => {
  const [engine, setEngine] = useState<DiagramEngine>(createEngine());
  const activeModel = new DiagramModel();
  const [paintCanvas, setPaintCanvas] = useState(false);

  const channel = addons.getChannel();
  const storybookState = useStorybookApi();
  const paramData = useParameter<{ [key: string]: string[] }>(PARAM_KEY, {});
  const [args, updateArgs, resetArgs] = useArgs();
  const [{ erDiagram }, updateGlobals] = useGlobals();

  useEffect(() => {
    channel.on(GLOBALS_UPDATED, (event) => {
      console.log(event);
      if (event.globals.erDiagram) {
        setPaintCanvas(false);
        activeModel.addAll(
          ...updateModel({
            erDiagram: event.globals.erDiagram,
            nodes: paramData,
            storyArgs: args,
          })
        );
        engine.setModel(activeModel);
        setEngine(engine);
        setPaintCanvas(true);
      }
    });
    return () => channel.off(GLOBALS_UPDATED, (event) => {});
  }, [channel, paramData, args]);

  useEffect(() => {
    return () => {
      setEngine(null);
    };
  }, []);

  return (
    <>
      {active && (
        <Wrapper>
          {paintCanvas && (
            <StyledCanvasWidget className="diagram-canvas" engine={engine} />
          )}
        </Wrapper>
      )}
    </>
  );
};
