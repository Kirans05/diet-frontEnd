import {
  Box,
  Button,
  Image,
  list,
  Spinner,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { MainContext } from "../context/Context";
import {} from "@chakra-ui/icons";
import Skeletonjs from "../Skeletonjs";
import NoImage from "../images/noImage.webp"
import LowChelosterol from "../images/lowchelosterol.jpg"
import WeighGain from "../images/WEIGTHgAIN.jpg"
import WeighLoss from "../images/pweightLoss.png"

const Abody = () => {
  const nav = useNavigate();
  const { tocken } = useContext(MainContext);
  const toast = useToast();
  const [data, setdata] = useState([]);

  let { dietPlans, setdietPlans, settocken } = useContext(MainContext);

  const handleChange = (e) => {
    // setvarient(e.target.value);
  };

  const fetchAllDietplans = async () => {
    let tocken = localStorage.getItem("tocken")
    let options = {
      url: "https://diet-suggestion-2022.herokuapp.com/diettable/allDatas",
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
    };

    try {
      console.log("first")
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
    let tocken = localStorage.getItem("tocken")
    settocken(tocken)
    fetchAllDietplans();
  }, []);


  const deleteHandler  = async (list_id) => {
    let tocken = localStorage.getItem("tocken")
    let options = {
      url:`https://diet-suggestion-2022.herokuapp.com/diettable/delete/${list_id}`,
      method:"DELETE",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${tocken}`
      }
    }


    try{
      let response = await axios(options)
      console.log(response.data) 
      fetchAllDietplans()
    }catch(error){
      toast({
        title:"Unable To Delete The Diet Plan",
        duration:5000,
        isClosable:true,
        status:"error",
        position:"bottom"
      })
    }
  }

  return (
    <Box bg="white" color={"black"}>
      <Box mt={4} mb={5}
       display={"flex"}
       flexDirection={"row"}
       justifyContent={{base:"space-around",md:"flex-start"}}      
      >
        <Button
          colorScheme="blue"
          size="md"
          onClick={() => nav("/adminDashboard")}
          mr={5}
        >
          Home
        </Button>
        <Button
          colorScheme="red"
          size="md"
          onClick={() => nav("/dietPlan")}
          mr={5}
        >
           New Diet Plan
        </Button>
        <Button
          colorScheme="green"
          size="md"
          mr={5}
            onClick={() =>nav("/userDetails")}
        >
          Users
        </Button>
      </Box>
      <Box>
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
          <Box
            d="flex"
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            flexWrap={"Wrap"}
            rowGap={10}
            columnGap={5}
          >
            {dietPlans.map((item, index) => {
              return (
                <Box key={index} boxShadow="dark-lg" p={5}
                d="flex"
                flexDir={"column"}
                // rowGap={3}
                bg={"#E4AEFB"}
                alignItems={"center"}
                borderRadius={"30px"}
                >
                  <Image src={item.dietName == "Weight Loss " ? WeighLoss : item.dietName == "Weight Gain" ? WeighGain : item.dietName == "Low Cholesterol" ? LowChelosterol : NoImage } alt="diet Images" width={"300px"} mb={5}/>
                  <Text
                  mb={5}
                  >

                  {item.dietName}
                  </Text>
                  {/* <Text>{item.dietName}</Text> */}
                  <Box
                  d="flex"
                  columnGap={10}
                  >
                    <ViewIcon onClick={() => nav(`/viewDiet/${item._id}`)} 
                    _hover={{
                      cursor:"pointer"
                    }}
                    fontSize={30}
                    />
                    <EditIcon onClick={() => nav(`/editDiet/${item._id}`)} 
                    _hover={{
                      cursor:"pointer"
                    }}
                    fontSize={30}/>
                    <DeleteIcon  
                    _hover={{
                      cursor:"pointer"
                    }}
                    fontSize={30}
                    onClick={() => deleteHandler(item._id)}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Abody;
