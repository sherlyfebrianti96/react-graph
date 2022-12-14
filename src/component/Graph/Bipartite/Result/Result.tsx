import { NodeStatus } from "../../../../enum/NodeStatus";

import d3 from "d3";
import styled from "@emotion/styled";

interface BipartiteResultProps {
  input: string;
}

interface GraphValue {
  status: NodeStatus;
  edge: Set<string>;
}

export const BipartiteResult = ({ ...props }: BipartiteResultProps) => {
  /* Change all alphabets to uppercase to make it in-case-sensitive */
  const input = props.input.toUpperCase();

  /**
   * Nodes (Vertices)
   * Point in the graph.
   * Only using the alphabet A-Z (uppercase only, to make it non-case-sensitive).
   */
  const nodes = input
    .split(/[-,\n]+/gm)
    /* Only get the non-empty and non-duplicate value to the array */
    .filter((node, index, self) => {
      const alreadyExist = self.indexOf(node) === index;
      return node && alreadyExist;
    });
  console.log("debug nodes : ", nodes);

  let graph: Map<string, GraphValue> = new Map();

  /* Initial values for the Graph */
  nodes.map((node) => {
    graph.set(node, { status: NodeStatus.Default, edge: new Set() });

    return node;
  });

  console.log("debug graph : ", graph);

  const groups = input
    /* Only get the non-empty value to the array */
    .split(/[,\n]+/gm)
    /* Only get the non-empty value to the array */
    .filter((node) => node);
  console.log("debug groups : ", groups);

  /* Get the nodes for the graph */
  const processNodesToGraph = (
    groupNodes: string[],
    activeDefaultStatus: NodeStatus
  ) => {
    /* Process the nodes one by one */
    const currentNode = groupNodes[0];

    const nodeValue = { ...(graph.get(currentNode) as GraphValue) };

    let nextActiveDefaultStatus = activeDefaultStatus;

    /* Mark the visited Node Status */
    switch (nodeValue.status) {
      case NodeStatus.Default:
        nodeValue.status = activeDefaultStatus;

        /* Change the active Default for the next iteration */
        if (activeDefaultStatus === NodeStatus.Highlight) {
          nextActiveDefaultStatus = NodeStatus.Normal;
        } else {
          nextActiveDefaultStatus = NodeStatus.Highlight;
        }
        break;
      case NodeStatus.Normal:
        nodeValue.status = NodeStatus.Highlight;
        break;
      case NodeStatus.Highlight:
        nodeValue.status = NodeStatus.Normal;
        break;
      default:
        break;
    }

    /**
     * Update Edge
     * This will update the connected Edge with the next Node (Vertex)
     */
    const nextNode = groupNodes[1];
    console.log("debug nextNode : ", nextNode);
    if (nextNode) {
      const currentEdge = new Set(nodeValue.edge);
      currentEdge.add(nextNode);

      nodeValue.edge = currentEdge;
    }
    console.log("debug updated nodeValue : ", nodeValue);

    /* Update the Graph with the updated data */
    graph.set(currentNode, nodeValue);

    /* Proceed to the next item */
    if (groupNodes.length > 1) {
      processNodesToGraph(
        groupNodes.slice(1, groupNodes.length + 1),
        nextActiveDefaultStatus
      );
    }
  };

  /* Process the groups */
  groups.map((group) => {
    /* Process the nodes */
    const groupNodes = group
      .split("-")
      /* Only get the non-empty value to the array */
      .filter((node) => node);

    console.log("debug --------------- ");
    console.log("debug groupNodes : ", groupNodes);

    processNodesToGraph(groupNodes, NodeStatus.Normal);

    return group;
  });
  console.log("debug graph : ", graph);

  /**
   * Bipartite/2-colorable Graph
   * This condition matched when the Highlighted color and the Normal color is shining simultaneously
   */
  let isBipartite = true;

  let currentStatusComparator = NodeStatus.Default;

  let nodesWithoutEdge: Array<string> = [];

  graph.forEach((nodeValue, nodeName) => {
    /* Get the Bipartite data */
    if (nodeValue.status === currentStatusComparator) {
      isBipartite = false;
    } else {
      currentStatusComparator = nodeValue.status;
    }

    /* Get the Disconnected Graph data */
    if (nodeValue.edge.size === 0) {
      nodesWithoutEdge.push(nodeName);
    }
  });

  console.log("debug --------------- ");
  console.log("debug --------------- ");
  console.log("debug nodesWithoutEdge : ", nodesWithoutEdge);

  const isConnectedNode = (
    graphToProcess: Map<string, GraphValue>,
    nodeToSearch: string
  ): boolean => {
    const connectedNodesArr: Array<{
      nodeName: string;
      nodeValue: GraphValue;
    }> = [];

    /* Get and check every connected nodes */
    graphToProcess.forEach((nodeValue, nodeName) => {
      if (nodeValue.edge.has(nodeToSearch)) {
        connectedNodesArr.push({ nodeValue, nodeName });
      }
    });
    console.log("debug connectedNodesArr : ", connectedNodesArr);

    /* Checking every connected Node and see if they are connected to another nodes */
    let isConnected = false;
    connectedNodesArr.forEach((connectedNode) => {
      if (connectedNode.nodeValue.edge.size === 1) {
        /* It means we need to check the the connectivity of the connected node again */
        const isConnectedNodeOfConnectedNode = isConnectedNode(
          graphToProcess,
          connectedNode.nodeName
        );
        if (isConnectedNodeOfConnectedNode) {
          isConnected = true;
        }
      }

      if (!!connectedNode.nodeValue && connectedNode.nodeValue.edge.size > 1) {
        isConnected = true;
      }
    });

    return isConnected;
  };

  let totalDisconnectedNode = 0;
  if (nodesWithoutEdge.length > 1) {
    /**
     * If the Node (e.g. node X) does not have the continual Edge,
     * we need to check the node that is connected to this node (e.g. node Y).
     *
     * If there is no node that have this node Y, it means this Y does not connected to anywhere
     * */
    nodesWithoutEdge.map((nodeName) => {
      const nodeThatConnectedToThisNode = isConnectedNode(graph, nodeName);
      console.log(
        "debug nodeThatConnectedToThisNode : ",
        nodeThatConnectedToThisNode
      );

      /**
       * If the connectedNode only have this node as the linked Edge,
       * it means it is not connected to anyone
       */
      if (!nodeThatConnectedToThisNode) {
        /* It means it the connected Node only have this Node as the connected edge */
        totalDisconnectedNode++;
      }

      return nodesWithoutEdge;
    });
  }

  /**
   * Disconnected Graph
   * This condition matched when there is more than 1 Disconnected Node
   */
  const isDisconnectedGraph = totalDisconnectedNode > 0;

  // const graphNode = document.createElement("div");

  // const width = 960,
  //   height = 500;

  // const svg = d3
  //   .select(graphNode)
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height);

  // const defs = svg.append("defs");

  // defs
  //   .append("clipPath")
  //   .attr("id", "circle1")
  //   .append("circle")
  //   .attr("cx", 350)
  //   .attr("cy", 200)
  //   .attr("r", 180);

  // defs
  //   .append("clipPath")
  //   .attr("id", "circle2")
  //   .append("circle")
  //   .attr("cx", 550)
  //   .attr("cy", 200)
  //   .attr("r", 180);

  return (
    <>
      <h5>RESULT</h5>
      <CustomParagraph>
        That is
        <span className={`highlight-${isDisconnectedGraph ? "red" : "green"}`}>
          {isDisconnectedGraph && " not"} a connected graph
        </span>
        {!isDisconnectedGraph && (
          <span>
            {isBipartite ? (
              <span>
                &nbsp;and&nbsp;
                <span className="highlight-green">
                  red-blue colorable graph
                </span>
              </span>
            ) : (
              <span>
                , but&nbsp;
                <span className="highlight-red">not red blue colorable</span>.
              </span>
            )}
          </span>
        )}
      </CustomParagraph>
    </>
  );
};

const CustomParagraph = styled.p`
  .highlight-red {
    color: #f44336;
  }

  .highlight-green {
    color: #009688;
  }
`;
