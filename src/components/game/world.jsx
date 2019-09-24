import React from "react";
import { Graph } from "react-d3-graph";

const root_x = 400;
const root_y = 200;
const multiplier = 100;

const seed = [
  {
    id: 1,
    x: 0,
    y: 0,
    north: 5,
    south: 0,
    east: 0,
    west: 0
  },
  {
    id: 2,
    x: -1,
    y: 0,
    north: 6,
    south: 3,
    east: 0,
    west: 0
  },
  {
    id: 3,
    x: -1,
    y: -1,
    north: 2,
    south: 0,
    east: 0,
    west: 4
  },
  {
    id: 4,
    x: -2,
    y: -1,
    north: 0,
    south: 0,
    east: 3,
    west: 0
  },
  {
    id: 5,
    x: 0,
    y: 1,
    north: 0,
    south: 1,
    east: 0,
    west: 6
  },
  {
    id: 6,
    x: -1,
    y: 1,
    north: 0,
    south: 2,
    east: 5,
    west: 0
  }
];
const south_links = seed
  .filter(node => node.south !== 0)
  .map(link => ({ source: link.id, target: link.south }));

const east_links = seed
  .filter(node => node.east !== 0)
  .map(link => ({ source: link.id, target: link.east }));

const graph = {
  nodes: seed.map(node => ({
    ...node,
    x: node.x * multiplier + root_x,
    y: node.y * multiplier + root_y
  })),
  links: [...south_links, ...east_links]
};

const myConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  height: 400,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: true,
  staticGraphWithDragAndDrop: true,
  width: 800,
  d3: {
    alphaTarget: [-10, 10],
    gravity: -400,
    linkLength: 180,
    linkStrength: 1
  },
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 12,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 12,
    highlightFontWeight: "bold",
    highlightStrokeColor: "blue",
    highlightStrokeWidth: "SAME",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    size: 500,
    strokeColor: "none",
    strokeWidth: 2,
    svg: "",
    symbolType: "circle"
  },
  link: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 12,
    fontWeight: "normal",
    highlightColor: "blue",
    highlightFontSize: 8,
    highlightFontWeight: "bold",
    labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: true,
    strokeWidth: 1.5
  }
};

function World() {
  console.log(Graph.prototype);
  return (
    <div>
      <h1>World</h1>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={graph}
        config={myConfig}
      />
    </div>
  );
}

export default World;
