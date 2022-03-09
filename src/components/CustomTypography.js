/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import { Typography, FormControl, InputLabel, Box, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1.3rem",
    position: "inherit",
    marginBottom: ".2rem",
    "&.light": {
      color: "#000",
    },
    "&.bold": {
      fontWeight: "bolder",
    },
  },
}));

function TextField(props) {
  const {
    id,
    name,
    label,
    labelClass,
    value,
    className,
    select,
    multipleSelect,
    ...others
  } = props;

  const classes = useStyles();
  return (
    <Box
      sx={{
        width: "42%",
        display: "flex",
        flexDirection: "column",
        margin: 3,
      }}
    >
      {label && (
        <InputLabel shrink htmlFor={id} className={classes.root}>
          {label}
        </InputLabel>
      )}
      <Box display={"flex"}>
        <Chip
          style={{ margin: 0, padding: 25, borderRadius: 5 }}
          size="small"
          label={value}
        />
      </Box>
    </Box>
  );
}

TextField.defaultProps = {
  value: "",
  label: undefined,
  labelClass: "",
  prepend: undefined,
  append: undefined,
  className: "",
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prepend: PropTypes.node,
  append: PropTypes.node,
  className: PropTypes.string,
};

export default TextField;
