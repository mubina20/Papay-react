import { Box, Link, Stack} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import moment from "moment";
import { Typography } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function TargetArticles(props: any) {
    return (
        <Stack>
            {props.targetBoArticles?.map((article: any, index: string) => {
                const art_image_url = "/community/default_article.svg";
                return (
                    <Link
                        className={"all_article_box"}
                        sx={{ textDecoration: "none" }}
                        href={``}
                    >
                        <Box
                            className={"all_article_img"}
                            sx={{
                                backgroundImage: `url(${art_image_url})`,
                            }}
                        ></Box>
                        <Box className={"all_article_container"}>
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                    src={"/auth/default_user.svg"}
                                    width={"35px"}
                                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                                    alt=""
                                />
                                <span className={"all_article_author_user"}> Ali </span>
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{ mt: "15px" }}
                            >
                                <span className={"all_article_title"}> Evaluation </span>
                                <p className={"all_article_desc"}>
                                    Texas De Brazil zo'r restaurant!
                                </p>
                            </Box>
                            <Box>
                                <Box
                                    className={"article_share"}
                                    style={{ width: "100%", height: "auto" }}
                                    sx={{ mb: "10px" }}
                                >
                                    <Box
                                        className={"article_share_main"}
                                        style={{
                                        color: "#fff",
                                        marginLeft: "150px",
                                        display: "flex",
                                        alignItems: "center",
                                        }}
                                    >
                                        <span>{moment().format("YY-MM-DD HH:mm")}</span>

                                        <Stack marginLeft={"40px"} display={"flex"} flexDirection={"row"} gap={"12px"}   > 
                                            <Typography
                                            level="body-sm"
                                            sx={{
                                                fontWeight: "md", 
                                                color: "neutral.300", 
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                            >
                                            <FavoriteBorder sx={{ fontSize: 20, marginRight: "7px"}} />
                                            <div>100</div>
                                            </Typography>

                                            <Typography 
                                            level="body-sm"
                                            sx={{
                                                fontWeight: "md",
                                                color: "neutral.300",
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                            >
                                            <VisibilityIcon sx={{ fontSize: 20, marginRight: "7px" }} />
                                            1000{" "}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                );
            })}
        </Stack>
    );
}
