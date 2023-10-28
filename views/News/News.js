import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, VStack, Image, Icon, FlatList, Heading } from "native-base";

const News = () => {
  const totalNews = useRef(0);
  const getNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&apiKey=9069c4f69df34401b5cd187109868fd5`
    );
    const body = await response.json();

    totalNews.current = body.totalResults;
    return body.articles;
  };

  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews()
      .then((data) => {
        setNews(data);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <Box flex={"1"} p={"4"} safeArea>
      <Flex
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Icon size={"lg"} as={FontAwesome} name="newspaper-o" mr={"4"} />
        <Heading alignSelf={"center"} size={"lg"}>
          Tus noticias :D
        </Heading>
      </Flex>

      {news.length > 0 && (
        <FlatList
          data={news}
          renderItem={({ item, index }) => (
            <VStack
              borderBottomWidth={1}
              key={index}
              borderBottomColor={"gray.300"}
              py={"8"}
            >
              <Heading textAlign={"center"} mb={"2"}>
                {item?.title}
              </Heading>
              <Image
                source={{ uri: item?.urlToImage }}
                alt="img-post"
                size={"full"}
                h={400}
              />
            </VStack>
          )}
        />
      )}
    </Box>
  );
};

export default News;
