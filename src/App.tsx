import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import "./App.css";
import { Bipartite } from "./component/Graph/Bipartite/Bipartite";

export const App = () => {
  return (
    <CustomApp>
      <h1>Graph using React</h1>
      <CustomDivider />

      <Bipartite />
    </CustomApp>
  );
};

const CustomApp = styled.div`
  padding: 3em 5em;
`;

const CustomDivider = styled(Divider)`
  margin: 30px 0;
`;
