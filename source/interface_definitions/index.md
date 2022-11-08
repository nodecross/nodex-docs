# Interface Definitions for UNiD EDGE

This chapter defines the API interface required for development when replacing or extending the RoT functionality of UNiD EDGE to your own specifications. The development procedure is to build a shared library that implements your own processing based on the interface definitions shown below, and place it in a designated location accessible by UNiD EDGE. UNiD EDGE loads shared libraries at startup, overriding some core UNiD EDGE functions with processes provided as shared libraries.

## True random number generation

```
Method: unid_err_t unid_read_trng(void *result_ptr)
```

This is implemented when replacing the process of generating true random numbers. Accesses its own TRNG module inside the shared library, and links true random numbers to UNiD EDGE through a pointer. The return value of the method follows the definition of unid_err_t.

## Save private keys

```
Method: unid_err_t unid_write_private_key(char *private_key)
```

Implement this when replacing the private key storage process. The private key is stored inside the shared library using a proprietary cipher, etc. The return value of the method follows the definition of unid_err_t. The return value of the method follows the definition of unid_err_t.

## Find private keys

```
Method: unid_err_t unid_read_private_key(void *result_ptr)
```

This function is implemented when the process of reading out the private key is replaced. The private key is read out using a unique cipher or other device inside the shared library, and the private key is linked to the UNiD EDGE through a pointer. The return value of the method follows the definition of unid_err_t.

## Encryption Data

```
Method: unid_err_t unid_encrypt_message(char *message, void *result_ptr)
```

(TBD)

## Decryption Data

```
Method: unid_err_t unid_decrypt_message(char *message, void *result_ptr)
```

(TBD)