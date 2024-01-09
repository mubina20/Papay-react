import {
    Box,
    Button,
    Container,
    Stack,
    MenuItem,
    ListItemIcon,
    Menu,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { verifiedMemberData } from "../../apiServices/verify";
import Basket from "./basket";

export function NavbarRestaurant(props: any) {
    return (
        <div className="format_restaurant home_navbar">
            <Container>
                <Stack
                    flexDirection={"row"}
                    className="navbar_config"
                    justifyContent={"space-between"}
                >
                    <Box>
                        <img src="/icons/papay.svg" alt="papay" />
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent="space-evenly"
                        alignItems={"center"}
                        className="navbar_links">
                        <Box className="hover-line" onClick={props.setPath}
                    >
                        <NavLink to="/">Home</NavLink>
                        </Box>

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/restaurant" activeClassName="underline">
                                Restaurants
                            </NavLink>
                        </Box>

                        {verifiedMemberData ? (
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/orders" activeClassName="underline">
                                Order
                            </NavLink>
                        </Box>
                        ) : null }

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="underline">
                                Community
                            </NavLink>
                        </Box>

                        {verifiedMemberData ? (
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/member-page" activeClassName="underline">
                            MyPage
                            </NavLink>
                        </Box>
                        ) : null }

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Help
                            </NavLink>
                        </Box>

                        <Basket
                            cartItems={props.cartItems}
                            onAdd={props.onAdd}
                            onRemove={props.onRemove}
                            onDelete={props.onDelete}
                            onDeleteAll={props.onDeleteAll}
                            setOrderRebuild={props.setOrderRebuild}
                        />
                        
                        {!verifiedMemberData ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    style={{ color: "#ffffff", background: "#1976d2" }}
                                    onClick={props.handleLoginOpen}
                                >
                                    LOGIN
                                </Button>
                            </Box>
                            ) : (
                            <img
                                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                                src={verifiedMemberData.mb_image}
                                onClick={props.handleLogOutClick}
                                alt=""
                            />
                        )}

                        <Menu
                            anchorEl={props.anchorEl}
                            open={props.open}
                            onClose={props.handleCloseLogOut}
                            onClick={props.handleCloseLogOut}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: "''",
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    widows: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem onClick={props.handleLogOutRequest}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: "blue" }} />
                                </ListItemIcon>
                                LogOut
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}