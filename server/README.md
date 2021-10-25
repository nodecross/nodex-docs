# Server Kits

## Introduction

On this page, we get you up and running with UNiD SDK, so that it will build a digital wallet which provides storage of cryptographic keys, credentials, and secrets on a cloud server. It is often implemented on an existing server to communicate with an identity wallet, such as authenticating or issuing credentials.

{% hint style="info" %}
At the moment, we support NodeJS SDK for integrating into an existing server.
{% endhint %}

## Getting Started with NodeJS SDK

UNiD NodeJS SDK offers easy-to-use javascript modules for embedding identity wallet capabilities such as DID operations, VC operations, and DID communications through the underlying UNiD Core APIs and Drivers.

**Prerequisites**

Before we begin, make sure you have the following installed:

* `node v13.x.x or later`

{% hint style="warning" %}
If you don't already have an account and UNiD tenant established, head over [here](https://docs.getunid.io), then return to this page.
{% endhint %}

## Install

Add the `@unid/node-wallet-sdk` dependency:

{% tabs %}
{% tab title="Bash" %}
```bash
npm install --save @unid/node-wallet-sdk

# OR

yarn add @unid/node-wallet-sdk
```
{% endtab %}
{% endtabs %}

In UNiD, MongoDB is used as local repository (keyRings, secrets, etc) by default. Please install and setup MongoDB in your server environment.

## Configure

Configuration should happen as early as possible in your application's lifecycle. Once you have set up a cloud agent in [UNiD Studio](https://www.getunid.io), you will get values required for configuration.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'
import { MongoClient } from 'mongodb'

const uri = 'mongodb://username:password@localhost:27017'
const mongoClient = new MongoClient(uri, {
    useUnifiedTopology: true,
})

(async () => {
    // Connect to your mongodb
    await mongoClient.connect()
    
    // Initialize UNiD instance
    UNiD.init({
        clientId     : 'client_id',
        clientSecret : 'client_secret',
        encryptionKey: 'encryption_key',
        envNetwork   : 'testnet',
        localStorage : mongoClient
    })
})()
```
{% endtab %}
{% endtabs %}

| Values          | Description                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `clientId`      | It is associated with each cloud agent for a tenant. A string consisting of 64 characters that can be retrieved from UNiD Studio. |
| `clientSecret`  | A string consisting of 64 characters that can be retrieved from UNiD Studio. It is paired with the `clientId`.                    |
| `encryptionKey` | A string used to encrypt keyRings (digital wallet) with AES-256-CBC algorithm and store them in MongoDB.                          |
| `envNetwork`    | The DPKI network to which the DID refers.                                                                                         |
| `localStorage`  | A connection instance to MongoDB that must be initialized and instantiated outside of the UNiD libraries to MongoDB.              |

Great! Now you've completed setting up the NodeJS SDK. You can step forward to Generate New DID.

{% content-ref url="did-operation.md" %}
[did-operation.md](did-operation.md)
{% endcontent-ref %}
