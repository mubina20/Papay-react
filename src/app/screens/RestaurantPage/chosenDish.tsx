import { Container, Stack, Box, Checkbox } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

const chosen_list = Array.from(Array(5).keys());

export function ChosenDish(props: any) {
    const label = { inputProps: {"aria-label": "CheckBox demo"} };

    return (
        <div className="chosen_dish_page">
            <Container className="dish_container">
                <Stack className="chosen_dish_slider">
                    <Swiper
                        className="dish_swiper"
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {chosen_list.map((ele) => {
                            const image_path = `/others/palov.jpg`;
                            return (
                                <SwiperSlide>
                                    <img
                                        style={{ width: "100%", height: "100%" }}
                                        src={image_path}
                                        alt=""
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {chosen_list.map((ele) => {
                            const image_path = `/others/palov.jpg`;
                            return (
                                <SwiperSlide>
                                    <img
                                        className={"swiper-slide img"}
                                        src={image_path}
                                        alt=""
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Stack>
                <Stack className="chosen_dish_info_container">
                    <Box className="chosen_dish_info_box">
                        <strong className="dish_txt">Sweet Osh</strong>
                        <span className="resto_name">Texas De Brazil</span>
                        <Box className="rating_box">
                            <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
                            <div className="evalutaion_box">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "20px",
                                    }}
                                >
                                    <Checkbox
                                        {...label}
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite style={{ color: "red" }} />}
                                        checked={false}
                                    />
                                    <span>100</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                    <span>1000</span>
                                </div>
                            </div>
                        </Box>
                        <p className="dish_desc_info">Very delicious Osh</p>
                        <Marginer
                            direction="horizontal"
                            height="1"
                            width="100%"
                            bg="#000000"
                        />
                        <div className="dish_price_box">
                            <span>Price:</span>
                            <span style={{ marginRight: "40px" }}>10</span>
                        </div>
                        <div className="button_box">
                            <Button variant="contained" >
                                Add to cart
                            </Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}