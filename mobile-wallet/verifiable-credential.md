---
title: VC Operations
description: description
---

# VC Operations

On this page, we will demonstrate how to create a verifiable credential in a JSON-LD format adhering to the [W3C VC Data Model](https://www.w3.org/TR/vc-data-model/).

## VC Lifecycle

This section provides a concrete set of simple but complete lifecycle examples of the data model expressed in one of the concrete syntaxes supported by this specification. The lifecycle of credentials and presentations in the Verifiable Credentials Ecosystem often take a common path:

1. Issuance of one or more verifiable credentials.
2. Storage of verifiable credentials in a secure data storage \(SDS\).
3. Composition of verifiable credentials into a verifiable presentation for verifiers.
4. Verification of the verifiable presentation by the verifier.

## Create SIVC

Here, we introduce how to create SIVC \(Self-Issued Verifiable Credential\) by the holder itself. For example, SIVC is used to store personal identifiable information such as name, birthday, and address to SDS as registering a user account.

If it goes on like this, third parties can not trust the data claimed by users themselves. So, SIVC needs to be submitted to a trusted party for verification. After verification, third parties can trust the VC as long as they believe in the trusted party.

Now let's create an `AddressCredentialV1` through React Native SDKs.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk";

(async () => {
    try{
        // To get a credential subject's DID
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })

        const AddressCredentialV1 = DID.createCredential(
            new AddressCredentialV1({
                '@id': DID.getIdentifier(),
                '@type': "AddressPerson",
                address: {
                    postalCode: "1500044",
                    addressCountry: "JP",
                    addressLocality: "Tokyo",
                    addressRegion: "Shibuya-ku",
                    streetAddress: "5-5, Marumaya-cho"
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
{% endtab %}
{% endtabs %}

In UNiD network, we ensure interoperability by referring to the VC data schema defined [here](../schemas/). If you want to generate a new type of VC schema that is not in the UNiD VC schema list, you can request it. For more information, see [Request VC schema](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/tutorial/3-howtorequestvcschema/README.md).

Great! Now that you've completed to create a verifiable credential with JSON-LD data format. Next is to storage the credential to the UNiD SDS \(Secure Data Storage\).

## Storage VC in SDS

The wallet can securely access authorized SDS endpoints. The verifiable credentials are always encrypted and stored in the SDS.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk"

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
{% endtab %}
{% endtabs %}

UNiD SDS validate every requests to see if the wallet is authorized to access the SDS and if the request has been tampered with.

Great! Now that you've completed to storage a VC to SDS. Next is to get selectively credentials stored in SDS and create a verifiable presentation.

## Composition of VC into VP

The mobile wallet can fetch a newest record with `DID.getCredential()`. You can specify  `type`, `issuerDid`, and `issuanceDate`.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk"

(async () => {
    try {
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })
        const credential = await DID.getCredential({
            type: "AddressCredentialV1",
            issuerDid: "did:unid:test:issuer_12345678#keys-1",
            issuanceDate: {
                begin: new Date("2020-01-01"),
                end: new Date("2020-12-31")
            }
        })
        console.log("Complete getting the latest credential from SDS:", credential)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

The mobile wallet can fetch all applicable credentials with `DID.getCredentials()`.  You can specify  `type`, `issuerDid`, `issuance_date`, `limit`, and `page`.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk";

(async () => {
    try {
        const DID = await UNiD.loadDid({
            did: "did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg"
        })
        const credentials = DID.getCredentials({
            type: "AddressCredentialV1",
            issuerDid: "did:unid:test:issuer_123456789",
            issuanceDate: {
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
{% endtab %}
{% endtabs %}

After getting credentials, you can package the verifiable credentials into the verifiable presentation with `DID.createPresentation()`.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk";

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
{% endtab %}
{% endtabs %}

## Submit VP to Verifier

There are two main methods to submit VP to a verifier. The first one is to include the VP in the DID authentication response and submit it to a verifier. See more information in [the section of DID Communication](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/mobile-wallet/3-did-auth/README.md). The second one is to storage the VP in SDS and grant access to the VP to the verifier.

## Verify VC from Issuer

This section describes how the application server verifies the signature of the verifiable presentation and retrieves the data. First of all, the application server verifies the signature of the receive VP with `UNiD.verifyPresentation()`.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk"

(async () => {
    try {
        const result = await UNiD.verifyPresentation(presentation)
        console.log("Complete validating a presentation:", result)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

You will receive the following json object. `payload` is an array of verifiable credential, and `types` is an array of verifiable credential type. 

{% tabs %}
{% tab title="JSON" %}
```javascript
result = {
  isValid: boolean,
  metadata: {
    issuer: string,
    issuanceDate: Date,
    ..
  },
  payload: Array<VC>,
  types: Array<string>,
}
```
{% endtab %}
{% endtabs %}

By specifying the credential type, you can retrieve the verifiable credential with `AddressCredentialV1.select()`.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/nodejs-sdk"

(async () => {
    try {
        const vc = await AddressCredentialV1.select(result.payload)
        console.log("Complete retrieving a credential:", JSON.stringfy(vc, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

You can verify the signature of the retrieved verifiable credential with `UNiD.verifyCredential()`.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/react-native-sdk"

(async () => {
    try {
        const result = await UNiD.verifyCredential(vc)
        console.log("Complete validating a credential:", JSON.stringfy(result, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

You will receive the following json object.

{% tabs %}
{% tab title="JSON" %}
```javascript
result = {
  isValid: boolean,
  metadata: {
    issuer: string,
    issuanceDate: Date,
    ..
  },
  payload: VC
}

// For example, get addressCountry from AddressCredentialV1
// console.log(result.payload.address.addressCountry)
```
{% endtab %}
{% endtabs %}

