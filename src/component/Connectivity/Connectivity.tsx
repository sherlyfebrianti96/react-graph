import { Grid, TextField, Tooltip } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { InputDescription } from "./InputDescription/InputDescription";

export const Connectivity = () => {
  const [graphInput, setGraphInput] = useState("");

  const onChangeGraphInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    /**
     * Regex
     * g : global search
     * m : multiline
     * + : match item 1 or more times
     * a-z : Alphabet (represent Graph's Node)
     * - : Dash (represent Graph's Edge)
     * , : Comma (represent Path Separator)
     * \n : Newline (represent Path Separator)
     */
    const regex = /[a-z-,\n]+/gm;

    const input = (evt.target as HTMLTextAreaElement).value;

    /* Return array of matched character */
    const filterdInput = input.match(regex);

    setGraphInput(filterdInput?.join("") || "");
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <h5>Graph Connectivity</h5>
        <p>
          This feature will showing the graph connectivity based on the input
          given.
        </p>
      </Grid>
      <Grid item>
        <Tooltip arrow title={<InputDescription />}>
          <TextField
            id="graph-input-textarea"
            label="Graph Input"
            placeholder="Input your graph here..."
            multiline
            value={graphInput}
            onChange={onChangeGraphInput}
          />
        </Tooltip>
      </Grid>
      {/* <Grid item>Result here...</Grid> */}
    </Grid>
  );
};
