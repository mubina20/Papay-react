import { Box, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";

export function BestDishes() {
    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title">Trend Dishes</Box>
                    <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
                        <Box className="dish_box">
                            <Stack className="dish_img" sx={{ backgroundImage: 'url(https://www.americangarden.us/wp-content/uploads/Adana-Kebab.jpg)' }}>
                                <div className="dish_sale">normal size</div>
                                <div className="view_btn">
                                    See more
                                    <img src={"/icons/arrow-right.svg"} alt="" 
                                    style={{ marginLeft: "9px", transform: "rotate(-180deg)" }} />
                                </div>
                            </Stack>
                            <Stack className="dish_desc">
                                <span className={"dish_title_text"}>Adana Kebab</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn />
                                    11
                                </span>
                            </Stack>
                        </Box>

                        <Box className="dish_box">
                            <Stack className="dish_img" sx={{ backgroundImage: 'url(https://www.americangarden.us/wp-content/uploads/Adana-Kebab.jpg)' }}>
                                <div className="dish_sale">normal size</div>
                                <div className="view_btn">
                                    See more
                                    <img src={"/icons/arrow-right.svg"} alt="" style={{ marginLeft: "9px", transform: "rotate(-180deg)" }} />
                                </div>
                            </Stack>
                            <Stack className="dish_desc">
                                <span className={"dish_title_text"}>Adana Kebab</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn />
                                    11
                                </span>
                            </Stack>
                        </Box>

                        <Box className="dish_box">
                            <Stack className="dish_img" sx={{ backgroundImage: 'url(https://www.americangarden.us/wp-content/uploads/Adana-Kebab.jpg)' }}>
                                <div className="dish_sale">normal size</div>
                                <div className="view_btn">
                                    See more
                                    <img src={"/icons/arrow-right.svg"} alt="" 
                                    style={{ marginLeft: "9px", transform: "rotate(-180deg)" }} />
                                </div>
                            </Stack>
                            <Stack className="dish_desc">
                                <span className={"dish_title_text"}>Adana Kebab</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn />
                                    11
                                </span>
                            </Stack>
                        </Box>

                        <Box className="dish_box">
                            <Stack className="dish_img" sx={{ backgroundImage: 'url(https://www.americangarden.us/wp-content/uploads/Adana-Kebab.jpg)' }}>
                                <div className="dish_sale">normal size</div>
                                <div className="view_btn">
                                    See more
                                    <img src={"/icons/arrow-right.svg"} alt="" 
                                    style={{ marginLeft: "9px", transform: "rotate(-180deg)" }} />
                                </div>
                            </Stack>
                            <Stack className="dish_desc">
                                <span className={"dish_title_text"}>Adana Kebab</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn />
                                    11
                                </span>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
        
    )
}