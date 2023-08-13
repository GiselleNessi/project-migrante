import { ConnectKitButton } from "connectkit";
import {
  Button,
  Text,
} from "@chakra-ui/react";


export const CustomConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button onClick={show}>
            <Text>
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </Text>
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
