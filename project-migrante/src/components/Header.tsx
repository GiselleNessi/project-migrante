import { useLocation, useNavigate } from "react-router";
import { theme } from "../utils/theme";
import { CustomConnectButton } from "./ui/CustomConnectKit";
import { activeChainConfig } from "../utils/utils";
import invariant from "tiny-invariant";
import { useAccount } from "wagmi";
import { Flex, Grid, Button, Box, Text } from "@chakra-ui/react";

type MenuItemProps = {
  active: boolean;
};

type MenuItemType = {
  title: string;
  path: string;
  onClick: () => void;
};

export function Header() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const location = useLocation();

  let menuItems: MenuItemType[] = [
    {
      title: "Attest",
      onClick: () => navigate("/"),
      path: "/",
    },
  ];

  if (address) {
    menuItems.push({
      title: "Recommendations",
      onClick: () => navigate("/recommendations"),
      path: "/recommendations",
    });
  }

  invariant(activeChainConfig, "activeChainConfig is not set");

  return (
    <>
      <Box
        bg="#fff"
        borderBottom={`1px solid ${theme.neutrals["cool-grey-100"]}`}
      >
        <Flex justify="center" py={4} px={{ base: 2, md: 6 }}>
          <Grid templateColumns="auto 1fr auto" w="100%">
            <Flex align="center" cursor="pointer" onClick={() => navigate("/")}>
              <Text fontFamily="mono" fontWeight="bold" fontSize="22px">
                Project Migrante
              </Text>
            </Flex>

            <Flex align="center" justify="center" gap={4}>
              {menuItems.map((menuItem, i) => (
                <Button
                  key={i}
                  onClick={menuItem.onClick}
                  variant={
                    menuItem.path === location.pathname ? "active" : "default"
                  }
                >
                  {menuItem.title}
                </Button>
              ))}
            </Flex>

            <Flex align="center">
              <CustomConnectButton />
            </Flex>
          </Grid>
        </Flex>
      </Box>
    </>
  );
}
