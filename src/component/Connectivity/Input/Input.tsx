import { TextField, Tooltip } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ConnectivityInputDescription } from "./Description/Description";

interface ConnectivityInputProps {
  onChange: (newInput: string) => void;
}

export const ConnectivityInput = ({
  onChange,
  ...props
}: ConnectivityInputProps) => {
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

    const newGraphInput = filterdInput?.join("") || "";
    setGraphInput(newGraphInput);
    onChange(newGraphInput);
  };

  return (
    <Tooltip arrow title={<ConnectivityInputDescription />}>
      <TextField
        id="graph-input-textarea"
        label="Graph Input"
        placeholder="Input your graph here..."
        multiline
        autoFocus
        value={graphInput}
        onChange={onChangeGraphInput}
      />
    </Tooltip>
  );
};
