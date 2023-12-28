import {
    Box,
    Container,
    Stack,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarHome(props: any) {
    return (
        <div className="format home_navbar">
            <Container>
                <Stack
                flexDirection={"row"}
                className="navbar_config"
                justifyContent={"space-between"}
                >
                    <Box>
                        <img src="/icons/papay.svg" alt="" />
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        className="navbar_links"
                    >
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/" activeClassName="underline">
                                Home
                            </NavLink>
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
                        ) : null}
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
                        ) : null}

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Help
                            </NavLink>
                        </Box>
            

                        {!verifiedMemberData ? (
                        <Box>
                            <Button
                            variant="contained"
                            style={{ color: "#FFFFFF", background: "#1976d2" }}
                            onClick={props.handleLoginOpen}
                            >
                                LOGIN
                            </Button>
                        </Box>
                        ) : (
                        <img
                            src={verifiedMemberData.mb_image}
                            alt="Me"
                            style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                            onClick={props.handleLogOutClick}
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
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '"',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
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

                <Stack className="head_information" flexDirection={"row"}>
                    <Stack
                        flexDirection={"column"}
                        style={{ marginTop: "86px", marginLeft: "24px" }}
                    >
                        <Box>
                            <img src="/icons/welcome.svg" alt="" />
                        </Box>
                        <Box className="define_restaurant">
                            Amazing restaurants in Korea
                        </Box>
                        <Box className="timeline_service">24 hour services</Box>
                        <Box sx={{ mt: "90px" }}>
                            {!verifiedMemberData ? (
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "210px",
                                        height: "60px",
                                        background: "#1976d2",
                                        color: "#ffffff",
                                    }}
                                    onClick={props.handleSignUpOpen}
                                >
                                    Signup
                                </Button>
                            ) : null }
                        </Box>
                    </Stack>
                    <Box className="big_img"></Box>
                </Stack>
            </Container>
        </div>
    );
}
