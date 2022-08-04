import {
    Box, 
    Flex, 
    Stack, 
    Grid,
    HStack, 
    VStack,
    Spacer,
} from "@chakra-ui/react" 
import Gambar from "../../../assets/png-transparent-m4-carbine-girls-frontline-heckler-koch-xm8-firearm-weapon.png"

export default function feedFoto(){

    return (
        <Flex>
            <Grid templateColumns='repeat(3, 1fr)'>
                <HStack>
                    <Box w={"190px"}s h={"220px"} bgColor={"blue.400"}>{Gambar}</Box> 
                    <Box w={"190px"}s h={"220px"} bgColor={"blue.200"}>{Gambar}</Box>
                    <Box w={"190px"}s h={"220px"} bgColor={"green.300"}>{Gambar}</Box> 
                </HStack>
            </Grid>
        </Flex>
    )
}