import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '../../context/socket';
import { verifiedMemberData } from '../../apiServices/verify';
import { ChatGreetMsg, ChatInfoMsg, Chatmessage } from '../../../types/others';
import { sweetErrorHandling, sweetFailureProvider } from '../../../lib/sweetAlert';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import { RippleBadge } from '../../MaterialTheme/styled';

const NewMessage = (data: any) => {
    
	// console.log(data.new_message);
	if (data.new_message.mb_id == verifiedMemberData?._id) {
		return (
			<Box
				flexDirection={'row'}
				style={{ display: 'flex' }}
				alignItems={'flex-end'}
				justifyContent={'flex-end'}
				sx={{ m: '10px 0px' }}
			>
				<div className={'msg_right'}> {data.new_message.msg} </div>
			</Box>
		);
	} else {
		return (
            <Box
                flexDirection={'row'} 
                style={{ display: 'flex' }} 
                sx={{ m: '10px 0px' }}
            >
                <Avatar src={data.new_message.mb_image} alt={data.new_message.mb_nick} />
                <div className={'msg_left'}> {data.new_message.msg} </div>
            </Box>
		);
	};
};

export function CommunityChats() {
	// INITIALIZATIONS 
	const [messagesList, setMessagesList] = useState([]);
	const socket = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const textInput: any = useRef(null);
	const [message, setMessage] = useState<string>("");

    useEffect(() => { 
		socket.connect();
		console.log('PRINTED');

		socket?.on('connect', function () {
			console.log('CLIENT: Connected');
		});

		socket?.on('newMsg', (new_message: Chatmessage) => {
			console.log('CLIENT: NEW Message');

            messagesList.push(
				// @ts-ignore
				<NewMessage new_message={new_message} key={messagesList.length} />
			);
			setMessagesList([...messagesList]);
		});

		socket?.on('greetMsg', (greetMsg: ChatGreetMsg) => {
			console.log('CLIENT: GREET Message');

            messagesList.push(
				//@ts-ignore
				<p
					style={{
						textAlign: 'center',
						fontSize: 'large',
						fontFamily: 'serif',
					}}
				>
					{greetMsg.text}, dear {verifiedMemberData?.mb_nick ?? 'guest'}
				</p>,
			);
			setMessagesList([...messagesList]);
		});

		socket?.on('infoMsg', (msg: ChatInfoMsg) => {
			console.log('CLIENT: INFO Message');
			setOnlineUsers(msg.total);
		});

		return () => {
			socket.disconnect();
		};
	}, [socket]);

    // HANDLERS
    const getInputMessageHandler = useCallback((e: any) => {
        const text = e.target.value;
        setMessage(text);
    }, [message]);

	const getKeyHandler = (e: any) => {
		try {
			if (e.key == 'Enter') {
				assert.ok(message, Definer.input_err3);
				onClickHandler();
			}
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const onClickHandler = () => {
		try {
			if (!verifiedMemberData) {
                // Clean input
				textInput.current.value = "";
				sweetFailureProvider('Please login first', true);
				return false;
			};

            // Clean input
			textInput.current.value = "";
			assert.ok(message, Definer.input_err3);

			const mb_image_url = verifiedMemberData?.mb_image ?? '/auth/default_user.svg';

            // Send message to socket
			socket.emit('createMsg', {
				msg: message,
				mb_id: verifiedMemberData?._id,
				mb_nick: verifiedMemberData?.mb_nick,
				mb_image: mb_image_url,
			});

			setMessage("");
		} catch (err: any) {
			console.log(`ERROR :: onClickHandler, ${err}`);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Stack className={'chat_frame'}>
			<Box className={'chat_top'}> 
                Jonli Muloqot 
                <RippleBadge style={{ margin: '-30px 0 0 20px' }} badgeContent={onlineUsers} />
            </Box>
			<Box className={'chat_content'}>
				<Stack className={'chat_main'}>
					<Box flexDirection={'row'} style={{ display: 'flex' }} sx={{ m: '10px 0px' }}>
						<div className={'msg_left'}> Bu yer jonli muloqot </div>
                        
					</Box>
                    {messagesList}
				</Stack>
			</Box>
			<Box className={'chat_bott'}>
				<input
                    ref={textInput}
					type={'text'}
					name={'message'}
					className={'msg_input'}
					placeholder={"Send message"}
                    onKeyDown={getKeyHandler}
                    onChange={getInputMessageHandler}
				/>
				<button className={'send_msg_btn'} onClick={onClickHandler}>
					<SendIcon style={{ color: '#fff' }} />
				</button>
			</Box>
		</Stack>
	);
}
