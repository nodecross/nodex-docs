---
title: DID Operations
description: description
---

# DID Operations

## Introduction

UNiD Core supports a variety of DID operations, all of which require the DID owner to generate specific data values and cryptographic material. This page below describe how to perform each type of operation.

## Generate New DID

With our Node SDK, you can easily generate key pairs and register a DID on UNiD network. First, you can select a `KeyRingType` which supports several methods for managing key pairs. Here, we introduce the method of generating a binary seed from a seed phrase with BIP39, and generating multiple key pairs using ecc-secp256k1 with BIP32. Finally, the method computes hash from the public keys and objects and register the hash on UNiD network. Click here for more info.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD, KeyRingType } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const DID = await UNiD.createDidDocument(
            KeyRingType.Mnemonic,
            { length: 24 }
        )
        console.log('complete generating a DID:', DID.getIdentifier())
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

After generating a binary seed, you can get a seed phrase which enables to recover a binary seed and key pairs. Once you have verified a seed phrase, you will never be able to get it again. When verifying a seed phrase, it must be placed correctly in the same order as when the phrase was obtained.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        // Get a DID Object
        const DID = await UNiD.loadDid({
            did: 'did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg'
        })
        
        // Get a seed phrase of the DID
        const seedPhrase = DID.getSeedPhrase()
        console.log('complete getting a seed phrase:', seedPhrase)
        
        // Verify the seed phrase
        const result = await DID.verifySeedPhrase([
            'word_1', 'word_2', ..., 'word_24'
        ])
        console.log('complete verifying the seed phrase:', result)
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

After a while, the queued operation will be periodically extracted and executed by sidetree batch scheduler in UNiD node and is submitted into the underlying ledger system. If you want to know more detailed the operating principle, please move to [UNiD Network](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/unid/README.md#unid-network) or [sidetree specification](https://identity.foundation/sidetree/spec/).

## Resolve DID

After generating a DID, you can resolve it to get a DID Document. UNiD Node SDKs allow you to resolve a DID while verifying the authenticity of the response.

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const didDocument = await UNiD.getDidDocument({
            did: 'did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg'
        })
        console.log('Complete getting a DID Document:', JSON.stringify(didDocument, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

Great! Now that you've completed to create and register new DID. Next is to issue and verify a verifiable credential. [VC Operations](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/2-verifiable-credential/README.md).

## Update DID

Update DID document when adding, changing, and deleting public keys or service endpoints.

**To add public keys**

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const didDocument = await UNiD.updateDidDocument({
            did: 'did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg',
            action: 'add-public-keys',
            publicKeys: [{
                id: 'key1',
                purposes: [ 'authentication' ],
                type: 'EcdsaSecp256k1VerificationKey2019',
                publicKeyJwk: { ... }
            }]
        })
        console.log('Complete adding public keys:', JSON.stringify(didDocument, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

**To remove public keys**

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const didDocument = await UNiD.updateDidDocument({
            did: 'did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg',
            action: 'remove-public-keys',
            ids: [ 'key1', 'key2' ]
        })
        console.log('Complete removing public keys:', JSON.stringify(didDocument, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

**To add services**

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const didDocument = await UNiD.updateDidDocument({
            did: 'did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg',
            action: 'add-services',
            services: [{
                id: 'sds2',
                type: 'SecureDataStore',
                serviceEndpoint: 'https://examplePublicKey@o0.ingest.sds.unid.plus/'
            }, {
                id: 'did-config',
                type: 'LinkedDomains',
                serviceEndpoint: {
                    origins: [ 'https://foo.com', 'https://bar.com' ]
                }
            }]
        })
        console.log('Complete adding service endpoints:', JSON.stringify(didDocument, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

**To remove services**

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const didDocument = await UNiD.updateDidDocument({
            did: 'did:unid:test:EiCsnBO7XrB9hL96xvQ2R846j_Ebuyg3HO5o4BOSoU7ffg',
            action: 'remove-services',
            ids: [ 'sds1', 'sds2' ]
        })
        console.log('Complete removing service endpoints:', JSON.stringify(didDocument, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

**To replace**

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try{
        const didDocument = await UNiD.updateDidDocument({
            action: 'replace',
            document: {
                publicKeys: [{
                    id: 'key2',
                    purposes: [ 'authentication' ],
                    type: 'EcdsaSecp256k1VerificationKey2019',
                    publicKeyJwk: { ... }
                }],
                services: [{
                    id: 'sds3',
                    type: 'SecureDataStore',
                    serviceEndpoint: 'http://hub.my-personal-server.com'
                }]
            }
        })
        console.log('Complete replacing a DID Document:', JSON.stringify(didDocument, null, 2))
    } catch (err) {
        console.error('ERROR:', err)
    }
})()
```
{% endtab %}
{% endtabs %}

