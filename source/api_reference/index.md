# API Reference

This chapter defines the API reference of NodeX EDGE SDK, which describes the arguments and return values for each type and function as well as the function description. NodeX EDGE SDK is an open source product. At the time of writing this document, the version of NodeX EDGE SDK is v1.0.0. Please refer to the official website for the latest information.


## API definition

The following is a description of the API defined as NodeX EDGE SDK.

```
Type: unid_err_t unsigned int
```
This type is used to represent the result of processing in NodeX EDGE SDK. unid_err_t is an unsigned int type and can represent the following states.

- 0 (unsigned int) = operation succeeded
- 1 (unsigned int) = operation failure

```
Type: unid_log_level_t unsigned int
```

This type is used to represent the log level in NodeX EDGE SDK. unit_log_level_t is an unsigned int type and can represent the following states.

- 0x00 (unsigned int) = EMERG level
- 0x10 (unsigned int) = ALERT level
- 0x20 (unsigned int) = CRIT level
- 0x30 (unsigned int) = ERR level
- 0x40 (unsigned int) = Warning level
- 0x50 (unsigned int) = NOTICE level
- 0x60 (unsigned int) = INFO level
- 0x70 (unsigned int) = DEBUG level

The above definition of log level follows the definition of log level in Linux/Syslog.

```
Const: unid_err_t NodeX_SUCCESS // 0 (unsigned int)
```

The NodeX_SUCCESS constant indicates that the internal processing of the function in NodeX EDGE SDK is successful.

```
Const: unid_err_t NodeX_FAILURE // 1 (unsigned int)
```

The NodeX_FAILURE constant indicates that the internal processing of the function in NodeX EDGE SDK has failed.

```
Const: unid_log_level_t NodeX_LOG_EMERG // 0x00 (unsigned int)
```

The NodeX_LOG_EMERG constant indicates that the log level is EMERG.

The definition of log level is based on the definition of log level in Linux/Syslog, so please refer to the definition of Linux/Syslog for the usage of each log level defined by constants starting with NodeX_LOG_prefix including this log level.

```
Const: unid_log_level_t NodeX_LOG_ALERT // 0x10 (unsigned int)
```

The NodeX_LOG_ALERT constant indicates that the log level is ALERT.

```
Const: unid_log_level_t NodeX_LOG_CRIT // 0x20 (unsigned int)
```

NodeX_LOG_CRIT constant indicates that the log level is CRIT.

```
Const: unid_log_level_t NodeX_LOG_ERR // 0x30 (unsigned int)
```

The NodeX_LOG_ERR constant indicates that the log level is ERR.

```
Const: unid_log_level_t NodeX_LOG_WARNING // 0x40 (unsigned int)
```

The NodeX_LOG_WARNING constant indicates that the log level is WARNING.

```
Const: unid_log_level_t NodeX_LOG_NOTICE // 0x50 (unsigned int)
```

The NodeX_LOG_NOTICE constant indicates that the log level is NOTICE.

```
Const: unid_log_level_t NodeX_LOG_INFO // 0x60 (unsigned int)
```

The NodeX_LOG_INFO constant indicates that the log level is INFO.

```
Const: unid_log_level_t NodeX_LOG_DEBUG // 0x70 (unsigned int)
```

The NodeX_LOG_DEBUG constant indicates that the log level is DEBUG.

```
Method: unid_err_t unid_init(char* client_id, char* client_secret)
```

In order to use NodeX EDGE SDK, Client ID and Client Secret that can be generated on UNID Studio must be set in advance at the implementation stage (common to all devices). Client ID and Client Secret settings will allow NodeX Studio to recognize the device.

Table 1. Define the arguments (unid_init)  

| No. | Argument name | Type | Description |
| --- | --- | --- | --- |
| 1 | client_id | char* | Published on NodeX Studio. 256-bit, hexadecimal representation. |
| 2 | client_secret | char* | Published on NodeX Studio. 256-bit, hexadecimal representation. |

```
Method: unid_err_t unid_regist_device()
```

The unid_regist_device() method generates DIDs (Decentralized Identifiers) based on the random numbers obtained from the chip's internal True Random Number Generator (hereinafter referred to as "TRNG"), and registers the device with the generated DIDs and device information in NodeX Studio. NodeX EDGE SDK will generate 256bit random data as a secret key to generate DID by using the R_SCE_RandomNumberGenerate() function which is a chip specific security function.

Table 2. Define the arguments (unid_regist_device)
| No. | Argument name | Type | Description |
| --- | --- | --- | --- |
| None |

```
Method: unid_err_t unid_regist_handler_on_memory_alloc(void* handler)
```

Inject RTOS-specific memory allocation (allocator) functions into NodeX EDGE SDK.

Table 3. Define the arguments (unid_regist_handler_on_memory_alloc)
| No. | Argument name | Type | Description |
| --- | --- | --- | --- |
| 1 | handler | void* | Takes a function pointer as an argument. |

The signatures of the injectable functions are defined below:\

```{admonition} void* handler (unsigned int size)
Return values:
- void*: Returns the first address of the allocated memory.
Arguments:
- unsigned int size: Specifies the size of memory to be requested for allocation.
```

```
Method: unid_err_t unid_regist_handler_on_memory_dealloc(void* handler)
```

Inject RTOS-specific memory release functions into NodeX EDGE SDK.

Table 4. Define the arguments (unid_regist_handler_on_memory_dealloc)
| No. | Argument name | Type | Description |
| --- | --- | --- | --- |
| 1 | handler | void* | Takes a function pointer as an argument. |

The signatures of the injectable functions are defined below:
```{admonition} void handler (void* ptr)
Return values:
- void: No return value
Arguments:
- void* ptr: The first address of the memory to be opened is specified.
```

```
Method: unid_err_t unid_regist_handler_on_debug_message(void* handler)
```

Inject functions for print debugging specific to the development and execution environment into NodeX EDGE SDK.

Table 5. Define the arguments (unid_regist_handler_on_debug_message)
| No. | Argument name | Type | Description |
| --- | --- | --- | --- |
| 1 | handler | void* | Takes a function pointer as an argument. |


The signatures of the injectable functions are defined below:
```{admonition} void handler (unsigned int level, char* message)
Return values:
- void: No return value
Arguments:
- unsigned int level: The level of the message (DEBUG, WARN, INFO, etc.) is specified numerically.
- char* message: The debug message is specified.
```
