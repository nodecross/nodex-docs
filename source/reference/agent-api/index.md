# NodeX Agent API

NodeX Agent is a resident Linux daemon process that provides NodeX Agent functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of NodeX Agent provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries. The pre-built binaries can be used with zero learning cost for building the API.

The following API is provided through the Unix Domain Socket (~/.nodex/run/nodex.sock) for applications using the NodeX Agent. that can hit the Unix Domain Socket to communicate with NodeX Agent through the socket.

## Transfer

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

## Receive

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

## Events

NodeX Agent provides a WebSocket interface as a mechanism to notify applications when data is received from the outside. The following events can be detected by connecting to and subscribing to the WebSocket interface from the application.

```
EventType = RECEIVED
```

Event type when data is received from other edges.
