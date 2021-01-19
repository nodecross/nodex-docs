---
title: Address
description: description
---

# address

Address of a person or organization.

## AddressCredentialV1

`AddressCredentialV1` is a type extension of credential subject into VC.

### AddressPerson

Address of a person.

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `AddressPerson` | true |  |
| address | `PostalAddress` | ture |  |

### PostalAddress

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `PostalAddress` | true |  |
| addressCountry | `string` | ture |  |
| addressLocality | `string` | true |  |
| addressRegion | `string` | true |  |
| postalCode | `string` | true |  |
| streetAddress | `string` | true |  |

### Example of AddressCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/address",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "AddressCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "AddressPerson",
        "@id": "did:unid:test:example1234#keys-1",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "JP",
            "addressLocality": "Shibuya-ku",
            "addressRegion": "Tokyo",
            "postalCode": "1500044",
            "streetAddress": "22-6, Maruyama-cho"
        },
    },
    "proof": {
        "type": "EcdsaSecp256k1Signature2019",
        "created": "20201101T180000+0900",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:unid:test:example1234#keys-1",
        "jws": "eyJhbGc..."
    }
}
```

### AddressOrganization

Address of an organization.

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `AddressOrganization` | true |  |
| address | `PostalAddress` | ture |  |

### Example of AddressCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/address",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "AddressCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "AddressOrganization",
        "@id": "did:unid:test:example1234#keys-1",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "JP",
            "addressLocality": "Shibuya-ku",
            "addressRegion": "Tokyo",
            "postalCode": "1500044",
            "streetAddress": "5-5, Maruyama-cho"
        },
    },
    "proof": {
        "type": "EcdsaSecp256k1Signature2019",
        "created": "20201101T180000+0900",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:unid:test:example1234#keys-1",
        "jws": "eyJhbGc..."
    }
}
```

### address.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "AddressCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/address#AddressCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "AddressPerson": "http://schema.org/Person",
                "AddressOrganization": "http://schema.org/Organization",
                "address": {
                    "@id": "http://schema.org/address",
                    "@type": "@id",
                    "@context": {
                        "@version": 1.1,
                        "@protected": true,

                        "id": "@id",
                        "type": "@type",
                        "PostalAddress": "http://schema.org/PostalAddress",
                        "addressCountry": "http://schema.org/addressCountry",
                        "addressLocality": "http://schema.org/addressLocality",
                        "addressRegion": "http://schema.org/addressRegion",
                        "postalCode": "http://schema.org/postalCode",
                        "streetAddress": "http://schema.org/streetAddress"
                    }
                }
            }
        }
    }
}
```

