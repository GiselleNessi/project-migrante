import React from "react";
import { Box, Center, Button, Heading, VStack, Image } from "@chakra-ui/react";
import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";

const Donate = () => {
  //web3button
  const tokenId = 0; // the id of the NFT you want to claim
  const quantity = 1; // how many NFTs you want to claim

  const { contract } = useContract(
    "0xfD16f4AfDdd7E3B1391F7896aF6c9843b16Be1e9"
  );
  const { data: nft, error } = useNFT(contract, "0");

  if (error || !nft) return <div>Loading...</div>;
  return (
    <Center h="100vh">
      <VStack spacing={6}>
        <Heading>Donate to Camila!</Heading>
        <ThirdwebNftMedia metadata={nft.metadata} />
        <Web3Button
          contractAddress={"0xfD16f4AfDdd7E3B1391F7896aF6c9843b16Be1e9"}
          action={(contract) => contract.erc1155.claim(tokenId, quantity)}
          onSuccess={() => alert("Congrats! You have donated to Camila!")}
          onError={() =>
            alert(
              "Oops, you need some eth :("
            )
          }
          className="mx-auto"
        >
          Mint your badge!
        </Web3Button>
      </VStack>
    </Center>
  );
};

export default Donate;
