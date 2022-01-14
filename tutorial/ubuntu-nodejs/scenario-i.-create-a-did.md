# Scenario I. Create a DID

In Scenario I, you will learn how to use the UNiD EDGE SDK to create a DID on your terminal.

### Goals

* By tracing this tutorial, you will learn the steps to create a DID by using Ubuntu environment (NodeJS) in combination with UNiD EDGE SDK.

### Tutorial flow

This tutorial will proceed in the order defined below.

1. Creating a NodeJS project
2. Install dependencies and project settings
3. Using UNiD EDGE SDK
4. Add DID creation process

### 1. Creating a NodeJS project

{% tabs %}
{% tab title="SHELL" %}
```
# Create a project directory
mkdir awesome-project
cd awesome-project

# Create NodeJS project
yarn init -y
```
{% endtab %}
{% endtabs %}

### 2. Install dependencies and project settings

Install the dependency libraries required to implement and run the project, in order.

{% tabs %}
{% tab title="SHELL" %}
```bash
# UNiD SDK
yarn add @getunid/node-wallet-sdk
yarn add @getunid/wallet-sdk-sqlite-connector

# Dev dependencies
yarn add -D ts-node
yarn add -D typescript
yarn add -D @types/node
```
{% endtab %}
{% endtabs %}

In this project, we will use TypeScript to implement the application.

{% hint style="info" %}
The project itself can be implemented in pure JavaScript without using TypeScript, but since UNiD nodejs SDK provides type definition information, so you can have a more intuitive programming experience by using TypeScript.
{% endhint %}

Configure the initial settings for TypeScript.

{% tabs %}
{% tab title="SHELL" %}
```bash
npx tsc --init
```
{% endtab %}
{% endtabs %}

The package.json file contains the minimum configuration required to run a TypeScript-based project.



{% tabs %}
{% tab title="package.json" %}
```diff
--- package.json.orig	2022-01-14 14:41:05.000000000 +0900
+++ package.json	2022-01-14 14:43:59.000000000 +0900
@@ -9,7 +9,8 @@
     "typescript": "^4.5.4"
   },
   "scripts": {
-    "node": "npx ts-node"
+    "node": "npx ts-node",
+    "start": "yarn run node index.ts"
   },
   "dependencies": {
     "@getunid/node-wallet-sdk": "^1.3.13",
```
{% endtab %}
{% endtabs %}

### 3. Using UNiD EDGE SDK

First of all, let's create a file that will be the entry point for this tutorial.

{% tabs %}
{% tab title="SHELL" %}
```bash
# entry point
touch index.ts
```
{% endtab %}
{% endtabs %}

