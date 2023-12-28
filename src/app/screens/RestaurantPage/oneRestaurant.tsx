import { Box, Button, Container, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import { Swiper, SwiperSlide } from 'swiper/react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Badge from '@mui/material/Badge';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import {
	retrieveChosenRestaurants,
	retrieveRandomRestaurants,
	retrieveTargetProducts,
} from '../RestaurantPage/selector';
import { Restaurant } from '../../../types/user';
import { Dispatch } from '@reduxjs/toolkit';
import { setChosenRestaurant, setRandomRestaurants, setTargetProducts } from './slice';
import { Product } from '../../../types/product';
import { useHistory, useParams } from 'react-router-dom';
import { ProductSearchObj } from '../../../types/others';
import ProductApiService from '../../apiServices/productApiService';
import RestaurantApiService from '../../apiServices/restaurantApiServise';
import { useEffect, useRef, useState } from 'react';
import { serverApi } from '../../../lib/config';
import assert from 'assert';
import MemberApiService from '../../apiServices/memberApiServise';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import { Definer } from '../../../lib/Definer';

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
	setRandomRestaurants: (data: Restaurant[]) => dispatch(setRandomRestaurants(data)),
	setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data)),
	setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

// REDUX SELECTOR 
const randomRestaurantsRetriever = createSelector(
    retrieveRandomRestaurants, 
    (randomRestaurants) => ({
	    randomRestaurants
    })
);

const chosenRestaurantsRetriever = createSelector(
    retrieveChosenRestaurants, 
    (chosenRestaurant) => ({
        chosenRestaurant,
    })
);

const targetProductsRetriever = createSelector(
    retrieveTargetProducts, 
    (targetProducts) => ({
        targetProducts,
    })
);

