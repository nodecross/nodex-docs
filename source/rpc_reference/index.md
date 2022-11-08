# RPC Reference for UNiD EDGE

UNiD EDGE is a resident Linux daemon process that provides UNiD EDGE functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of UNiD EDGE provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries. The pre-built binaries can be used with zero learning cost for building the API.

## DID Operations

The following API is provided through the Unix Domain Socket (/var/run/unid.sock) for applications using the UNiD EDGE. ) that can hit the Unix Domain Socket to communicate with UNiD EDGE through the socket.

```
POST /identifiers
```

Generate a new key ring and register it with DPKI.

- Parameters (Request Body)
  - None

```
GET /identifiers/${ did }
```

It acts as a Universal Resolver and returns the corresponding DID Document.


- Parameters (Request Body)
  - None

```
PUT /identifiers/${ did }/default
```

Marks the specified DID as the default key ring.

- Parameters (Request Body)
  - None

```
DELETE /identifiers/${ did }
```

Revokes the specified DID.

- Parameters (Request Body)
  - None

## Data Operations

```
POST /transfer
```

Transmits data using the DIDComm protocol.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies data to be sent through the DIDComm protocol.
  - `metadata` (`Null(Map<String, String>)`) : Specifies a dictionary of metadata to be assigned to the data to be sent.
  - `credentialId` (`Null(String)`) : Specifies the keyring ID to be used when processing the DIDComm protocol.

## Credential Operations

```
POST /internal/verifiable-credentials
```

Generate and return a Verifiable Credential in accordance with W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the payload to wrap as VC.
  - `metadata` (`Null(Map<String, String>))`) : Specifies metadata for the payload to be wrapped as a VC.
  - `credentialId` (`Null(String)`) : Specifies the keyring ID to be used when signing the VC.

```
POST /internal/verifiable-credentials/verify
```

Verifies a Verifiable Credential generated according to W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specify the VC to be verified.

```
POST /internal/verifiable-presentations
```

Generate and return a Verifiable Presentation in accordance with W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the payload to wrap as VP.
  - `credentialId` (`Null(String)`) : Specifies the keyring ID to be used when signing the VP.

```
POST /internal/verifiable-presentations/verify
```

Verify Verifiable Presentations generated according to W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the VP to be verified.

```
POST /internal/didcomm/plaintext-messages
```

Generates and returns a DIDComm plaintext message in accordance with W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the payload to wrap as a DIDComm plaintext message.
  - `recipients` (`Array<String>`) : DIDComm Specifies the DID of the peer that will receive the plaintext message.
  - `credentialId` (`Null(String)`) : Specifies the keyring ID to be used when signing DIDComm plaintext messages.

```
POST /internal/didcomm/plaintext-messages/verify
```

Validates DIDComm plaintext messages generated according to W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the DIDComm plaintext message to be verified.

```
POST /internal/didcomm/signed-messages
```

Generate and return a DIDComm signed message in accordance with W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the payload to be wrapped as a DIDComm signed message.
  - `recipients` (`Array<String>`) : Specifies the DID of the peer that will receive the signed message.
  - `credentialId` (`Null(String)`) : Specifies the keyring ID to be used when signing DIDComm signed messages.

```
POST /internal/didcomm/signed-messages/verify
```

Verifies DIDComm signed messages generated according to W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the DIDComm signed message to be verified

```
POST /internal/didcomm/encrypted-messages
```

Generate and return a DIDComm encrypted message according to W3C standards.

- Parameters (Request Body)
  - `payload` (`String`) : Specifies the payload to wrap as a DIDComm encrypted message.
  - `recipients` (`Array<String>`) : DIDComm Specifies the DID of the peer that will receive the encrypted message.
  - `credentialId` (`Null(String)`) : DIDComm Specifies the keyring ID used to encrypt encrypted messages.

```
POST /internal/didcomm/encrypted-messages/verify
```

Validates DIDComm encrypted messages generated according to W3C standards.

- Parameters(Request Body)
  - `payload` (`String`) : Specifies the DIDComm encrypted message to be verified.

## Events

UNiD EDGE provides a WebSocket interface as a mechanism to notify applications when data is received from the outside. The following events can be detected by connecting to and subscribing to the WebSocket interface from the application.

```
EventType = RECEIVED
```

Event type when data is received from other edges.