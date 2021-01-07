# UNiD Core

## DID Operations

Regardless of the DID method supported by UNiD Drivers, all DID methods support the following DID Operations. All of operations require the DID owner to generate specific data values and cryptographic material. 

### Method Summary

**`UNiD.createDidDocument(params = {}, callback)`**  
        Create key pairs for registering new DID on UNiD network.

**`UNiD.loadDid(params = {}, callback)`**  
        Get a wallet information including a decentralized identifier and key pairs.

**`DID.getIdentifier(params = {}, callback)`**  
        Get the decentralized identifier.

**`DID.getSeedPhrase(params = {}, callback)`**  
        Get a master seed phrase.

**`DID.verifySeedPhrase(params = {}, callback)`**  
        Verify a master seed phrase.

**`UNiD.updateDidDocument(params = {}, callback)`**  
        Send action patches such as _add-public-keys_, _remove-public-keys_, _add-services_, _remove-services_, and _replace._

## VC Operations

Credentials are a part of our daily lives; driver's licenses are used to claim that we are capable of operating a motor vehicle, university degrees can be used to assert our level of education, and government-issued passports enable us to travel between countries. This sort of credentials can be expressed on the Web in a way that is cryptographically secure, privacy respecting, and machine-verifiable. We call it as a VC or Verifiable Credential.

In the physical world, a credential might consist of:

* Information related to identifying the subject of the credential \(for example, a photo, name, or identification number\)
* Information related to the issuing authority \(for example, a city government, national agency, or certification body\)
* Information related to the type of credential this is \(for example, a Dutch passport, an American driving license, or a health insurance card\)
* Information related to specific attributes or properties being asserted by the issuing authority about the subject \(for example, nationality, the classes of vehicle entitled to drive, or date of birth\)
* Evidence related to how the credential was derived
* Information related to constraints on the credential \(for example, expiration date, or terms of use\).

A verifiable credential can represent all of the same information that a physical credential represents. The addition of technologies, such as digital signatures, makes verifiable credentials more tamper-evident and more trustworthy than their physical counterparts. 

### Method Summary

**`DID.createCredential(params = {}, callback)`**  
        Create a verifiable credential following UNiD VC data schema class.

**`DID.postCredential(params = {}, callback)`**  
        Store a verifiable credential in a secure data storage.

**`DID.getCredential(params = {}, callback)`**   
        Get a verifiable credential from a secure data storage.

**`DID.getCredentials(params = {}, callback)`**  
        Get verifiable credentials from a secure data storage.

**`DID.createPresentation(params = {}, callback)`**  
        Wrap verifiable credentials into a verifiable presentation.

**`UNiD.verifyCredential(params = {}, callback)`**  
        Verify the signature of the verifiable credential.

**`UNiD.verifyPresentation(params = {}, callback)`**  
        Verify the signature of the verifiable presentation.

**`(schema_type).select(params = {}, callback)`**  
        Retrieve the verifiable credential wrapped in the verifiable presentation. 

## DIDComm

DIDComm is a cross-community standard that creates libraries and design patterns for two or more DID-controlling entities from diverse DID-based systems to communicate directly with one another. It creates a secure communication channel between software controlled by each of these entities, which can be people, organizations or things. This constitutes an “authenticated channel” in that control of a given DID’s private keys is, barring a failure of design or operational security, proof of authenticity of the party represented by that DID.

### **DID AuthN**

For the wallet to communicate with relying parties \(RP\) on secure authenticated channel. The below diagram illustrate the sign-in flow and steps taken to verify a user through their user agent from the wallet side of the webpage to the server side of a RP.

![](../.gitbook/assets/did-authN-protocol%20%281%29.png)

### Method Summary

**`DID.generateAuthenticationRequest(params = {}, callback)`**  
        Create an authentication request with _requiredCredentialTypes._

**`UNiD.validateAuthenticationRequest(params = {}, callback)`**  
        Validate an authentication request.

**`DID.generateAuthenticationResponse(params = {}, callback)`**  
        Create an authentication response with _requestedPresentation_.

**`UNiD.validateAuthenticationResponse(params = {}, callback)`**  
        Validate an authentication response.

