# image

## ImageCredentialV1

### ImagePerson

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `ImagePerson` | true |  |
| image | `ImageObject` | true |  |

### ImageObject

| Attribute | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| "@type" | `ImageObject` | true |  |
| contentUrl | `URL` | true |  |
| name | `string` | false |  |
| uploadDate | `Date` | false |  |

### Example of ImageCredentialV1

```javascript
{
    "@context": [
        "https://docs.getunid.io/docs/2020/credentials/imageObject",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "ImageObjectCredentialV1"],
    "issuer": "did:unid:test:issuer1234#keys-1",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "ImagePerson",
        "@id": "did:unid:test:example1234#keys-1",
        "image": {
            "@type": "ImageObject",
            "contentUrl": "https://example.com/...",
            "name": "Person ID Photo",
            "uploadDate": "20210101T180000+0900"
        }
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

### image.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "ImageObjectCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/imageObject#ImageObjectCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",
                
                "ImagePerson": "http://schema.org/Person",
                "image": {
                    "@id": "https://schema.org/image",
                    "@type": "@id",
                    "@context": {
                        "@version": 1.1,
                        "@protected": true,
                        
                        "id": "@id",
                        "type": "@type",
                        "ImageObject": "https://schema.org/ImageObject",
                        "contentUrl": "https://schema.org/contentUrl",
                        "name": "https://schema.org/name",
                        "uploadDate": "https://schema.org/uploadDate"
                    }
                }
            }
        }
    }
}
```

