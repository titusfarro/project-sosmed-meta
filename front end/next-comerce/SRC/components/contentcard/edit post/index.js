import { Box, VStack, Stack } from "@chakra-ui/react";

 

export default function editPost(){

    return(
        <Box>
            <Stack 
            px={4} 
            py={5} 
            bg="white"
            spacing={6}>
            <SimpleGrid columns={6} spacing={0}>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="first_name"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                   _dark={{
                      color: "gray.50",
                    }}
                    >
                    location 
                  </FormLabel>
                  <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  />
                </FormControl> 
              </SimpleGrid>
            </Stack> 

            <div>
              <FormControl id="email" mt={1}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  About 
                </FormLabel>
                <Textarea
                  placeholder="you@example.com"
                  mt={1}
                  rows={3}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: "sm",
                  }}
                />
                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            </div>
        </Box>
    )
}