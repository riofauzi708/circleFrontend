import { Box, Text } from "@chakra-ui/react"

function Footer() {
  return (
    <>
      <Box
        borderRadius={'8px'}
        w={'90%'}
        bg={'#262626'}
        maxHeight={'fit-content'}
        m={'auto'}
        style={{ marginTop: "-24px" }}
      >
        <Box px={16}>
          <Text display={"flex"} alignItems={"center"}>
            Develope by | <p style={{ fontWeight: "bold" }}> · Rio Fauzi</p>
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default Footer
