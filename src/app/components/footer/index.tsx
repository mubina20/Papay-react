import { Box, Container, Stack } from "@mui/material";
import { LocalPhoneOutlined, LocationOnOutlined, EmailOutlined } from '@mui/icons-material';

export function Footer() {
    return (    
        <div className="footer_config">
            <Container>
                <Stack className="main_footer_container">
                    <Stack flexDirection={"row"} style={{ height: "242px"}}>
                        <Stack className="info" flexDirection={'column'}>
                            <Box>
                                <img src="/papay_footer.svg" alt="" />
                            </Box>
                            <Box className="main_text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor Sed ut perspiciatis unde omnis iste 
                            </Box>
                            <Stack className="contact_links">
                                <Box><img src="/icons/facebook.svg" style={{ cursor: "pointer" }} alt="" /></Box>
                                <Box><img src="/icons/twitter.svg" style={{ cursor: "pointer" }} alt="" /></Box>
                                <Box><img src="/icons/instagram.svg" style={{ cursor: "pointer" }} alt="" /></Box>
                                <Box><img src="/icons/youtube.svg" style={{ cursor: "pointer" }} alt="" /></Box>
                            </Stack>
                        </Stack>
                        
                        <Stack className="parts">
                            <Box className="part_subject">Sections</Box>
                            <Box className="divider"></Box>
                            <Box className="targets">Home <br /> Restaurants <br /> Community <br /> Help <br /></Box>
                        </Stack>
                        <Stack className="find_us">
                            <Box className="find">Contact admin</Box>
                            <Box className="divider"></Box>
                            <Stack className="details" sx={{mt: "19px"}}>
                                <Box className="detail_first"><LocationOnOutlined /></Box>
                                <Box  className="detail_second">Korea</Box>
                            </Stack>
                            <Stack className="details" sx={{mt: "9px"}}>
                                <Box className="detail_first"><LocalPhoneOutlined /></Box>
                                <Box className="detail_second"> 010-1234-5678 </Box>
                            </Stack>
                            <Stack className="details" sx={{mt: "9px"}}>
                                <Box className="detail_first"><EmailOutlined /></Box>
                                <Box className="detail_second">Papays@restaurant.com</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box className="liner"></Box>
                    <Box className="copyrights">
                        Copyright Papays 2023, All right reserved.
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}