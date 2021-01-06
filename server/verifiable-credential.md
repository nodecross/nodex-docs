---
title: VC Operations
description: description
---

# VC Operations

## Introduction

On this page, we will demonstrate how to issue and verify a verifiable credential in a JSON-LD format adhering to the [W3C VC Data Model](https://www.w3.org/TR/vc-data-model/).

## VC Lifecycle

This section provides a concrete set of simple but complete lifecycle examples of the data model expressed in one of the concrete syntaxes supported by this specification. The lifecycle of credentials and presentations in the Verifiable Credentials Ecosystem often take a common path:

1. Issuance of one or more verifiable credentials.
2. Storage of verifiable credentials in a secure data storage \(SDS\).
3. Composition of verifiable credentials into a verifiable presentation for verifiers.
4. Verification of the verifiable presentation by the verifier.

In UNiD, there are two main methods to submit VP to a wallet holder. The first one is to submit the VP in response to a request from the holder. The second one is to storage the VP in SDS and grant access to the VP to the holder.

## Create New VC

Here, we introduce how to create VC. When you create and issue a VC, you need to explicitly specify the credential subject's DID. As a simple example, let's create an [AddressCredentialV1](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/schemas/address/README.md) through the Nodejs SDK.

**DID.createCredential\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try{
        // To get a issuer's DID
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiDHnta3sppFajkzGqYm3jIe_lisi7sIq7ZqIxdzaad7fg"
        })
        // To get a credential subject's DID
        const SubjectDid = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })

        // To create AddressCredentialV1
        const AddressCredentialV1 = DID.createCredential(
            new AddressCredentialV1({
                type: [ 'VerifiableCredential', 'AddressCredentialV1' ],
                credentialSubject: {
                    '@id': SubjectDid.getIdentifier(),
                    '@type': "AddressPerson",
                    address: {
                        postalCode: "1500044",
                        addressCountry: "JP",
                        addressLocality: "Tokyo",
                        addressRegion: "Shibuya-ku",
                        streetAddress: "5-5, Marumaya-cho"
                    }
                }
            }, {
                issuanceDate: new Date(),
                expirationDate: new Date(),
            })
        )
        console.log("Complete creating a credential:", JSON.stringfy(AddressCredentialV1, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

In UNiD network, we ensure interoperability by referring to the VC data schema defined [here](../schemas/). If you want to generate a new type of VC schema that is not in the UNiD VC schema list, you can request it. For more information, see [Request VC schema](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/tutorial/3-howtorequestvcschema/README.md).

Great! Now that you've completed to create a verifiable credential with JSON-LD data format. Next is to storage the credential to the UNiD SDS \(Secure Data Storage\).

## Storage VC in SDS

The application server can securely access authorized SDS endpoints. The VCs are always encrypted and stored in the SDS in a privacy-preserving manner.

**DID.postCredential\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try{
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })
        const result = await DID.postCredential(AddressCredentialV1)
        console.log("Complete storing the credential to SDS:", result)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

UNiD SDS validate every requests to see if the wallet is authorized to access the SDS and if the request has been tampered with.

Great! Now that you've completed to storage a VC to SDS. Next is to get selectively credentials stored in SDS and create a verifiable presentation.

## Composition of VC into VP

The application server can fetch the newest record using `type`, `credential_subject_did`, `issuer_did`, and `issuance_date` of the stored VC.

**DID.getCredential\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try {
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })
        const credential = await DID.getCredential({
            type: "AddressCredentialV1",
            issuer: "did:unid:test:issuer_12345678#keys-1",
            issuance_date: {
                begin: new Date('2020-01-01'),
                end: new Date('2020-12-31')
            }
        })
        console.log("Complete getting the latest credential from SDS:", credential)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

To get all applicable credentials with options of DID.getCredentials:

**DID.getCredentials\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try {
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })
        const credentials = DID.getCredentials({
            type: "AddressCredentialV1",
            credentialSubjectDid: "did:unid:test:holder_123456789",
            issuer: "did:unid:test:issuer_123456789",
            issuance_date: {
                begin: new Date("2020-01-01"),
                end: new Date("2020-12-31")
            },
            limit: 25,
            page: 1
        })
        console.log("Complete getting credentials from SDS:", credentials)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

After getting credentials, they will be packaged in verifiable presentation with `VerifiablePresentation` type and the value of the proof property.

**DID.createPresentation\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try {
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })
        const presentation = await DID.createPresentation(credentials)
        console.log("Complete creating a presentation:", presentation)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

## Verify VC from Holder

The application server verifies the digital signature of the VC from a holder. 

**UNiD.validatePresentation\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try {
        const result = await UNiD.validatePresentation(_presentation)
        console.log("Complete validating a presentation:", result)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

**UNiD.validateCredential\(\)**

```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try {
        const result = await UNiD.validateCredential(_credential)
        console.log("Complete validating a credential:", JSON.stringfy(result, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```

