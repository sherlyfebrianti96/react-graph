import { NodeStatus } from "../../../../enum/NodeStatus";

import d3 from "d3";

interface BipartiteResultProps {
  input: string;
}

interface GraphValue {
  status: NodeStatus;
  edge: Set<string>;
}

export const BipartiteResult = ({ ...props }: BipartiteResultProps) => {
  /* Uppercase alphabets */
  const alphabets = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
  );

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
  
  let activeDefault = NodeStatus.Normal;

  input
    /* Only get the non-empty value to the array */
    .split(/[,\n]+/gm)
    /* Only get the non-empty value to the array */
    .filter((node) => node)
    /* Process the groups */
    .map((group) => {
      /* Process the nodes */
      const groupNodes = group
        .split("-")
        /* Only get the non-empty value to the array */
        .filter((node) => node);

      console.log("debug --------------- ");
      console.log("debug groupNodes : ", groupNodes);

      groupNodes.map((node, index) => {
        const currentNode = { ...(graph.get(node) as GraphValue) };
        console.log("debug currentNode : ", currentNode);

        /* Mark the visited Node Status */
        switch (currentNode.status) {
          case NodeStatus.Default:
            currentNode.status = activeDefault;

            /* Change the active Default for the next iteration */
            if (activeDefault === NodeStatus.Highlight) {
              activeDefault = NodeStatus.Normal;
            } else {
              activeDefault = NodeStatus.Highlight;
            }
            break;
          case NodeStatus.Normal:
            currentNode.status = NodeStatus.Highlight;
            break;
          case NodeStatus.Highlight:
            currentNode.status = NodeStatus.Normal;
            break;
          default:
            break;
        }

        /**
         * Update Edge
         * This will update the connected Edge with the next Node (Vertex)
         */
        const nextNode = groupNodes[index + 1];
        console.log("debug nextNode : ", nextNode);
        if (nextNode) {
          const currentEdge = new Set(currentNode.edge);
          currentEdge.add(nextNode);

          currentNode.edge = currentEdge;
        }
        console.log("debug updated currentNode : ", currentNode);

        /* Update the Graph with the updated data */
        graph.set(node, currentNode);

        return node;
      });

      return group;
    });
  console.log("debug graph : ", graph);

  /**
   * Bipartite/2-colorable Graph
   * This condition matched when the Highlighted color and the Normal color is shining simultaneously
   */
  let isBipartite = true;

  let currentStatusComparator = NodeStatus.Default;

  graph.forEach((nodeValue, nodeName) => {
    if (nodeValue.status === currentStatusComparator) {
      isBipartite = false;
    } else {
      currentStatusComparator = nodeValue.status;
    }
  });

  console.log("debug isBipartite : ", isBipartite);

  /**
   * Disconnected Graph
   * This condition matched when there is more than 1 Nodes without the continual Edge
   */

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
      <div>RESULT!!!</div>
      {/* {graphNode} */}
    </>
  );
};
