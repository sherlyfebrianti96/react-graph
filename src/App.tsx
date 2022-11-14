import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import "./App.css";
import { Connectivity } from "./component/Connectivity/Connectivity";

export const App = () => {
  return (
    <CustomApp>
      <h1>Graph using React</h1>
      <CustomDivider />
      <Connectivity />
    </CustomApp>
  );
};

const CustomApp = styled.div`
  padding: 3em 5em;
`;

const CustomDivider = styled(Divider)`
  margin: 30px 0;
`;
