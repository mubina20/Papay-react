import React from "react";
import "../../../css/community.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { Box, Stack, Container, Tabs } from "@mui/material";
import { CommunityChats } from "./communityChats";
import { TargetArticles } from "./targetArticles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabPanel } from "@mui/lab";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export function CommunityPage(props: any) {
    //** INITIALIZATIONS **//
    const [value, setValue] = React.useState("1");

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const handlePaginationChange = (event: any, value: number) => {
        console.log(value);
    }

    return (
        <div className={"community_page"}>
            <div className={"community_frame"}>
                <Container sx={{ mt: "50px", mb: "50px" }}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"}>
                        <CommunityChats />
                        <Stack
                            className={"community_all_frame"}
                            inputMode={"text"}
                            style={{ border: "1px solid #fff" }}
                        >
                            <TabContext value={value}>
                                <Box className={"article_tabs"}>
                                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                            style={{ borderColor: "blue" }}
                                        >
                                            <Tab label="Barcha Maqolalar" value={"1"} />
                                            <Tab label="Mashxurlar" value={"2"} />
                                            <Tab label="Oshxonaga baho" value={"3"} />
                                            <Tab label="Hikoyalar" value={"4"} />
                                        </Tabs>
                                    </Box>
                                </Box>

                                <Box className={"article_main"}>
                                    <TabPanel value={"1"}>
                                        <TargetArticles 
                                            targetBoArticles={[1, 2, 3]}
                                            test={"Maqolalar"}
                                        />
                                    </TabPanel>
                                    <TabPanel value={"2"}>
                                        <TargetArticles 
                                            targetBoArticles={[1, 2, 3, 4, 5]} 
                                            test={"Mashhurlar"}
                                        />
                                    </TabPanel>
                                    <TabPanel value={"3"}>
                                        <TargetArticles 
                                            targetBoArticles={[1, 2]} 
                                        />
                                    </TabPanel>
                                    <TabPanel value={"4"}>
                                        <TargetArticles 
                                            targetBoArticles={[1, 2, 3, 4]} 
                                        />
                                    </TabPanel>
                                </Box>

                                <Box className={"article_bott"}>
                                    <Pagination
                                        count={5}
                                        page={1}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                components={{
                                                    previous: ArrowBackIcon,
                                                    next: ArrowForwardIcon,
                                                }}
                                                {...item}
                                                color={"secondary"}
                                            />
                                        )}
                                        onChange={handlePaginationChange}
                                    />
                                </Box>
                            </TabContext>
                        </Stack>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}
