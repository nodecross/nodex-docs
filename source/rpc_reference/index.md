# RPC Reference for UNiD EDGE

UNiD EDGE is a resident Linux daemon process that provides UNiD EDGE functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of UNiD EDGE provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries. The pre-built binaries can be used with zero learning cost for building the API.

## DID operations

The following API is provided through the Unix Domain Socket (/var/run/unid.sock) for applications using the UNiD EDGE. ) that can hit the Unix Domain Socket to communicate with UNiD EDGE through the socket.

### Create DID

```
POST /identifiers
```

Generate a new key ring and register it with DPKI.

- Parameters (Request Body)
  - None

### Find DID

```
GET /identifiers/${ did }
```

It acts as a Universal Resolver and returns the corresponding DID Document.


- Parameters (Request Body)
  - None

## Data operations

### Transfer

```
POST /transfer
```

Transmits data using the DIDComm protocol.

- Parameters (Request Body)
  - `destinations` (`Array<String>`) : Specifies the destination DID.
  - `messages` (`Array<Map<String, Any>>`) : Specifies data to be sent through the DIDComm protocol.
  - `metadata` (`Map<String, Any>`) : Specifies the metadata for sending messages.

**Example**

```
{
  'destinations': [ 'did:unid:test:...' ],
  'messages': [ {
    'string': 'value',
    'number': 1,
    'boolean': true,
    'array': [],
    'map': {}
  } ],
  'metadata': {
    'string': 'value',
    'number': 1,
    'boolean': true,
    'array': [],
    'map': {}
  }
}
```

## Credential operations

### Generate VC

```
POST /internal/verifiable-credentials
```

Generate and return a Verifiable Credential in accordance with W3C standards.

- Parameters (Request Body)
  - `message` (`Map<String, Any>`) : Specifies the payload to wrap as VC.

**Example**
```
{
  'message': {
    'string': 'value',
    'number': 1,
    'boolean': true,
    'array': [],
    'map': {}
  }
}
```

### Verify VC

```
POST /internal/verifiable-credentials/verify
```

Verifies a Verifiable Credential generated according to W3C standards.

- Parameters (Request Body)
  - `message` (`String`) : Specify the VC to be verified.

### Generate DIDComm Plaintext Message

```
POST /internal/didcomm/plaintext-messages
```

Generates and returns a DIDComm plaintext message in accordance with W3C standards.

- Parameters (Request Body)
  - `destinations` (`Array<String>`) : Specifies the destination DID.
  - `message` (`Map<String, Any>`) : Specifies the payload to wrap as a DIDComm plaintext message.

**Example**
```
{
  'destinations': [ 'did:unid:test:...' ],
  'message': {
    'string': 'value',
    'number': 1,
    'boolean': true,
    'array': [],
    'map': {}
  }
}
```

### Verify DIDComm Plaintext Message

```
POST /internal/didcomm/plaintext-messages/verify
```

Validates DIDComm plaintext messages generated according to W3C standards.

- Parameters (Request Body)
  - `message` (`String`) : Specifies the DIDComm plaintext message to be verified.

### Generate DIDComm Signed Message

```
POST /internal/didcomm/signed-messages
```

Generate and return a DIDComm signed message in accordance with W3C standards.

- Parameters (Request Body)
  - `destinations` (`Array<String>`) : Specifies the destination DID.
  - `message` (`Map<String, Any>`) : Specifies the payload to be wrapped as a DIDComm signed message.

**Example**
```
{
  'destinations': [ 'did:unid:test:...' ],
  'message': {
    'string': 'value',
    'number': 1,
    'boolean': true,
    'array': [],
    'map': {}
  }
}
```

### Verify DIDComm Signed Message

```
POST /internal/didcomm/signed-messages/verify
```

Verifies DIDComm signed messages generated according to W3C standards.

- Parameters (Request Body)
  - `message` (`String`) : Specifies the DIDComm signed message to be verified

### Generate DIDComm Encrypted Message

```
POST /internal/didcomm/encrypted-messages
```

Generate and return a DIDComm encrypted message according to W3C standards.

- Parameters (Request Body)
  - `destinations` (`Array<String>`) : Specifies the destination DID.
  - `message` (`Map<String, Any>`) : Specifies the payload to wrap as a DIDComm encrypted message.

**Example**
```
{
  'destinations': [ 'did:unid:test:...' ],
  'message': {
    'string': 'value',
    'number': 1,
    'boolean': true,
    'array': [],
    'map': {}
  },
}
```

### Verify DIDComm Encrypted Message

```
POST /internal/didcomm/encrypted-messages/verify
```

Validates DIDComm encrypted messages generated according to W3C standards.

- Parameters(Request Body)
  - `message` (`String`) : Specifies the DIDComm encrypted message to be verified.

## Events

UNiD EDGE provides a WebSocket interface as a mechanism to notify applications when data is received from the outside. The following events can be detected by connecting to and subscribing to the WebSocket interface from the application.

```
EventType = RECEIVED
```

Event type when data is received from other edges.