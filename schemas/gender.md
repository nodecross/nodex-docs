---
title: Gender
description: description
---

# gender

## GenderCredentialV1

`GenderCredentialV1` is a type extension of credential subject into VC.

### GenderPerson

Gender of a person.

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `GenderPerson` | true |  |
| gender | `string` | ture |  |

### Example of GenderCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/gender",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "GenderCredentialV1"],
    "issuer": "did:unid:test:issuer_example1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "GenderPerson",
        "@id": "did:unid:test:example1234#keys-1",
        "gender": "Male"
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

### gender.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "GenderCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/gender#GenderCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "GenderPerson": "http://schema.org/Person",
                "gender": "http://schema.org/gender",
            }
        }
    }
}
```

