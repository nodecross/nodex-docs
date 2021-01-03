---
title: Name
description: description
---

# name

## NameCredentialV1

`NameCredentialV1` is a type extension of credential subject into VC.

## NamePerson

Name of a person.

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `NamePerson` | true |  |
| name | `string` | ture |  |
| givenName | `string` | true |  |
| familyName | `string` | true |  |

## Example of NameCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/name",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "NameCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "NamePerson",
        "@id": "did:unid:test:example1234#keys-1",
        "name": "John Smith",
        "givenName": "John",
        "familyName": "Smith"
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

## NameOrganization

Name of an organization.

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `NameOrganization` | true |  |
| name | `string` | ture |  |

// Internationalization

## Example of NameCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/name",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "NameCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "NameOrganization",
        "@id": "did:unid:test:example1234#keys-1",
        "name": "CollaboGate Japan, Inc."
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

## name.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "NameCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/name#NameCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "NamePerson": "http://schema.org/Person",
                "NameOrganization": "http://schema.org/Organization",
                "name": "http://schema.org/name",
                "giveName": "https://schema.org/givenName",
                "familyName": "https://schema.org/familyName"
            }
        }
    }
}
```

