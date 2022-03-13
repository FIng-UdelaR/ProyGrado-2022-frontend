import { Popover, Typography } from "@mui/material";

const CustomPopUp = ({ id, anchorEl, handleClose, open, selectedMachine }) => {
  return selectedMachine ? (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Typography sx={{ p: 2 }}>{selectedMachine?.name}</Typography>
    </Popover>
  ) : (
    <div />
  );
};

export default CustomPopUp;
