# Mobile Wallet

## ✨ Introduction

On this page, we get you up and running with UNiD SDK, so that it will build a wallet which provides storage of cryptographic keys, credentials, and secrets on a mobile device.

{% hint style="success" %}
🧠 **NOTE**: ****At the moment, we support React Native SDKs and iOS Native Layer for building mobile wallet.
{% endhint %}

## 👨💻 Getting Started With React Native SDK

UNiD React Native SDK offers easy-to-use javascript modules for embedding wallet capabilities such as DID operations, VC operations, and DID communications through the underlying UNiD Core and Drivers.

### **Prerequisites**

Before we begin, make sure you have the following installed:

* `react-native 0.60 or later`

{% hint style="warning" %}
🧠 **NOTE**: If you don't already have an account and UNiD project established, head over to [getunid.io](https://docs.getunid.io), then return to this page.
{% endhint %}

## ⬇ Install

Add the `@unid/react-native-wallet-sdk` dependency:

{% tabs %}
{% tab title="Bash" %}
```bash
npm install --save @unid/react-native-wallet-sdk

# OR

yarn add @unid/react-native-wallet-sdk
```
{% endtab %}
{% endtabs %}

## 🔗 Linking

Since our SDKs also support a local authentication and key management at OS native layer, we need to link the SDK to your native projects. Since React Native SDKs support `auto-linking` and iOS relies on CocoaPods, you need to install dependencies. If you are running a project with `react-native < 0.60` you still need to call `react-native link`.

{% tabs %}
{% tab title="Bash" %}
```bash
react-native link @unid/react-native-wallet-sdk
```
{% endtab %}
{% endtabs %}

This has to be done only once, and the files created can go into your version control system.

The following changes will be performed:

* add the `unid-cocoa` package for native local authentication and key management on iOS
* configure UNiD for the supplied DSN in your `index.js/App.js` files
* store build credentials in `ios/unid.properties`

## ⚙ Configure

After you've completed setting up a tenant and a wallet application in UNiD, UNiD will give you values: `clientId`, `clientSecret`, `encryptionKey`, and `localStorage`. These values are used for authorization when the wallet communicates with relying parties and SDS endpoints.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/react-native-wallet-sdk'
import asyncStorage from '@react-native-async-storage/async-storage'

// Initialize UNiD instance
UNiD.init({
    clientId     : 'client_id',
    clientSecret : 'client_secret',
    encryptionKey: 'encryption_key',
    envNetwork   : 'testnet'
    localStorage : asyncStorage
})
```
{% endtab %}
{% endtabs %}

Great! Now that you've completed setting up React Native SDKs. You can step forward to Generate DID Operation.

{% page-ref page="did-operation.md" %}

