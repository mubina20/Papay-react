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

// REDUX SLICE 
const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
	setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
	setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage() {
	// INITIALIZATIONS
	const [value, setValue] = useState('1');
	const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());

	useEffect(() => {
	}, []);

	//HANDLERS
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
							<PausedOrders />
							<ProcessOrders />
							<FinishedOrders />
						</Stack>
					</TabContext>
				</Stack>

				<Stack className="order_right">
					<Box className="order_info_box">
						<Box display="flex" flexDirection="column" alignItems="center">
							<div className="order_user_img">
								<p className="order_user_name">Ali</p>
								<p className="user">User</p>
							</div>
							<div className="marginer">
								<Marginer direction="horizontal" height="1" width="323" bg="#A1A1A1" />
							</div>
							<p><LocationOn />manzil kiritilmagan</p>
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
