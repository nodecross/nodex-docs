# UNiD Platform

## Intro to UNiD Platform

UNiD is an easy to implement, flexible solution to integrate a decentralized identity capabilities into your applications. UNiD is composed of a collection of micro services, allowing developers to combine pluggable and extensible modular for flexibility and freedom of choice without compromising security. We are here to give developers and companies the building blocks they need to secure their applications without having to become security experts.

As in the diagram below, our platform consists of four components: **UNiD SDKs**, **UNiD Core**, **UNiD Drivers**, and **UNiD Network**.

![](<../.gitbook/assets/CG - Company Deck (2).svg>)

**UNiD Network** is built on the top of [Sidetree](https://identity.foundation/sidetree/spec/) that is a 2nd layer blockchain-agnostic protocol and has multiple reference implementations for various decentralized ledger systems, such as Bitcoin, Ethereum, etc.

**UNiD Drivers** pre-configured integrations to our platform that support fundamental capabilities. **UNiD Core** are designed as a set of APIs for communicating with UNiD network and drivers and used through **UNiD SDKs** to easily incorporate these capabilities into your application.

## UNiD Core

UNiD Core consists of a set of modules and APIs that support core functions such as DID operations, VC operations, and DID communications. UNiD SDKs and extension tools are built on the top of it.

{% content-ref url="unid-core.md" %}
[unid-core.md](unid-core.md)
{% endcontent-ref %}

## UNiD Drivers

The UNiD Drivers are pre-configured integrations to our platform that support DID methods, key management, crypto primitives, and tenant model. The drivers are pluggable for preventing vendor lock-in and enabling users choices without compromising security.

{% content-ref url="unid-driver.md" %}
[unid-driver.md](unid-driver.md)
{% endcontent-ref %}

## UNiD SDKs

The UNiD SDKs offer convenient and easy-to-access application logic to build solutions and integrate with digital services that exist out of our platform. UNiD extension tools support the features such as DID AuthN and VC Data Schema that are strongly dependent on each use case and are outside scope of UNiD Core and Drivers.

{% content-ref url="unid-sdk.md" %}
[unid-sdk.md](unid-sdk.md)
{% endcontent-ref %}

## UNiD Network

UNiD Network is built on the top of Sidetree that is a 2nd layer blockchain-agnostic protocol and has multiple reference implementations for various decentralized ledger systems, such as Bitcoin, Ethereum, etc.

{% content-ref url="unid-network.md" %}
[unid-network.md](unid-network.md)
{% endcontent-ref %}
