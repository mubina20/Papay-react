import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Dispatch } from '@reduxjs/toolkit';
import { setMemberFollowings } from './slice';
import { retrieveMemberFollowings } from './selector';
import { Following, FollowSearchObj } from '../../../types/follow';
import FollowApiService from '../../apiServices/followApiService';
import { serverApi } from '../../../lib/config';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import { useHistory } from 'react-router-dom';
import { verifiedMemberData } from '../../apiServices/verify';
import { useEffect, useState } from "react";

// REDUX SLICE 
const actionDispatch = (dispatch: Dispatch) => ({
	setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
});

// REDUX SELECTOR 
const memberFollowingsRetriever = createSelector(retrieveMemberFollowings, (memberFollowings) => ({
	memberFollowings,
}));

export function MemberFollowing(props: any) {
  // INITIALIZATIONS 
	const history = useHistory();
	const { setFollowerRebuild, mb_id, followerRebuild } = props;
	const { setMemberFollowings } = actionDispatch(useDispatch());
	const { memberFollowings } = useSelector(memberFollowingsRetriever);
	const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ page: 1, limit: 5, mb_id: mb_id });

	useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowings(followingsSearchObj)
			.then((data) => setMemberFollowings(data))
			.catch((err) => console.log(err));
	}, [followingsSearchObj, followerRebuild]);

	// HANDLERS 
	const unsubscribeHandler = async (e: any, id: string) => {
		try {
			e.stopPropagation();
			assert.ok(verifiedMemberData, Definer.auth_err1);

			const followService = new FollowApiService();
			await followService.unsubscribe(id);

			await sweetTopSmallSuccessAlert('successfully unsubscribed', 700, false);
			setFollowerRebuild(!followerRebuild);
		} catch (error: any) {
			console.log(error);
			sweetErrorHandling(error).then();
		}
	};

	const handlePaginationChange = (event: any, value: number) => {
		followingsSearchObj.page = value;
		setFollowingsSearchObj({ ...followingsSearchObj });
	};

	const visitMemberHandler = (mb_id: string) => {
		history.push(`/member-page/other?mb_id=${mb_id}`);
		document.location.reload();
	};

  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serverApi}/${following.follow_member_data.mb_image}`
          : '/auth/default_user.svg';
        return (
          <Box className={"follow_box"}>
            <Avatar src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">{following?.follow_member_data?.mb_type}</span>
              <span className="name_text" >{following?.follow_member_data?.mb_nick}</span>
            </div>
            {props.actions_enabled &&(
              <Button
                variant="contained"
                startIcon={
                  <img src="/icons/follow_icon.svg" style={{ width: "40px", marginLeft: "16px" }} />
                }
                className="follow_cancel_btn"
                onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
              >
                UNFOLLOW
              </Button>
            )}
          </Box>
        );
      })}
      <Stack sx={{ my: '40px' }} direction="row" alignItems={'center'} justifyContent="center">
				<Box className="box_bottom">
					<Pagination
						count={followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3}
						page={followingsSearchObj.page}
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
						onChange={handlePaginationChange}
					/>
				</Box>
			</Stack>
    </Stack>
  );
}
