# VC Data Schemas

## VC Data Schemas

This document contains the suggested specification for VC data schema, referred to as `crednetialSubject` property in the VC data model. In general, these schemas are based on [schema.org](https://schema.org/docs/full.html) base types such as [Person](https://schema.org/Person) and [Organization](https://schema.org/Organization), with custom extensions for new concepts not described by schema.org.

For example, the data schema for `AddressCredentialV1` is defined as follows: you can use properties such as `addressCountry` defined in `postalAddress` type of schema.org.

{% tabs %}
{% tab title="XML/HTML/SVG" %}
```markup
<script type="application/ld+json">
{
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://docs.getunid.io/docs/2020/credentials/address"
    ],
    "id": "https://sds.getunid.io/api/v1/credentials/",
    "type": ["VerifiableCredential", "AddressCredentialV1"],
    "issuer": "did:unid:test:issuer1234",
    "issuanceDate": "20201101T180000+0900",
    "credentialSubject": {
        "@type": "AddressPerson",
        "@id": "did:unid:test:example1234",
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
        "verificationMethod": "did:unid:test:issuer1234#signingKey",
        "jws": "eyJhbGc..."
    }
}
</script>
```
{% endtab %}
{% endtabs %}

Other properties such as `@context` are defined as shown in the table below.

| Property          | description                           |
| ----------------- | ------------------------------------- |
| @context          | Specify data schema file URIs         |
| id                | URI of the credential                 |
| type              | Specify the data schema of the object |
| issuer            | DID of the issuer of the credential   |
| issuanceDate      | Date and time of credential issuance  |
| credentialSubject | Subject of the credential             |
|     id            | DID of the subject of the credential  |
| proof             | Issuer's digital signature            |
