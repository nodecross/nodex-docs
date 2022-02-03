# identifier

Identifier for any kind of thing, such as ISBNs, GTIN codes, UUIDs etc.

## IdentifierCredentialV1

| Attribute      | Type                              | Required | Notes                                                                                                                                |
| -------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| "@type"        | `PropertyValue`                   | true     |                                                                                                                                      |
| propertyID     | `string` or `URL`                 | true     |                                                                                                                                      |
| value          | `boolean` or n`umber` or `string` | true     | The value of the quantitative value or property value node.                                                                          |
| valueReference | `number` or `string`              | optional | A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. |

### Example of IdentifierCredentialV1

```scheme
{
    "@context": [
        "https://docs.getunid.io/docs/2021/credentials/identifier",
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "IdentifierCredentialV1"],
    "issuer": "did:unid:test:issuer1234",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@id": "did:unid:test:example1234",
        "@type": "PropertyValue",
        "propertyID": "HICN",
        "value": "21700023",
        "valueReference": "1"
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

### identifier.jsonld

```javascript
{
    "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "IdentifierCredentialV1": {
            "@id": "https://docs.getunid.io/docs/2020/credentials/identifier#IdentifierCredentialV1",
            "@context": {
                "@version": 1.1,
                "@protected": true,

                "id": "@id",
                "type": "@type",

                "PropertyValue": "https://schema.org/PropertyValue",
                "propertyID": "https://schema.org/propertyID",
                "value": "https://schema.org/value",
                "valueReference": "https://schema.org/valueReferencee"
            }
        }
    }
}
```
