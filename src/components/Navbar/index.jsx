import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

export default function Navbar() {
  return (
    <Stack direction="horizontal" gap={2}>
      <Button as="a" variant="primary">
        Button as link
      </Button>
      <Button as="a" variant="success">
        Button as link
      </Button>
    </Stack>
  );
}
