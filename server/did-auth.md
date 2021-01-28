---
title: DID AuthN
description: description
---

# DID AuthN

## Introduction

For the application server to communicate with identity wallet on secure authenticated channel, UNiD Node SDKs provide methods of:

* generating DID AuthN Request
* validating DID AuthN request from an identity wallet

The below diagram illustrate the sign-in flow and steps taken to verify a user through their user agent from the wallet side of the webpage to the server side of a RP. If you want to see more details of DID AuthN, please head over [here](https://github.com/getunid/unid-docs/tree/8515a1dcda076b9bea8d6e6e6b7eed90e22ae0d3/unid/3-extensions/README.md).

![DID Auth Protocol Flow](../.gitbook/assets/did-authN-protocol%20%281%29%20%281%29.png)

## Generate DID AuthN Request

In step 2 of the diagram, the application server creates a DID AuthN request signed by the application's DID. The application server can specify the credential type as the information required for authentication.

**DID.generateAuthenticationRequest\(\)**

```javascript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try {
        const result = await DID.generateAuthenticationRequest({
            requiredCredentialTypes: [
                'AddressCredentialV1',
                'NameCredentialV1',
                'EmailCredentialV1'
            ],
            optionalCredentialTypes: [
                'GenderCredentialV1'
            ]
        })
        
        console.log('Complete generating DID AuthN Request', result)
    } catch err(err){
        console.err(err)
    };
})()
```

## Validate AuthN Response

In step 9 of the diagram, the application server receives an authN response from the identity wallet. The application server queries for the wallet's DID document using a Universal Resolver and verifies the signature with the wallet's public key.

**UNiD.validateAuthenticationResponse\(\)**

```javascript
import { UNiD } from '@unid/node-wallet-sdk'

(async () => {
    try {
        // DID AuthN Response with walletDid
        const result = await UNiD.validateAuthenticationRequest(walletDid)
        
        console.log('Complete validating DID AuthN Request', result)
    } catch err(err){
        console.err(err)
    }
})()
```

If the required parameter or authorization code is not included in the response, an error will occur and the authentication process will be interrupted.

