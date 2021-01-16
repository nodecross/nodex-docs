# worksFor

Organizations that the person works for.

## WorksForCredentialV1

`WorksForCredentialV1` is a type extension of credential subject into VC.

### WorksForOrganization

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `WorksForOrganization` | true |  |
| worksFor | `Organization` | true |  |

### Organization

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Organization` | true |  |
| name | `string` | true |  |
| employee | `Person` | true |  |

### Person

`Person` has a property of `hasOccupation` which is the person's occupation.

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Person` | true |  |
| hasOccupation | `Occupation`, `Role` | true |  |

### Occupation

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Occupation` | true |  |
| name | `string` | true |  |

### Role

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Role` | true |  |
| startDate | `date` | true |  |

### Example of `WorksForCredentialV1`

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/worksFor",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "WorksForCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "WorksForOrganization",
        "@id": "did:unid:test:example1234#keys-1",
        "worksFor": [
            {
                "@type": "Organization",
                "name": "Example Research Group",
                "employee": {
                    "@type": "Person",
                    "hasOccupation": {
                        "@type": "Role",
                        "hasOccupation": {
                            "@type": "Occupation",
                            "name": "Patent examiner"
                        },
                        "startDate": "20200401",
                    },
                },
            },
        ],
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

### worksFor.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "WorksForCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/worksfor#WorksForCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,
                "id": "@id",
                "type": "@type",
                "WorksForOrganization": "http://schema.org/Organization",
                "worksFor": {
                    "@id": "http://schema.org/worksFor",
                    "@type": "@id",
                    "@context": {
                        "@version": 1.1,
                        "@protected": true,
                        "id": "@id",
                        "type": "@type",
                        "Organization": "http://schema.org/Organization",
                        "name": "http://schema.org/name",
                        "employee": {
                            "@id": "http://schema.org/Person",
                            "@type": "@id",
                            "@context": {
                                "@version": 1.1,
                                "@protected": true,
                                "id": "@id",
                                "type": "@type",
                                "hasOccupation": {
                                    "@id": "http://schema.org/Role",
                                    "@type": "@id",
                                    "@context": {
                                        "@version": 1.1,
                                        "@protected": true,
                                        "id": "@id",
                                        "type": "@type",
                                        "startDate": "http://schema.org/startDate"
                                    },
                                },
                                "hasOccupation": {
                                    "@id": "http://schema.org/Occupation",
                                    "@type": "@id",
                                    "@context": {
                                        "@version": 1.1,
                                        "@protected": true,
                                        "id": "@id",
                                        "type": "@type",
                                        "name": "https://schema.org/name"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

