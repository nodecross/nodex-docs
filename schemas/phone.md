---
title: Phone
description: description
---

# phone

## PhoneCredentialV1

`PhoneCredentialV1` is a type extension of credential subject into VC.

### PhonePerson

Phone number of a person.

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `PhonePerson` | true |  |
| telephone | `string` | ture |  |

### Example of PhoneCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/phone",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials",
    "type": ["VerifiableCredential", "PhoneCredentialV1"],
    "issuer": "did:unid:test:issuer1234",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "PhonePerson",
        "@id": "did:unid:test:example1234",
        "telephone": "+818033061234"
    },
    "proof": {
        "type": "EcdsaSecp256k1Signature2019",
        "created": "20201101T180000+0900",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:unid:test:issuer1234#signingKey",
        "jws": "eyJhbGc..."
    }
}
```

### PhoneOrganization

Phone number of an organization.

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `PhoneOrganization` | true |  |
| telephone | `string` | ture |  |

### Example of PhoneCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/phone",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "PhoneCredentialV1"],
    "issuer": "did:unid:test:issuer1234",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "PhoneOrganization",
        "@id": "did:unid:test:example1234",
        "telephone": "0312345678"
    },
    "proof": {
        "type": "EcdsaSecp256k1Signature2019",
        "created": "20201101T180000+0900",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:unid:test:issuer1234#signingKey",
        "jws": "eyJhbGc..."
    }
}
```

### phone.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "PhoneCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/phone#PhoneCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "PhonePerson": "http://schema.org/Person",
                "PhoneOrganization": "http://schema.org/Organization",
                "telephone": "http://schema.org/telephone"
            }
        }
    }
}
```

