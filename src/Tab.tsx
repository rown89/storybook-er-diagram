import React, { lazy, useCallback, useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import { Title, Source, Link } from "@storybook/components";
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import {
  useGlobals,
  useAddonState,
  useChannel,
  useArgs,
  useStoryPrepared,
  useParameter,
} from "@storybook/api";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

// import * as xx from "../stories/Button.stories.js";

interface TabProps {
  code: string;
  active: boolean;
}

interface BuildModelInterface {
  nodes: { [key: string]: string[] };
  erDiagram: typeof useGlobals;
  storyArgs: typeof useArgs["arguments"];
}

const Wrapper = styled.div({
  width: "100%",
  height: " 100%",
  background:
    "conic-gradient(from 90deg at 1px 1px,#0000 90deg,#474747 0) 0 0/50px 50px",
  backgroundColor: "#333333",
});

const StyledCanvasWidget = styled(CanvasWidget)({
  width: "100%",
  height: " 100%",
});

const defaultNodeColor = "#F24581";

const engine = createEngine();
const model = new DiagramModel();
engine.setModel(model);

const buildModel = async ({
  erDiagram,
  nodes,
  storyArgs,
}: BuildModelInterface): Promise<boolean> => {
  try {
    const StoryNode = new DefaultNodeModel({
      name: erDiagram.name,
      color: "#029bf4",
    });
    StoryNode.setPosition(100, 50);
    const StoryNodePort = StoryNode.addInPort(JSON.stringify(storyArgs));

    let buildedNodes = nodes[erDiagram.name]
      ? nodes[erDiagram.name].map((brand, index) => {
          console.log(brand);
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

    model.addAll(...buildedNodes, ...links);

    return true;
  } catch (error) {
    console.error("buildModel error:", error);
    return false;
  }
};

export const Tab: React.FC<TabProps> = ({ active }) => {
  const [args, updateArgs, resetArgs] = useArgs();
  const [{ erDiagram }, updateGlobals] = useGlobals();
  const paramData = useParameter<{ [key: string]: string[] }>(PARAM_KEY);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (paramData && erDiagram) {
      try {
        buildModel({ erDiagram, nodes: paramData, storyArgs: args });
        setShowCanvas(true);
      } catch (error) {
        console.error("buildModelError", error);
      }
    }
  }, [erDiagram, paramData]);

  useEffect(() => {}, []);

  return (
    <>
      {active ? (
        <Wrapper>
          <StyledCanvasWidget engine={engine} />
        </Wrapper>
      ) : null}
    </>
  );
};
