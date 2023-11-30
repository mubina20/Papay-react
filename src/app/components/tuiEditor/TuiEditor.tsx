import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField } from '@mui/material';
import React from 'react';

export const TuiEditor = () => {
    const editorRef = React.createRef<Editor>();

	return (
		<Stack>
			<Stack direction="row" style={{ margin: '40px' }} justifyContent="space-evenly">
				<Box className={'form_row'} style={{ width: '300px' }}>
					<Typography style={{ color: 'rgb(225 255 233)', margin: '10px' }} variant="h3">
						Category
					</Typography>
					<FormControl sx={{ width: '100%', background: 'white' }}>
						<Select
                            value={'celebrity'} 
                            displayEmpty 
                            inputProps={{ 'aria-label': 'Without label' }}
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
                    />
				</Box>
			</Stack>

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
					addImageBlobHook: async (_image: any) => {
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
                >
					Register
				</Button>
			</Stack>
		</Stack>
	);
};