# UNiD SDKs

## Mobile Wallet SDKs

UNiD SDKs offer convenient and easy-to-use javascript module for DID operations, VC operations, and DID Comm through the underlying Core APIs and Drivers. We are currently providing React Native SDK for embedding **digital wallet** \(provide storage of keys, credentials, and secrets, often facilitated or controlled by an agent\) capabilities into a mobile agent.

## Server Wallet SDKs

We are currently providing Node SDK for embedding digital wallet capabilities into an existing application server as a verifier or issuer. 

{% page-ref page="../server/" %}

## DID AuthN Extensions

### **Self-Issued OpenID Provider \(SIOP\)**

SIOP DID Profile is a DID AuthN flavor to use OpenID Connect together with the strong decentralized, privacy and security guarantees DID for everyone who wants to have a generic way to integrate identity wallet into their web applications.

The work on [DIF SIOP DID Profile v1 specification](https://identity.foundation/did-siop/) has moved to OIDF AB WG to work on a new SIOP v2 specification that will either introduce breaking changes to the DIF SIOP DID Profile specification or will replace it with an implementation guide document on how to use SIOP v2 in an SSI context.

## VC Extensions

Currently, we are developing tools to extend the VC Data Schema required for each use case and industry while ensuring mutual compatibility. If you want to build a new data schema that is not in our lists, please let us know.

{% page-ref page="../schemas/" %}

