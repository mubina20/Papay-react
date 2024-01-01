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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import RestaurantApiService from "../../apiServices/restaurantApiServise";
import { useEffect, useState } from "react";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiServise";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { setChosenProduct, setChosenRestaurant } from "./slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveChosenRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../../lib/config";


// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data))
});

// REDUX SELECTOR
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({
        chosenProduct
    })
);

const chosenRestaurantRetriever = createSelector(
    retrieveChosenRestaurants,
    (chosenRestaurant) => ({
        chosenRestaurant
    })
);

export function ChosenDish(props: any) {
    // INITIALIZATIONS
    let { dish_id } = useParams<{ dish_id: string }>();
    const { setChosenProduct, setChosenRestaurant } = actionDispatch(
        useDispatch()
    );
    const { chosenProduct } = useSelector(chosenProductRetriever);
    const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);

    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    const dishRelatedProcess = async () => {
        try {
            const productService = new ProductApiService();
            const product: Product = await productService.getChosenDish(dish_id);
            setChosenProduct(product);

            const restaurantService = new RestaurantApiService();
            const restaurant = await restaurantService.getChosenRestaurant(
                product.restaurant_mb_id
            );
            setChosenRestaurant(restaurant);
        } catch (err: any) {
            console.log(`ERROR :: targetLikeProduct", ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    useEffect(() => {
        dishRelatedProcess().then();
    }, [productRebuild]);

    // HANDLERS
    const targetLikeProduct = async (e: any) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

            const memberService = new MemberApiService(),
                like_result = await memberService.memberLikeTarget({
                like_ref_id: e.target.id,
                group_type: "product",
                });
            assert.ok(like_result, Definer.general_err1);

            await sweetTopSmallSuccessAlert("success", 700, false);
            setProductRebuild(new Date());
        } catch (err: any) {
            console.log(`ERROR :: targetLikeProduct", ${err.message}`);
            sweetErrorHandling(err).then();
        }
    };

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
                        {chosenProduct?.product_images.map((image: string) => {
                            const image_path = `${serverApi}/${image}`;
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
                        loop={true}
                        slidesPerView={chosenProduct?.product_images.length || 3}
                        spaceBetween={20}
                        pagination={{
                        clickable: true,
                        }}
                        // modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {chosenProduct?.product_images.map((image) => {
                            const image_path = `${serverApi}/${image}`;
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
                        <strong className="dish_txt">{chosenProduct?.product_name}</strong>
                        <span className="resto_name">{chosenRestaurant?.mb_nick}</span>
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
                                        id={chosenProduct?._id}
                                        onClick={targetLikeProduct}
                                        checked={
                                            chosenProduct?.me_liked &&
                                            !!chosenProduct?.me_liked[0]?.my_favorite
                                        }
                                    />
                                    <span>{chosenProduct?.product_likes}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                    <span>{chosenProduct?.product_views}</span>
                                </div>
                            </div>
                        </Box>
                        <p className="dish_desc_info">
                            {chosenProduct?.product_description
                                ? chosenProduct?.product_description
                                : "No description"
                            }
                        </p>
                        <Marginer
                            direction="horizontal"
                            height="1"
                            width="100%"
                            bg="#000000"
                        />
                        <div className="dish_price_box">
                            <span>Price:</span>
                            <span style={{ marginRight: "40px" }}>{chosenProduct?.product_price}</span>
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