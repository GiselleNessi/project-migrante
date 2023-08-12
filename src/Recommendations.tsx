import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  getAttestationsForAddress,
  getConfirmationAttestationsForUIDs,
  getENSNames,
} from "./utils/utils";
import { ResolvedAttestation } from "./utils/types";
import { AttestationItem } from "./AttestationItem";
import {
  Center,
  VStack,
  Spinner,
  Box,
  Text,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import { getEarnedBadges, mintBadgeNFT } from "../src/utils/badgeManagement";
import { useContract, useNFT } from "@thirdweb-dev/react";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [attestations, setAttestations] = useState<ResolvedAttestation[]>([]);
  const [loading, setLoading] = useState(false);
  const [userBadgeCount, setUserBadgeCount] = useState<number>(0); // Track user's badge count
  const { contract } = useContract(
    "0xfD16f4AfDdd7E3B1391F7896aF6c9843b16Be1e9"
  );
  const tokenId = 0; // the tokenId to look up
  const quantity = 1; // how many NFTs you want to claim
  const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  useEffect(() => {
    async function getAtts() {
      setAttestations([]);
      setLoading(true);
      if (!address) return;
      const tmpAttestations = await getAttestationsForAddress(address);

      const addresses = new Set<string>();

      tmpAttestations.forEach((att) => {
        addresses.add(att.attester);
        addresses.add(att.recipient);
      });

      let resolvedAttestations: ResolvedAttestation[] = [];

      const ensNames = await getENSNames(Array.from(addresses));

      const uids = tmpAttestations.map((att) => att.id);

      const confirmations = await getConfirmationAttestationsForUIDs(uids);

      tmpAttestations.forEach((att) => {
        const amIAttester =
          att.attester.toLowerCase() === address.toLowerCase();

        const otherGuy = amIAttester ? att.recipient : att.attester;

        const relatedConfirmation = confirmations.find((conf) => {
          return (
            conf.refUID === att.id &&
            ((amIAttester &&
              conf.attester.toLowerCase() === otherGuy.toLowerCase()) ||
              (!amIAttester &&
                conf.attester.toLowerCase() === address.toLowerCase()))
          );
        });

        resolvedAttestations.push({
          ...att,
          confirmation: relatedConfirmation,
          name:
            ensNames.find(
              (name) => name.id.toLowerCase() === otherGuy.toLowerCase()
            )?.name || otherGuy,
        });
      });

      setAttestations(resolvedAttestations);
      setLoading(false);
      const earnedBadges: string[] = getEarnedBadges(
        attestations.length.toString()
      );
      setUserBadgeCount(earnedBadges.length);
    }
    getAtts();
  }, [address]);

  return (
    <Center>
      <VStack spacing={4}>
        <Heading m={6}>Who you recommend a job done by</Heading>
        <Box
          minWidth={"800px"}
          boxShadow="md"
          p={6}
          borderRadius="lg"
          w={{ base: "100%", md: "590px" }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Text mb={4}>Your Attestation Count: {attestations.length}</Text>
              {attestations.length > 0 ? (
                attestations.map(
                  (attestation: ResolvedAttestation, i: number) => (
                    <AttestationItem key={i} data={attestation} />
                  )
                )
              ) : (
                <>
                  <Text>
                    {userBadgeCount === 0
                      ? "Make your first attestation and mint a Novice Attester Badge NFT"
                      : "No one here yet"}
                  </Text>
                </>
              )}
            </>
          )}
        </Box>

        <Box mb={10}>
          <Button
            onClick={() => navigate("/mintbadge")}
            bgColor={"#463C5C"}
            color={"#fff"}
            display={attestations && attestations.length > 0 ? "block" : "none"}
          >
            Go to Mint Your Badge
          </Button>
        </Box>
      </VStack>
    </Center>
  );
}

export default Home;
