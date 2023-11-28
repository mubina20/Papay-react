import { Avatar, Box, Container, Stack } from '@mui/material';

export function Recommendations() {
	return (
		<div className="top_article_frame">
			<Container maxWidth="lg" sx={{ mb: '50px', mt: '60px' }} style={{ position: 'relative' }}>
				<Stack flexDirection={'column'} 
						alignItems={'center'} 
						sx={{ mt: '45px' }}
				>
					<Box className={'category_title'}>Recommended articles</Box>
					<Stack className={'article_main'} flexDirection={'row'}>
						<Stack className={'article_container'}>
							<Box className={'article_category'}>Most viewed articles</Box>
							
							<Stack className={'article_box'}>
								<Box
									className={'article_img'}
									sx={{ backgroundImage: `url(https://img.freepik.com/premium-photo/shawarma-shaurma-kebab-with-meat-vegetable-salad-and-french-fries-black-background-top-view_89816-42084.jpg)` }}
								></Box>
								<Box className={'article_info'}>
									<Box className={'article_main_info'}>
										<div className={'article_author'}>
											<Avatar
                                                alt="Author_photo" 
                                                src={ "/auth/default_user.svg" }
                                                sx={{ width: '35px', height: '35px', mr: '12px' }} 
                                            />
									        <span className={'author_username'}>Samo</span>
										</div>
										<span className={'article_title'}>The most interesting and sweet dishes</span>
										<p className={'article_desc'}></p>
									</Box>
                                </Box>
                            </Stack>

                            <Stack className={'article_box'}>
								<Box
									className={'article_img'}
									sx={{ backgroundImage: `url(https://img.freepik.com/premium-photo/shawarma-shaurma-kebab-with-meat-vegetable-salad-and-french-fries-black-background-top-view_89816-42084.jpg)` }}
								></Box>
								<Box className={'article_info'}>
									<Box className={'article_main_info'}>
										<div className={'article_author'}>
											<Avatar
                                                alt="Author_photo" 
                                                src={ "/auth/default_user.svg" }
                                                sx={{ width: '35px', height: '35px', mr: '12px' }} 
                                            />
									        <span className={'authot_username'}>Samo</span>
										</div>
										<span className={'article_title'}>The most interesting and sweet dishes</span>
										<p className={'article_desc'}></p>
									</Box>
                                </Box>
                            </Stack>

							<Box className={'article_category'} sx={{ marginTop: '10px' }}>
								Most liked articles
							</Box>

                            <Stack className={'article_box'}>
								<Box
									className={'article_img'}
									sx={{
										backgroundImage: `url(https://img.freepik.com/premium-photo/shawarma-shaurma-kebab-with-meat-vegetable-salad-and-french-fries-black-background-top-view_89816-42084.jpg)`,
									}}
								></Box>
								<Box className={'article_info'}>
									<Box className={'article_main_info'}>
										<div className={'article_author'}>
											<Avatar
                                                alt="Author_photo" 
                                                src={ "/auth/default_user.svg" }
                                                sx={{ width: '35px', height: '35px', mr: '12px' }} 
                                            />
											<span className={'authot_username'}>Samur</span>
										</div>
										<span className={'article_title'}>The taste of Shaurma is special</span>
										<p className={'article_desc'}></p>
									</Box>
								</Box>
							</Stack>

                            <Stack className={'article_box'}>
								<Box
									className={'article_img'}
									sx={{
										backgroundImage: `url(https://img.freepik.com/premium-photo/shawarma-shaurma-kebab-with-meat-vegetable-salad-and-french-fries-black-background-top-view_89816-42084.jpg)`,
										
										backgroundSize: "cover",
										width: '100%', height: '100%'
									}}
								></Box>
								<Box className={'article_info'}>
									<Box className={'article_main_info'}>
										<div className={'article_author'}>
											<Avatar
                                                alt="Author_photo" 
                                                src={ "/auth/default_user.svg" }
                                                sx={{ width: '35px', height: '35px', mr: '12px' }} 
                                            />
											<span className={'authot_username'}>Samur</span>
										</div>
										<span className={'article_title'}>The taste of Shaurma is special</span>
										<p className={'article_desc'}></p>
									</Box>
								</Box>
							</Stack>
						</Stack>
                        

						<Stack className={'article_container'}>
							<Box className={'article_category'}>celebrities</Box>
                            <Box className={"article_news"}>
                                <h1 style={{ color: "orange" }}>TViewer</h1>
                            </Box>
                            <Box className={"article_news"}>
                                <h1 style={{ color: "orange" }}>TViewer</h1>
                            </Box>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}