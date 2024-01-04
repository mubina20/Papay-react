import { Box, Stack, Container, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Marginer from '../../components/marginer';

import '../../../css/order.css';
import { LocationOn } from '@mui/icons-material';

import PausedOrders from '../../components/orders/pausedOrders';
import ProcessOrders from '../../components/orders/processOrders';
import FinishedOrders from '../../components/orders/finishedOrders';

// REDUX
import { Dispatch } from '@reduxjs/toolkit';
import { Order } from '../../../types/order';
import { setFinishedOrders, setPausedOrders, setProcessOrders } from '../../screens/OrdersPage/slice';
import { useDispatch } from 'react-redux';
import OrderApiService from '../../apiServices/orderApiService';
import { verifiedMemberData } from '../../apiServices/verify';

// REDUX SLICE 
const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
	setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
	setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage(props: any) {
	// INITIALIZATIONS
	const [value, setValue] = useState('1');
	const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());

	useEffect(() => {
		const orderService = new OrderApiService();

		orderService
			.getMyOrder('paused')
			.then((data) => setPausedOrders(data))
			.catch((err) => console.log(err));

		orderService
			.getMyOrder('process')
			.then((data) => setProcessOrders(data))
			.catch((err) => console.log(err));

		orderService
			.getMyOrder('finished')
			.then((data) => setFinishedOrders(data))
			.catch((err) => console.log(err));
	}, [props.orderRebuild]);

	// HANDLERS
	const handleChange = (event: any, newValue: string) => {
		setValue(newValue);
	};

	return (
		<div className="order_page">
			<Container maxWidth= "lg" style={{ display: 'flex', flexDirection: 'row' }} sx={{ mt: '50px', mb: '50px' }}>
				<Stack className="order_left">
					<TabContext value={value}>
						<Box className="order_nav_frame">
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs
								onChange={handleChange}
								value={value}
								aria-label="basic tabs example"
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Tab label="Buyurtmalarim" value={'1'} />
								<Tab label="Jarayon" value={'2'} />
								<Tab label="Yakunlangan" value={'3'} />
							</Tabs>

							</Box>
						</Box>
						<Stack className="order_main_content">
							<PausedOrders setOrderRebuild={props.setOrderRebuild} />
							<ProcessOrders setOrderRebuild={props.setOrderRebuild} />
							<FinishedOrders setOrderRebuild={props.setOrderRebuild} />
						</Stack>
					</TabContext>
				</Stack>

				<Stack className="order_right">
					<Box className="order_info_box">
						<Box display="flex" flexDirection="column" alignItems="center">
							<div className="order_user_img">
								
								<img
									src={verifiedMemberData?.mb_image}
									className="order_user_avatar"
									alt=''
								/>
								<Box className="order_user_icon_box">
									<img src="/icons/user_icon.svg" alt='' />
								</Box>
							</div>
							<h1 className="order_user_name">
								{verifiedMemberData?.mb_nick}
							</h1>
							<p className="order_user_prof">
								{verifiedMemberData?.mb_type ?? "Foydalanuvchi"}
							</p>
							<Box className={"order_user_address"}>
								<Box className="spec_address_text">
									<div className="marginer">
										<Marginer direction="horizontal" height="1" width="323" bg="#A1A1A1" />
									</div>
									<Box
									style={{
										display: "flex",
										justifyContent: "center",
										marginTop: "10px"
										}}
									>
										<LocationOn/>
										<p style={{lineHeight: "1px"}}>
											{verifiedMemberData?.mb_address ?? "manzil kiritilmagan"}
										</p>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				
                    <Box className={"order_info_box"} sx={{ mt: "15px" }}>
                        <input
                            type={"text"}
                            name={"card_number"}
                            placeholder={"Card number : 5243 4090 2002 7495"}
                            className={"card_input"}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <input
                                type={"text"}
                                name={"card_period"}
                                placeholder={"07 / 24"}
                                className={"card_half_input"}
                            />
                            <input
                                type={"text"}
                                name={"card_cvv"}
                                placeholder={"CVV : 010"}
                                className={"card_half_input"}
                            />
                        </div>
                        <input
                            type={"text"}
                            name={"card_creator"}
                            placeholder={"Umarov Abdulloh"}
                            className={"card_input"}
                        />
                        <div className={"cards_box"}>
                            <img src={"/icons/western_card.svg"} alt='' />
                            <img src={"/icons/master_card.svg"} alt='' />
                            <img src={"/icons/paypal_card.svg"} alt='' />
                            <img src={"/icons/visa_card.svg"} alt='' />
                        </div>
                    </Box>
				</Stack>
			</Container>
		</div>
	);
}
