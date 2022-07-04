import React, { lazy, useCallback, useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import { Title, Source, Link } from "@storybook/components";
import {
  useGlobals,
  useAddonState,
  useChannel,
  useArgs,
  useStoryPrepared,
  useParameter,
} from "@storybook/api";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
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
  code: string;
  active: boolean;
}

interface BuildModelInterface {
  nodes: { [key: string]: string[] };
  erDiagram: typeof useGlobals;
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
        brandNode.updateDimensions({ width: 200, height: 200 });
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
  ];
  return result;
};

export const Tab: React.FC<TabProps> = ({ active }) => {
  const diagramEngine = createEngine();
  const activeModel = new DiagramModel();

  const [engine, setEngine] = useState<DiagramEngine>(diagramEngine);
  const [paintCanvas, setPaintCanvas] = useState(false);

  const [args, updateArgs, resetArgs] = useArgs();
  const [{ erDiagram }, updateGlobals] = useGlobals();
  const paramData = useParameter<{ [key: string]: string[] }>(PARAM_KEY);

  useEffect(() => {
    return () => {
      setEngine(null);
    };
  }, []);

  useEffect(() => {
    if (paramData && erDiagram) {
      setPaintCanvas(false);
      activeModel.addAll(
        ...updateModel({ erDiagram, nodes: paramData, storyArgs: args })
      );
      engine.setModel(activeModel);
      setEngine(engine);
      setPaintCanvas(true);
    }
  }, [erDiagram, paramData]);

  return (
    <>
      <Wrapper>
        {paintCanvas && (
          <StyledCanvasWidget className="diagram-canvas" engine={engine} />
        )}
      </Wrapper>
    </>
  );
};
