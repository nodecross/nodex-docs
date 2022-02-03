# Introduction

## Digital Identity

The traditional identity systems today are fragmented, insecure, and do not have sufficient functionality to verify whether the data transferred is reliable in human social activity. For example, when using digital services, we are always required to create accounts and store a small part of our digital identity in the databases of these service providers. Consequently, digital identities become fragmented and locked into numerous different databases controlled by multiple external third parties.

The model of centralized identity systems increases the security risks such as unauthorized access, internal leaks, and data tampering as long as they hold a vast of amount of personal information in their databases. In addition, the centralized model makes it difficult to share personal data across services. This is because organizations need to spend a big deal time and effort on consent management and data processing such as anonymizing, naming, verifying in order to ensure privacy protection which have become increasingly responsible in recent year.

Although these issues have been recognized as common business challenges and risks across the world and various industries, they were difficult to solve fundamentally. At the core of these issues is the fact that the Internet itself is not equipped with mechanisms of digital identity and data verification.

At UNiD, we are focused on building the new identity stack for the future WEB where distributed users and machines are able to interact with verifiable data without the need for third parties. To achieve this goal, it's important first step to establish a globally unique identity that can be controlled directly by a user without the need for third parties.

## Decentralized Identity

Decentralized identity, also know as self-sovereign identity (SSI), is the new identity stack for the future web where distributed users and machines are able to interact with verifiable data without the need for third parties. It's a digital movement that evolves digital identity on the Internet based on open web standards at organizations such as the [W3C](https://www.w3.org), [Decentralized Identity Foundation](https://identity.foundation), [IETF](https://ietf.org), and [the Hyper ledger Project at the Linux Foundation](https://www.hyperledger.org). A central part of the movement is the emerging standardization around Decentralized Identifiers (DIDs) which is a new type of identifier to allow individuals to create and control their own unique identifiers.

In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities. Any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) can use these identifiers to obtain verifiable credential (VC) from trusted organizations and present these credentials as proof of claims about themselves.

The roles of the core actors and the relationships between them in an ecosystem where DIDs and verifiable credentials are expected to be useful.

![DID Ecosystem Overview](<.gitbook/assets/did-map (3) (3).png>)

As can be seen from the diagram above, in order to take full advantage of the capabilities of DIDs and verifiable credentials, it is most important to minimize the implementation cost for existing services. UNiD provides toolkits for easy integration with existing services.

{% content-ref url="unid-platform/" %}
[unid-platform](unid-platform/)
{% endcontent-ref %}

## Use Cases

### Intro to a digital student wallet

In order to understand the roles in DID ecosystem and how to establish **digital trust**, we introduce a demonstration of a digital student wallet built on the top of UNiD platform. This demonstration shows password less login and credential issuance when students apply for transcripts to their university.

A student can easily login to the website without any password in a secure manner. A service provider (in this case, it may be a vendor or university) can provide a seamlessly onboarding process to students without retaining personal data in their database.

![UNiD DID Authentication](<.gitbook/assets/demo-unid-login (1) (3) (3).png>)

A student goes to transcript apply page and read a QR code for a request. The web application issues a transcript with the university's signature and send the credential of transcript to a student. Students can bring and present the credential to other parties as proof of his educational history.

![Use Case Student Wallet](.gitbook/assets/demo-unid-credential.png)

This sort of credentials can be presented to enterprises for applying a job. The enterprise as a verifier can cryptographically verify the credential without contacting the issuer. That begins establishing **digital trust** around that DIDs by using it in their digital interactions. Through UNiD SDKs, our platform offers convenient and easy-to-access application logic to build such solutions and integrate with digital services that exist out of our platform.

### Wide variety of use cases

Our platform is composed of a collection of micro services, allowing developers to combine pluggable and extensible modular for flexibility and freedom of choice without compromising security for a wide variety of applications for:

* Online Bank
* Insurance
* Human Resource
* Education
* Tele Communication
* Healthcare
* Gig Economy
* B2B transaction
* SmartCity
* IoT
* Energy
* Travel
* Government

{% hint style="success" %}
🧠 **NOTE**: We are currently working on joint projects with leading companies in each industry → [Click here for more info](https://collabogate.com)
{% endhint %}
