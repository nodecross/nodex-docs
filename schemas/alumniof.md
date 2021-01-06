---
title: AlumniOf
description: description
---

# alumniOf

Alumni of an organization.

## AlumniOfCredentialV1

`AlumniOfCredentialV1` is a type extension of credential subject into VC.

### AlumniOfOrganization

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `AlumniOfOrganization` | true |  |
| alumniOf | `Organization` | ture |  |

### Organization

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Organization` | true |  |
| name | `string` | ture |  |
| employee | `Person` | true |  |

### Person

`hasOccupation`: The Person's occupation. For past professions, use Role for expressing dates.

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Person` | true |  |
| hasOccupation | `Role`, `Occupation` | true |  |

### Occupation

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Occupation` | true |  |
| name | `string` | ture |  |

### Role

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `Role` | true |  |
| startDate | `date` | true |  |
| endDate | `date` | false |  |

### Example of `AlumniOfCredentialV1`

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/alumniOf",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "AlumniOfCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "AlumniOfOrganization",
        "@id": "did:unid:test:example1234#keys-1",
        "alumniOf": [
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
                        "startDate": "20080401",
                        "endDate": "20120330"
                    },
                },
            },
            {
                "@type": "Organization",
                "name": "Ninja, Inc.",
                "employee": {
                    "@type": "Person",
                    "hasOccupation": {
                        "@type": "Role",
                        "hasOccupation": {
                            "@type": "Occupation",
                            "name": "Product Manager"
                        },
                        "startDate": "20120401",
                        "endDate": "20150330"
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

### alumniOf.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "AlumniOfCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/alumniOf#AlumniOfCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,
                "id": "@id",
                "type": "@type",
                "AlumniOfOrganization": "http://schema.org/Organization",
                "alumniOf": {
                    "@id": "http://schema.org/alumniOf",
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
                                        "startDate": "http://schema.org/startDate",
                                        "endDate": "http://schema.org/endDate"
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

