import { Box, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdLocalDining } from "react-icons/md";
import { MainContext } from "../context/Context";
import Skeletonjs from "../Skeletonjs";
import AHeader from "./AHeader";

const AllUserDetails = () => {
  const toast = useToast();
  const { allUser, setAllUser, tocken } = useContext(MainContext);
  const [usersList, setusersList] = useState("");

  const fetchAllUsers = async () => {
    const tocken = localStorage.getItem("tocken")
    let options = {
      url: "https://diet-suggestion-2022.herokuapp.com/admin/allUsers",
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
    };

    try {
      let response = await axios(options);
      console.log(response.data);
      setusersList(response.data.result);
    } catch (error) {
      toast({
        title: "Unable To Get the Users Data",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Box>
      <AHeader>
        <button>Home</button>
      </AHeader>
      
      {usersList == "" ? (
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
        mt={10}
        rowGap={5}
        >
          {usersList.map((item, index) => {
            return (
              <Box key={index}
              d="flex"
              flexDir={"row"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              boxShadow={"dark-lg"}
              padding={10}

              >
                <Image boxSize="200px" src={item.pic} alt="User image" />
                <Box
                d="flex"
                flexDirection={"column"}
                rowGap={5}
                ml={10}
                >
                  <Text>Name : {item.name}</Text>
                  <Text>Email : {item.email}</Text>
                  {
                      item.dietPlan.length == 0 ? <Text>Diet Paln : No Diet Plan Selected</Text>
                      : <Text>Diet Plan : {item.dietPlan[0].dietName}</Text>
                  }
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      
    </Box>
  );
};

export default AllUserDetails;
