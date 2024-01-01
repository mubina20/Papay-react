import { Box, Stack } from '@mui/material';
import TabPanel from "@mui/lab/TabPanel";

// REDUX
import { createSelector } from '@reduxjs/toolkit';
import { retrieveFinishedOrders } from '../../screens/OrdersPage/selector';
import { useSelector } from 'react-redux';

/** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
	retrieveFinishedOrders, 
	(finishedOrders) => ({
		finishedOrders
	})
);

const finishedOrders = [
    [1, 2, 3],
    [1, 2, 3]
];

export default function FinishedOrders(props: any) {
	// INITIALIZATIONS 
    // const { finishedOrders } = useSelector(finishedOrdersRetriever);

	return (
		<TabPanel value="3">
			<Stack>
				{finishedOrders?.map((order) => {
					return (
						<Box className="order_main_box">
							<Box className="order_box_scroll">
								{order.map((item) => {
									const image_path = `/others/palov.jpg`;
									return (
										<Box className={'ordersName_price'}>
											<img src={image_path} className={'orderDishImg'} alt='' />
											<p className={'titleDish'}>Osh</p>
											<Box className={'priceBox'}>
												<p>$12</p>
												<img src={'/icons/Close.svg'} alt='' />
												2
												<img src={'/icons/pause.svg'} alt='' />
												<p style={{ marginLeft: '15px' }}>
                                                    $12
                                                </p>
											</Box>
										</Box>
									);
								})}
							</Box>

							<Box className={'total_price_box red_solid'}>
								<Box className={'boxTotal'}>
									<p>Mahsulot narxi</p>
                                    <p>$21</p>
									<img src={'/icons/plus.svg'} style={{ marginLeft: '20px' }} alt='' />
									<p>Yetkazish xizmati</p>
                                    <p>$2</p>
									<img src={'/icons/pause.svg'} style={{ marginLeft: '20px' }} alt='' />
									<p>jami narx</p>
								    <p>$24</p>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Stack>
		</TabPanel>
	);
}