import { useEffect } from 'react';
import { Statistics } from './statistics';
import { BestRestaurants } from './bestRestaurants';
import { TopRestaurants } from './topRestaurants';
import { BestDishes } from './bestDishes';
import { Advertisements } from './advertisements';
import { Events } from './events';
import { Recommendations } from './recommendations';
import '../../../css/home.css';

// REDUX
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setBestRestaurants, setTopRestaurants } from "../../screens/HomePage/slice";
import { Restaurant } from '../../../types/user';
import RestaurantApiService from '../../apiServices/restaurantApiServise';

// REDUX SLICE 
const actionDispatch = (dispatch: Dispatch) => ({
	setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
	setBestRestaurants: (data: Restaurant[]) => dispatch(setBestRestaurants(data))
});

export function HomePage() {
	// INITIALIZATIONS
	const { setTopRestaurants, setBestRestaurants } = actionDispatch(useDispatch());

	useEffect(() => {
		// BackEnd Data request => data
		const restaurantService = new RestaurantApiService();

		// Top Restaurant
		restaurantService.getTopRestaurants().then(data => {
			// Slice: data => Store
			setTopRestaurants(data);
		}).catch(err => console.log("ERROR:: getTopRestaurants!", err));

		// All Restaurants
		restaurantService.getRestaurants({ page: 1, limit: 4, order: 'mb_point' }).then(data => {
			setBestRestaurants(data);
		}).catch(err => console.log("ERROR:: getRestaurants!", err));

	}, []);

	return (
		<div className="homepage">
			<Statistics />
			<TopRestaurants />
			<BestRestaurants />
			<BestDishes />
			<Advertisements />
			<Events />
			<Recommendations />
		</div>
	);
}
