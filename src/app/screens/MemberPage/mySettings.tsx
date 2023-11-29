import { Box, Stack, Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export function MySettings(props: any) {
	return (
		<Stack className={'my_settings_page'}>
			<Box className={'member_media_frame'}>
				<img 
                    src={"/auth/default_user.svg"} 
                    alt=''
                    className={'mb_image'} 
                    style={{ borderRadius: '50%' }} 
                    width={'100px'} height={'100px'} 
                />
				<div className={'media_change_box'}>
					<span>Image Upload</span>
					<p>You can upload "JPG", "JPEG", "PNG" images!</p>
					<div className={'up_del_box'}>
						<Button component="label" style={{ minWidth: '0' }}>
							<CloudDownloadIcon />
							<input type="file" hidden />
						</Button>
					</div>
				</div>
			</Box>
			<Box className={'input_frame'}>
				<div className={'long_input'}>
					<label className={'spec_label'}>Name</label>
					<input
						className={'spec_input mb_nick'}
						type="text"
						placeholder="Ismailov Akmal"
						name="mb_nick"
					/>
				</div>
			</Box>
			<Box className={'input_frame'}>
				<div className={'short_input'}>
					<label className={'spec_label'}>Tel </label>
					<input
						className={'spec_input mb_phone'}
						type="text"
						placeholder="010-1234-5678"
						name="mb_phone"
					/>
				</div>
				<div className={'short_input'}>
					<label className={'spec_label'}>Address</label>
					<input
						className={'spec_input  mb_address'}
						type="text"
						placeholder="No Address included"
						name="mb_address"
					/>
				</div>
			</Box>
			<Box className={'input_frame'}>
				<div className={'long_input'}>
					<label className={'spec_label'}>Information</label>
					<textarea
						className={'spec_textarea mb_description'}
						placeholder="Not available"
						name="mb_description"
					/>
				</div>
			</Box>
			<Box display={'flex'} justifyContent={'flex-end'} sx={{ mt: '25px' }}>
				<Button variant={'contained'}>
					Save
				</Button>
			</Box>
		</Stack>
	);
}
