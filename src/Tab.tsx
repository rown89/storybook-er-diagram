import React, { useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import {
  useGlobals,
  useArgs,
  useParameter,
  useStorybookState,
} from "@storybook/api";
import { PARAM_KEY } from "./constants";
import createEngine, {
  DiagramEngine,
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
  storyName: string;
  nodes: { [key: string]: string[] };
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

const NodeWidth = 200;

const updateModel = ({ storyName, nodes, storyArgs }: BuildModelInterface) => {
  let buildedNodes = nodes[storyName]
    ? nodes[storyName].map((brand, index) => {
        const brandNode = new DefaultNodeModel({
          name: brand,
          color: defaultNodeColor,
        });
        brandNode.setPosition(NodeWidth * 3 + index, 70 * index + 30);
        return brandNode;
      })
    : [];

  const StoryNode = new DefaultNodeModel({
    name: storyName,
    color: "#029bf4",
  });
  StoryNode.setPosition(30, 30);

  const capitalizedArgsKey = Object.keys(storyArgs).reduce((o: any, k) => {
    if (k) {
      o[k.toUpperCase()] = storyArgs[k];
      return o;
    }
  }, {});

  const stringifyArgs = JSON.stringify(capitalizedArgsKey, null, 2);

  const StoryNodePort = StoryNode.addOutPort(
    (
      <div
        style={{
          width: "auto",
          maxWidth: 420,
          wordBreak: "break-all",
          whiteSpace: "pre-wrap",
          marginRight: 10,
        }}
      >
        {stringifyArgs}
      </div>
    ) as unknown as string
  );

  buildedNodes = [StoryNode, ...buildedNodes];

  const links = buildedNodes.map((item, index) => {
    if (index > 0) return StoryNodePort.link(item.addInPort("Link"));
  });

  const result: (DefaultNodeModel | LinkModel<LinkModelGenerics>)[] = [
    ...buildedNodes,
    ...links,
  ].filter((item) => item !== undefined);
  return result;
};

export const Tab: React.FC<TabProps> = ({ active }) => {
  const state = useStorybookState();
  const paramData = useParameter<{ [key: string]: string[] }>(PARAM_KEY, {});
  const [args, updateArgs, resetArgs] = useArgs();
  // const [{ erDiagram }, updateGlobals] = useGlobals();

  const [engine, setEngine] = useState<DiagramEngine>(createEngine());
  const activeModel = new DiagramModel();
  const [paintCanvas, setPaintCanvas] = useState(false);

  useEffect(() => {
    if (active && state.storiesHash[state?.storyId]) {
      activeModel.addAll(
        ...updateModel({
          storyName: state?.storiesHash[state?.storyId]?.name,
          nodes: paramData,
          storyArgs: args,
        })
      );
      engine.setModel(activeModel);
      setEngine(engine);
      setPaintCanvas(true);
    }
  }, [state]);

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
