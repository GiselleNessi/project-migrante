import { Text, Center, Button, Heading, VStack, Image } from "@chakra-ui/react";
import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Welcome = () => {
  const [address, setAddress] = useState("");
  const [searchParams] = useSearchParams();

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

  return (
    <Center h="100vh">
      <VStack spacing={6}>
        <Heading>Welcome to Project Migrante</Heading>
        <Text>If you want to post a job please register first</Text>
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
            <Button bgColor={"#463C5C"} color={"#fff"} onClick={open}>
              Register
            </Button>
          )}
        </IDKitWidget>
      </VStack>
    </Center>
  );
};

export default Welcome;
