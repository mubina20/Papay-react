import { Container, Stack, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AspectRatio from "@mui/joy/AspectRatio";
import { Link } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import CallIcon from "@mui/icons-material/Call";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Favorite } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetRestaurants } from "../RestaurantPage/selector";
import { Restaurant } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "./slice";
import { useEffect, useRef, useState } from "react";
import RestaurantApiService from "../../apiServices/restaurantApiServise";
import { useHistory } from "react-router-dom";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiServise";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetRestaurants: (data: Restaurant[]) =>
        dispatch(setTargetRestaurants(data)),
});

//REDUX SELECTOR 
const targetRestaurantsRetriever = createSelector(
    retrieveTargetRestaurants,
    (targetRestaurants) => ({
        targetRestaurants,
    })
);

export function AllRestaurants() { 
    // INITIALIZATIONS 
    const { setTargetRestaurants } = actionDispatch(useDispatch());
    const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
    const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
        page: 1,
        limit: 8,
        order: "mb_point",
    });
    const refs: any = useRef([]);
    const history = useHistory();

    useEffect(() => {
        const restaurantService = new RestaurantApiService();
        restaurantService
        .getRestaurants(targetSearchObject)
        .then((data) => setTargetRestaurants(data))
        .catch((err) => console.log("ERROR :: AllRestaurants,", err));
    }, [targetSearchObject]);

    //HANDLERS 
    const chosenRestaurantHandler = (id: string) => {
        history.push(`/restaurant/${id}`);
    };

    const searchHandler = (category: string) => {
        targetSearchObject.page = 1;
        targetSearchObject.order = category;
        setTargetSearchObject({ ...targetSearchObject });
    };

    const handlePaginationChange = (event: any, value: number) => {
        targetSearchObject.page = value;
        setTargetSearchObject({ ...targetSearchObject });
    };

    const targetLikeHandler = async (e: any, id: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
    
            const memberService = new MemberApiService();
            const like_result = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: "member",
                });
            assert.ok(like_result, Definer.general_err1);
        
            if (like_result.like_status > 0) {
                e.target.style.fill = "red";
                refs.current[like_result.like_ref_id].innerHTML++;
            } else {
                e.target.style.fill = "white";
                refs.current[like_result.like_ref_id].innerHTML--;
            }
        
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log("ERROR :: targetLikeHandler,", err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div className="all_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="fil_search_box">
                        <Box className="fil_box" style={{ cursor: "pointer" }}>
                            <a onClick={() => searchHandler("mb_point")}>Best</a>
                            <a onClick={() => searchHandler("mb_views")}>popular</a>
                            <a onClick={() => searchHandler("mb_likes")}>Trend</a>
                            <a onClick={() => searchHandler("createdAt")}>New</a>
                        </Box>
                        <Box className="search_big_box">
                            <form className="search_form" action="" method="">
                                <input
                                    type="search"
                                    className="searchInput"
                                    name="resSearch"
                                    placeholder="Qidiriuv"
                                />
                                <Button
                                    className="button_search"
                                    variant="contained"
                                    endIcon={<SearchIcon />}
                                >
                                    Search
                                </Button>
                            </form>
                        </Box>
                    </Box>
                    <Stack className="all_res_box">
                        <CssVarsProvider>
                            {targetRestaurants.map((ele: Restaurant) => {
                                const image_path = `${serverApi}/${ele.mb_image}`;
                                return (
                                    <Card
                                        onClick={() => chosenRestaurantHandler(ele._id)}
                                        variant="outlined"
                                        sx={{
                                            minHeight: 410,
                                            minWidth: 290,
                                            mx: "17px",
                                            my: "20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={image_path} alt="" />
                                            </AspectRatio>
                                            <IconButton
                                                aria-label="Like minimal photograpy"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                onClick={(e) => { e.stopPropagation() }}
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 0,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0, 0, 0,.4)",
                                                }}
                                            >
                                                <Favorite 
                                                    onClick={(e) => targetLikeHandler(e, ele._id)}
                                                    style={{ 
                                                        fill:
                                                        ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                            ? "red"
                                                            : "white"
                                                    }} 
                                                />
                                            </IconButton>
                                        </CardOverflow>

                                        <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                                            {ele.mb_nick} Restaurant
                                        </Typography>

                                        <Typography level="body-md" sx={{ mt: 0.5, mb: 2 }}>
                                            <Link href="" startDecorator={<LocationOnRoundedIcon />} textColor={"neutral.700"}>
                                                {ele.mb_address}
                                            </Link>
                                        </Typography>

                                        <Typography level="body-md" sx={{ mt: 0.5, mb: 2 }}>
                                            <Link
                                                href=""
                                                startDecorator={<CallIcon />}
                                                textColor="neutral.700"
                                            >
                                                {ele.mb_phone}
                                            </Link>
                                        </Typography>

                                        <CardOverflow
                                        variant="soft"
                                        sx={{
                                            display: "flex",
                                            gap: 1.5,
                                            py: 1.5,
                                            px: "var(--Card-padding",
                                            borderTop: "1px solid",
                                            borderColor: "neutral.outlinedBorder",
                                            bgcolor: "background.level1",
                                        }}>
                                            <Stack style={{ flexDirection: "row", gap: "12px" }}>
                                                <Typography
                                                    level="body-md"
                                                    sx={{
                                                        fontWeight: "md",
                                                        color: "text.secondary",
                                                        alignItems: "center",
                                                        display: "flex",
                                                    }}
                                                >
                                                    {ele.mb_views}
                                                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                </Typography>

                                                <Box sx={{ width: 2, bgcolor: "divider" }} />

                                                <Typography
                                                    level="body-md"
                                                    sx={{
                                                        fontWeight: "md",
                                                        color: "text.secondary",
                                                        alignItems: "center",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <div ref={(element) => (refs.current[ele._id] = element)}>
                                                        {ele.mb_likes}
                                                    </div>
                                                    <FavoriteIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                </Typography>
                                            </Stack>
                                        </CardOverflow>
                                    </Card>
                                )
                            })}
                        </CssVarsProvider>
                    </Stack>

                    <Stack className="bottom_box">
                        <img className="line_img" src="/restaurant/line.svg" alt="" />
                        <Pagination
                            count={targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3}
                            page={targetSearchObject.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackRoundedIcon,
                                        next: ArrowForwardRoundedIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={handlePaginationChange}
                        />
                        <img className="line_img_two" src="/restaurant/line_two.svg" alt="" />
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}