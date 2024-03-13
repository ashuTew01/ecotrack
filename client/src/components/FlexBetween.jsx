const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)({     //styled components is a way to use styles or css in a component like manner.
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
