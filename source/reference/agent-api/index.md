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
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
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

  :>json String message: The message used in the request to generate the Verifiable Message is returned.

  :status 200: Success.
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post


    def main():
        # The endpoint and payload you want to send
        endpoint = "/verify-didcomm-message"
        payload = {
            "message": """
                {
                    "ciphertext": "ycha9AtTBdFTXjP9zPm0cv85EP89uzBF05hvyKJ08lQ8npw6MES9htmLjyyiFl-rXxIW1lFf2FVGD28Gg0jv65tXWyQX7c0MoDmjF9FgIVwTzzgJ_4aR67U7ncX8T03Ib20cXakJWsrOJp1hzJdFEwkoDRJSszbuA4cCkYzeW2ia9jXsZNig90Q2b_m3kFzXCw20tV_JU68xrfs9OtQHwiAUB9_nuskBvdV-lJeoblT8yV3H1Jz5FjLN7JUOV5NBdBk0aDsO0kQ1eFiqZtj5HlZKDB-uKp52ISf80JTJNCb9uB1c-DnCkJw6-D0kk3f83-3y7GN3LfQYSYpxlrpMDnQVtXll0nCTvakiQOUCqQl0eAFMEXeROe-a4dOz3MRdgENnI1fh2N7GMsuh3pax6PI_ssAH51Ya85h_VtJDc6ZqzHkoLhxGALPBJ1-lONXjXdkdPeq5iiGmvkHXwwq4Spe6KyuLiVwbbSVsCQ-qd2yVTuU01EjEo4YVP3L64bA1alwvbZwPfQTBAFAH3J31_50nYmPb4-DdwlFkivQD3CB_1VWUaTQ_7LYlqY_x05UAcb8pYC2sD3rWfV-U18RmRzThfJ9WiycZHaOCn-sKqfYt2UFH8iFBDxYSjy-0dJ0ZvJ_0j9fdPV5vsVchpF8x5ZLXx9jYyucvW9KtIR2c8kp6BWjG-_2Ht87tBMla1dHFjrXfLuNVw9NBpuLcQHkQ-YCAuR5L-PxrLSI51Tg5xBDwnyhZpH4n0RxOWFfXECWduNCJhpFvBtxjSjaqegrk4AW2QJtaPouKHJ24QtlXlJpIHo5n5iS7kV7CQKl7twXIG8OOaL6dlaqx2nuAb6HZpo2xHkLpG3VlMXGl4Lky9PDTk_LTVyUwLxRa7Y-9dBQfrwr3TaGzERol7e1D-Add2zSSOpVYCnIdnw7aRQvXliyF29E0dSlMlMU5lvhjBBa1ya4tbnwHruWd_ZpXWEQzlbBj1pOA3yKblzJyNTLhdqqv5OERIccg3DNLYx3LpVBzxS1ya7vU3GsaRON6qYvOtcaNw74qo1iHiRTDD_dhal4MQ2AEoyU3Tzx0Okgukel9oLPQ_yM5xYQZxEcuXAXWq6twAWYSZBQ0mmJf1C-P2VcQFvLnSufD88pY9xmpc5cb8salBYr21evRF8fvWxL8-KDMRIBdYh9_gUFhadlzz2Qh_Oqhsorvxrv6TtsES0q8ggsIrDmDwQTiG1A6NMkJv4Y4lEYvFT4TJbMK8opvY3H59hVZbsZcdzRc2Hi8GTw2XB08PdGrvtVZhK97oIbnNv8CmLR-9bcDDwny2mE9FcCHSYwwXQ_yCEMiXyImKzxNvNovm8isnDaqva2uP6ERzB_AEAZboiOIKVfrW0kddR1_xCYg1a0TwazFrgXO-8wekBmAzVdhvcIkSPnZblu8LovR9AN9YPOqLkZonYRaj6eeDS4ww5kb_IVXzumcbIiNOEoqHwZoNGASxnO7HktiWncfpnridPY4nhH9fFhTITZsypCoZY5wGEbtlwZEDs8dcFq1-vB70m5ukvQN9Cr3IcqSUYBGI4jSr1NBESVELKyzbu-yasRjD_C60IlSB9VmNrw232Wno-jYWp0nmAcU43kxM2RY9pkjfQaDEXtDUKrTD2fRXlqrAUnOBPest3xeiK1ztUae8mpU9AyRH8KKLI3seY3Un_25deYCZjMJi3FgQ1gsTdTab5oANgd60vvND7NAZadCLDjkgsxUXykQOF5p4W_sd64DQeFyBVlPmK9mnxPo7vqMrs_rpywm7sRSbB49R1UsopDcZxv2cZmVPyzXSGxbV4T9e65k1XBSSeUaf3FI_itOOcDDIS-ms_D81__Ubs5YO4VyN6oR2KvkJGXHUFaNZybvu2hZhaAoqLqAZDlx6p9jGM_OUOwS-0ttWe2HC4BeMb53zrrg8T6dmizgwqQV0C0AU-q7cdPb0uhOl4nHXcTnQDA2PHUmhhEBGZMeZezzZ-Dnseox5ucit5tsTkV8zSVnYWYKgM3cgJTJhLJ1kLaS_oYFmSIuL3KnPjRgUMWAkS7HCU6b1XALusCWACwo6FC7iUspc6UBMrtbLLE70C2n17DnHWxSyVnZoo2OIUeQsvBivmnGT8SnD77V83jVMgYC6m1lEKTrMQki8y4BtVYtL1CfdHHFYZqhXdNegFMOf_3d4uWpHqxZbQnAQu3mz4LAJzcg3gLKRv1bVGhbajGc4IowCFV4hknRKx4WZanIQrtQ-3Q4_OjbHgxTSQ01uImaS-rPpIWH7HBKFw6PVfmumBZgYiAu8O4IhJFY-_py3MXdVQR-bDw2cqjXiF93Pf7-O8PzMeK6T5XMnoy5eK2LbT0a0QSqOHR9PvpM9xYlLoSUeJ03TfxUUxTekyOarF2ACrAOV41_D4gbBklcYmKhdJ69YXNl6wiuiLuxKLQFy4QWxkEC-jEZe5GOGkFgTN1udA4BrOE03Bt3QSNfglxKmF3HBUyAByoU2Sd2h8fr5aUmSSoA0-u4qSvl_E8ODhqEyKK_9THfj4N8QuhLyyQn2tW0Om0x0d0CTNv_OJI9Y8lvWWuDHQ7jOanujqN5xpDucM_dJJnDGGMylsYAazviLusf4gzR3B49qbV-owmGQS_2gWaXV0N8ubTnD1cYjAbto8TQdLXYO3KwQwLwu5Nsr4UskH7MkQI5eupHXyBPxIkyJRkQqbNJUdwcZj_KRYzqzvyWdnnlyCPQBTOE8TneCFeIrBtcYrYHL8eL12c0HIcZG4O4nCa8chTHzd5te4D8TQdUUFE60nlCVHg6n_lT7fo9kgRfl85Ly1QooXVKZCJUh4TQYE5TPJLQeHNszNnhDuMJ7qTR51xsnmvBrKWuWAei0JwfdFfFTqtSU1TLfxmxmTxYhPT-5bR76GWru1v0MDS4vDjzso3hNcpvM5tJIEpYoM17NLCHlrUkKBaXcKrNVlkrZhAW5hb_yczmNVoHQxodTasFyqDFvmSPTQpvnRm0ynTPyqbTj8rbeCqXobmuFLgHybHVd5lz7JtQ6ooAv2JZaTXA21rq6hT5G63BmCaagMpLziNieH0EILjftQ",
                    "iv": "UzE5VwKyQB_7sVgDPcPezLgRY87P2g3d",
                    "protected": "eyJ0eXAiOiJhcHBsaWNhdGlvbi9kaWRjb21tLWVuY3J5cHRlZCtqc29uIiwiZW5jIjoiWEMyMFAiLCJraWQiOiJsYUJEZl9PeENFLTF6aVdMLWJUT093RFZVMUYyNGluTk1kWkhOd1ZxUEFBIiwic2tpZCI6ImRpZDp1bmlkOnRlc3Q6RWlCcHJYcmVNaWJhNGxveWwzcHNYbTBSc0VDZHRsQ2lRSWpNOEc5QnRkUXBsQSIsImFsZyI6IkVDREgtMVBVK1hDMjBQS1cifQ",
                    "recipients": [
                        {
                            "encrypted_key": "ytXSszSTNkVbZw5PZ_7iHQ1waV4yT27idrAuODWO7IY",
                            "header": {
                                "alg": "ECDH-1PU+XC20PKW",
                                "epk": {
                                    "crv": "X25519",
                                    "kty": "OKP",
                                    "x": "XFRApJksjGAcFGzALqYd5mAE1W5Ja3GHDzU_Cy2jd0Y"
                                },
                                "iv": "qWBwU5xflciNmEZ3SYCJ5ulwKJo9M4hW",
                                "key_ops": [],
                                "kid": "did:nodex:test:EiBprXreMiba4loyl3psXm0RsECdtlCiQIjM8G9BtdQplA",
                                "tag": "zdt-fMYmk_9IDhRuwWqWXw"
                            }
                        }
                    ],
                    "tag": "cp7atcUAXtPgLFRogRxRcA"
                }
            """
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
        "boolean": True,
        "array": ["foo", "bar", "baz"],
        "map": {"key": "value"},
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
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post
    import json
    import pprint

    destination_did = (
        "did:nodex:test:EiAHYZMJelX_UKoCYcMf1q_aUZozkGwChO_aBxRVRyQXQA"
    )
    message = {
        "message": {
            "string": "value",
            "number": 1,
            "boolean": True,
            "array": ["foo", "bar", "baz"],
            "map": {"key": "value"},
        }
    }
    operation_tag = "test-operation-tag"


    def main():
        payload = {
            "destination_did": destination_did,
            "message": json.dumps(message),
            "operation_tag": operation_tag,
        }

        json_response = post("/create-verifiable-message", payload)

        print("The response is as follows.\n")
        print(json_response)

        print('\nPlease paste below to "verify_vc_message.py".\n')
        pprint.pprint(json.loads(json_response), sort_dicts=False)


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
                "payload": "{\"string\": \"value\",\"number\": 1,\"boolean\": true,\"array\": [\"foo\", \"bar\", \"baz\"],\"map\": {\"key\": \"value\"}}",
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

  :>json String message: The message used in the request to generate the Verifiable Message is returned.

  :status 200: Success.
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post
    import json

    message = {
        "issuer": {
            "id": "did:nodex:test:DummyDummyDummyDummyDummyDummyDummyDummyDummyD"
        },
        "issuanceDate": "2024-03-22T11:43:47.741035+00:00",
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        "type": ["VerifiableCredential"],
        "credentialSubject": {
            "container": {
                "created_at": "2024-03-22T11:43:47.741035+00:00",
                "destination_did": "did:nodex:test:DummyDummyDummyDummyDummyDummyDummyDummyDummyD",
                "message_id": "d8b8bfbc-88ed-4d93-bfa5-a634e35d104e",
                "payload": '{"message": {"string": '
                '"value", "number": 1, '
                '"boolean": true, "array": '
                '["foo", "bar", "baz"], "map": '
                '{"key": "value"}}}',
                "project_hmac": "fc67f9f5c17ccd44ff3f8e270870c2b04f0980e22766b619a62f7c7ac4c95058",
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "proofPurpose": "authentication",
            "created": "2024-03-22T11:43:47.775189+00:00",
            "verificationMethod": "did:nodex:test:DummyDummyDummyDummyDummyDummyDummyDummyDummyD#signingKey",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..AnO3rmljCEHhbxvvLKxml8coj-JOwSSczlCxS7zfVBRy11AABM-aFBvwJKP32-VMESZnfF_EH0PZvkJSCAnqOg",
            "controller": None,
            "challenge": None,
            "domain": None,
        },
    }


    def main():
        payload = {
            "message": json.dumps(message),
        }

        json_response = post("/verify-verifiable-message", payload)

        print("The response is as follows.\n")
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
        "array": ["foo", "bar", "baz"],
        "map": {"key": "value"}
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

