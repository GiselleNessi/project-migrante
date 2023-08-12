import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount, useSigner } from "wagmi";
import { useModal } from "connectkit";
import {
  baseURL,
  CUSTOM_SCHEMAS,
  EASContractAddress,
  getAddressForENS,
  getAttestation,
} from "./utils/utils";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import invariant from "tiny-invariant";
import { ethers } from "ethers";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { Button, Heading, Input, Center, VStack } from "@chakra-ui/react";

const SubText = styled(Link)`
  display: block;
  cursor: pointer;
  text-decoration: underline;
  color: #ababab;
  margin-top: 20px;
`;

const EnsLogo = styled.img`
  position: absolute;
  left: 14px;
  top: 28px;
  width: 30px;
`;

const WhiteBox = styled.div`
  box-shadow: 0 4px 33px rgba(168, 198, 207, 0.15);
  background-color: #fff;
  padding: 36px;
  max-width: 590px;
  border-radius: 10px;
  margin: 40px auto 0;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const eas = new EAS(EASContractAddress);

function Home() {
  const { status } = useAccount();
  const modal = useModal();
  const [address, setAddress] = useState("");
  const { data: signer } = useSigner();
  const [attesting, setAttesting] = useState(false);
  const [ensResolvedAddress, setEnsResolvedAddress] = useState("ginie.eth");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleProof = (result: ISuccessResult) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 3000);
      // NOTE: Example of how to decline the verification request and show an error message to the user
    });
  };

  const onSuccess = (result: ISuccessResult) => {
    console.log(result);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const credential_types = (urlParams
    .get("credential_types")
    ?.split(",") as CredentialType[]) ?? [
    CredentialType.Orb,
    CredentialType.Phone,
  ];

  const action = urlParams.get("register") ?? "";
  const app_id =
    urlParams.get("e687f7deb26d68824cadd49cc9c39877") ?? "wid_staging_1234";

  useEffect(() => {
    const addressParam = searchParams.get("address");
    if (addressParam) {
      setAddress(addressParam);
    }
  }, []);

  useEffect(() => {
    async function checkENS() {
      if (address.includes(".eth")) {
        const tmpAddress = await getAddressForENS(address);
        if (tmpAddress) {
          setEnsResolvedAddress(tmpAddress);
        } else {
          setEnsResolvedAddress("");
        }
      } else {
        setEnsResolvedAddress("");
      }
    }

    checkENS();
  }, [address]);

  return (
    <Center mt={6}>
      <VStack spacing={4}>
        <IDKitWidget
          action={action}
          signal="my_signal"
          onSuccess={onSuccess}
          handleVerify={handleProof}
          app_id={app_id}
          credential_types={credential_types}
          // walletConnectProjectId="get_this_from_walletconnect_portal"
        >
          {({ open }) => (
            <Button colorScheme="red" onClick={open}>
              Register
            </Button>
          )}
        </IDKitWidget>

        <WhiteBox>
          <Heading p={6}>I recommend this job</Heading>

          <Input
            placeholder="wallet address"
            size="lg"
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {ensResolvedAddress && <EnsLogo src={"/ens-logo.png"} />}

          <Button
            m={6}
            size="lg"
            colorScheme="red"
            onClick={async () => {
              if (status !== "connected") {
                modal.setOpen(true);
              } else {
                setAttesting(true);
                try {
                  const schemaEncoder = new SchemaEncoder("bool metIRL");
                  const encoded = schemaEncoder.encodeData([
                    { name: "metIRL", type: "bool", value: true },
                  ]);

                  invariant(signer, "signer must be defined");
                  eas.connect(signer);

                  const recipient = ensResolvedAddress
                    ? ensResolvedAddress
                    : address;

                  const tx = await eas.attest({
                    data: {
                      recipient: recipient,
                      data: encoded,
                      refUID: ethers.constants.HashZero,
                      revocable: true,
                      expirationTime: 0,
                    },
                    schema: CUSTOM_SCHEMAS.RECOMMEND_SCHEMA,
                  });

                  const uid = await tx.wait();

                  const attestation = await getAttestation(uid);

                  // Update ENS names
                  await Promise.all([
                    axios.get(`${baseURL}/api/getENS/${address}`),
                    axios.get(`${baseURL}/api/getENS/${recipient}`),
                  ]);

                  navigate(`/recommendations`);
                } catch (e) {}

                setAttesting(false);
              }
            }}
          >
            {attesting
              ? "Attesting..."
              : status === "connected"
              ? "Make attestation"
              : "Connect wallet"}
          </Button>

          {status === "connected" && (
            <>
              <SubText to={"/recommendations"}>Recommendations</SubText>
            </>
          )}
        </WhiteBox>
      </VStack>
    </Center>
  );
}

export default Home;
