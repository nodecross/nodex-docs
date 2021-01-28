# Server Wallet

## Introduction

On this page, we get you up and running with UNiD SDK, so that it will build a wallet which provides storage of cryptographic keys, credentials, and secrets on a cloud server. It is often implemented on an existing server to communicate with an identity wallet, such as authenticating or issuing credentials.

{% hint style="info" %}
At the moment, we support Node SDKs for integrating into an existing server.
{% endhint %}

## Getting Started with Node SDKs

UNiD Node SDK offers easy-to-use javascript modules for embedding identity wallet capabilities such as DID operations, VC operations, and DID communications through the underlying UNiD Core APIs and Drivers.

**Prerequisites**

Before we begin, make sure you have the following installed:

* `node v13.x.x or later`

{% hint style="warning" %}
If you don't already have an account and UNiD tenant established, head over [here](https://docs.getunid.io), then return to this page.
{% endhint %}

## Install

Add the `@unid/nodejs-sdk` dependency:

{% tabs %}
{% tab title="Bash" %}
```bash
npm install --save @unid/node-wallet-sdk

# OR

yarn add @unid/node-wallet-sdk
```
{% endtab %}
{% endtabs %}

In UNiD, MongoDB is used as local repository \(keyRings, secrets, etc\) by default. Please install and setup MongoDB in your server environment.

## Configure

After you've completed setting up a tenant and a relying party application in UNiD, UNiD will give you values: `client_id` and `client_secret`. These values are used for authorization when the RP communicates with the wallet application and SDS endpoints.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from "@unid/node-wallet-sdk";

UNiD.init({
    client_id: "client_id_token",
    client_secret: "client_secret_token",
    env_network: "testnet"
});
```
{% endtab %}
{% endtabs %}

Great! Now that you've completed setting up the Node SDK. You can step forward to Generate New DID.

{% page-ref page="did-operation.md" %}

