# UNiD Platform

## Intro to UNiD Platform

UNiD platform provides the fundamental capabilities for DID operations, VC operations, and DID communications in a secure and privacy-preserving manner. UNiD implementation is composed of a collection of micro services, allowing developers to combine pluggable and extensible modular for flexibility and freedom of choice without compromising security.

As in the diagram below, our platform consists of four components: **UNiD SDKs**, **UNiD Core**, **UNiD Drivers**, and **UNiD Network**.

![](../.gitbook/assets/cg-company-deck-2-.svg)

**UNiD Network** is built on the top of [Sidetree](https://identity.foundation/sidetree/spec/) that is a 2nd layer blockchain-agnostic protocol and has multiple reference implementations for various decentralized ledger systems, such as Bitcoin, Ethereum, etc.

**UNiD Drivers** pre-configured integrations to our platform that support fundamental capabilities. **UNiD Core** are designed as a set of APIs for communicating with UNiD network and drivers and used through **UNiD SDKs** to easily incorporate these capabilities into your application.

## UNiD Core

UNiD Core consists of a set of modules and APIs that support core functions such as DID operations, VC operations, and DID communications. UNiD SDKs and extension tools are built on the top of it.

{% page-ref page="unid-core.md" %}

## UNiD Drivers

The UNiD Drivers are pre-configured integrations to our platform that support DID methods, key management, crypto primitives, and tenant model. The drivers are pluggable for preventing vendor lock-in and enabling users choices without compromising security.

{% page-ref page="unid-driver.md" %}

## UNiD SDKs

The UNiD SDKs offer convenient and easy-to-access application logic to build solutions and integrate with digital services that exist out of our platform. UNiD extension tools support the features such as DID AuthN and VC Data Schema that are strongly dependent on each use case and are outside scope of UNiD Core and Drivers.

{% page-ref page="unid-sdk.md" %}

## UNiD Network

UNiD Network is built on the top of Sidetree that is a 2nd layer blockchain-agnostic protocol and has multiple reference implementations for various decentralized ledger systems, such as Bitcoin, Ethereum, etc.

{% page-ref page="unid-network.md" %}

