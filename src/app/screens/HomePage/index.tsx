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
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { setTopRestaurants } from "../../screens/HomePage/slice";
import { retrieveTopRestaurants } from '../../screens/HomePage/selector';
import { Restaurant } from '../../../types/user';

// REDUX SLICE 
const actionDispatch = (dispatch: Dispatch) => ({
	setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data))
});

// REDUX SELECTOR
const topRestaurantRetriever = createSelector(
	retrieveTopRestaurants,
	(topRestaurants) => ({
		topRestaurants
	})
);

export function HomePage() {
	// INITIALIZATION
	const { setTopRestaurants } = actionDispatch(useDispatch());
	const { topRestaurants } = useSelector(topRestaurantRetriever);

	// Selector: store => data
	console.log("topRestaurants::", topRestaurants);

	useEffect(() => {
		// BackEnd Data request => data
		
		// Slice: data => Store
		setTopRestaurants([]);

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
