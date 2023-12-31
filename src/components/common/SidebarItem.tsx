import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";

import { RouteType } from "../../routes/config";

type Props = {
  item: RouteType;
  selected: boolean;
};

const SidebarItem = ({ item, selected }: Props) => {
  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        backgroundColor: selected ? colorConfigs.sidebar.activeBg : "unset",
        paddingY: "12px",
        paddingX: "24px",
      }}
    >
      <ListItemIcon
        sx={{
          color: colorConfigs.sidebar.color,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