Open the `index.ts` file in your preferred IDE or text editor and proceed with the implementation. For this tutorial, we recommend using [VSCode](https://code.visualstudio.com). Once you have opened the `index.ts` file in your favorite text editor, you can enter the skeleton for the tutorial. The skeleton is what we will define next.

{% tabs %}
{% tab title="NodeJS" %}
```typescript
import { UNiD, Cipher } from '@getunid/node-wallet-sdk'
import { SqliteConnector } from '@getunid/wallet-sdk-sqlite-connector'

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

})()
```

{% hint style="info" %}
Among the attributes passed when initializing the `SqliteConnector`, `encryptionKey` must be set to a randomly generated 32-byte binary in hexadecimal representation.
{% endhint %}
{% endtab %}
{% endtabs %}

Now that you have completed the coding, let's make sure your code runs well. Type the following command into the terminal and run it.

{% tabs %}
{% tab title="SHELL" %}
```bash
yarn run start
```

```
# OUTPUT
yarn run v1.22.17
$ yarn run node index.ts
$ npx ts-node index.ts
✨  Done in 4.98s.
```
{% endtab %}
{% endtabs %}

Oh, you don't see anything as a result of running it? Actually, that's how it works. Instead of displaying nothing, you should see a `unid-edge-sdk.sqlite` file created in the NodeJS project directory as proof that the initialization of the UNiD EDGE SDK was executed successfully. unid-edge-sdk.sqlite file is a keyring where the private key data handled by the UNiD The `unid-edge-sdk.sqlite` file is the keyring where the private key data handled by the UNiD EDGE SDK is stored in encrypted form.

Let's move on to the next step, which is to add the DID creation process.

### 4. Add DID creation process

It is very easy to create a DID using the UNiD EDGE SDK. Just incorporate the following statement into your code!

{% tabs %}
{% tab title="TypeScript" %}
{% hint style="info" %}
You will need to import the KeyRingType Enum in order to run the function to create the DID. Don't forget to import it!
{% endhint %}

```typescript
import { KeyRingType } from '@getunid/node-wallet-sdk'

(async () => {
    // ..
    
    // Insert your great code below this line
    const DID = await UNiD.createDid(KeyRingType.Mnemonic)
})()
```
{% endtab %}
{% endtabs %}

The `DID` instance created by the `createDid` function provided by UNiD EDGE SDK provides several useful functions for working with DIDs. Let's take a look at the entire code block along with the process of printing your newly created DID on the terminal.

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
    const DID = await UNiD.createDid(KeyRingType.Mnemonic)

    console.log(`your did: ${ DID.getIdentifier() }`)
    console.log(`your did document:`)
    console.log((await DID.getDidDocument()).document)
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
your did: did:unid:test:EiDiPPifHoKusGMhlVk50qNJXJ7NwgGhcvvWZ6Oubj4D9g
your did document:
{
  id: 'did:unid:test:EiDiPPifHoKusGMhlVk50qNJXJ7NwgGhcvvWZ6Oubj4D9g:eyJkZWx0YV9oYXNoIjoiRWlCbVloVk8taWJ2c2VuTHJQRWNzUmZCTFVRakZrTS16VFVpSVllVy1rWUxOQSIsInJlY292ZXJ5X2NvbW1pdG1lbnQiOiJFaUJsbGUwYWMyME0wY19aU2JMaWV0ZFI5d1h4ckloVVlfTlhSNGFDWl9aX0ZBIn0.eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljX2tleXMiOlt7ImlkIjoic2lnbmluZ0tleSIsInR5cGUiOiJFY2RzYVNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTkiLCJqd2siOnsia3R5IjoiRUMiLCJjcnYiOiJzZWNwMjU2azEiLCJ4IjoiNzluWnUzSDNzNlFWZ2hJWHRGUUZIU21rMG9hWi10eEZTQ3lDaW9jUGNFOCIsInkiOiJYWl9saHk2ZGJXdnF0R2FsWTA1SXdEa3hMSk5tTDBPUHNaT0ZybmZEVnNnIn0sInB1cnBvc2UiOlsiYXV0aCIsImdlbmVyYWwiXX1dLCJzZXJ2aWNlX2VuZHBvaW50cyI6W119fV0sInVwZGF0ZV9jb21taXRtZW50IjoiRWlCQ3Bra0ZHRGU3blJQeVRKcjhiV20yWEtMWS1Sbmg2ejZIZmxFQ2oyZmtnQSJ9',
  '@context': [
    'https://www.w3.org/ns/did/v1',
    {
      '@base': 'did:unid:test:EiDiPPifHoKusGMhlVk50qNJXJ7NwgGhcvvWZ6Oubj4D9g:eyJkZWx0YV9oYXNoIjoiRWlCbVloVk8taWJ2c2VuTHJQRWNzUmZCTFVRakZrTS16VFVpSVllVy1rWUxOQSIsInJlY292ZXJ5X2NvbW1pdG1lbnQiOiJFaUJsbGUwYWMyME0wY19aU2JMaWV0ZFI5d1h4ckloVVlfTlhSNGFDWl9aX0ZBIn0.eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljX2tleXMiOlt7ImlkIjoic2lnbmluZ0tleSIsInR5cGUiOiJFY2RzYVNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTkiLCJqd2siOnsia3R5IjoiRUMiLCJjcnYiOiJzZWNwMjU2azEiLCJ4IjoiNzluWnUzSDNzNlFWZ2hJWHRGUUZIU21rMG9hWi10eEZTQ3lDaW9jUGNFOCIsInkiOiJYWl9saHk2ZGJXdnF0R2FsWTA1SXdEa3hMSk5tTDBPUHNaT0ZybmZEVnNnIn0sInB1cnBvc2UiOlsiYXV0aCIsImdlbmVyYWwiXX1dLCJzZXJ2aWNlX2VuZHBvaW50cyI6W119fV0sInVwZGF0ZV9jb21taXRtZW50IjoiRWlCQ3Bra0ZHRGU3blJQeVRKcjhiV20yWEtMWS1Sbmg2ejZIZmxFQ2oyZmtnQSJ9'
    }
  ],
  service: [],
  publicKey: [
    {
      id: '#signingKey',
      controller: '',
      type: 'EcdsaSecp256k1VerificationKey2019',
      publicKeyJwk: [Object]
    }
  ],
  authentication: [ '#signingKey' ]
}
```
{% endtab %}
{% endtabs %}

You should see this output in your terminal. You can create a private key, generate a public key from the private key, and register the generated public key to the UNiD Network as a DID Document by simply incorporating the code described in this tutorial into your program. In the next chapter, we will show you how to digitally sign JSON-LD based structured data using the secret key you have created.



**Index of UNiD EDGE SDK / Ubuntu (NodeJS) tutorials:**

* ****[Scenario I. Create a DID](scenario-i.-create-a-did.md)
* [Scenario II. Sign Credentials](scenario-ii.-sign-credentials.md)
* [Scenario III. Verify Credentials](scenario-iii.-verify-credentials.md)
* [Scenario IV. Connect with Secure Channel](scenario-iv.-connect-with-secure-channel.md)
