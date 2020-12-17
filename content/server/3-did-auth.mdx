---
title: "DID AuthN"
description: "description"
---

### DID AuthN

For the application server to communicate with identity wallet on secure authenticated channel, UNiD Node SDKs provide methods of:

- generating DID AuthN Request
- validating DID AuthN request from an identity wallet

The below diagram illustrate the sign-in flow and steps taken to verify a user through their user agent from the wallet side of the webpage to the server side of a RP. If you want to see more details of DID AuthN, please head over [here](../unid/3-extensions).

![DID Auth Protocol Flow](../assets/did-authN-protocol.png)

### Generate DID AuthN Request

In step 2 of the diagram, the application server creates a DID AuthN request signed by the application's DID. The application server can specify the credential type as the information required for authentication.

**DID.generateAuthenticationRequest()**
```js
import { UNiD } from "@unid/nodejs-sdk";

(async () => {
    try {
        const result = await DID.generateAuthenticationRequest({
            requiredCredentialTypes: [
                "AddressCredentialV1",
                "NameCredentialV1",
                "EmailCredentialV1"
            ],
            optionalCredentialTypes: [
                "GenderCredentialV1"
            ]
        });
        console.log("Complete generating DID AuthN Request", result);
    } catch err(err){
        console.err(err);
    };
})()
```

### Validate AuthN Response

In step 9 of the diagram, the application server receives an authN response from the identity wallet. The application server queries for the wallet's DID document using a Universal Resolver and verifies the signature with the wallet's public key.

**UNiD.validateAuthenticationResponse()**
```js
import { UNiD } from "@unid/nodejs-sdk";

(async () => {
    try {
        // DID AuthN Response with walletDid
        const result = await UNiD.validateAuthenticationRequest(walletDid);
        console.log("Complete validating DID AuthN Request", result);
    } catch err(err){
        console.err(err);
    };
})()
```

If the required parameter or authorization code is not included in the response, an error will occur and the authentication process will be interrupted.

<!--
### Tutorial DID AuthN

デモ用のDID authN request of RPをQRコードで設置
テストできるようにする
-->
