import React from "react";
import { Graph } from "react-d3-graph";

const root_x = 400;
const root_y = 200;
const multiplier = 20;

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
  maxZoom: 5,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: true,
  staticGraphWithDragAndDrop: true,
  width: 800,
  d3: {
    alphaTarget: 0,
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
    size: 50,
    strokeColor: "none",
    strokeWidth: 2,
    svg: "",
    symbolType: "circle"
  },
  link: {
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

function World({ worldMap, gameData }) {
  console.log(gameData);
  console.log(worldMap.rooms[0]);
  console.log(worldMap.rooms.find(room => room.id === gameData.room_id));
  const south_links = worldMap.rooms
    .filter(node => node.south !== 0)
    .map(link => ({ source: link.id, target: link.south }));

  const east_links = worldMap.rooms
    .filter(node => node.east !== 0)
    .map(link => ({ source: link.id, target: link.east }));
  const graph = {
    nodes: worldMap.rooms.map(node => ({
      ...node,
      x: node.x * multiplier + root_x,
      y: node.y * -multiplier + root_y,
      color: node.id === gameData.room_id ? "green" : "#d3d3d3"
    })),
    links: [...south_links, ...east_links]
  };
  return (
    <div>
      <h1>World</h1>
      {worldMap.rooms ? (
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={graph}
          config={myConfig}
        />
      ) : (
        <p>loading world map...</p>
      )}
    </div>
  );
}

export default World;
