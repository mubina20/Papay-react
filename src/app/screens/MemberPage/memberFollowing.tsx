import { Box, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const followings = [
    { mb_nick: "Temur"},
    { mb_nick: "Yusuf"},
    { mb_nick: "Sherbek"}
];

export function MemberFollowing(props: any) {
	return (
		<Stack>
			{followings.map((following) => {
				const image_url = "/auth/default_user.svg";
				return (
					<Box className={'follow_box'}>
						<Avatar src={image_url} sx={{ width: 89, height: 89 }} />
						<div
							style={{
								width: '400px',
								display: 'flex',
								flexDirection: 'column',
								marginLeft: '25px',
								height: '85%',
							}}
						>
							<span className={'username_text'}>USER</span>
							<span className={'name_text'}>{following.mb_nick}</span>
						</div>

						{props.actions_enabled && (
							<Button
								variant={'contained'}
								startIcon={
                                    <img src={'/icons/follow_icon.svg'} alt='' style={{ width: '40px', marginLeft: '16px' }} />
                                }
								className={'follow_cancel_btn'}
							>
								Bekor Qilish
							</Button>
						)}
					</Box>
				);
			})}
			<Stack sx={{ my: '40px' }} direction="row" alignItems={'center'} justifyContent="center">
				<Box className="box_bottom">
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
		</Stack>
	);
}
