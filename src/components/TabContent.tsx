import React, { useCallback, useEffect } from "react";
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
} from "@storybook/api";

import { ADDON_ID, EVENTS } from "../constants";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

interface TabContentProps {
  code: string;
}

const engine = createEngine();

// node 1
const node1 = new DefaultNodeModel({
  name: "Node 1",
  color: "#F24785",
});
node1.setPosition(100, 100);
let port1 = node1.addInPort("In");

// node 2
const node2 = new DefaultNodeModel({
  name: "Node 2",
  color: "#F24785",
});
node2.setPosition(200, 200);
let port2 = node2.addOutPort("Out");

// link them and add a label to the link
const link = port1.link<DefaultLinkModel>(port2);

const model = new DiagramModel();
model.addAll(node1, node2, link);
engine.setModel(model);

const Wrapper = styled.div({
  width: "100%",
  height: " 100%",
  backgroundColor: "#333333",
});

const StyledCanvasWidget = styled(CanvasWidget)({
  width: "100%",
  height: " 100%",
});

export const TabContent: React.FC<TabContentProps> = (props) => {
  const [args, updateArgs, resetArgs] = useArgs();

  const [{ erDiagram }, updateGlobals] = useGlobals();

  useEffect(() => {
    console.log("erDiagram", erDiagram);
  }, []);

  return (
    <Wrapper>
      <StyledCanvasWidget engine={engine} />
    </Wrapper>
  );
};
