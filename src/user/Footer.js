import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import GooglePlay from "../images/googleplay.png"
import Apple from "../images/apple.png"

const Footer = () => {
  return (
    <Box
    bg={"black"}
    color={"white"}
    // height={100}
    >
        <Box
        d="flex"
        flexDir={{base:"column",md:"row"}}
        alignItems="center"
        justifyContent={"space-evenly"}
        >
            <Text 
            fontSize={{base:20,md:30}}
            >
                HealthFit
            </Text>
            <Box
            d="flex"
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            
            >
                <Text fontSize={{base:15}}>DOWNLOAD APP</Text>
                <Box
                d="flex"
                justifyContent={"space-between"}
                >
                    <Image src={GooglePlay}  alt="google play" mr={10} />
                    <Image src={Apple}  alt="google play"/>
                </Box>
            </Box>
        </Box>
        <Box>
            <Text
            fontSize={{base:20,md:30}}
            m={"20px 0px 0px 0px"}
            textAlign={"center"}
            >
                Copyright © 2022 - HealthFit All Rights Reserved.</Text>
        </Box>

    </Box>
  )
}

export default Footer