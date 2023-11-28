import { Badge, Box, Button, Container, IconButton, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

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
                        <img src="/icons/papay.svg" alt="" />
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        className="navbar_links"
                    >
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/" >
                                Home
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/restaurant" activeClassName="underline">
                                Restaurants
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/orders" activeClassName="underline">
                                Order
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="underline">
                                Community
                            </NavLink>
                        </Box>

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Help
                            </NavLink>
                        </Box>

                        <Box className="hover-line">
                            <IconButton
                                aria-label="cart"
                                id="basic-button"
                                aria-controls={undefined}
                                aria-haspopup="true"
                                aria-expanded={undefined}
                            >
                                <Badge badgeContent={3} color="secondary">
                                    <img src={"/icons/shopping_cart.svg"} alt="" />
                                </Badge>
                            </IconButton>
                        </Box>

                        <Box>
                            <Button
                            variant="contained"
                            style={{ color: "#FFFFFF", background: "#1976d2" }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}