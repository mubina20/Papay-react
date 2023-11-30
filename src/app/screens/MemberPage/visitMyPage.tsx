import React, {useState} from 'react';
import { Box, Container, Stack, Button, Tab, Pagination, PaginationItem } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { MemberPosts } from './memberPosts';
import { MemberFollowers } from './memberFollowers';
import { MemberFollowing } from './memberFollowing';
import { MySettings } from './mySettings';

// MUI ICONS
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TuiEditor } from '../../components/tuiEditor/TuiEditor';
import TViewer from '../../components/tuiEditor/TViewer';

export function VisitMyPage(props: any) {
	/** INITIALIZATIONS **/
	const [value, setValue] = useState("1");

	/** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

	return (
		<div className={'my_page'}>
			<Container maxWidth="lg" sx={{ mt: '50px', mb: '50px' }}>
				<Stack className={'my_page_frame'}>
					<TabContext value={value}>
						<Stack className={'my_page_left'}>
							<Box display={'flex'} flexDirection={'column'}>
								<TabPanel value={'1'}>
									<Box className={'menu_name'}>My Articles</Box>
									<Box className={'menu_content'}>
										<MemberPosts />
										<Stack sx={{ my: '40px' }} direction="row" alignItems="center" justifyContent="center">
											<Box className={'bottom_box'}>
												<Pagination
													count={3}
													page={1}
													renderItem={(item) => (
														<PaginationItem
															components={{
																previous: ArrowBackIcon,
																next: ArrowForwardIcon,
															}}
															{...item}
															color={'secondary'}
														/>
													)}
												/>
											</Box>
										</Stack>
									</Box>
								</TabPanel>

								<TabPanel value={'2'}>
									<Box className={'menu_name'}>Followers</Box>
									<Box className={'menu_content'}>
										<MemberFollowers actions_enabled={true} />
									</Box>
								</TabPanel>

								<TabPanel value={'3'}>
									<Box className={'menu_name'}>Following</Box>
									<Box className={'menu_content'}>
										<MemberFollowing actions_enabled={true} />
									</Box>
								</TabPanel>

								<TabPanel value={'4'}>
									<Box className={'menu_name'}>Writing an article</Box>
									<Box className={'write_content'}>
										<TuiEditor />
									</Box>
								</TabPanel>

								<TabPanel value={'5'}>
									<Box className={'menu_name'}>Featured Article</Box>
									<Box className={'menu_content'}>
										<TViewer text={`<h3>HELLO</h3.`}/>
									</Box>
								</TabPanel>

								<TabPanel value={'6'}>
									<Box className={'menu_name'}>Change Information</Box>
									<Box className={'menu_content'}>
                                        <MySettings />
                                    </Box>
								</TabPanel>
							</Box>
						</Stack>

						<Stack className={'my_page_right'}>
							<Box className={'order_info_box'}>
								<a onClick={(e) => setValue('6')} className={'settings_btn'}>
									<SettingsIcon />
								</a>
								<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
									<div className={'order_user_img'}>
										<img src={"/auth/default_user.svg"} className="order_user_avatar" alt='' />
										<div className="order_user_icon_box">
											<img src={"/icons/user_icon.svg"} alt="" />
										</div>
									</div>
									<span className={'order_user_name'}>Ismailov Akmal</span>
									<span className={'order_user_prof'}>USER</span>
								</Box>

								<Box className={'user_media_box'}>
									<FacebookIcon sx={{ cursor: "pointer" }} />
									<InstagramIcon sx={{ cursor: "pointer" }} />
									<TelegramIcon sx={{ cursor: "pointer" }} />
									<YouTubeIcon sx={{ cursor: "pointer" }} />
								</Box>

								<Box className={'user_media_box'}>
									<p className={'follows'}>Followers: 3</p>
									<p className={'follows'}>Followings: 2</p>
								</Box>
								<p className={'user_desc'}>No additional information is included</p>

								<Box display={'flex'} justifyContent={'flex-end'} sx={{ mt: '10px' }}>
									<TabList onChange={handleChange} aria-label="lab API tabs example">
										<Tab
											style={{ flexDirection: 'column' }}
											value={'4'}
											component={() => (
												<Button variant={'contained'} onClick={() => setValue('4')}>
													Writing an article
												</Button>
											)}
										/>
									</TabList>
								</Box>
							</Box>

							<Box className={'my_page_menu'}>
								<TabList
									onChange={handleChange}
									aria-label="Vertical tabs example"
								>
									<Tab
										style={{ flexDirection: 'column' }}
										value={'1'}
										component={() => (
											<div className={`menu_box `} onClick={() => setValue('1')}>
												<img src={'/icons/post.svg'} alt=''/>
												<span>My Articles</span>
											</div>
										)}
									/>
									<Tab
										style={{ flexDirection: 'column' }}
										value={'2'}
										component={() => (
											<div className={`menu_box  `} onClick={() => setValue('2')}>
												<img src={'/icons/followers.svg'} alt='' />
												<span>Follower</span>
											</div>
										)}
									/>
									<Tab
										style={{ flexDirection: 'column' }}
										value={'3'}
										component={() => (
											<div className={`menu_box `} onClick={() => setValue('3')}>
												<img src={'/icons/following.svg'} alt='' />
												<span>Following</span>
											</div>
										)}
									/>
								</TabList>
							</Box>
						</Stack>
					</TabContext>
				</Stack>
			</Container>
		</div>
	);
}