import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MainContext } from "../../context/Context";
import Skeletonjs from "../../Skeletonjs";
import UFooter from "./UFooter";
import UHeader from "./UHeader";

const MyDetails = () => {
  const { user, myDietPlan, setuser } = useContext(MainContext);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    setuser(userData);
  },[]);

  return (
    <Box>
      <UHeader>
        <button>Home</button>
      </UHeader>
      {user == "" ? (
        <Box display={"flex"} flexDir={"column"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignSelf={"center"}
          />
          <br />
          <Skeletonjs />
        </Box>
      ) : (
        <Box
          fontSize={40}
          d="flex"
          flexDirection={"column"}
          alignItems={"center"}
          rowGap={5}
        >
          <Text fontSize={{base:"40px",md:50}}>User Fitness Details</Text>
          <Text fontSize={{base:"25px",md:30}}>Gender : {user.calories[0].gender}</Text>
          <Text fontSize={{base:"25px",md:30}}>Height : {user.calories[0].height}</Text>
          <Text fontSize={{base:"25px",md:30}}>Weight : {user.calories[0].weight}</Text>
          <Text fontSize={{base:"25px",md:30}}>Activity : {user.calories[0].active}</Text>
          <Text fontSize={{base:"25px",md:30}}>Current Calories : {user.calories[0].AMR}</Text>
          {myDietPlan == "" ? (
            <Text fontSize={{base:"25px",md:30}}>Diet Plan : No Diet Plan</Text>
          ) : (
            <Text fontSize={{base:"25px",md:30}}>Diet Plan : {myDietPlan.dietPlan[0].dietName}</Text>
          )}
        </Box>
      )}

      <UFooter />
    </Box>
  );
};

export default MyDetails;
