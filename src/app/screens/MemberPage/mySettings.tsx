import { Box, Stack, Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { verifiedMemberData } from '../../apiServices/verify';
import { useState } from 'react';
import { MemberUpdateData } from '../../../types/user';
import { Definer } from '../../../lib/Definer';
import assert from 'assert';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import MemberApiService from '../../apiServices/memberApiServise';

export function MySettings(props: any) {
	// INITIALIZATIONS
	const [file, setFile] = useState(verifiedMemberData?.mb_image);
	const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
		mb_nick: "",
		mb_phone: "",
		mb_address: "",
		mb_description: "",
		mb_image: ""
	});

	// HANDLERS
	const changeMemberNickHandler = (e: any) => {
		memberUpdate.mb_nick = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};

	const changeMemberPhoneHandler = (e: any) => {
		memberUpdate.mb_phone = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};

	const changeMemberAdressHandler = (e: any) => {
		memberUpdate.mb_address = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};

	const changeMemberDescriptionHandler = (e: any) => {
		memberUpdate.mb_description = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};

	const handleImagePreviewer = (e: any) => {
		try {
			console.log("handleImagePreviewer ::  e.target.files :: ", e.target.files);
			const file = e.target.files[0];

			const fileType = file['type'],
				validTypes = ['image/lpg', 'image/jpeg', 'image/png'];
			assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

			memberUpdate.mb_image = file;
			setMemberUpdate({ ...memberUpdate });
			setFile(URL.createObjectURL(file));
		} catch (err) {
			console.log(`ERROR :: handleImagePreviewer, ${err}`);
			sweetErrorHandling(err).then();
		}
	};

	const handleSubmitButton = async () => {
		try {
			const memberService = new MemberApiService();
			const result = await memberService.updateMemberData(memberUpdate);

			assert.ok(result, Definer.general_err1);
			await sweetTopSmallSuccessAlert('Information modified successfully!', 700, false);
    		window.location.reload();
		} catch (err) {
			console.log(`ERROR ::: handleImagePreviewer, ${err}`);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Stack className={'my_settings_page'}>
			<Box className={'member_media_frame'}>
				<img 
                    src={file} 
                    alt=''
                    className={'mb_image'} 
                    style={{ borderRadius: '50%' }} 
                    width={'100px'} height={'100px'} 
                />
				<div className={'media_change_box'}>
					<span>Image Upload</span>
					<p>You can upload "JPG", "JPEG", "PNG" images!</p>
					<div className={'up_del_box'}>
						<Button component="label" style={{ minWidth: '0' }} onChange={handleImagePreviewer}>
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
						placeholder={verifiedMemberData?.mb_nick}
						name="mb_nick"
						onChange={changeMemberNickHandler}
					/>
				</div>
			</Box>
			<Box className={'input_frame'}>
				<div className={'short_input'}>
					<label className={'spec_label'}>Tel</label>
					<input
						className={'spec_input mb_phone'}
						type="text"
						placeholder={verifiedMemberData?.mb_phone}
						name="mb_phone"
						onChange={changeMemberPhoneHandler}
					/>
				</div>
				<div className={'short_input'}>
					<label className={'spec_label'}>Address</label>
					<input
						className={'spec_input  mb_address'}
						type="text"
						placeholder={verifiedMemberData?.mb_address ?? "No Address included"}
						name="mb_address"
						onChange={changeMemberAdressHandler}
					/>
				</div>
			</Box>
			<Box className={'input_frame'}>
				<div className={'long_input'}>
					<label className={'spec_label'}>Information</label>
					<textarea
						className={'spec_textarea mb_description'}
						placeholder={verifiedMemberData?.mb_description ?? "Not available"}
						name="mb_description"
						onChange={changeMemberDescriptionHandler}
					/>
				</div>
			</Box>
			<Box display={'flex'} justifyContent={'flex-end'} sx={{ mt: '25px' }}>
				<Button variant={'contained'} onClick={handleSubmitButton}>
					Save
				</Button>
			</Box>
		</Stack>
	);
}
