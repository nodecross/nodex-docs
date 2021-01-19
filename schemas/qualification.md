---
title: Qualification
description: description
---

# qualification

## QualificationCredentialV1

`QualificationCredentialV1` is a type extension of credential subject into VC.

### QualificationPerson

Educational and occupational qualifications of a person.

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `QualificationPerson` | true |  |
| hasCredential | `EducationalOccupationalCredential` | ture |  |

### EducationalOccupationalCredential

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `EducationalOccupationalCredential` | true |  |
| credentialCategory | `string` | ture | "degree", "certificate" |
| educationalLevel | `string` | ture |  |
| dateCreated | `date` | ture |  |
| about | `EducationalOccupationalProgram` | ture |  |
| recognizedBy | `CollegeOrUniversity` | ture |  |

### EducationalOccupationalProgram

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `EducationalOccupationalProgram` | true |  |
| name | `string` | ture | "University", "Driver's License" |

### CollegeOrUniversity

| Property | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `CollegeOrUniversity` | true |  |
| name | `string` | ture |  |

### Example of QualificationCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/qualification",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "QualificationCredentialV1"],
    "issuer": "did:unid:test:issuer1234",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "QualificationPerson",
        "@id": "did:unid:test:example1234",
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "educationalLevel": "Bachelors of Science",
                "dateCreated": "2015-03",
                "about": {
                    "@type": "EducationalOccupationalProgram",
                    "name": "Computer Engineering"
                },
                "recognizedBy": {
                    "@type": "CollegeOrUniversity",
                    "name": "Example University"
                }
            },
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "certificate",
                "dateCreated": "2015-03",
                "about": {
                    "@type": "EducationalOccupationalProgram",
                    "name": "1st Grade Driver's License"
                }
            }
        ],
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

### qualification.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "QualificationCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/qualification#QualificationCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "QualificationPerson": "http://schema.org/Person",
                "hasCredential": {
                    "@id": "http://schema.org/hasCredential",
                    "@type": "@id",
                    "@context": {
                        "@version": 1.1,
                        "@protected": true,

                        "id": "@id",
                        "type": "@type",
                        "EducationalOccupationalCredential": "https://schema.org/EducationalOccupationalCredential",
                        "credentialCategory": "https://schema.org/credentialCategory",
                        "educationalLevel": "https://schema.org/educationalLevel",
                        "dateCreated": "https://schema.org/dateCreated",
                        "about": {
                            "@id": "http://schema.org/about",
                            "@type": "@id",
                            "@context": {
                                "@version": 1.1,
                                "@protected": true,

                                "id": "@id",
                                "type": "@type",
                                "EducationalOccupationalProgram": "http://schema.org/EducationalOccupationalProgram",
                                "name": "http://schema.org/name"
                            }
                        },
                        "recognizedBy": {
                            "@id": "http://schema.org/recognizedBy",
                            "@type": "@id",
                            "@context": {
                                "@version": 1.1,
                                "@protected": true,

                                "id": "@id",
                                "type": "@type",
                                "CollegeOrUniversity": "http://schema.org/CollegeOrUniversity",
                                "name": "http://schema.org/name"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

