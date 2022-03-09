import { FlexBox } from "../common/StyledComponents";
import { IoIosCloseCircle } from "react-icons/io";
import { Material, Qualities, Sizes } from "../../utils/enum";
import { Typography } from "@mui/material";

const WorkFlowCard = ({ task, removeWorkFlow }) => {
  const { size, quality, material } = task;
  return (
    <FlexBox
      boxShadow="0 0 4px rgba(0, 0, 0, 0.4)"
      width="150px"
      direction="column"
      alignItems="flex-start"
      padding="10px"
      margin="10px"
      position="relative"
    >
      <IoIosCloseCircle
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          cursor: "pointer",
        }}
        onClick={removeWorkFlow}
      />
      <Typography style={{ margin: 0 }}>
        {Object.keys(Material)[material]}
      </Typography>
      <Typography style={{ margin: 0 }}>{Object.keys(Sizes)[size]}</Typography>
      <Typography style={{ margin: 0 }}>
        {Object.keys(Qualities)[quality]}
      </Typography>
    </FlexBox>
  );
};

export default WorkFlowCard;
