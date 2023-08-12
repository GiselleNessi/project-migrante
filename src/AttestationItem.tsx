import { ResolvedAttestation } from "./utils/types";
import { useAccount, useSigner } from "wagmi";
import dayjs from "dayjs";
import {
  baseURL,
  CUSTOM_SCHEMAS,
  EASContractAddress,
  timeFormatString,
} from "./utils/utils";
import { theme } from "./utils/theme";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import invariant from "tiny-invariant";
import { ethers } from "ethers";
import { useState } from "react";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import { Box, Text, Flex } from "@chakra-ui/react";

type Props = {
  data: ResolvedAttestation;
};

const eas = new EAS(EASContractAddress);

export function AttestationItem({ data }: Props) {
  const { address } = useAccount();
  const [confirming, setConfirming] = useState(false);

  if (!address) return null;

  const isAttester = data.attester.toLowerCase() === address.toLowerCase();
  const isConfirmed = !!data.confirmation;
  const isConfirmable = !isAttester && !isConfirmed;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: signer } = useSigner();

  let Icon = MdVerified;

  if (!isConfirmed) {
    Icon = MdOutlineVerified;
  }

  return (
    <Box
      borderRadius="25px"
      border="1px solid rgba(168, 198, 207, 0.4)"
      background="#fff"
      padding="14px"
      display="flex"
      justifyContent="space-between"
      boxSizing="border-box"
      width="100%"
      marginBottom="10px"
      alignItems="center"
      gap="16px"
      cursor="pointer"
      onClick={() => {
        window.open(`${baseURL}/attestation/view/${data.id}`);
      }}
    >
      <Text
        color="#000"
        textAlign="center"
        fontSize="14px"
        fontFamily="Montserrat, sans-serif"
        fontWeight="700"
      >
        {data.name}
      </Text>
      <Text
        color="#adadad"
        textAlign="center"
        fontSize="14px"
        fontFamily="Montserrat, serif"
      >
        {dayjs.unix(data.time).format(timeFormatString)}
      </Text>
      <Flex>
        {isConfirmable ? (
          <Box
            as="button"
            display="inline-block"
            borderRadius="10px"
            border="1px solid #cfb9ff"
            background="#333342"
            padding="8px"
            boxSizing="border-box"
            color="#fff"
            fontSize="12px"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            cursor="pointer"
            onClick={async (e: { stopPropagation: () => void }) => {
              e.stopPropagation();

              setConfirming(true);
              try {
                const schemaEncoder = new SchemaEncoder("bool confirm");
                const encoded = schemaEncoder.encodeData([
                  { name: "confirm", type: "bool", value: true },
                ]);

                invariant(signer, "signer must be defined");
                const eas = new EAS(EASContractAddress);
                eas.connect(signer);

                const tx = await eas.attest({
                  data: {
                    recipient: ethers.constants.AddressZero,
                    data: encoded,
                    refUID: data.id,
                    revocable: true,
                    expirationTime: 0,
                  },
                  schema: CUSTOM_SCHEMAS.RECOMMEND_SCHEMA,
                });

                await tx.wait();
                setConfirming(false);
                window.location.reload();
              } catch (e) {}
            }}
          >
            {confirming ? "Confirming..." : "Confirm was a good job"}
          </Box>
        ) : (
          <Box marginLeft="8px">
            <Icon
              color={
                data.confirmation
                  ? theme.supporting["green-vivid-400"]
                  : theme.neutrals["cool-grey-100"]
              }
              size={22}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
