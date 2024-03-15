import ChipInput from "material-ui-chip-input";
import React from "react";

export default function Test() {
  return (
    <div>
      <ChipInput
        defaultValue={["foo", "bar"]}
        onChange={(chips) => console.log(chips)}
      />
    </div>
  );
}