export function OneRestaurant() {
    // INITIALIZATIONS 
	const history = useHistory();
	let { restaurant_id } = useParams<{ restaurant_id: string }>();

	const { 
        setRandomRestaurants, 
        setChosenRestaurant, 
        setTargetProducts 
    } = actionDispatch(useDispatch());

	const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
	const { chosenRestaurant } = useSelector(chosenRestaurantsRetriever);
	const { targetProducts } = useSelector(targetProductsRetriever);

	const [chosenRestaurantId, setchosenRestaurantId] = useState<string>(restaurant_id);
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());
	const [targetProductSearchObj, setTargetProductSearchObj] = useState<ProductSearchObj>({
		page: 1,
		limit: 8,
		order: 'createdAt',
		restaurant_mb_id: restaurant_id,
		product_collection: 'dish',
	});

	useEffect(() => {
        const restaurantService = new RestaurantApiService();
		restaurantService
			.getRestaurants({ page: 1, limit: 10, order: 'random' })
			.then((data) => setRandomRestaurants(data))
			.catch((err) => console.log(err));

		const productService = new ProductApiService();
		productService
			.getTargetProducts(targetProductSearchObj)
			.then((data) => setTargetProducts(data))
			.catch((err) => console.log(err));
	}, [targetProductSearchObj, productRebuild]);


	// HANDLERS 
	const chosenRestaurantHandler = (id: string) => {
		setchosenRestaurantId(id);
		targetProductSearchObj.restaurant_mb_id = id;
		setTargetProductSearchObj({ ...targetProductSearchObj });
		history.push(`/restaurant/${id}`);
	};

    const searchCollectionHandler = (collection: string) => {
		targetProductSearchObj.page = 1;
		targetProductSearchObj.product_collection = collection;
		setTargetProductSearchObj({ ...targetProductSearchObj });
	};

    const searchOrderHandler = (order: string) => {
		targetProductSearchObj.page = 1;
		targetProductSearchObj.order = order;
		setTargetProductSearchObj({ ...targetProductSearchObj });
	};

    const targetLikeProduct = async (e: any) => {
		try {
			assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

			const memberService = new MemberApiService(),
				like_result = await memberService.memberLikeTarget({
					like_ref_id: e.target.id,
					group_type: 'product',
				});
			assert.ok(like_result, Definer.general_err1);

			await sweetTopSmallSuccessAlert('success', 700, false);
			setProductRebuild(new Date());
		} catch (err: any) {
			console.log('ERROR :: targetLikeProduct', err);
			sweetErrorHandling(err).then();
		}
	};


    return (
        <div className={'single_restaurant'}>
            <Container>
                <Stack flexDirection={'column'} alignItems={'center'}>
                    <Stack className={'avatar_big_box'}>
                        <Box className={'top_text'}>
                            <p>Texas De Brazil Restaurant</p>
                            <Box className={'Single_search_big_box'}>
                                <form className={'Single_search_form'} action={''} method={''}>
                                    <input
                                        type={'search'}
                                        className={'Single_searchInput'}
                                        name={'Single_resSearch'}
                                        placeholder={'Search'}
                                    />
                                    <Button className={'Single_button_search'} variant="contained" endIcon={<SearchIcon />}>
                                        Search
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Stack>

                    <Stack style={{ width: '100%', display: 'flex' }} flexDirection={'row'} sx={{ mt: '35px' }}>
                        <Box className={'prev_btn restaurant-prev'}>
                            <ArrowBackIosNewIcon sx={{ fontSize: 40 }} style={{ color: 'white' }} />
                        </Box>
                        <Swiper
                            className={'restaurant_avatars_wrapper'}
                            slidesPerView={7}
                            centeredSlides={false}  
                            spaceBetween={30}
                            navigation={{
                                nextEl: ".restaurant-next",
                                prevEl: ".restaurant-prev",
                            }}
                        >
                            {randomRestaurants.map((restaurant: Restaurant) => {
                                const image_path = `${serverApi}/${restaurant?.mb_image}`.replaceAll('\\','/');
                                return (
                                    <SwiperSlide
                                    onClick={() => chosenRestaurantHandler(restaurant._id)}
                                        style={{ cursor: 'pointer' }}
                                        key={restaurant._id}
                                        className="restaurant_avatars"
                                    >
                                        <img src={image_path} alt='' />
                                        <span>{restaurant.mb_nick}</span>
                                    </SwiperSlide>
                                );
                            })}

                        </Swiper>
                        <Box className={'next_btn restaurant-next'} style={{ color: 'white' }}>
                            <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
                        </Box>
                    </Stack>

                    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} width={'90%'} sx={{ mt: '65px' }}>
                        <Box className={'dishs_filter_box'}>
                            <Button variant={'contained'} color="secondary" onClick={() => searchOrderHandler('createdAt')}>
								new
							</Button>
							<Button variant={'contained'} color="secondary" onClick={() => searchOrderHandler('product_price')}>
								price
							</Button>
							<Button variant={'contained'} color="secondary" onClick={() => searchOrderHandler('product_likes')}>
								likes
							</Button>
							<Button variant={'contained'} color="secondary" onClick={() => searchOrderHandler('product_views')}>
								views
							</Button>
                        </Box>
                    </Stack>

                    <Stack style={{ width: '100%', display: 'flex', minHeight: '600px' }} flexDirection={'row'}>
                        <Stack className={'dish_category_box'}>
                            <div className={'dish_category_main'}>
                                <Button variant={'contained'} color="secondary" onClick={() => searchCollectionHandler("etc")}>
                                    other
								</Button>
								<Button variant={'contained'} color="secondary"onClick={() => searchCollectionHandler("dessert")}>
									deserts
								</Button>
								<Button variant={'contained'} color="secondary" onClick={() => searchCollectionHandler("drink")}>
									drinks
								</Button>
								<Button variant={'contained'} color="secondary" onClick={() => searchCollectionHandler("salad")}>
									salads
								</Button>
								<Button variant={'contained'} color="secondary" onClick={() => searchCollectionHandler("dish")}>
									dishes
								</Button>
                            </div>
                        </Stack>

                        <Stack className={'dish_wrapper'}>
                            {targetProducts.map((product: Product) => {
                                const image_path = `${serverApi}/${product?.product_images[0]}`.replaceAll('\\','/');
                                const size_volume =
                                    product?.product_collection === "drink"
                                        ? product?.product_volume + "l"
                                        : product?.product_size + " size";

                                return (
                                    <Box className={"dish_box"} key={`${product._id}`}>
                                        <Box
                                            className={'dish_img'}
                                            sx={{
                                                backgroundImage: `url(${image_path})`,
                                            }}
                                        >
                                            <div className={'dish_sale'}> {size_volume} </div>

                                            <Button className={'like_view_btn'} style={{ left: '36px' }}>
                                                <Badge badgeContent={product.product_likes} color="primary">
                                                    <Checkbox
                                                        icon={<FavoriteBorder style={{ color: 'white' }} />}
                                                        id={product._id}
                                                        checkedIcon={<Favorite style={{ color: 'red' }} />}
                                                        onClick={targetLikeProduct}
                                                        checked={
                                                            product?.me_liked &&
                                                            product?.me_liked[0]?.my_favorite
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </Badge>
                                            </Button>

                                            <Button className="view_btn">
                                                <img src={"/icons/shopping_cart.svg"} style={{ display: "flex" }} alt='' />
                                            </Button>

                                            <Button
                                            className="like_view_btn"
                                            style={{ display: "flex" }}>
                                            <Badge
                                                badgeContent={product.product_views}
                                                color="primary">
                                                <Checkbox
                                                icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                                                />
                                            </Badge>
                                            </Button>
                                        </Box>
                                        <Box className={'dish_desc'}>
                                            <span className={'dish_title_text'}>{product.product_name}</span>
                                            <div className={'dish_desc_text'}>
                                                <MonetizationOnIcon />{product.product_price}
                                            </div>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>

            <div className={'review_for_restaurant'}>
                <Container
                    sx={{ mt: '100px' }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box className={'category_title'}>About Restaurant</Box>
                    <Stack 
                        flexDirection={'row'} 
                        display={'flex'} 
                        justifyContent={'space-between'} 
                        width={'100%'}
                    >
                        <Box className={'review_box'}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <img src={'/community/man1.jpeg'} className={'review_img'} alt='' />
                            </Box>
                            <span className={'review_name'}>Ma Dong Seok</span>
                            <span className={'review_prof'}>User</span>
                            <p className={'review_desc'}>I really like the food of this restaurant. I recommend it to everyone</p>
                            <div className={'review_stars'}>
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                            </div>
                        </Box>

                        <Box className={'review_box'}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <img src={'/community/man2.jpg'} className={'review_img'} alt='' />
                            </Box>
                            <span className={'review_name'}>Burak Ozchivit</span>
                            <span className={'review_prof'}>User</span>
                            <p className={'review_desc'}>I really like the food of this restaurant. I recommend it to everyone</p>
                            <div className={'review_stars'}>
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                            </div>
                        </Box>

                        <Box className={'review_box'}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <img src={'/community/man3.jpg'} className={'review_img'} alt='' />
                            </Box>
                            <span className={'review_name'}>Jhon Biden</span>
                            <span className={'review_prof'}>User</span>
                            <p className={'review_desc'}>I really like the food of this restaurant. I recommend it to everyone</p>
                            <div className={'review_stars'}>
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                            </div>
                        </Box>

                        <Box className={'review_box'}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <img src={'/community/man4.jpg'} className={'review_img'} alt='' />
                            </Box>
                            <span className={'review_name'}>Thor</span>
                            <span className={'review_prof'}>User</span>
                            <p className={'review_desc'}>I really like the food of this restaurant. I recommend it to everyone</p>
                            <div className={'review_stars'}>
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: '#F2BD57' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                                <StarIcon style={{ color: 'whitesmoke' }} />
                            </div>
                        </Box>
                    </Stack>
                </Container>
            </div>

            <Container className="member_reviews">
                <Box className={'category_title'}>About Restaurant</Box>
                <Stack display={'flex'} flexDirection={'row'} width={'90%'} sx={{ mt: '70px' }}>
                <Box
                    className="about_left"
                    sx={{
                        backgroundImage: `url(/restaurant/burak.jpeg)`.replaceAll('\\','/'),
                    }}>
                    <div className="about_left_desc">
                    <span>Burak</span>
                    <p>The most delicious restaurant</p>
                    </div>
                </Box>
                <Box className="about_right">
                    {Array.from(Array(3).keys()).map((ele, index) => {
                    return (
                        <Box display="flex" flexDirection={"row"} key={index}>
                        <div className="about_right"></div>
                        <div className="about_right_desc">
                            <span>Our skilled chefs</span>
                            <p>
                                Our chefs are qualified in world-renowned universities
                                have increased
                            </p>
                        </div>
                        </Box>
                    );
                    })}
                </Box>
                </Stack>

                <Stack
                sx={{ mt: "60px" }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <Box className="category_title">Restaurant address</Box>
                <iframe
                    style={{ marginTop: "60px" }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.662082535496!2d128.73307947414523!3d35.832765721637685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bfffd7d52a9%3A0x3bf1460fc018e479!2sHomeplus%20Gyeongsan%20Branch!5e0!3m2!1sen!2sus!4v1700483407772!5m2!1sen!2sus"
                    width="1320"
                    height={"500"}
                    referrerPolicy="no-referrer-when-downgrade" title=' '></iframe>
                </Stack>
            </Container>
        </div>
    );
}