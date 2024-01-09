import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CommunityApiService from '../../apiServices/communityApiService';
import { serverApi } from '../../../lib/config';
import { BoArticleInput } from '../../../types/boArticle';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import { useHistory } from 'react-router-dom';

export const TuiEditor = (props: any) => {
	// INITIALIZATIONS
	const history = useHistory();
    const editorRef = React.createRef<Editor>();
	const [communityArticleData, setCommunityArticleData] = useState<BoArticleInput>({
		art_subject: "",
		bo_id: "",
		art_content: "",
		art_image: "",
	});

	// HANDLERS
	const uploadImage = async (image: any) => {
		try {
			const communityService = new CommunityApiService();
			const image_name = await communityService.uploadImageToServer(image);

			communityArticleData.art_image = image_name;
			setCommunityArticleData({ ...communityArticleData });

			const source = `${serverApi}/${image_name}`;
			return source;
		} catch (err) {
    		console.log(`ERROR :: uploadImage, ${err}`);
		}
	};

	const changeCategoryHandle = (e: any) => {
		communityArticleData.bo_id = e.target.value;
		setCommunityArticleData({ ...communityArticleData });
	};

	// const changeTitleHandle = (e: any) => {
	// 	communityArticleData.art_subject = e.target.value;
	// 	setCommunityArticleData({ ...communityArticleData });
	// };

	const changeTitleHandle = useCallback(
		(e: any) => {
			communityArticleData.art_subject = e.target.value;
			setCommunityArticleData({ ...communityArticleData });
		},
		[communityArticleData.art_subject]
	);

	const handleRegisterButton = async () => {
		try {
			const editor: any = editorRef.current;
			const art_content = editor?.getInstance().getHTML();

			communityArticleData.art_content = art_content;
			console.log("communityArticleData :: :: ", communityArticleData);

			assert.ok(
				communityArticleData.art_content !== "" &&
				communityArticleData.art_subject !== "" &&
				communityArticleData.bo_id !== "",
				Definer.input_err1
			);
			

			const communityService = new CommunityApiService();
			await communityService.createArticles(communityArticleData);
			await sweetTopSmallSuccessAlert("Article is created successfully!");
			props.setArticlesRebuild(new Date());
			props.setValue("1");
		} catch (err) {
			console.log(`ERROR :: handleRegisterButton, ${err}`);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Stack>
			<Stack direction="row" style={{ margin: '40px' }} justifyContent="space-evenly">
				<Box className={'form_row'} style={{ width: '300px' }}>
					<Typography style={{ color: 'rgb(225 255 233)', margin: '10px' }} variant="h3">
						Category
					</Typography>
					<FormControl sx={{ width: '100%', background: 'white' }}>
						<Select
                            value={communityArticleData.bo_id} 
                            displayEmpty 
                            inputProps={{ 'aria-label': 'Without label' }}
							onChange={changeCategoryHandle}
                        >
							<MenuItem value=""><span>Select a category</span></MenuItem>
							<MenuItem value={'celebrity'}>Celebrities</MenuItem>
							<MenuItem value={'evaluation'}>Rate the restaurant</MenuItem>
							<MenuItem value={'story'}>My Story</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box className={'form_row'} style={{ width: '300px' }}>
					<Typography style={{ color: 'rgb(225 255 233)', margin: '10px' }} variant="h3">
                    Subject
					</Typography>
					<TextField
                        id="filled-basic"
                        label="Subject" 
                        variant="filled" 
                        style={{ 
                        width: '300px',
                        background: 'white' }} 
						onChange={changeTitleHandle}
                    />
				</Box>
			</Stack>

			{/*@ts-ignore*/}	
			<Editor
				ref={editorRef}
				initialValue="Type here"
				placeholder="Type here"
				previewStyle="vertical"
				height="640px"
				initialEditType="wysiwyg"
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['image', 'table', 'link'],
					['ul', 'ol', 'task'],
				]}
				hooks={{
					addImageBlobHook: async (image: any, callback: any) => {
						const uploadImageURL = await uploadImage(image);
						console.log('uploadImageUrl:', uploadImageURL);
						callback(uploadImageURL);
						return false;
					},
				}}
				events={{
					load: function (param: any) {},
				}}
			/>
			<Stack direction="row" justifyContent="center">
				<Button 
                    variant="contained"
                    color="primary" 
                    style={{
                    margin: '30px', 
                    width: '250px', 
                    height: '45px' }}
					onClick={handleRegisterButton}
                >
					Register
				</Button>
			</Stack>
		</Stack>
	);
};