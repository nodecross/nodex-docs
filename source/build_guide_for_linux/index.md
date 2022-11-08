# Build Guide for Linux OS

This section describes how to build UNiD EDGE which is implemented in Rust language (hereinafter referred to as "Rust").  By following the steps in this section, you can build a UNiD EDGE that can run on top of any popular Linux OS.

## Prerequisites

Build environment and other prerequisites for building UNiD EDGE are defined below.

- Operating System
  - Linux OS (Ubuntu 20.04 or higher)
- Rust build environment
  - Rust 1.59.0

The procedures described in this section are based on the assumption that you are operating on Linux OS (Ubuntu 20.04.2 LTS).

## How to build environment (Rust)

- **Installing the Rust compiler**

```
[user@linux]$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

The above is the script to install Rust distributed by Rust officials. If you install using the above script, the Rust compiler set will be installed in the ${HOME}/.cargo directory (if it does not exist at the time of script execution, it will be created automatically).

- **Setting up the Rust compiler (reading environment variables, etc.)**

```
[user@linux]$ source $HOME/.cargo/env
```

By issuing the above command, you will be able to use tools such as rustc (Rust compiler command). Note that this command only needs to be executed once, not the second and subsequent times.

- **Installing the Rust Nightly**

```
[user@linux]$ rustup toolchain install nightly
```

When building applications, libraries, etc. for bare metal environments, such as the current main target device, RA6M5, the Nightly version must be used.

- **Set the Nightly version as default use**

```
[user@linux]$ rustup override set nightly
```

Since we will be using the Nightly version of Rust as standard in this procedure, we will configure the default Rust toolchain as the Nightly version.

- **Add build target**

```
[user@linux]$ rustup target add x86_64-unknown-linux-musl
```

- **Checking the Rust version**

```
[user@linux]$ rustc --versionrustc 1.65.0 (897e37553 2022-11-02)
```

Execute the above command and make sure that the version of Rust is 1.65.0 or later, which is listed as a prerequisite.

## How to build environment (build-related tools)

- **Update OS package information**

```
[user@linux]$ sudo apt update
```

- **Install git command**

```
[user@linux]$ sudo apt install -y git
```

- **Install make command**

```
[user@linux]$ sudo apt install -y make
```

- **Install build tools (GCC, etc.)**

```
[user@linux]$ sudo apt install -y build-essential
```

- **Install musl-tools**

```
[user@linux]$ sudo apt-get install musl-tools
```

## Building UNiD EDGE

- **UNiD EDGE: Getting the GitHub repository (clone)**

```
[user@linux]$ git clone https://github.com/getunid/unid.git
```

- **Go to UNiD EDGE directory**

```
[user@linux]$ cd unid/
```

- **Commit head start (checkout)**

```
[user@linux]$ git checkout -b build origin/main
```

- **Build**

```
[user@linux]$ cargo build --release --target x86_64-unknown-linux-musl
```

The build process will automatically proceed according to the predefined build procedure in the Makefile. If there are no errors and the output is as follows (Finished release [optimized] target(s)), the build process is successful.

```
cargo build --release -Zbuild-std --verbose --target x86_64-unknown-linux-musl
warning: `panic` setting is ignored for `test` profile
  Fresh core v0.0.0
  Fresh cc v1.0.69
  Compiling version_check v0.9.4
  Compiling proc-macro2 v1.0.36
    Running `rustc --crate-name version_check ...
  Compiling serde_derive v1.0.132
  Compiling serde v1.0.132

(SNIP)

warning: `unid` (bin "unid-agent") generated 78 warnings
    Finished release [optimized] target(s) in 4m 31s
```

## Checking the build artifacts

- **Browse build artifacts**

```
[user@linux]$ ls -l target/x86_64-unknown-linux-musl/release/
total 12360
drwxrwxr-x 134 parallels parallels    12288 Nov  4 16:25 build/
drwxrwxr-x   2 parallels parallels   126976 Nov  4 16:33 deps/
drwxrwxr-x   2 parallels parallels     4096 Nov  4 15:57 examples/
drwxrwxr-x   2 parallels parallels     4096 Nov  4 15:57 incremental/
-rwxrwxr-x   2 parallels parallels 12499616 Nov  4 16:33 unid-agent*
-rw-rw-r--   1 parallels parallels     2688 Nov  4 16:33 unid-agent.d
```

These steps will complete the build of UNiD EDGE. Verify that the build artifacts exist in the following path

- **target/x86_64-unknown-linux-musl/release/unid-agent**

The build artifact (unid-agent) can be executed by properly deploying it on the execution environment specified at build time; the API reference provided by UNiD EDGE is described in subsequent chapters.

## First time starting up

The UNiD EDGE built in the previous steps should be moved to any directory on the LinuxOS (generally /usr/local/bin is a good place to put it).

```
[user@linux]$ sudo mv target/x86_64-unknown-linux-musl/release/unid-agent /usr/local/bin
```

UNiD EDGE has a daemon startup function in the binary itself and can be started in a daemon state by specifying options. The following snippet shows how to start UNiD EDGE in a non-daemon state.

```
[user@linux]$ unid-agent
```

The following snippet shows how to start UNiD EDGE in daemon state.

```
[user@linux]$ unid-agent --daemonize
```

There is no difference in the functionality provided by UNiD EDGE in either method, and other applications capable of IPC (Unix Domain Socket) communication can still make requests to the UNiD EDGE Agent.

## Hello, UNiD EDGE!

To verify that it was installed correctly, run the following snippet. If the resulting DID document appears, the UNiD EDGE installation is complete.

```
curl -X GET H 'content-type: application/json' \
    --unix-socket /usr/local/bin/unid-agent.sock \
    'http:/local/identifiers/did:unid:test:ey………'
```

Please refer to the API Reference page for more information on how to use UNiD EDGE.