# UNiD Platform

## Overview

UNiD platform consists of;

- _UNiD EDGE_ is a middleware embedded in endpoint devices
- _UNiD HUB_ is a message broker between endpoint devices and the cloud
- _UNiD Studio_ is a device management dashboard

All you have to do is to integrate _UNiD EDGE_ into your device, and _UNiD EDGE_ will establish an end-to-end authenticated channel with UNiD HUB and realize bi-directional communication with various cloud services while ensuring device authenticity, data integrity, and privacy.

:::{figure-md}

<img src="../_assets/figure1-2.svg" alt="figure1" width="90%" align="center">

**Figure 1.** Overview of UNiD platform
:::

_UNiD EDGE_ is an [open-source middleware](https://github.com/getunid/unid), while _UNiD HUB_ and _UNiD Studio_ are proprietary software hosted in a cloud environment.

---
## Design Concept

Our main concept is to build end-to-end security infrastructure that abstracts every device and the cloud as a global unique endpoint, allowing a device to interact with other endpoints securely and privately regardless of the network topology or routing hops.

:::{figure-md}

<img src="../_assets/figure2-2.svg" alt="figure2">

**Figure 2.** E2E security infrastructure
:::

To achieve this concept, we utilize decentralized identifiers (DIDs) and Root of Trust (RoT) technologies. Specifically, _UNiD EDGE_ generates multiple key pairs from a hardware-derived genuine random number generator within the RoT secure processing environment, and generates a payload for registering with a blockchain-based decentralized PKI (DPKI) to create a DID document including the public key information. Anyone can obtain the corresponding device's public key from the network to authenticate the device and verify the digitally signed data.

This identity-first, end-to-end approach can abstract the complexity of security infrastructure and enables advanced, scalable endpoint security for connected systems. UNiD platform is designed to make the security infrastructure easily available to all developers, freeing you from the heavy burden of building the complex security infrastructure for each product.

---
## Architecture

### UNiD EDGE

_UNiD EDGE_ consists of;

- **RoT Wrapper**: This component supports TrustZone (Arm Cortex-M) and hardware security modules (supported MCUs), making it easier to build FOTA, IAM, and crypto processing in the RoT secure processing environment (SPE).
- **Key Management**: This component supports the device's cryptographic key operations (create, read, update, delete) in the SPE.
- **Device IAM**: This component supports management of device identities, credentials, and security policies for device's authentication and authorization.
- **E2E Secure Socket**: This component supports to establish end-to-end authenticated channels with UNiD HUB for secure bi-directional communications.

:::{figure-md}

<img src="../_assets/figure3-4.svg" alt="figure3">

**Figure 3.** UNiD EDGE Architecture
:::

### UNiD HUB

UNiD HUB is a message handler between endpoint devices and the cloud. As shown in figure 4, it mainly consists of 5 components:
- **E2E Secure Socket**: This component establishes end-to-end authenticated channels with the endpoint devices.
- **IAM**: This component supports to authenticate and authorize users and applications.
- **Message Handler**: This component carries out messaging using a publish/subscribe model between endpoint devices and the cloud.
- **Device Knowledge Base**: This component supports real-time tracking device's behavior for vital, healthcare check, threat detection, etc.
- **API/Webhook**: This component allows all developers to easily connect with existing systems and IoT platforms.

:::{figure-md}

<img src="../_assets/figure4-3.svg" alt="figure4">

**Figure 4.** UNiD HUB Architecture
:::

### UNiD Studio

UNiD Studio is a device management dashboard based on UNiD HUB’s API.
As shown in figure 5, UNiD Studio provides generic features needed to manage devices: inventory management, configuration management, visualizing device's status, update firmware and security parameters, and detect unauthorized access and connections.  

:::{figure-md}

<img src="../_assets/figure5-1.png" alt="figure5">

**Figure 5.** UNiD Studio, device management dashboard
:::

## Core features

### Easy to Use
In order to utilize IoT data or update firmware from the cloud securely, a system to identify, authenticate, and authorize devices is required. To identify the devices from the cloud, developers need to build a key management system on devices that cannot be tampered with. RoT can be used to achieve this goal, however it requires a high level of expertise and a lot of effort to understand the functionality and learn how to use the low level API of RoT.
Furthermore, manual operations for key injection at the manufacturing stage and the cloud system for key management throughout the entire product lifecycle are required. Thus, even if we look at just the key management, there are so many things that need to be considered from the development stage.
As shown in figure 6, UNiD EDGE SDK is wrapping RoT low level APIs, making it easy for developers to build key management systems. Thus, UNiD abstracts the complexity of the security stack by providing simple and easy-to-use SDKs, allowing developers to focus on developing applications.

:::{figure-md}

<img src="../_assets/figure6-1.svg" alt="figure6">

**Figure 6.** The middleware abstracts the complexity of security stack
:::

### Automate Device Provisioning
By leveraging decentralized identity technology, UNiD allows devices to autonomously generate key pairs, provisioning, and establish end-to-end secure channels with pre-configured remote servers.
In the typical provisioning flow, the provisioner manually generates and injects private keys into the devices, and registers the corresponding public keys and device ID with the intermediate PKI and device management system. This manual operation comes at a high cost, plus you need to invest in a physical security environment and employee background checks to reduce the vulnerability in the manufacturing line. Typically, key injection costs between $0.5 and $2.0 USD per device. When you are going to build your own private PKI, you also need to manage the private keys of intermediate CAs with HSMs, which can be costly.
UNiD allows devices to autonomously generate key pairs with RoT, computes the hash from the key pairs to create the payload, and registers the payload with the DPKI network based on blockchain. In the flow, you don't need to trust any intermediaries such as the provisioners and intermediate CAs. UNiD can fully automate the provisioning process to eliminate the manual operation costs and vulnerabilities in your manufacturing line (as shown in figure 7).

:::{figure-md}

<img src="../_assets/figure7-1.svg" alt="figure7">

**Figure 7.** Comparison of conventional and automated provisioning flow
:::

### Security Lifecycle Management
UNiD defines the security lifecycle that is shown in figure 8 as intended to capture the minimum set of lifecycle status and transitions in compliance with a PSA (platform security architecture) framework.
The security lifecycle status is always stored in RoT secure storage as the device instance information. In development mode, UNiD EDGE SDK sets the security lifecycle status as “test”. In production mode, the status starts with “provisioning” and changes to “secured” when an end-to-end secure channel with UNiD HUB is established. UNiD platform allows only authorized users to change the status from “secured” to “PRoT debug” and “decommissioned”. When the status is changed to “decommissioned”, UNiD EDGE SDK revokes the DID Document and removes the sensitive information such as device key pairs and instance information.
Based on the framework, UNiD provides features such as device management, fraud detection, security updates, and over-the-air to realize more scalable and efficient device maintenance and operation, which have been done manually in the past.

:::{figure-md}

<img src="../_assets/figure8-1.svg" alt="figure8">

**Figure 8.** UNiD Security Lifecycle Management Framework
:::
