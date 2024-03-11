# NodeX Agent API

NodeX Agent is a resident Linux daemon process that provides NodeX Agent functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of NodeX Agent provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries.

The following API is provided through the Unix Domain Socket (~/.nodex/run/nodex.sock) for applications using the NodeX Agent. that can hit the Unix Domain Socket to communicate with NodeX Agent through the socket.

NodeX provides APIs for encryption and decryption for the messages themselves, which are used to send and receive messages between devices.
NodeX enables encryption/decryption status checks on communications made between devices.
This will help administrators monitor devices and the applications embedded in them.
(Sending and receiving of application data is left to the applications you are using.)

The APIs provided by NodeX Agent are categorized as High-Level API and Low-Level API.

NodeX's **High-Level API** provides a set of APIs that support accountability and reliability in sending and receiving encrypted application data.

Specifically, it allows the receiving device to verify that the device sending the application data is sending it to the intended device.
In addition, it logs when application data is encrypted and decrypted during transmission and reception. The administrator can track the status of data encryption and decryption between devices.

NodeX's **Low-Level API** provides more detailed control and greater flexibility than the High Level API.

See the Low Level API if you want to select the type of DIDComm messages on the application side, control the signing and verification of verifiable credentials, or require a customized process for encryption and decryption.


## High-Level API

### DID Operations

#### Create DIDComm Message

```{eval-rst}
.. http:post:: /create-didcomm-message

  Create DIDComm message using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required destination_did: Specifies the destination DID.
  :<json String required message: Specifies data to be sent through the DIDComm protocol.
  :<json String required operation_tag: 

  **Response JSON Objects:** Response JSON Objects follow the DIDComm Messageing data model. See `here <https://identity.foundation/didcomm-messaging/spec/#message-formats>`_ for details.

  :status 200: Success.
  :status 404: Not found.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post

    def main():
        # The endpoint and payload you want to send
        endpoint = "/create-didicomm-message"
        payload = {
            "destination_did": "did:nodex:test:EiBprXreMiba4loyl3psXm0RsECdtlCiQIjM8G9BtdQplA",
            "message": """{"string": "value","number": 1,"boolean": True,"array": [],"map": {}}""",
            "operation_tag": "test-operation-tag",
        }

        # Send the POST request and print the response
        json_response = post(endpoint, payload)
        print(json_response)

    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        
    }
```

#### Verify DIDComm Message

```{eval-rst}
.. http:post:: /verify-didcomm-message

  Transmits data using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: An application message sent by the sending application, assuming the data structure defined in DIDComm Message.

  :>json String string: 
  :>json Number number: 
  :>json Boolean boolean: 
  :>json Array<Object> array: 
  :>json Object map: 

  :status 200: Success.
  :status 401: Unauthorized.
  :status 404: Not found.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post

    def main():
        # The endpoint and payload you want to send
        endpoint = "/verify-didcomm-message"
        payload = {}

        # Send the POST request and print the response
        json_response = post(endpoint, payload)
        print(json_response)

    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
    }
```

### Credential Operations

#### Create Verifiable Message

```{eval-rst}
.. http:post:: /create-didcomm-message

  Create DIDComm message using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required destination_did: Specifies the destination DID.
  :<json String required message: Specifies data to be sent through the DIDComm protocol.
  :<json String required operation_tag: 

  **Response JSON Objects:** Response JSON Objects follow the VerifiableCredentials data model. See `here <https://www.w3.org/TR/vc-data-model/#basic-concepts>`_ for details.

  :status 200: Success.
  :status 404: Not found.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post

    def main():
        # The endpoint and payload you want to send
        endpoint = "/create-verifiable-message"
        payload = {
            "destination_did": "did:nodex:test:EiBprXreMiba4loyl3psXm0RsECdtlCiQIjM8G9BtdQplA",
            "message": """{"string": "value","number": 1,"boolean": True,"array": [],"map": {}}""",
            "operation_tag": "test-operation-tag",
        }

        # Send the POST request and print the response
        json_response = post(endpoint, payload)
        print(json_response)

    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "issuer": {
            "id": "$ISSUER_DID"
        },  
        "issuanceDate": "2024-03-10T06:29:41.750407+00:00",
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "container": {
                "created_at": "2024-03-10T06:29:41.750407+00:00",
                "destination_did": "$DESTINATION_DID",
                "message_id": "2b30ff6a-fa6e-44cc-9b1e-92aa2f96f3f5",
                "payload": "{\"string\": \"value\",\"number\": 1,\"boolean\": true,\"array\": [],\"map\": {}}",
                "project_hmac": "b843ea611f2229cd645fdbe92c247c0887e5b2dcbed5f5fa75895bb553eee5dc"
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "proofPurpose": "authentication",
            "created": "2024-03-10T06:29:41.908757+00:00",
            "verificationMethod": "",
            "jws": "",
            "controller": null,
            "challenge": null,
            "domain": null
        }
    }
```

#### Verify Verifiable Message

```{eval-rst}
.. http:post:: /verify-verifiable-message

  Transmits data using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID. For now, the number of destinations that can be specified is limited to 1 - 4.
  :<json Array<Map<String, Any>> required messages: Specifies data to be sent through the DIDComm protocol.
  :<json Map<String, Any> required metadata: Specifies the metadata for sending messages.

  :>json String string: 
  :>json Number number: 
  :>json Boolean boolean: 
  :>json Array<Object> array: 
  :>json Object map: 

  :status 200: Success.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post

    def main():
        # The endpoint and payload you want to send
        endpoint = "/verify-verifiable-message"
        payload = {
            "message": """{"issuer":{"id":"did:nodex:test:EiDWAZgabmwyviEUcvPMssS_kJT1MUyhDO9iPdfx5dw5Xg"},"issuanceDate":"2024-03-04T17:05:39.042635+00:00","@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential"],"credentialSubject":{"container":{"created_at":"2024-03-04T17:05:39.042635+00:00","destination_did":"did:nodex:test:EiBprXreMiba4loyl3psXm0RsECdtlCiQIjM8G9BtdQplA","message_id":"7cca38ee-77a6-4cfe-b7b4-5c0987fa1627","payload":"{\\"string\\": \\"value\\",\\"number\\": 1,\\"boolean\\": True,\\"array\\": [],\\"map\\": {}}","project_hmac":"b843ea611f2229cd645fdbe92c247c0887e5b2dcbed5f5fa75895bb553eee5dc"}},"proof":{"type":"EcdsaSecp256k1Signature2019","proofPurpose":"authentication","created":"2024-03-04T17:05:39.068522+00:00","verificationMethod":"did:nodex:test:EiDWAZgabmwyviEUcvPMssS_kJT1MUyhDO9iPdfx5dw5Xg#signingKey","jws":"eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ.._iTjTfHLg78lJzGxwdFq5aT_b3xfNLaLBYybwD6ck8d34IN2a7gXuHIj-eJtUYzuTowNFAl5DGny8yKQMra7qA","controller":null,"challenge":null,"domain":null}}"""
        }

        # Send the POST request and print the response
        json_response = post(endpoint, payload)
        print(json_response)

    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "string": "value",
        "number": 1,
        "boolean": true,
        "array": [],
        "map": {}
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

