# Features

In this chapter, we introduce the core features of NodeX EDGE, which is developed in Rust language and can be compiled into a static library that can be referenced in C language. The source code can be found [here](https://github.com/nodecross/nodex-agent).

NodeX EDGE consists of micro components and extensions that support various RoTs, transports and clouds. By integrating NodeX EDGE into your device, you can securely implement the necessary security features such as FOTA, remote monitoring, and device certificate management.

:::{figure-md}

<img src="../_assets/nodex_blocks.svg" alt="nodex blocks">

**Figure 6.** NodeX EDGE Architecture
:::

## Device Identifier

NodeX EDGE uses decentralized identifier (DID) as a device identifier based on the [W3C DID Core 1.0 specification](https://www.w3.org/TR/did-core/). In the secure processing environment (hereinafter referred to as SPE), it generates multiple key pairs from a hardware-derived true random number generator (TRNG), and generates the payload by hashing the object containing this public key information. This payload can be registered with blockchain-based DPKI (Decentralized Public Key Infrastructure) to generate a DID, which can be treated as a globally unique identifier independent of any third party. This DID is a URI that associates the device with a DID document that allows trustable interactions.

## Root of Trust (RoT)

NodeX EDGE always encrypts and stores all sensitive information such as device key pairs, device instance, and pre-configured security policies and performs crypto processing in the secure processing environment. Unauthorized applications and remote servers can not access the SPE to prevent virus intrusion and information leakage.

Placing the root of trust in the hardware is a fundamental requirement of IEC 62443, an international standard for OT/IoT systems. To take advantage of this RoT technology, it is necessary to understand the architecture and low-level API, which requires a high level of expertise and a lot of effort. NodeX EDGE RoT Wrapper makes it simple to use RoT technology.

## Device Authenticity

Entities that communicate with the device can validate the device's authenticity by verifying the digital signature and pre-defined client_secret. Specifically, the entity obtains the corresponding device's public key from DPKI to verify the digital signature. The client_secret is issued for each product and is set in the device in advance. This mechanism makes it possible to detect and exclude unauthorized devices from the network, thus preventing virus intrusion and information leakage.

## Fully Automated Provisioning

By leveraging decentralized identity technology, NodeX EDGE enables fully automated provisioning.

In the typical provisioning flow, the provisioners manually generate key pairs and certificate signing requests (CSRs) and register CSRs to a certificate authority to get the device's public key certificates. Then, the provisioner manually injects private keys and certificates into devices. This manual operation comes at a high cost because you need to invest in physical security environments and employee background checks to reduce security risks in your manufacturing line. This key injection usually costs between $0.5 and $2.0 USD per device.

NodeX EDGE enables devices to autonomously register the public key to the decentralized PKI. In NodeX flow, you don't need to trust any intermediaries; provisioners and intermediate CAs, it means you can completely eliminate the manual operation costs and vulnerabilities in your manufacturing line.

:::{figure-md}

<img src="../_assets/figure7-1.svg" alt="figure7">

**Figure 7.** Comparison of conventional and automated provisioning flow
:::

## E2E Secure Channel

Two-way communication (device-cloud, device- device) happens via a message handler, called by the customer, NodeX HUB. NodeX EDGE stores NodeX HUB's DID in RoT SPE as pre-configuration. The device performs handshakes with the NodeX HUB to establish an end-to-end secure channel. In the handshake process, the system sends the public key (for encryption) and encrypted and signed message including client_id and client_secret to the server as client hello. The server generates a common key with a received public key, and decrypts the message to verify the device's signature and client_secret, and responds with an encrypted and signed message to the device. The device then verifies the server's signature and compares the server's DID with the pre-configured DID to authenticate the server, and completes the handshake process.

## Access Control

The system software stores in PSA-RoT secure storage a security policy regarding access privileges. Such a security policy is used by the system software to manage access privileges. Device security parameters can only be updated by privileged users who are allowed to access the NodeX HUB. There are two access privilege levels; Admin and User. Admin and User (including cloud application through API) are authenticated and authorized by HUB. Admin users are allowed to send encrypted and signed data with secret_token to the target device, and the device validates the secret_token using a pre-configured security policy to authenticate the admin user. In the system software, the execution of application functionalities is enabled with the lowest level of privilege necessary for the intended function.

## Logging

The logging data is buffered with EMERG/ALERT/CRIT/ERR/WARNING/NOTICE/DEBUG log level tags and FROM/TO/MESSAGE data format and will be sent to NodeX HUB. All logging data is digitally signed, encrypted (AES-GCM) in the RoT secure storage. If the network of the device is temporarily interrupted, the logging data will be buffered with the maximum value of the pre-configured capacity, and the cached logging data will be sent to NodeX HUB when the network is reopened. NodeX HUB verifies and decrypts the logging data and stores it in the server. Basically, the logging data is stored in the server for 2 years, but the storage period depends on the service plan users subscribe to. Users can access the logging data via NodeX HUB API. In the initial configuration, only the admin user can access the logging data. Admin users can change the access control of NodeX HUB. All the logging data can be searched by the logging tags.

## RoT Extension

Middleware for storing security configurations or secret keys and for accessing RoT functions may sometimes be configured independently. In order to allow NodeX EDGE to run in more environments and to serve as a security solution for a variety of use cases, we provide the ability to replace some of the functions built into NodeX EDGE with your own. Developers do not need to recompile the entire NodeX EDGE. All they need to do is implement the methods according to a simple API specification and create a shared library that can be loaded by NodeX EDGE.

## DID Configuration File

HUB has privately a DID configuration file to ensure device authenticity through message authentication codes by pre-sharing confidential information with the EDGE. The DID configuration file in the HUB can be reflected in the json file under the root domain managed by the customer as <a href='https://identity.foundation/.well-known/resources/did-configuration/'>Well Known DID Configuration File</a>.

## Security Configuration

The system software allows users to change security parameters after authenticating privileged users according to predefined policies. Specifically, access policies (e.g., authorized entity's DID and IP), security policy (e.g., configuration of cryptography), and update policies (e.g., HeartBeat frequency, logging transmission frequency, automatic installation of updated software) can be changed after user authentication. Security-relevant configuration changes are allowed by the system software, just after authentication of privileged users (such authentication is in accordance with predefined policies). The security parameters that can be changed after user authentication include:

- Access policies (i.e. authorized entity's DID and IP)
- Security policy (i.e. configuration of used cryptography)
- Update policies (i.e. logging transmission frequency or automatic installation of updated software)

## Dependent Cryptography

The system software uses the best practice cryptography in the NIST recommended cipher lists.

- ECC secp256k1 curve (is an elliptic curve of Koblitz type and a security level of 256 bit)
- ECDSA 256 bit for signature algorithm
- ECDH 256 bit for key exchange
- AES 256 bit GCM in compliant with NIST FIPS PUB 197 for encryption
- PBKDF2 in compliant with NIST SP 800-132 for key derivation
- SHA-256, 512 in compliant with NIST FIPS PUB 180-4 for hashing
- HMAC in compliant with NIST FIPS PUB 198-1 for message authentication code
