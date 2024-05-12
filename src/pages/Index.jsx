import { useState, useEffect } from "react";
import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack, Image, Spacer, ChakraProvider, extendTheme, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
});

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = searchTerm ? cities.filter((city) => city.city.toLowerCase().includes(searchTerm.toLowerCase()) || city.country.toLowerCase().includes(searchTerm.toLowerCase())) : cities;

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Flex bg="teal.500" p={4} color="white" alignItems="center">
          <Heading size="md">NomadRank</Heading>
          <Spacer />
          <Input placeholder="Search cities..." w="200px" bg="white" color="gray.800" _placeholder={{ color: "gray.500" }} onChange={(e) => setSearchTerm(e.target.value)} icon={<FaSearch />} />
        </Flex>

        <VStack spacing={8} align="stretch" p={8}>
          <Box bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTcxNTU0NjcxN3ww&ixlib=rb-4.0.3&q=80&w=1080" bgPosition="center" bgRepeat="no-repeat" bgSize="cover" height="300px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="3xl" color="white" fontWeight="bold" textAlign="center">
              Find the best cities for digital nomads
            </Text>
          </Box>

          <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {filteredCities.map((city) => (
                <Box
                  key={city.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  bg="white"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedCity(city);
                    onOpen();
                  }}
                >
                  <Image src={`https://source.unsplash.com/random/?${city.city}`} alt={`Image of ${city.city}`} height="200px" width="100%" objectFit="cover" />
                  <Heading fontSize="xl">{city.city}</Heading>
                  <Text mt={4}>{city.country}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </VStack>
      </Box>
      {selectedCity && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedCity.city}, {selectedCity.country}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={`https://source.unsplash.com/random/?${selectedCity.city}`} alt={`Image of ${selectedCity.city}`} height="300px" width="100%" objectFit="cover" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </ChakraProvider>
  );
};

export default Index;
