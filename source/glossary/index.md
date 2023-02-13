# Glossary of terms and abbreviations

**NodeX**  
This is a generic term for the endpoint security platform provided by CG.

**NodeX EDGE**  
NodeX EDGE is an open source middleware to be embedded in devices. It provides general-purpose SDKs designed to support various devices with RoT, operating systems, and transports.

**NodeX HUB**  
NodeX HUB has IAM and message handler functions to bridge edge devices and the cloud. It provides end-to-end authentication channels that enables secure bidirectional communication between every device and the cloud. It provides API and webhook to connect edge devices to various cloud services.

**NodeX Studio**  
NodeX Studio is an application for device management. You can manage and control provisioned devices from NodeX Studio.


**DID**  
Decentralized identity, also know as self-sovereign identity (SSI), is the new identity stack where distributed users and machines are able to interact with verifiable data without the need for third parties. It's a digital movement that evolves digital identity on the Internet based on open web standards at organizations such as the [W3C](https://www.w3.org), [Decentralized Identity Foundation](https://identity.foundation), [IETF](https://ietf.org), and [the Hyper ledger Project at the Linux Foundation](https://www.hyperledger.org). A central part of the movement is the emerging standardization around decentralized identifiers (DIDs) which is a new type of identifier to allow any subjects to create and control their own unique identifiers.

Technically, decentralized identifier is a URI composed of three parts: the scheme did:, a method identifier, and a unique, method-specific identifier specified by the DID method. DIDs are resolvable to DID documents. A DID URL extends the syntax of a basic DID to incorporate other standard URI components such as path, query, and fragment in order to locate a particular resource —for example, a cryptographic public key inside a DID document, or a resource external to the DID document.

In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities. Any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) can use these identifiers to obtain verifiable credential (VC) from trusted organizations and present these credentials as proof of claims about themselves.


**DID Document**  
DID documents contain information associated with a DID. They typically express verification methods, such as cryptographic public keys, and services relevant to interactions with the DID subject.

**DID Method**  
DID methods are the mechanism by which a particular type of DID and its associated DID document are created, resolved, updated, and deactivated.

**Root of Trust (RoT)**  
Root of Trust (RoT) is a source that can always be trusted within a cryptographic system. Because cryptographic security is dependent on keys to encrypt and decrypt data and perform functions such as generating digital signatures and verifying signatures, RoT schemes generally include a hardened hardware module. A principal example is the hardware security module (HSM) which generates and protects keys and performs cryptographic functions within its secure environment.
