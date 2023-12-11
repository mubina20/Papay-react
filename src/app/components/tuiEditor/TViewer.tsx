import { useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Stack, Box } from "@mui/material";

const TViewer = (props: any) => {
    const editorRef = useRef();

    return (
        <Stack sx={{ background: "white", mt: "30px", borderRadius: "10px" }}>
            <Box sx={{ m: "40px" }}>
                <Viewer
                /* @ts-ignore */
                ref={editorRef}
                initialValue={props.text}
                height={"600px"}
                />
            </Box>
        </Stack>
    );
};

export default TViewer;
