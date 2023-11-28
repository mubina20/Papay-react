import { Box, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const followers = [
    { mb_nick: "Botir", following: true },
    { mb_nick: "Jonibek", following: false },
    { mb_nick: "Ali", following: true }
];

export function MemberFollowers(props: any) {
	return (
		<Stack>
			{followers.map((follower) => {
				const image_url = "/auth/default_user.svg";
				return (
					<Box className={'follow_box'}>
						<Avatar
							alt={''}
							style={{ cursor: 'pointer' }}
							src={image_url}
							sx={{ width: 89, height: 89 }}
						/>
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
							<span className={'name_text'}>{follower.mb_nick}</span>
						</div>
						{props.actions_enabled &&
							(follower.following ? (
								<Button variant={'contained'} className={'following_already'} disabled>
									FOLLOWING
								</Button>
							) : (
								<Button
									variant={'contained'}
									startIcon={
                                        <img src={'/icons/follow_icon.svg'} alt='' style={{ width: '40px' }} />
                                    }
									className={'follow_btn'}
								>
									Follow Back
								</Button>
							))}
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
