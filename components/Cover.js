import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import theme from "../utils/theme";

function Cover(props) {

    return (
        <Box
            as="section"
            id="cover"
            backgroundImage = "url('/cover.jpg')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height = "75vh"
            width = "100%"
        >
            <Box 
                height = "100%"
                width = "100%"
                bg = {theme.blackOverlay}
            >
                <Flex
                    direction="column"
                    align="center"
                    justifyContent="center"
                    height = "100%"
                    width = "100%"
                    color = "white"
                    opacity = "1"
                >
                    <Heading as="h1" fontSize="6xl">{props.main}</Heading>
                    <Heading fontSize="2xl">{props.sub}</Heading>
                </Flex>
            </Box>
        </Box>
    );
}
 
export default Cover;
