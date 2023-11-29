import { Box, Stack, Avatar, Button } from '@mui/material';

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

						{props.actions_enabled ? (
							<Button
								variant={'contained'}
								startIcon={
                                    <img src={'/icons/follow_icon.svg'} alt='' style={{ width: '40px', marginLeft: '16px' }} />
                                }
								className={'follow_cancel_btn'}
							>
								Unfollow
							</Button>
						) : (
							<p>HELLO</p>
						)}
					</Box>
				);
			})}
		</Stack>
	);
}
