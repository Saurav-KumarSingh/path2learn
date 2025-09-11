import React, { useRef, useEffect, useState } from "react";
import ReactFlow, { Background, Handle, Position, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import backendRoadmapData from "../data/roadMapData";
import SideBar from "./SideBar"; // ✅ Import Sidebar

const DynamicNode = ({ data, onClick }) => (
  <div
    onClick={() => data.content && onClick(data)}
    style={{
      background: "#00000f",
      color: "#CF1B1BFF",
      border: "2px solid #CF1B1BFF",
      borderRadius: 8,
      padding: "clamp(8px, 2vw, 16px) clamp(12px, 3vw, 20px)",
      fontWeight: 600,
      fontSize: "clamp(12px, 2vw, 18px)",
      textAlign: "center",
      display: "inline-block",
      whiteSpace: "pre-wrap",
      width: "fit-content",
      maxWidth: "85vw",
      boxSizing: "border-box",
      cursor: data.content ? "pointer" : "default",
      transition: "all 0.2s ease-in-out",
    }}
  >
    {data.label}
    <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
    <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
  </div>
);

const nodeTypes = {
  dynamicNode: (props) => <DynamicNode {...props} onClick={props.data.onClick} />,
};

let idCounter = 1;
const getId = () => `${idCounter++}`;

const convertStepsToFlow = (data, onClick, startX = 0, startY = 60, childSpacing = 350) => {
  const nodes = [];
  const edges = [];
  const screenWidth = window.innerWidth;
  const stepGap = screenWidth > 1024 ? 400 : screenWidth > 600 ? 280 : 200;

  const rootId = getId();
  nodes.push({
    id: rootId,
    type: "dynamicNode",
    data: { label: data.name, content: data.content, onClick },
    position: { x: startX, y: startY },
  });

  const traverse = (parentId, parentY, children) => {
    let maxChildY = parentY;
    if (!children) return maxChildY;

    children.forEach((step) => {
      const stepId = getId();
      const stepY = maxChildY + stepGap;
      nodes.push({
        id: stepId,
        type: "dynamicNode",
        data: { label: step.name, content: step.content, onClick },
        position: { x: startX, y: stepY },
      });
      edges.push({ id: `e${parentId}-${stepId}`, source: parentId, target: stepId });

      let childMaxY = stepY;
      if (step.children) {
        const totalChildren = step.children.length;
        const adjustedSpacing = Math.max(160, screenWidth / (totalChildren + 1));
        const totalWidth = (totalChildren - 1) * adjustedSpacing;
        const startChildX = startX - totalWidth / 2;

        step.children.forEach((child, i) => {
          const childId = getId();
          const childY = stepY + (screenWidth > 1024 ? 300 : screenWidth > 600 ? 200 : 140);
          const childX = startChildX + i * adjustedSpacing;

          nodes.push({
            id: childId,
            type: "dynamicNode",
            data: { label: child.name, content: child.content, onClick },
            position: { x: childX, y: childY },
          });
          edges.push({ id: `e${stepId}-${childId}`, source: stepId, target: childId });

          if (childY > childMaxY) childMaxY = childY;
        });
      }

      maxChildY = childMaxY;
      parentId = stepId;
    });

    return maxChildY;
  };

  traverse(rootId, startY, data.children);

  // --- CENTER HORIZONTALLY ---
  const allX = nodes.map((n) => n.position.x);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const treeWidth = maxX - minX;
  const centerOffset = window.innerWidth / 2 - (minX + treeWidth / 2);

  nodes.forEach((n) => {
    n.position.x += centerOffset;
  });

  return { nodes, edges };
};

const RoadmapTree = () => {
  const reactFlowWrapper = useRef(null);
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const [viewport] = useState({ x: 0, y: 0, zoom: 0.55 });
  const [sidebarContent, setSidebarContent] = useState(null);

  var screenWidth = window.innerWidth;

  const handleNodeClick = (nodeData) => {
    if (sidebarContent?.label === nodeData.label) {
      // ✅ Toggle close if same node clicked again
      setSidebarContent(null);
    } else {
      setSidebarContent(nodeData);
    }
  };

  useEffect(() => {
    const { nodes, edges } = convertStepsToFlow(backendRoadmapData, handleNodeClick, 0, 60, 350);
    setFlowData({ nodes, edges });
    const resizeListener = () => {
      const { nodes, edges } = convertStepsToFlow(
        backendRoadmapData,
        handleNodeClick,
        0,
        60,
        350
      );
      setFlowData({ nodes, edges });
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "black" }} ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={flowData.nodes}
          edges={flowData.edges}
          nodeTypes={nodeTypes}
          defaultViewport={viewport}
          minZoom={screenWidth < 420 ? 0.35 : 0.8}
          maxZoom={1.5}
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          panOnDrag
          style={{ background: "#000" }}
        >
          <Background gap={20} color="#111" />
        </ReactFlow>
      </ReactFlowProvider>

      {/* ✅ Sidebar Component */}
      <SideBar content={sidebarContent} onClose={() => setSidebarContent(null)} />
    </div>
  );
};

export default RoadmapTree;
