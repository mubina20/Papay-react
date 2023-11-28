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

const restaurant_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(8).keys());

export function OneRestaurant() {
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
                            {restaurant_list.map((ele, order) => {
                                return (
                                    <SwiperSlide
                                        style={{ cursor: 'pointer' }}
                                        key={order}
                                        className="restaurant_avatars"
                                    >
                                        <img src={"/restaurant/burak.jpeg"} alt='' />
                                        <span>Burak</span>
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
                            <Button variant={'contained'} color="secondary">
                                new
                            </Button>
                            <Button variant={'contained'} color="secondary">
                                price
                            </Button>
                            <Button variant={'contained'} color="secondary">
                                likes
                            </Button>
                            <Button variant={'contained'} color="secondary">
                                views
                            </Button>
                        </Box>
                    </Stack>

                    <Stack style={{ width: '100%', display: 'flex', minHeight: '600px' }} flexDirection={'row'}>
                        <Stack className={'dish_category_box'}>
                            <div className={'dish_category_main'}>
                                <Button variant={'contained'} color="secondary">
                                    other
                                </Button>
                                <Button variant={'contained'} color="secondary">
                                    deserts
                                </Button>
                                <Button variant={'contained'} color="secondary">
                                    drinks
                                </Button>
                                <Button variant={'contained'} color="secondary">
                                    salads
                                </Button>
                                <Button variant={'contained'} color="secondary">
                                    dishes
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={'dish_wrapper'}>
                            {product_list.map((ele, index) => {
                                const size_volume = "normal size";

                                return (
                                    <Box className={"dish_box"} key={`${index}`}>
                                        <Box
                                            className={'dish_img'}
                                            sx={{
                                                backgroundImage: `url("/others/pide.jpg")`,
                                            }}
                                        >
                                            <div className={'dish_sale'}> {size_volume} </div>

                                            <Button className={'like_view_btn'} style={{ left: '36px' }}>
                                                <Badge badgeContent={8} color="primary">
                                                    <Checkbox
                                                        icon={<FavoriteBorder style={{ color: 'white' }} />}
                                                        id={`${index}`}
                                                        checkedIcon={<Favorite style={{ color: 'red' }} />}
                                                        checked={
                                                            true
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
                                                badgeContent={8}
                                                color="primary">
                                                <Checkbox
                                                icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                                                />
                                            </Badge>
                                            </Button>
                                        </Box>
                                        <Box className={'dish_desc'}>
                                            <span className={'dish_title_text'}>Pida</span>
                                            <div className={'dish_desc_text'}>
                                                <MonetizationOnIcon />
                                                    {10}
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