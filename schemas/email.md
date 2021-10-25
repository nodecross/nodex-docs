# email

Email of a person or organization.

## EmailCredentialV1

`EmailCredentialV1` is a type extension of credential subject into VC.

### EmailPerson

Email of a person.

| Attribute | Type          | Required | Notes |
| --------- | ------------- | -------- | ----- |
| "@type"   | `EmailPerson` | true     |       |
| email     | `string`      | ture     |       |

### Example of EmailCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/email",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "EmailCredentialV1"],
    "issuer": "did:unid:test:issuer1234",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "EmailPerson",
        "@id": "did:unid:test:example1234",
        "email": "example@collabogate.com",
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

### EmailOrganization

Email of an organization.

| Attribute | Type                | Required | Notes |
| --------- | ------------------- | -------- | ----- |
| "@type"   | `EmailOrganization` | true     |       |
| email     | `string`            | ture     |       |

### Example of AddressCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/email",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "EmailCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "EmailOrganization",
        "@id": "did:unid:test:example1234#keys-1",
        "email": "example@collabogate.com",
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

### email.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "EmailCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/email#EmailCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "EmailPerson": "http://schema.org/Person",
                "EmailOrganization": "http://schema.org/Organization",
                "email": "http://schema.org/email",
            }
        }
    }
}
```
