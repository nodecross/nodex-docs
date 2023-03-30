# Installation

This page describes how to install NodeX. As we have explained, NodeX consists of NodeX HUB/STUDIO, a service for administrators, and NodeX AGENT, which is installed on edge devices. No special procedures are required to start using NodeX HUB/STUDIO, and a single email address is all you need to start your trial right away. NodeX AGENT, on the other hand, must be embedded in an edge device and is now available in executable binaries for the i686 and x86_64 architectures of the Linux OS. NodeX AGENT consists of a single binary with no dependencies and can be easily installed.

```{note}
You can register to NodeX HUB/STUDIO at [https://studio.nodecross.io](https://studio.nodecross.io) (under development).
```

The following pre-built binaries are currently available:

- Linux OS (i686)
- Linux OS (x86_64)

Future release plans include pre-built binaries for WindowsOS and macOS. In addition, we plan to provide C/C++/Rust SDK for LinuxOS/WindowsOS/macOS and C/C++ SDK for RTOS (FreeRTOS, AzureRTOS).

## Install on Linux (i686)

NodeX officially provides pre-built binaries for the i686 architecture Linux.

```bash
% curl https://github.com/nodecross/nodex/tags/v1.0.0/assets/nodex.i686.zip
% unzip nodex.i686.zip
% install nodex.i686/nodex
```

## Install on Linux (x86_64)

NodeX officially provides pre-built binaries for the x86_64 architecture Linux.

```bash
% curl https://github.com/nodecross/nodex/tags/v1.0.0/assets/nodex.x86_64.zip
% unzip nodex.x86_64.zip
% install nodex.x86_64/nodex
```

## Next Step

After installing the pre-built binary, you can follow [Configuration](../configuration/index.md) to set up NodeX AGENT and refer to [Usage](../usage/index.md) to learn the basic usage of NodeX AGENT.