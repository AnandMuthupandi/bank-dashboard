import { AppBar, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import SearchDropDown from "./SearchDropDown";

const Topbar = () => {
  return (
    <AppBar
      data-testid="Appbar"
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        <SearchDropDown />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
