import { useEffect, useState } from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import TViewer from "../../components/tuiEditor/TViewer";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveChosenMember,
  retrieveChosenSingleBoArticle,
  retrieveChosenMemberBoArticles,
} from "./selector";
import { createSelector } from "reselect";
import { Member } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiServise";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member) => dispach(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispach(setChosenSingleBoArticle(data)),
});

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember, 
  (chosenMember) => ({
	  chosenMember
  })
);
const chosenMemberBoArticleRetriever = createSelector(
  retrieveChosenMemberBoArticles, 
  (chosenMemberBoArticles) => ({
	  chosenMemberBoArticles
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle, 
  (chosenSingleBoArticle) => ({
	  chosenSingleBoArticle
  })
);

export function VisitMyPage(props: any) {
  // INITIALIZIATIONS
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());

  const [value, setValue] = useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowerRebuild] = useState<Boolean>(false);
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(chosenMemberBoArticleRetriever);
	const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [memberArticleSearchObj, setMemberArticleSearchObj] = useState<SearchMemberArticlesObj>({
		mb_id: 'none',
		page: 1,
		limit: 5,
	});
  console.log("chosenMemberBoArticles :: ", chosenMemberBoArticles)
  console.log("chosenSingleBoArticles :: ", chosenSingleBoArticle)

  
  useEffect(() => {
		if (!localStorage.getItem("member_data")) {
			sweetFailureProvider('Please login first!', true, true);
		}

    const communityService = new CommunityApiService();
		communityService
			.getMemberCommunityArticles(memberArticleSearchObj)
			.then((data) => setChosenMemberBoArticles(data))
			.catch((err) => console.log(err));

    const memberService = new MemberApiService();
		memberService
			.getChosenMember(verifiedMemberData?._id)
			.then((data) => setChosenMember(data))
			.catch((err) => console.log(err));
  }, [memberArticleSearchObj, articlesRebuild]);
  

  // HANDLERS
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
		memberArticleSearchObj.page = value;
		setMemberArticleSearchObj({ ...memberArticleSearchObj });
	};

  const renderChosenArticleHandler = async (art_id: string) => {
		try {
			const communityService = new CommunityApiService();
		  communityService
				.getChosenArticle(art_id)
				.then((data) => {
					setChosenSingleBoArticle(data)
					setValue("5")
				})
				.catch((err) => console.log(err));
		} catch (err: any) {
			console.log(err);
			sweetErrorHandling(err).then();
		}
	};

  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">My Articles</Box>
                  <Box className="menu_content">
                    <MemberPosts 
                      chosenMemberBoArticles={chosenMemberBoArticles}
											renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={memberArticleSearchObj.page >= 3 ? memberArticleSearchObj.page + 1 : 3}
													page={memberArticleSearchObj.page}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color="secondary"
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers 
                      actions_enabled={true} 
                      followerRebuild={followRebuild}
                      setFollowerRebuild={setFollowerRebuild}
                      mb_id={props.verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing 
                      actions_enabled={true} 
                      followerRebuild={followRebuild}
                      setFollowerRebuild={setFollowerRebuild}
                      mb_id={verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Writing article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor />
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Featured Article</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>

                <TabPanel value={"6"}>
                  <Box className={"menu_name"}>Change Information</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className="my_page_right">
              <Box className="order_info_box">
                <a onClick={() => setValue("6")} className="settings_btn">
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className="order_user_img">
                    <img
                      src={chosenMember?.mb_image ? `${serverApi}/${chosenMember.mb_image}` : '/auth/default_user.svg'}
                      className="order_user_avatar"
                      alt=""
                    />
                    <div className="order_user_icon_box">
                      <img src={chosenMember?.mb_type === 'RESTAURANT' ? '/auth/restaurant.svg' : '/icons/user_icon.svg'} alt="" />
                    </div>
                  </div>
                  <span className="order_user_name">{chosenMember?.mb_nick}</span>
                  <span className="order_user_prof">{chosenMember?.mb_type}</span>
                </Box>
                <Box className={"user_media_box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <Box className={"user_media_box"}>
                  <p className="follows">Followers: {chosenMember?.mb_subscriber_cnt}</p>
                  <p className="follows">Followings: {chosenMember?.mb_follow_cnt}</p>
                </Box>
                <p className="user_desc">{chosenMember?.mb_description ?? "No additional information is included"}</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <Tabs
                  value={value}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={() => (
                        <Button
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Writing article
                        </Button>
                      )}
                    />
                  </Tabs>
                </Box>
              </Box>

              <Box className={"my_page_menu"}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ borderRight: 1, borderColor: 'divider', width: '350px' }}
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("1")}
                      >
                        <img src="/icons/post.svg" alt="" />
                        <span>My Articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/followers.svg" alt="" />
                        <span>Follower</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <img src="/icons/following.svg" alt="" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </Tabs>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}