# NodeX Agent API

NodeX Agent is a resident Linux daemon process that provides NodeX Agent functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of NodeX Agent provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries. The pre-built binaries can be used with zero learning cost for building the API.

The following API is provided through the Unix Domain Socket (~/.nodex/run/nodex.sock) for applications using the NodeX Agent. that can hit the Unix Domain Socket to communicate with NodeX Agent through the socket.

The APIs provided by NodeX Agent are categorized as High-Level API and Low-Level API.

**High-Level API**

- High-Level APIs abstract complex operations or processes and offer developers a simple and intuitive interface. This allows developers to focus on the application's business logic or functionalities without worrying about the underlying complexities.
- High-Level APIs usually provide easier coding, faster development cycles, and a lower learning curve. However, they may offer limited control over internal operations and less flexibility in customization.
- If you want to send and receive application data without having to deal with DIDComm messages or Verifiable Credentials directly, please refer to the High-Level API.


**Low-Level API**

- Low-Level APIs enable the generation and validation of DIDComm messages, as well as the creation and verification of Verifiable Credentials. They facilitate operations and control over message signing and encryption. This allows for more granular control.
- Low-Level APIs offer more detailed control and higher flexibility but require a higher level of technical knowledge. The development process can be more complex and time-consuming.
- If you want to select the type of DIDComm messages or control the signing and verification of Verifiable Credentials on the application side, please refer to the Low-Level API.


## High-Level API

### Data Operations

#### Transfer

```{eval-rst}
.. http:post:: /transfer

  Transmits data using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID. For now, the number of destinations that can be specified is limited to 1 - 4.
  :<json Array<Map<String, Any>> required messages: Specifies data to be sent through the DIDComm protocol.
  :<json Map<String, Any> required metadata: Specifies the metadata for sending messages.

  :>json Array<Object> results: The result of processing for each destination is represented as an array.
  :>json String results.[number].destination: Represents the destination.
  :>json Boolean results.[number].success: Represents the state of success or failure.
  :>json Array<Object> results.[number].errors: If an error occurs, the error information is represented as an array.
  :>json String results.[number].errors.[number].error: Represents an error message.

  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/transfer', {
            destinations: [ 'did:nodex:test:...' ],
            messages: [ {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            } ],
            metadata: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "results": [
            {
                "destination": "did:nodex:test:...",
                "success": true,
                "errors": []
            },
            {
                "destination": "did:nodex:test:...",
                "success": false,
                "errors": [
                    {
                        "error": "ERROR_MESSAGE"
                    }
                ]
            }
        ]
    }
```

#### Receive

**Websocket communication is used for this API.**

```{eval-rst}
.. http:get:: /receive

  Receive data using the DIDComm protocol.
  Use websocket to communicate between the applications and the NodeX Agent.
  Please refer to the `Message Send/Receive Flow <https://docs.nodecross.io/getting-started/index.html#message-send-receive-flow>`_ for a overview of data flow in Receive.

  **API specification for getting messages**

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String message_id: An ID uniquely assigned to a message between applications.
  :>json Object message: Represents a verifiable credential. Please refer to the `VC Data Model <https://www.w3.org/TR/vc-data-model/>`_ specification for more information on this object.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **API specification for sending ACK messages**

  After receiving the message, the application sends an ACK message to the NodeX Agent. If the transmission is successful, the NodeX Agent closes the socket.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message_id: An ID uniquely assigned to a message between applications. Please refer to **Response JSON Object in API specification for getting messages** for details.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import WebSocket from 'ws';
    import { base } from "./sock.js";

    const URL = 'ws+' + base + ':/receive';
    const socket = new WebSocket(URL);

    socket.on('message', (data) => {
        const message = JSON.parse(data.toString());
        const response = {
            "message_id": message.message_id
        };
        socket.send(JSON.stringify(response));
    })

    setTimeout(() => {
        socket.close();
    }, 30000);

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "message_id": "",
        "message": {
            "id": "http://example.edu/credentials/1872",
            "issuer": {
                "id": "https://example.edu/issuers/565049"
            },
            "issuanceDate": "2010-01-01T19:23:24Z",
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "type": ["VerifiableCredential"],
            "credentialSubject": {
                "container": "", 
            },
            "proof": {
                "challenge": "",
                "controller": "",
                "created": "2017-06-18T21:19:10Z",
                "domain": "",
                "type": "RsaSignature2018",
                "proofPurpose": "assertionMethod",
                "verificationMethod": "https://example.edu/issuers/565049#key-1",
                "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
            }
        }
    }
```

## Low-Level API

### DID operations

#### Create DID

```{eval-rst}
.. http:post:: /identifiers

  Generate a new key ring and register it with DPKI.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String @context: Represents the context of this object.
  :>json Object didDocument: Represents a DID Document. Please refer to the `Decentralized Identifiers (DIDs) <https://www.w3.org/TR/did-core/>`_ specification for more information on this object.
  :>json String didDocument.id: Represents a DID.
  :>json Array<Object> didDocument.publicKey: The public keys associated with the DID are enumerated.
  :>json Object didDocument.publicKey.[number]: Represents a public key. Please refer to the `Ecdsa Secp256k1 Signature 2019 <https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/>`_ specification for more information on this object.
  :>json Object methodMetadata: Represents metadata for the :code:`did:nodex` method. Please refer to the `Sidetree <https://identity.foundation/sidetree/spec/>`_ specification for more information on this object.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/identifiers', {}, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "@context": "https://www.w3.org/ns/did-resolution/v1",
        "didDocument": {
            "id": "did:nodex:test:EiCwab0dfdUP1Ka9oZEBb7hVj3ZBPZ-tUGCM7nmceQjtOQ",
            "publicKey": [
                {
                    "id": "#signingKey",
                    "controller": "",
                    "type": "EcdsaSecp256k1VerificationKey2019",
                    "publicKeyJwk": {
                        "kty": "EC",
                        "crv": "secp256k1",
                        "x": "K6UbEvg_ZZGAYOLdqssmQNzY1Lj1eQrYebLiZ_4LQD4",
                        "y": "3JBpeezYsF0eF7aoOdIY7F4eHWfarZUyn7qnjQOpIvA"
                    }
                }
            ],
            "service": [
            ],
            "authentication": [
                "#signingKey"
            ]
        },
        "methodMetadata": {
            "published": false,
            "recoveryCommitment": "EiD-toxRcqSk6-FIpIr6fIrPwyJJhva-lW-EV4uSnm1BvA",
            "updateCommitment": "EiCSqEXRpfom3o7DwBTlIOvw2jPUMb2HWE6OTUtNzHuTgQ"
        }
    }
