# Data Format

This section describes how the applications surrounding the NodeX platform and the edge devices in which NodeX AGENT is embedded communicate with each other and based on what protocols.
NodeX is based on the following standards defined by W3C or DIF, and we will take a closer look at how they are utilized within NodeX.

- Decentralized Identifiers (DIDs)<br />
  [https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)
- Verifiable Credentials Data Model<br />
  [https://www.w3.org/TR/vc-data-model/](https://www.w3.org/TR/vc-data-model/)
- Sidetree<br />
  [https://identity.foundation/sidetree/spec/](https://identity.foundation/sidetree/spec/)
- DIDComm Messaging<br />
  [https://identity.foundation/didcomm-messaging/spec/](https://identity.foundation/didcomm-messaging/spec/)

## Private and Public Keys

NodeX, like other distributed identity products, manages private keys within the agent and uses distributed public key resolution nodes to obtain public keys.
Specifically, it uses a specification called Sidetree, with Bitcoin as the trust anchor behind the public key resolution node using Sidetree, and IPFS running as the public key data store.
Since NodeX uses Sidetree for public key resolution, the private and public key formats, resolution methods, and key rotation methods are all implemented according to the Sidetree specification, and are inter-compatible at the deep DID level with other products that use Sidetree as their DID method.
The specifications for Sidetree are available here.

## Payload Representation

In NodeX, how is the entity (payload) of the data you want to send to the other party sent? I would like to explain this here.
In NodeX, when sending data to a peer, two specifications, Verifiable Credentials and DIDComm, are used to achieve E2EE while attaching signed data.
The figure below shows the form.

```text
+-----------------------------------+
| DIDComm Enc (.dcem)               |
+-----------------------------------+
| body: {                           |
|   +----------------------------+  |
|   | Verifiable Credentials     |  |
|   +----------------------------+  |
|   | ...,                       |  |
|   | credentialSubject: {       |  |
|   |   payload: {               |  |
|   |     ... // (A)             |  |
|   |   },                       |  |
|   |   metadata: {              |  |
|   |     ... // (B)             |  |
|   |   }                        |  |
|   | }                          |  |
|   +----------------------------+  |
| },                                |
| attachments: [{                   |
|   media_type: 'application/json', |
|   data: {                         |
|     json: {                       |
|       ... // (C)                  |
|     }                             |
|   }                               |
| }]                                |
+-----------------------------------+
```

**(A)**: `body`.`credentialSubject`.`payload`<br />
The entity of the data to be transmitted is embedded in the counterpart passed from the application or system using the NodeX agent.
It is represented as JSON in key-value format.
When transmitting binary data including images, audio, and video, the application or system must be pre-serialized using algorithms such as Base64.
The data transmitted using this field is Authenticated Encryption with Authentication (AEAD) data according to the DIDComm Enc specification, which guarantees the confidentiality, authenticity, and integrity of the data.
The internal Verifiable Credentials can also be extracted and transported, allowing the authenticity and integrity of the data to be verified at the destination.

**(B)**: `body`.`credentialSubject`.`metadata`<br />
Embedded when you want to add information that supplements the substance of the data as metadata.
Like entities, they are represented as JSON in key/value format, and binary data including images, audio, and video must be serialized in advance using algorithms such as Base64 on the application or system side, even when they are to be added as metadata.
Data transmitted using this field is also Authenticated Encryption with Authentication (AEAD) data according to the DIDComm Enc specification, which guarantees the confidentiality, authenticity, and integrity of the data.
The internal Verifiable Credentials can also be extracted and transported, allowing the authenticity and integrity of the data to be verified at the destination.

**(C)**: `attachments`.`[number]`.`data`.`json`<br />
It is the same as the former field, but this field is added to the data container (dcem) in the transport layer and does not benefit from digital signature by Verifiable Credentials.
Also, the data in this field is delivered to the destination node for transmission by NodeX, but is not passed to the application or system beyond the destination node.
In other words, this field is mainly positioned as metadata in the transport layer and has a strong system use aspect.
Note that data transmitted using this field is Authenticated Encryption with Authentication (AEAD) data according to the DIDComm Enc specification, which guarantees the confidentiality, authenticity, and integrity of the data.

## Wrapping by DIDComm

Three types of DIDComm are specified: DIDComm Plaintext Messages (dcpm), DIDComm Signed Messages (dcsm), and DIDComm Encrypted Messages (dcem), respectively.
Of these schemes, NodeX employs DIDComm Encrypted Messages (dcem) to implement the data transport layer.
The data wrapping by DIDComm is as described above, with DIDComm being the container that wraps the data when NodeX is viewed as a data orchestration tool, and the Verifiable Credentials are stored in the container.
Containers with DIDComm are utilized in the data transport layer between the NodeX agent and the NodeX agent, and DIDComm is not applied between the application system and the NodeX agent.

```text
Your System        NodeX AGENT (Sender)                NodeX HUB                   NodeX AGENT (Receiver)       Another System
+---------+  Send  +-----------------+                 +---------+                 +-----------------+  Notify  +-------------+
| Payload |  --->  | DIDComm Enc     | -> Transport -> | Routing | -> Transport -> | DIDComm Enc     |  ----->  | VC (*)      |
+---------+        | +-------------+ |    on X (**)    +---------+    on X (**)    | +-------------+ |  Fetch   | +---------+ |
                   | | VC (*)      | |                      ^                      | | VC (*)      | |  <-----  | | Payload | |
                   | | +---------+ | |                      |                      | | +---------+ | |          | +---------+ |
                   | | | Payload | | |                NodeX STUDIO                 | | | Payload | | |          +-------------+
                   | | +---------+ | |                +-----------+                | | +---------+ | |
                   | +-------------+ |                | Dashboard |                | +-------------+ |
                   +-----------------+                +-----------+                +-----------------+

VC (*): Verifiable Credentials
Transport on X (**): Transport agnostic
```

## Encryption by DIDComm

NodeX uses DIDComm as its E2EE protocol, and several protocols for cryptographic operations are defined for E2EE with DIDComm, allowing users the flexibility to choose based on their business and system requirements.
As defined by the DIDComm specification, in addition to sender authentication encryption using the ECDH-1PU algorithm and anonymous encryption using the ECDH-ES algorithm, the curve, cipher algorithm, and key wrap algorithm in ECC can be selected from NIST and non-NIST certified respectively.
NodeX implements all the specifications defined by the DIDComm specification, and the default values are as follows:

- Authentication method: `Sender Authenticated Encryption`
- Curve: `X25519`
- Encryption algorithm: `A256CBC-HS512`
- Key-wrapping algorithm: `ECDH-1PU+A256KW`

The default configuration of NodeX uses an algorithm that is not certified by NIST. However, by specifying parameters when sending messages in NodeX, E2EE messaging can be performed in compliance with the requirements of NIST.