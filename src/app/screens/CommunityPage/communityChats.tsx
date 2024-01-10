import { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '../../context/socket';

export function CommunityChats() {
	// INITIALIZATIONS 
	const [messagesList, setMessagesList] = useState([]);
	const socket = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState<number>(0);

    useEffect(() => { 
		socket.connect();
		console.log('PRINTED');

		socket?.on('connect', function () {
			console.log('CLIENT: Connected');
		});

		socket?.on('newMsg', (new_message: any) => {
			console.log('CLIENT: NEW Message');
		});

		socket?.on('greetMsg', (greetMsg: any) => {
			console.log('CLIENT: GREET Message');
		});

		socket?.on('infoMsg', (msg: any) => {
			console.log('CLIENT: INFO Message');
			setOnlineUsers(msg.total);
		});

		return () => {
			socket.disconnect();
		};
	}, [socket]);

    // HANDLERS

	return (
		<Stack className={'chat_frame'}>
			<Box className={'chat_top'}> Jonli Muloqot {onlineUsers}</Box>
			<Box className={'chat_content'}>
				<Stack className={'chat_main'}>
					<Box flexDirection={'row'} style={{ display: 'flex' }} sx={{ m: '10px 0px' }}>
						<div className={'msg_left'}> Bu yer jonli muloqot </div>
					</Box>
                    <Box
                        flexDirection={'row'} 
                        style={{ display: 'flex' }} 
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: '10px 0px' }}
                    >
                        <div className={'msg_right'}> Assalomu alaykum </div>
                    </Box>
                    <Box
                        flexDirection={'row'} 
                        style={{ display: 'flex' }} 
                        sx={{ m: '10px 0px' }}
                    >
                        <Avatar alt={'Ali'} src={"/community/man2.jpg"} />
                        <div className={'msg_left'}> Va alaykum assalom </div>
                    </Box>
                    <Box
                        flexDirection={'row'} 
                        style={{ display: 'flex' }} 
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: '10px 0px' }}
                    >
                        <div className={'msg_right'}> Ishlaringiz yaxshimi? </div>
                    </Box>
                    <Box
                        flexDirection={'row'} 
                        style={{ display: 'flex' }} 
                        sx={{ m: '10px 0px' }}
                    >
                        <Avatar alt={'Ali'} src={"/community/man2.jpg"} />
                        <div className={'msg_left'}> Yaxshi </div>
                    </Box>
				</Stack>
			</Box>
			<Box className={'chat_bott'}>
				<input
					type={'text'}
					name={'message'}
					className={'msg_input'}
					placeholder={"Send message"}
				/>
				<button className={'send_msg_btn'} >
					<SendIcon style={{ color: '#fff' }} />
				</button>
			</Box>
		</Stack>
	);
}