```

#### Find DID

```{eval-rst}
.. http:get:: /identifiers/(string:did)

  It acts as a Universal Resolver and returns the corresponding DID Document.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String @context: Represents the context of this object.
  :>json Object didDocument: Represents a DID Document. Please refer to the `Decentralized Identifiers (DIDs) <https://www.w3.org/TR/did-core/>`_ specification for more information on this object.
  :>json String didDocument.id: Represents a DID.
  :>json Array<Object> didDocument.publicKey: The public keys associated with the DID are enumerated.
  :>json Object didDocument.publicKey.[number]: Represents a public key. Please refer to the `Ecdsa Secp256k1 Signature 2019 <https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/>`_ specification for more information on this object.
  :>json Object methodMetadata: Represents metadata for the :code:`did:nodex` method. Please refer to the `Sidetree <https://identity.foundation/sidetree/spec/>`_ specification for more information on this object.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/identifiers/did:nodex:test:...', {}, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "@context": "https://www.w3.org/ns/did-resolution/v1",
        "didDocument": {
            "id": "did:nodex:test:EiCwab0dfdUP1Ka9oZEBb7hVj3ZBPZ-tUGCM7nmceQjtOQ",
            "publicKey": [
                {
                    "id": "#signingKey",
                    "controller": "",
                    "type": "EcdsaSecp256k1VerificationKey2019",
                    "publicKeyJwk": {
                        "kty": "EC",
                        "crv": "secp256k1",
                        "x": "K6UbEvg_ZZGAYOLdqssmQNzY1Lj1eQrYebLiZ_4LQD4",
                        "y": "3JBpeezYsF0eF7aoOdIY7F4eHWfarZUyn7qnjQOpIvA"
                    }
                }
            ],
            "service":[
            ],
            "authentication": [
                "#signingKey"
            ]
        },
        "methodMetadata": {
            "published": false,
            "recoveryCommitment": "EiD-toxRcqSk6-FIpIr6fIrPwyJJhva-lW-EV4uSnm1BvA",
            "updateCommitment": "EiCSqEXRpfom3o7DwBTlIOvw2jPUMb2HWE6OTUtNzHuTgQ"
        }
    }
```

### Credential operations

#### Generate VC

```{eval-rst}
.. http:post:: /internal/verifiable-credentials

  Generate and return a Verifiable Credential in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Map<String, Any> required message: Specifies the payload to wrap as VC.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/verifiable-credentials', {
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify VC

```{eval-rst}
.. http:post:: /internal/verifiable-credentials/verify

  Verifies a Verifiable Credential generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specify the VC to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/verifiable-credentials/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Generate DIDComm Plaintext Message

```{eval-rst}
.. http:post:: /internal/didcomm/plaintext-messages

  Generates and returns a DIDComm plaintext message in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID.
  :<json Map<String, Any> required message: Specifies the payload to wrap as a DIDComm plaintext message.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/plaintext-messages', {
            destinations: [ 'did:nodex:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify DIDComm Plaintext Message

```{eval-rst}
.. http:post:: /internal/didcomm/plaintext-messages/verify

  Validates DIDComm plaintext messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specifies the DIDComm plaintext message to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/plaintext-messages/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Generate DIDComm Signed Message

```{eval-rst}
.. http:post:: /internal/didcomm/signed-messages

  Generate and return a DIDComm signed message in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID.
  :<json Map<String, Any> required message: Specifies the payload to be wrapped as a DIDComm signed message.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/signed-messages', {
            destinations: [ 'did:nodex:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify DIDComm Signed Message

```{eval-rst}
.. http:post:: /internal/didcomm/signed-messages/verify

  Verifies DIDComm signed messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specifies the DIDComm signed message to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/signed-messages/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Generate DIDComm Encrypted Message

```{eval-rst}
.. http:post:: /internal/didcomm/encrypted-messages

  Generate and return a DIDComm encrypted message according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID.
  :<json Map<String, Any> required message: Specifies the payload to wrap as a DIDComm encrypted message.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/encrypted-messages', {
            destinations: [ 'did:nodex:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify DIDComm Encrypted Message

```{eval-rst}
.. http:post:: /internal/didcomm/encrypted-messages/verify

  Validates DIDComm encrypted messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specifies the DIDComm encrypted message to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/encrypted-messages/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

## Events

NodeX Agent provides a WebSocket interface as a mechanism to notify applications when data is received from the outside. The following events can be detected by connecting to and subscribing to the WebSocket interface from the application.

```
EventType = RECEIVED
```

Event type when data is received from other edges.
