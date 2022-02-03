# Scenario III. Verify Credentials

In Scenario III, you will learn how to use the UNiD EDGE SDK to verify the signature of digitally signed JSON-LD based structured data and authenticate that the data has not been tampered with.

### Goals

* By following this tutorial, you will learn how to use the UNiD EDGE SDK to perform validation of signed structured data (JSON-LD).

### Tutorial flow

This tutorial will proceed in the order defined below. The steps from "1. Creating a NodeJS project" to "3. Using UNiD EDGE SDK" in the tutorial are exactly the same as [Scenario I](scenario-i.-create-a-did.md). Please refer to Scenario I page for the details.

1. [Creating a NodeJS project](scenario-i.-create-a-did.md#1.-creating-a-nodejs-project)
2. [Install dependencies and project settings](scenario-i.-create-a-did.md#2.-install-dependencies-and-project-settings)
3. [Using UNiD EDGE SDK](scenario-i.-create-a-did.md#3.-using-unid-edge-sdk)
4. Verification of signed structured data

### 4. Verification of signed structured data

Verifying the correctness of signed structured data (called Verifiable Credentials) is much easier than signing structured data with UNiD EDGE SDK! All you have to do is to pass the instance of the data you want to verify to the function provided by UNiD EDGE SDK as shown below.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
(async () => {
    // ..
    
    // Insert your great code below this line
    const verifiedVC = await UNiD.verifyCredential(VC)
})()
```

{% hint style="info" %}
In UNiD EDGE SDK, you can use `DID.createCredential()` function in Scenario II to create `VC` instances. In UNiD EDGE SDK, you can use the generated instance as `VC` by using `DID.createCredential()` function in Scenario II.
{% endhint %}
{% endtab %}
{% endtabs %}

The process of verifying digital signature with UNiD EDGE SDK can be achieved with less code compared to adding signature to structured data. Assuming that you have received Verifiable Credentials as JSON data in text format, the following is the process of verifying the digital signature that has been assigned to the data.

{% tabs %}
{% tab title="NodeJS" %}
```typescript
// Verifiable Credentials (signed structured data) received from somewhere
const VC = '{"proof":{"type":"EcdsaSecp256k1Signature2019","proofPurpose":"authentication","created":"2022-01-17T09:22:12Z","verificationMethod":"did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ#signingKey","jws":"eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..guJAa5aNwV21NUW0rtaYpMK1HJHIxyPO_mEg4SHNBEJEo5ku1o7NJA74FmYU2-pzHQbYGcSk9Zj6FdUr6j5eeQ"},"id":"https://sds.getunid.io/api/v1","issuer":"did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ","issuanceDate":"2022-01-17T09:22:12Z","@context":["https://www.w3.org/2018/credentials/v1","https://docs.getunid.io/docs/2020/credentials/email"],"type":["VerifiableCredential","EmailCredentialV1"],"credentialSubject":{"@type":"EmailPerson","@id":"did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ","email":"username@example.com"}}'

// Deserialize it and...
const parsedVC = JSON.parse(VC)

// Verify !!
const verifiedVC = await UNiD.verifyCredential(parsedVC)
```
{% endtab %}
{% endtabs %}

The following is a sequence of code that includes how to verify Verifiable Credentials as shown so far in this chapter, and the process of displaying the results.

{% tabs %}
{% tab title="NodeJS" %}
```typescript
import { UNiD, Cipher } from '@getunid/node-wallet-sdk'
import { SqliteConnector } from '@getunid/wallet-sdk-sqlite-connector'
import { KeyRingType } from '@getunid/node-wallet-sdk'

(async () => {
    // Connector definition
    const connector = new SqliteConnector({
        client       : 'unid-edge-sdk.sqlite',
        encryptionKey: '${ PUT YOUR RANDOMIZED HEX STRING OF 32 BYTES }',
        encrypter    : Cipher.encrypt,
        decrypter    : Cipher.decrypt,
    })

    // Initializing the connector (database creation and migration)
    await connector.init()

    // Initializing the UNiD EDGE SDK
    UNiD.init({
        clientId    : '<UNUSED_FIELD>',
        clientSecret: '<UNUSED_FIELD>',
        connector   : connector,
    })

    // Insert your great code below this line
    const VC = '{"proof":{"type":"EcdsaSecp256k1Signature2019","proofPurpose":"authentication","created":"2022-01-17T09:22:12Z","verificationMethod":"did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ#signingKey","jws":"eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..guJAa5aNwV21NUW0rtaYpMK1HJHIxyPO_mEg4SHNBEJEo5ku1o7NJA74FmYU2-pzHQbYGcSk9Zj6FdUr6j5eeQ"},"id":"https://sds.getunid.io/api/v1","issuer":"did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ","issuanceDate":"2022-01-17T09:22:12Z","@context":["https://www.w3.org/2018/credentials/v1","https://docs.getunid.io/docs/2020/credentials/email"],"type":["VerifiableCredential","EmailCredentialV1"],"credentialSubject":{"@type":"EmailPerson","@id":"did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ","email":"username@example.com"}}'
    const parsedVC = JSON.parse(VC)

    // Verify !!
    const verifiedVC = await UNiD.verifyCredential(parsedVC)

    console.log(`isValid: ${ verifiedVC.isValid }`)
    console.log(`payload:`)
    console.log(verifiedVC.payload)
})()
```
{% endtab %}
{% endtabs %}

Let's run the program in the same way as before.

{% tabs %}
{% tab title="SHELL" %}
```bash
yarn run start
```

```
yarn run v1.22.17
$ yarn run node index.ts
$ npx ts-node index.ts
isValid: true
payload:
{
  id: 'https://sds.getunid.io/api/v1',
  issuer: 'did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ',
  issuanceDate: '2022-01-17T09:22:12Z',
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://docs.getunid.io/docs/2020/credentials/email'
  ],
  type: [ 'VerifiableCredential', 'EmailCredentialV1' ],
  credentialSubject: {
    '@type': 'EmailPerson',
    '@id': 'did:unid:test:EiCayXi7bi3duWVSB3o3nL8E6zuXy6c_W95mTxbs3pDgIQ',
    email: 'username@example.com'
  }
}
```
{% endtab %}
{% endtabs %}

Do you see the output like this? First, let's make sure that the value of isValid is true. The value of payload represents the Verifiable Credentials excluding the signature part (the value of credentialSubject represents the original structured data, in this case the data structure used to represent the email address). By leveraging the signature data validation process in conjunction with web frameworks such as Express and Fastify, as we do when signing structured data, we can address a variety of use cases!



**Index of UNiD EDGE SDK / Ubuntu (NodeJS) tutorials:**

* ****[Scenario I. Create a DID](scenario-i.-create-a-did.md)
* [Scenario II. Sign Credentials](scenario-ii.-sign-credentials.md)
* [Scenario III. Verify Credentials](scenario-iii.-verify-credentials.md)
* [Scenario IV. Connect with Secure Channel](scenario-iv.-connect-with-secure-channel.md)