# UNiD Platform

## Overview

UNiD platform consists of;

- _UNiD EDGE_ is a middleware embedded in endpoint devices
- _UNiD HUB_ is a message broker between endpoint devices and the cloud
- _UNiD Studio_ is a device management dashboard

All you have to do is to integrate UNiD EDGE into your device, and UNiD EDGE will establish an end-to-end authenticated channel with UNiD HUB and realize bi-directional communication with various cloud services while ensuring device authenticity, data integrity, and privacy.

:::{figure-md}

<img src="../_assets/figure1-2.svg" alt="figure1" width="90%" align="center">

**Figure 1.** Overview of UNiD platform
:::

UNiD EDGE is an [open-source middleware](https://github.com/getunid/unid), while UNiD HUB and UNiD Studio are proprietary software hosted in a cloud environment.

---
## Design Concept

Our main concept is to build end-to-end security infrastructure that abstracts every device and the cloud as a global unique endpoint, allowing a device to interact with other endpoints securely and privately regardless of the network topology or routing hops.

:::{figure-md}

<img src="../_assets/figure2-2.svg" alt="figure2">

**Figure 2.** E2E security infrastructure
:::

To achieve this concept, we utilize decentralized identifiers (DIDs) and Root of Trust (RoT) technologies. Specifically, UNiD EDGE generates multiple key pairs from a hardware-derived true random number generator (TRNG) within the RoT secure processing environment, and generates a payload for registering with a blockchain-based decentralized PKI (DPKI) to create a DID document including the public key information. Anyone can obtain the corresponding device's public key from the network to authenticate the device and verify the digitally signed data. To learn more, click [here](../unid_edge/index.md).

This identity-first, end-to-end approach can abstract the complexity of security infrastructure and enables advanced, scalable endpoint security for connected systems. UNiD platform is designed to make the security infrastructure easily available and free all developers from the heavy burden of building the complex security infrastructure for each product.

---
## Architecture

### UNiD EDGE

UNiD EDGE consists of;

- **RoT Wrapper**: This component supports TrustZone (Arm Cortex-M) and hardware security modules (supported MCUs), making it easier to use the RoT secure processing environment (SPE).
- **Key Management**: This component supports the device's cryptographic key operations (create, read, update, delete) in the SPE.
- **Device IAM**: This component supports management of device identities, credentials, and security policies for device's authentication and authorization.
- **E2E Secure Socket**: This component supports to establish end-to-end authenticated channels with UNiD HUB for secure bi-directional communications.

:::{figure-md}

<img src="../_assets/figure3-4.svg" alt="figure3">

**Figure 3.** UNiD EDGE Architecture
:::

### UNiD HUB

UNiD HUB consists of;

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
