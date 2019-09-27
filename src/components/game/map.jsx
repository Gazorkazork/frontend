import React, { useState, useEffect, useRef, useCallback } from "react";
import { Graph } from "react-d3-graph";

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
  console.log(gameData);
  const mapRef = useRef(null);
  const [rectCoords, setRectCoords] = useState({
    height: 0,
    width: 0
  });
  const [graph, setGraph] = useState({});
  const [currentNode, setCurrentNode] = useState({});

  const handleRefresh = useCallback(() => {
    const coords = mapRef.current.getBoundingClientRect();
    coords.height *= 0.81;
    setRectCoords({
      height: coords.height,
      width: coords.width
    });
    const south_links = worldMap.rooms
      .filter(node => {
        if (
          node.id === gameData.room_id ||
          gameData.visited.includes(node.id)
        ) {
          if (
            gameData.visited.includes(node.south) ||
            node.south === gameData.room_id
          ) {
            return true;
          }
        }
        return false;
      })
      .map(link => ({ source: link.id, target: link.south }));

    const east_links = worldMap.rooms
      .filter(node => {
        if (
          node.id === gameData.room_id ||
          gameData.visited.includes(node.id)
        ) {
          if (
            gameData.visited.includes(node.east) ||
            node.east === gameData.room_id
          ) {
            return true;
          }
        }
        return false;
      })
      .map(link => ({ source: link.id, target: link.east }));

    const nodes = worldMap.rooms.filter(
      node => node.id === gameData.room_id || gameData.visited.includes(node.id)
    );
    const newGraph = {
      nodes: nodes.map(node => {
          if (node.id === gameData.room_id) {
            setCurrentNode(node)
          }
          return {
            ...node,
            x: node.x * (coords.width / 20) + 0.5 * coords.width,
            y: node.y * -(coords.width / 20) + 0.5 * coords.height,
            size:
                node.id === gameData.room_id ? coords.width / 3 : coords.width / 6,
            color: node.id === gameData.room_id ? "#91ff01" : "#d3d3d3",
            symbolType: node.id === gameData.room_id ? "circle" : "square"
        }}),
      links: [...south_links, ...east_links]
    };
    setGraph(newGraph);
  }, [gameData.room_id, worldMap.rooms]);

  useEffect(() => {
    window.addEventListener("resize", handleRefresh);
    return () => window.removeEventListener("resize", handleRefresh);
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [gameData.room_id, handleRefresh]);

  console.log(currentNode)

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
          <h2 className="input-room-description">Exits:
            <span>{currentNode.north !== 0 ? " n" : ""}</span>
            <span>{currentNode.south !== 0 ? " s" : ""}</span>
            <span>{currentNode.east !== 0 ? " e" : ""}</span>
            <span>{currentNode.west !== 0 ? " w" : ""}</span>
          </h2>
        </div>
      ) : (
        <p>loading world map...</p>
      )}
    </div>
  );
}

export default Map;
