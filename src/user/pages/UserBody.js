import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import HealthLogo from "../../images/logo.jpg";
// import "../../styles/homePage.css"

const UserBody = () => {
  return (
    <Box
      d="flex"
      flexDir={"row"}
      justifyContent={"flex-end"}
      // bg={"blue.600"}
      className="healthFitHomePage"
    >
      <Box
      p={10}
      display="flex"
      flexDir={"column"}
      alignItems="flex-end"
      >
        <Text fontSize={{base:50,md:100}} m={0} fontStyle={"italic"} className={"homeBodyPage"}>HealthFit</Text>
        <Text fontSize={{base:20,md:40}}  className={"textHomePageBody"}>Helping people lead healthy and happy lives.</Text>
        <Text fontSize={{base:20,md:40}}   className={"textHomePageBody"}>Happiness begins with good health</Text>
      </Box>
      {/* <Image boxSize="500px" src={HealthLogo} alt="Dom's Pizza" className="homePageImage"/> */}
    </Box>
  );
};

export default UserBody;
