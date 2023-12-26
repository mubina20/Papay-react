import { Box, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
import { useEffect } from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTrendProducts } from "./slice";
import { retrieveTrendProducts } from "./selector";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";

// REDUX SLICE  
const actionDispatch = (dispatch: Dispatch) => ({
    setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

// REDUX SELECTOR 
const trendProductsRetrieve = createSelector(
    retrieveTrendProducts,
    (trendProducts) => ({
        trendProducts
    })
);

export function BestDishes() {
    // INITIALIZATIONS
    const { setTrendProducts } = actionDispatch(useDispatch());
    const { trendProducts } = useSelector(trendProductsRetrieve);

    useEffect(() => {
        const productService = new ProductApiService();

        productService
        .getTargetProducts({ page: 1, limit: 4, order: "createdAt" })
        .then((data) => setTrendProducts(data))
        .catch((err) => console.log("getTargetProducts ::", err));

    }, []);

    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title">Trend Dishes</Box>
                    <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
                        {trendProducts.map((product: Product) => {
                            const images_path = `${serverApi}/${product.product_images[0]}`;
                            const size_volume =
                                product.product_collection === "drink"
                                    ? product.product_volume + "l"
                                    : product.product_size + " size";

                            return (
                                <Box className="dish_box" key={product._id}>
                                    <Stack className="dish_img" sx={{ backgroundImage: `url(${images_path})` }}>
                                        <div className="dish_sale">{size_volume}</div>
                                        <div className="view_btn">
                                            See more
                                            <img src={"/icons/arrow-right.svg"} alt="" 
                                            style={{ marginLeft: "9px", transform: "rotate(-180deg)" }} />
                                        </div>
                                    </Stack>
                                    <Stack className="dish_desc">
                                        <span className={"dish_title_text"}>{product.product_name}</span>
                                        <span className={"dish_desc_text"}>
                                            <MonetizationOn />
                                            {product.product_price}
                                        </span>
                                    </Stack>
                                </Box>
                            )
                        })};
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}