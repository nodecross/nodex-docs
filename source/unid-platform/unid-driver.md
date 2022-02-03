# UNiD Drivers

## DID Method Support

DID methods provide the means to implement this specification on different verifiable data registries. New DID methods are defined in their own specifications, so that interoperability between different implementations of the same DID method is ensured. This section specifies the requirements on any DID method, which are met by the DID method's associated specification.

## Key Management Support

Currently, we generate a binary seed from a seed phrase with BIP39, and generate multiple key pairs required for DID Operations. Currently, we are working on a decentralized key management solution that can respond to the demands of each application by incorporating cryptographic technologies such as secret sharing.

## Tenant Support

We have chosen a tenant model for building authorize mechanism of SDS which is the encrypted storage stores personal data. At UNiD, you can register multi mobile agents and relying parties in your tenant and will get a **`client_id`** and **`client_secret`** for each agents. These values are used for authorization when the wallet communicates with relying parties and SDS endpoints for prevent from phishing fraud and free rider problem at the agent application level without interfering with personal control.
