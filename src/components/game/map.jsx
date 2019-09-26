import React, { useState, useEffect, useRef } from "react";
import { Graph } from "react-d3-graph";

const root_x = 175;
const root_y = 140;
const multiplier = 18;

const myConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: true,
  maxZoom: 5,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: true,
  staticGraphWithDragAndDrop: true,
  // height: 280,
  // width: 350,
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

function Map({ worldMap, gameData }) {
  const mapRef = useRef(null);
  const [rectCoords, setRectCoords] = useState({
    height: 0,
    width: 0
  });
  const [configM, setConfigM] = useState(myConfig);
  const [graph, setGraph] = useState({});

  useEffect(() => {
    window.addEventListener("resize", handleRefresh);
    handleRefresh();
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [gameData.room_id]);

  const handleRefresh = () => {
    const coords = mapRef.current.getBoundingClientRect();
    coords.height *= 0.85;
    setRectCoords({
      height: coords.height,
      width: coords.width
    });
    const south_links = worldMap.rooms
      .filter(node => node.south !== 0)
      .map(link => ({ source: link.id, target: link.south }));

    const east_links = worldMap.rooms
      .filter(node => node.east !== 0)
      .map(link => ({ source: link.id, target: link.east }));
    const newGraph = {
      nodes: worldMap.rooms.map(node => ({
        ...node,
        x: node.x * (coords.width / 20) + 0.5 * coords.width,
        y: node.y * -(coords.width / 20) + 0.5 * coords.height,
        size:
          node.id === gameData.room_id ? coords.width / 3 : coords.width / 6,
        color: node.id === gameData.room_id ? "#91ff01" : "#d3d3d3",
        symbolType: node.id === gameData.room_id ? "circle" : "square"
      })),
      links: [...south_links, ...east_links]
    };
    setGraph(newGraph);
  };

  return (
    <div className="map-container" ref={mapRef}>
      {worldMap.rooms && rectCoords.height !== 0 ? (
        <div className="inner-graph-box">
          <Graph
            className="graph"
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={graph}
            config={{
              ...myConfig,
              height: rectCoords.height,
              width: rectCoords.width - 10
            }}
          />
          <h3 className="hub-right-heading">{gameData.title}</h3>
        </div>
      ) : (
        <p>loading world map...</p>
      )}
    </div>
  );
}

export default Map;
