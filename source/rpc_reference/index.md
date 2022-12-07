# RPC Reference for UNiD EDGE

UNiD EDGE is a resident Linux daemon process that provides UNiD EDGE functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of UNiD EDGE provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries. The pre-built binaries can be used with zero learning cost for building the API.

## DID operations

The following API is provided through the Unix Domain Socket (`~/.unid/run/unid.sock`) for applications using the UNiD EDGE. ) that can hit the Unix Domain Socket to communicate with UNiD EDGE through the socket.

### Create DID

```{eval-rst}
.. http:post:: /identifiers

  Generate a new key ring and register it with DPKI.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String @context: Represents the context of this object.
  :>json Object didDocument: Represents a DID Document. See the `Decentralized Identifiers (DIDs) <https://www.w3.org/TR/did-core/>`_ specification for more information on this object.
  :>json String didDocument.id: Represents a DID.
  :>json Array<Object> didDocument.publicKey: The public keys associated with the DID are enumerated.
  :>json Object didDocument.publicKey.[number]: Represents a public key. Please refer to the `Ecdsa Secp256k1 Signature 2019 <https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/>`_ specification for more information on this object.
  :>json Object methodMetadata: Represents metadata for the :code:`did:unid` method. See the `Sidetree <https://identity.foundation/sidetree/spec/>`_ specification for more information on this object.
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
            socketPath: '~/.unid/run/unid.sock',
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
            "id": "did:unid:test:EiCwab0dfdUP1Ka9oZEBb7hVj3ZBPZ-tUGCM7nmceQjtOQ",
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

### Find DID

```{eval-rst}
.. http:get:: /identifiers/(string:did)

  It acts as a Universal Resolver and returns the corresponding DID Document.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String @context: Represents the context of this object.
  :>json Object didDocument: Represents a DID Document. See the `Decentralized Identifiers (DIDs) <https://www.w3.org/TR/did-core/>`_ specification for more information on this object.
  :>json String didDocument.id: Represents a DID.
  :>json Array<Object> didDocument.publicKey: The public keys associated with the DID are enumerated.
  :>json Object didDocument.publicKey.[number]: Represents a public key. Please refer to the `Ecdsa Secp256k1 Signature 2019 <https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/>`_ specification for more information on this object.
  :>json Object methodMetadata: Represents metadata for the :code:`did:unid` method. See the `Sidetree <https://identity.foundation/sidetree/spec/>`_ specification for more information on this object.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/identifiers/did:unid:test:...', {}, {
            socketPath: '~/.unid/run/unid.sock',
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
            "id": "did:unid:test:EiCwab0dfdUP1Ka9oZEBb7hVj3ZBPZ-tUGCM7nmceQjtOQ",
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

## Data operations

### Transfer

```{eval-rst}
.. http:post:: /transfer

  Transmits data using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> destinations: Specifies the destination DID. For now, the number of destinations that can be specified is limited to 1 - 4.
  :<json Array<Map<String, Any>> messages: Specifies data to be sent through the DIDComm protocol.
  :<json Map<String, Any> metadata: Specifies the metadata for sending messages.

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
            destinations: [ 'did:unid:test:...' ],
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
            socketPath: '~/.unid/run/unid.sock',
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
                "destination": "did:unid:test:...",
                "success": true,
                "errors": []
            },
            {
                "destination": "did:unid:test:...",
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

## Credential operations

### Generate VC

```{eval-rst}
.. http:post:: /internal/verifiable-credentials

  Generate and return a Verifiable Credential in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Map<String, Any> message: Specifies the payload to wrap as VC.
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
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Verify VC

```{eval-rst}
.. http:post:: /internal/verifiable-credentials/verify

  Verifies a Verifiable Credential generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String message: Specify the VC to be verified.
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
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Generate DIDComm Plaintext Message

```{eval-rst}
.. http:post:: /internal/didcomm/plaintext-messages

  Generates and returns a DIDComm plaintext message in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> destinations: Specifies the destination DID.
  :<json Map<String, Any> message: Specifies the payload to wrap as a DIDComm plaintext message.
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
            destinations: [ 'did:unid:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Verify DIDComm Plaintext Message

```{eval-rst}
.. http:post:: /internal/didcomm/plaintext-messages/verify

  Validates DIDComm plaintext messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String message: Specifies the DIDComm plaintext message to be verified.
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
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Generate DIDComm Signed Message

```{eval-rst}
.. http:post:: /internal/didcomm/signed-messages

  Generate and return a DIDComm signed message in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> destinations: Specifies the destination DID.
  :<json Map<String, Any> message: Specifies the payload to be wrapped as a DIDComm signed message.
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
            destinations: [ 'did:unid:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Verify DIDComm Signed Message

```{eval-rst}
.. http:post:: /internal/didcomm/signed-messages/verify

  Verifies DIDComm signed messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String message: Specifies the DIDComm signed message to be verified.
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
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Generate DIDComm Encrypted Message

```{eval-rst}
.. http:post:: /internal/didcomm/encrypted-messages

  Generate and return a DIDComm encrypted message according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> destinations: Specifies the destination DID.
  :<json Map<String, Any> message: Specifies the payload to wrap as a DIDComm encrypted message.
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
            destinations: [ 'did:unid:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

### Verify DIDComm Encrypted Message

```{eval-rst}
.. http:post:: /internal/didcomm/encrypted-messages/verify

  Validates DIDComm encrypted messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String message: Specifies the DIDComm encrypted message to be verified.
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
            socketPath: '~/.unid/run/unid.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

## Events

UNiD EDGE provides a WebSocket interface as a mechanism to notify applications when data is received from the outside. The following events can be detected by connecting to and subscribing to the WebSocket interface from the application.

```
EventType = RECEIVED
```

Event type when data is received from other edges.