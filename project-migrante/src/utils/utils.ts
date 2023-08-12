import invariant from "tiny-invariant";
import type {
  Attestation,
  AttestationResult,
  EASChainConfig,
  EnsNamesResult,
  MyAttestationResult,
} from "./types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { ethers } from "ethers";
import axios from "axios";

export const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

export const CUSTOM_SCHEMAS = {
  RECOMMEND_SCHEMA:
    "0x67c417a59df0fb87b3038fceb3ae18dc1d6ac875a5cf8cfbcf1134c483b6c5a4",
};

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getChainId() {
  return Number(process.env.REACT_APP_CHAIN_ID);
}

export const CHAINID = getChainId();
invariant(CHAINID, "No chain ID env found");

export const EAS_CHAIN_CONFIGS: EASChainConfig[] = [
  {
    chainId: 420,
    chainName: "optimism-goerli",
    subdomain: "optimism-goerli-bedrock.",
    version: "1.0.1",
    contractAddress: "0x4200000000000000000000000000000000000021",
    schemaRegistryAddress: "0x4200000000000000000000000000000000000020",
    etherscanURL: "https://goerli-optimism.etherscan.io",
    contractStartBlock: 2958570,
    rpcProvider: `https://goerli.optimism.io`,
  },
];


export const activeChainConfig = EAS_CHAIN_CONFIGS.find(
  (config) => config.chainId === CHAINID
);

export const baseURL = `https://${activeChainConfig!.subdomain}easscan.org`;

invariant(activeChainConfig, "No chain config found for chain ID");
export const EASContractAddress = activeChainConfig.contractAddress;

export const EASVersion = activeChainConfig.version;

export const EAS_CONFIG = {
  address: EASContractAddress,
  version: EASVersion,
  chainId: CHAINID,
};

export const timeFormatString = "MM/DD/YYYY h:mm:ss a";
export async function getAddressForENS(name: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    "mainnet"
  );

  return await provider.resolveName(name);
}
export async function getENSName(address: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    "mainnet"
  );
  return await provider.lookupAddress(address);
}
export async function getAttestation(uid: string): Promise<Attestation | null> {
  const response = await axios.post<AttestationResult>(
    `${baseURL}/graphql`,
    {
      query:
        "query Query($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    attester\n    recipient\n    revocationTime\n    expirationTime\n    time\n    txid\n    data\n  }\n}",
      variables: {
        where: {
          id: uid,
        },
      },
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data.attestation;
}
export async function getAttestationsForAddress(address: string) {
  const response = await axios.post<MyAttestationResult>(
    `${baseURL}/graphql`,
    {
      query:
        "query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n  }\n}",

      variables: {
        where: {
          schemaId: {
            equals: CUSTOM_SCHEMAS.RECOMMEND_SCHEMA,
          },
          OR: [
            {
              attester: {
                equals: address,
              },
            },
            {
              recipient: {
                equals: address,
              },
            },
          ],
        },
        orderBy: [
          {
            time: "desc",
          },
        ],
      },
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data.attestations;
}
export async function getConfirmationAttestationsForUIDs(refUids: string[]) {
  const response = await axios.post<MyAttestationResult>(
    `${baseURL}/graphql`,
    {
      query:
        "query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n  refUID\n  }\n}",

      variables: {
        where: {
          schemaId: {
            equals: CUSTOM_SCHEMAS.RECOMMEND_SCHEMA,
          },
          refUID: {
            in: refUids,
          },
        },
        orderBy: [
          {
            time: "desc",
          },
        ],
      },
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data.attestations;
}
export async function getENSNames(addresses: string[]) {
  const response = await axios.post<EnsNamesResult>(
    `${baseURL}/graphql`,
    {
      query:
        "query Query($where: EnsNameWhereInput) {\n  ensNames(where: $where) {\n    id\n    name\n  }\n}",
      variables: {
        where: {
          id: {
            in: addresses,
            mode: "insensitive",
          },
        },
      },
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data.ensNames;
}
