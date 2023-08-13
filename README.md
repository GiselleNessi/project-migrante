# Project Migrante

**Empowering migrants in legal grey areas through a decentralized job platform and attestation system.**

## Introduction

### Project Migrante: Empowering Migrants Through Public Good

Project Migrante is a pioneering platform that tackles the issues faced by migrants in illegal status seeking employment opportunities. By facilitating job postings and enabling cryptocurrency-based compensation, it provides a practical solution to a pressing challenge. Beyond its functional benefits, Project Migrante embodies the spirit of public good, bridging the gap between marginalized individuals and meaningful work. This initiative aligns seamlessly with the ethos of RetroPGF, showcasing how impactful software can drive positive societal change through technological innovation.

## Installation

yarn install

yarn start

## Dapp

Demo App: https://project-migrante-dapp.vercel.app/

Presentation: https://www.figma.com/proto/4LvTUSlZtMDCn9dyL4OYup/Untitled?page-id=0%3A1&type=design&node-id=23-1885&viewport=-7981%2C567%2C0.38&t=DgcUdBuxQjIjql6p-1&scaling=scale-down&starting-point-node-id=23%3A1885&mode=design

User (consumer) key frames: https://www.figma.com/file/4LvTUSlZtMDCn9dyL4OYup/Untitled?type=design&node-id=74%3A1752&mode=design&t=sqMMJTM7vb4ZubZW-1

Currently, the app operates as follows:

1. Registration with Worldcoin ID: Users can register using Worldcoin ID, ensuring the authenticity of human users.

2. Attesting Job Completion: Users have the capability to attest job completions by simply providing the relevant wallet address and attesting.

3. Badge NFT Minting: As a gratifying incentive for their attestations, users can mint free badge NFTs.

4. Donation NFT Minting: Users also have the option to mint donation NFTs, offering support to migrants for their accomplished tasks.

## Smart Contracts and transactions

Base contract for badge reward minting: 0xfD16f4AfDdd7E3B1391F7896aF6c9843b16Be1e9

Optimism Contract for donation: 0xfB0b94cC2812cA3dCeFb7f21571c0030453e6CFe

EAS attestation schema: https://optimism-goerli-bedrock.easscan.org/schema/view/0x67c417a59df0fb87b3038fceb3ae18dc1d6ac875a5cf8cfbcf1134c483b6c5a4

Optimism transactions attestation: https://goerli-optimism.etherscan.io//tx/0x458c863acf5d0a2d97bb4191e6eb3b229dbdd60c9ddff69836561abb5158fa25

## Main Features

- **Job Posting:** Migrants can post their skills and available jobs, showcasing their expertise to potential employers.

- **Job Hiring:** Users seeking services can browse through posted jobs, hire migrants, and pay them securely in cryptocurrency.

- **Attestations:** Users can attest that a job was completed successfully, creating a verified history of a migrant's work.

- **Badge Rewards:** Users earn badges for providing attestations, contributing to the credibility of the platform using Base L2 blockchain

- **Donations:** Support migrants by donating in Optimism as an alternative form of payment for their services.

## Technologies

- **Worldcoin ID:** Utilize Worldcoin ID for user registration and verification, ensuring the authenticity of participants using worldcoin/idkit sdk.

- **Ethereum Attestation Service:** Leverage Ethereum blockchain for secure attestations of completed jobs.

- **Optimism Blockchain:** Benefit from the low fees and scalability of the Optimism blockchain for efficient transactions.

- **Base Blockchain:** Employ a base blockchain for minting badge NFTs, providing users with tangible proof of their achievements.

- **React App:** Build the user interface using React, creating an interactive and responsive platform.

- **TypeScript:** Use TypeScript for enhanced type safety and improved development experience.

- **Chakra UI:** Enhance the user experience with the aesthetic and user-friendly components of Chakra UI.

## Challenges we ran into

- Navigating Library and Dependency Challenges: We encountered challenges arising from various libraries and dependencies, leading to the deletion of certain commit history when implementing fixes. However, the production environment provides a clear view of previous commits on the right side.
- Dealing with Diverse Documentation: Negotiating the intricacies of different documentation sources posed a complexity in our development process.
- Time Constraints on Fulfilling User Flows: Limited time availability hindered the realization of desired features and comprehensive user flows.