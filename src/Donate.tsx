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
        <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeigtqeyfmqkfbdu7ubjlwhtqkdqckvee7waks4uwhmzdfvpfaqzdwm/erc1155.html?contract=0xfB0b94cC2812cA3dCeFb7f21571c0030453e6CFe&chain=%7B%22name%22%3A%22Optimism+Goerli+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Foptimism-goerli.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Goerli+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22ogor%22%2C%22chainId%22%3A420%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22optimism-goerli%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Foptimism%2F512.png%22%2C%22height%22%3A512%2C%22width%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=ebff912aaba396b7bc9f9cfd1f565389&tokenId=0&primaryColor=cyan"
          width="600px"
          height="600px"
        ></iframe>
      </VStack>
    </Center>
  );
};

export default Donate;
