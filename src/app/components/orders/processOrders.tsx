import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import {
    sweetErrorHandling,
    sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SELECTOR 
const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({
        processOrders
    })
);

export default function ProcessOrders(props: any) {
    // INITIALIZATIONS
    const { processOrders } = useSelector(processOrdersRetriever);

    // HANDLERS 
    const finishOrderHandler = async (event: any) => {
        try {
            const order_id = event.target.value;
            const data = { order_id: order_id, order_status: "FINISHED" };

            if (!verifiedMemberData) {
                sweetFailureProvider("Please login first", true);
            }

            let confirmation = window.confirm(
                "Buyurtma yetkazilganini tasdiqlaysizmi?"
            );
            if (confirmation) {
                const orderService = new OrderApiService();
                await orderService.updateOrderStatus(data);
                props.setOrderRebuild(new Date());
            }
        } catch (err) {
            console.log('ERROR :: finishOrderHandler', err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: Order) => {
                    return (
                        <Box className={"order_main_box"}>
                            <Box className={"order_box_scroll"}>
                                {order.order_items.map((item) => {
                                    const product: Product = order.product_data.filter(
                                        (ele) => ele._id === item.product_id
                                    )[0];
                                    const image_path = `${serverApi}/${product.product_images[0]}`;
                                    return (
                                        <Box className={"ordersName_price"}>
                                        <img src={image_path} className={"orderDishImg"} alt=''/>
                                        <p className={"titleDish"}>{product.product_name}</p>
                                        <Box className={"priceBox"}>
                                            <p> ${item.item_price}</p>
                                            <img src={"/icons/Close.svg"} alt=''/>
                                            {item.item_quantity}
                                            <img src={"/icons/pause.svg"} alt=''/>
                                            <p style={{ marginLeft: "15px" }}> 
                                                ${item.item_price * item.item_quantity}
                                            </p>
                                        </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total_price_box blue_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>Mahsulot narxi</p>
                                    <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} alt=''/>
                                    <p>Yetkazish xizmati</p>
                                    <p>${order.order_delivery_cost}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                        alt=''
                                    />
                                    <p>Jami narx</p>
                                    <p>${order.order_total_amount}</p>
                                </Box>
                                <p>{moment(order.createdAt).format("YY/MM/DD hh:mm")}</p>
                                <Button
                                    value={order._id}
                                    onClick={finishOrderHandler}
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