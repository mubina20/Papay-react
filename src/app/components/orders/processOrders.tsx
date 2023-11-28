import { Box, Stack } from '@mui/material';
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";

const processOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
];

export default function ProcessOrders(props: any) {

    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order) => {
                    return (
                        <Box className={"order_main_box"}>
                            <Box className={"order_box_scroll"}>
                                {order.map((item) => {
                                    const image_path = `/others/palov.jpg`;
                                    return (
                                        <Box className={"ordersName_price"}>
                                            <img src={image_path} className={"orderDishImg"} alt='' />
                                            <p className={"titleDish"}>Osh</p>
                                            <Box className={"priceBox"}>
                                                <p> $12</p>
                                                <img src={"/icons/Close.svg"} alt='' />
                                                2
                                                <img src={"/icons/pause.svg"} alt='' />
                                                <p style={{ marginLeft: "15px" }}> 
                                                    $12
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total_price_box blue_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>Mahsulot narxi</p>
                                    <p>$12</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} alt='' />
                                    <p>Yetkazish xizmati</p>
                                    <p>$12</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                        alt=''
                                    />
                                    <p>Jami narx</p>
                                    <p>$12</p>
                                </Box>
                                <p></p>
                                <Button
                                    variant="contained"
                                    style={{
                                        background: "#0288D1",
                                        color: "#FFFFFF",
                                        borderRadius: "10px",
                                        boxShadow:
                                        "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                                    }}
                                >
                                    yakunlash
                                </Button>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}