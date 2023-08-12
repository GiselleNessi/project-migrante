import { useLocation, useNavigate } from "react-router";
import { theme } from "../utils/theme";
import { CustomConnectButton } from "./ui/CustomConnectKit";
import { activeChainConfig } from "../utils/utils";
import invariant from "tiny-invariant";
import { useAccount } from "wagmi";
import { Flex, Grid, Button, Box, Text, Image } from "@chakra-ui/react";
import logoImage from "./logo-text.png"

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
        bg="#3EC8CC"
        borderBottom={`1px solid ${theme.neutrals["cool-grey-100"]}`}
      >
        <Flex justify="center" py={4} px={{ base: 2, md: 6 }}>
          <Grid templateColumns="auto 1fr auto" w="100%">
            <Flex align="center" cursor="pointer" onClick={() => navigate("/")}>
            <Image src={logoImage} alt="Project Migrante Logo"  mr={2} />
             
            </Flex>

            <Flex align="center" justify="center" gap={4}>
              {menuItems.map((menuItem, i) => (
                <Button
                color={'#fff'}
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
