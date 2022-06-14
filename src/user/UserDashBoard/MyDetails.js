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
          <Text fontSize={50}>User Fitness Details</Text>
          <Text>Gender : {user.calories[0].gender}</Text>
          <Text>Height : {user.calories[0].height}</Text>
          <Text>Weight : {user.calories[0].weight}</Text>
          <Text>Activity : {user.calories[0].active}</Text>
          <Text>Current Calories : {user.calories[0].AMR}</Text>
          {myDietPlan == "" ? (
            <Text>Diet Plan : No Diet Plan</Text>
          ) : (
            <Text>Diet Plan : {myDietPlan.dietPlan[0].dietName}</Text>
          )}
        </Box>
      )}

      <UFooter />
    </Box>
  );
};

export default MyDetails;
