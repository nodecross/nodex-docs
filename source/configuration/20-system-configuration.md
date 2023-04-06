# System Configuration

System configuration items in NodeX include the following:

- Private
    - Private key for signature
    - Private Key for recovery
    - Private key for update
    - Private key for cryptography
- Readable
    - DID
- Readable & Writable
    - List of destination DIDs to which data can be sent
    - Heartbeat interval

As mentioned earlier, these configuration items are maintained internally within NodeX, and access to the configuration values is strictly limited.
In particular, there is no public API provided for retrieving or changing the settings contained in the Private group.
Readable group can be referenced from the agent's API or from NodeX STUDIO.
Writable group can be referenced and changed through the agent's API or through NodeX STUDIO.
By default, this configuration information is stored in a file on the local system, but if NodeX's TPM integration is enabled, each configuration field is stored in encrypted form to protect the configuration values from being viewed or modified by third-party applications.