import React, { memo } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  CardList,
  ClipboardPlus,
  FileEarmarkText,
  FilePlus,
  PersonLinesFill,
  PersonPlus,
  Receipt,
  Tools,
} from "react-bootstrap-icons";
import { useSessionStorage } from "../../ultil/useSessionStorage";
import HeaderMangerment from "../common/header/mangerment/HeaderMangerment";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const HomeMangement = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hostelOpen, setHostelOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [untilityOpen, setUntilityOpen] = React.useState(false);
  const [invoiceOpen, setInvoiceOpen] = React.useState(false);

  const user = useSessionStorage("user");
  const role = user?.role;

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" style={{ width: "100%" }}>
            <HeaderMangerment />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Hostel or Post Management */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setHostelOpen((prev) => !prev)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  role === "owner" ? "Hostel Management" : "Post Management"
                }
              />
              {hostelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={hostelOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to={`/${role}/`}
              >
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    role === "owner" ? "Hostel List" : "Post List"
                  }
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to={`/${role}/${role === "owner" ? "create_hostel" : "add_new_post"}`}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    role === "owner" ? "Add Hostel" : "Add Post"
                  }
                />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Account Management */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setAccountOpen((prev) => !prev)}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Account Management" />
              {accountOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={accountOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to={`/${role}/view_account`}
              >
                <ListItemIcon>
                  <PersonLinesFill />
                </ListItemIcon>
                <ListItemText primary="Account List" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to={`/${role}/create_account`}
              >
                <ListItemIcon>
                  <PersonPlus />
                </ListItemIcon>
                <ListItemText primary="Create Account" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Utility Management */}
          {(role === "manager" || role === "owner") && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setUntilityOpen((prev) => !prev)}>
                  <ListItemIcon>
                    <Tools />
                  </ListItemIcon>
                  <ListItemText primary="Utility Management" />
                  {untilityOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>
              <Collapse in={untilityOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={NavLink}
                    to={`/${role}/view_utilities`}
                  >
                    <ListItemIcon>
                      <CardList />
                    </ListItemIcon>
                    <ListItemText primary="Utility List" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={NavLink}
                    to={`/${role}/create_utilities`}
                  >
                    <ListItemIcon>
                      <ClipboardPlus />
                    </ListItemIcon>
                    <ListItemText primary="Add Utility" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          )}

          {/* Invoice Management */}
          {role === "manager" && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setInvoiceOpen((prev) => !prev)}>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText primary="Invoice Management" />
                  {invoiceOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>
              <Collapse in={invoiceOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={NavLink}
                    to="/manager/view_invoice"
                  >
                    <ListItemIcon>
                      <FileEarmarkText />
                    </ListItemIcon>
                    <ListItemText primary="Invoice List" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={NavLink}
                    to="/manager/create_invoice"
                  >
                    <ListItemIcon>
                      <FilePlus />
                    </ListItemIcon>
                    <ListItemText primary="Add Invoice" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default memo(HomeMangement);
