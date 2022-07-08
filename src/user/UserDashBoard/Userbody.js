import { Box, Button, Text, useToast, Spinner, Image } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MainContext } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeletonjs from "../../Skeletonjs";
import WeighLoss from "../../images/pweightLoss.png"
import WeighGain from "../../images/WEIGTHgAIN.jpg"
import LowChelosterol from "../../images/lowchelosterol.jpg"
import NoImage from "../../images/no_image.jpg"

const Userbody = () => {
  const nav = useNavigate();
  const toast = useToast();
  let { dietPlans, setdietPlans, tocken, selectedDiet, setselectedDiet, setuser } =
    useContext(MainContext);

  const fetchAllDietplans = async () => {
    const tocken = localStorage.getItem("tocken");
    let options = {
      url: "https://diet-suggestion-2022.herokuapp.com/diettable/allDatas",
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
    };

    try {
      let response = await axios(options);
      setdietPlans(response.data.result);
    } catch (error) {
      toast({
        title: "Unable to Display The Diet Data",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"))
    setuser(userData)
    fetchAllDietplans();
  }, []);

  const dietClicked = async (list) => {
    const tocken = localStorage.getItem("tocken");
    let options = {
      url: "https://diet-suggestion-2022.herokuapp.com/user/newDietPlan",
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
      data: list,
    };

    try {
      let response = await axios(options);
      if (response.data.message == "Diet Plan Added SuccessFully") {
        toast({
          title: "Successfully Added New diet plan",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "success",
        });
        nav("/myDietPlan");
      } else if (response.data.message == "Already Diet Plan Exists") {
        toast({
          title: "Already Diet Plan Exists",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      } else {
        toast({
          title: "Unable To Start The Diet",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "warning",
        });
      }
    } catch (error) {
      toast({
        title: "Unable To Add Diet Plan",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  return (
    <Box mt={5}>
      <Box
      display={{base:"flex",md:"inline-block"}}
      flexDirection={{base:"row",md:"none"}}
      justifyContent={{base:"space-around",md:"none"}}
      >
        <Button variant={"solid"} colorScheme="blue" mr={5}>
          Home
        </Button>
        <Button
          variant={"solid"}
          colorScheme="red"
          mr={5}
          onClick={() => nav("/myDetails")}
        >
          My Details
        </Button>
        <Button
          variant={"solid"}
          colorScheme="green"
          mr={5}
          onClick={() => nav("/myDietPlan")}
        >
          My DietPlans
        </Button>
      </Box>
      <br />
      <br />
      {/* <>
        {dietPlans == 5 ? (
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
          <Box d="flex" flexDir={"column"} alignItems={"center"} rowGap={10}>
            {dietPlans.map((item, index) => {
              return (
                <Box
                  key={index}
                  boxShadow={"lg"}
                  _hover={{
                    boxShadow: "dark-lg",
                    bg: "black",
                    color: "red",
                  }}
                  width="50%"
                  height={"50%"}
                  d="flex"
                  justifyContent={"space-evenly"}
                >
                  {item.dietName}
                  <Button onClick={() => dietClicked(item)}>Start Diet</Button>
                </Box>
              );
            })}
          </Box>
        )}
      </> */}
      <>
        {dietPlans == 5 ? (
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
          <Box d="flex" flexDir={"row"} alignItems={"center"} rowGap={10}
          flexWrap={"wrap"}
          justifyContent={"space-evenly"}
          >
            {dietPlans.map((item, index) => {
              return (
                <Box
                  key={index}
                  boxShadow={"lg"}
                  // _hover={{
                  //   boxShadow: "dark-lg",
                  //   bg: "black",
                  //   color: "red",
                  // }}
                  // width="fit-content"
                  // height={"50%"}
                  d="flex"
                  flexDir={"column"}
                  // justifyContent={"space-evenly"}
                  alignItems="center"
                  bg={"#E4AEFB"}
                  padding={5}
                  borderRadius={"30px"}
                >
                  <Image src={item.dietName == "Weight Loss " ? WeighLoss : item.dietName == "Weight Gain" ? WeighGain : item.dietName == "Low Cholesterol" ? LowChelosterol : NoImage } alt="diet Images" width={"300px"} mb={5}/>
                  <Text
                  mb={5}
                  >

                  {item.dietName}
                  </Text>
                  <Button onClick={() => dietClicked(item)} colorScheme={"green"}>Start Diet</Button>
                </Box>
              );
            })}
          </Box>
        )}
      </>
    </Box>
  );
};

export default Userbody;
