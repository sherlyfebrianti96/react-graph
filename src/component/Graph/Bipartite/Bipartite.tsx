import { Alert, AlertTitle, Grid } from "@mui/material";
import { useState } from "react";
import { ConnectivityInput } from "../../Connectivity/Input/Input";
import { ConnectivityOverview } from "../../Connectivity/Overview/Overview";
import { BipartiteResult } from "./Result/Result";

export const Bipartite = () => {
  const [connectivityInput, setConnectivityInput] = useState("");

  const onChangeConnectivityInput = (newConnectivityInput: string) => {
    setConnectivityInput(newConnectivityInput);
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <ConnectivityOverview />
      </Grid>
      <Grid item>
        <ConnectivityInput onChange={onChangeConnectivityInput} />
      </Grid>
      {connectivityInput && (
        <>
          <Grid item>
            <h5>Bipartite / 2-colorable graph</h5>
            <Alert severity="info" sx={{ display: "inline-flex" }}>
              <AlertTitle>Theorem :</AlertTitle>
              <span>
                A (simple) graph is bipartite if and only if it contains no odd
                cycles.
              </span>
            </Alert>
          </Grid>
          <Grid item>
            <BipartiteResult input={connectivityInput} />
          </Grid>
        </>
      )}
    </Grid>
  );
};
