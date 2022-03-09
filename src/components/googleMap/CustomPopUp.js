import { Popover, Typography } from "@mui/material";

const CustomPopUp = ({ id, anchorEl, handleClose, open }) => {
  return (
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
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
    </Popover>
  );
};

export default CustomPopUp;
