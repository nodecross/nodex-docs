# Build Guide for FreeRTOS

This section describes how to build UNiD EDGE SDK which is implemented in Rust language (hereinafter referred to as "Rust"). By following the steps in this section, you will be able to generate a static library that can be referenced from C language.

## Prerequisites

Build environment and other prerequisites for building UNiD EDGE SDK are defined below.

- Operating System
    - An environment that can run the Rust compiler (macOS, Linux, Windows (WSL2), etc.)
- Rust build environment
    - Rust 1.59.0

The procedures described in this section are based on the assumption that you are operating on Windows (WSL2 (Ubuntu 20.04.3 LTS)).

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

- **Set the Nightly version as default use.**
```
[user@linux]$ rustup override set nightly
```

Since we will be using the Nightly version of Rust as standard in this procedure, we will configure the default Rust toolchain as the Nightly version.

- **Checking the Rust version**
```
[user@linux]$ rustc --version
rustc 1.59.0-nightly (c5ecc1570 2021-12-15)
```

Execute the above command and make sure that the version of Rust is 1.59.0 or later, which is listed as a prerequisite.

- **Get the source code of the Nightly version.**
```
[user@linux]$ rustup component add rust-src --toolchain \
              nightly-x86_64-unknown-linux-gnu
```

Install the dependencies (Rust Nightly version source code) that will be required during the build process of UNiD EDGE SDK.

## How to build environment (build-related tools)

- **Update OS package information**
```
[user@linux]$ apt update
```

- **Installing the `git` command**
```
[user@linux]$ apt install -y git
```

- **Installing the `make` command**
```
[user@linux]$ apt install -y make
```

- **Install a set of build tools (GCC, etc.)**
```
[user@linux]$ apt install -y build-essential
```

## Building UNiD EDGE SDK

- **UNiD EDGE SDK: Getting the GitHub repository (clone)**
```
[user@linux]$ git clone https://github.com/getunid/unid.git
```

- **Go to UNiD EDGE SDK directory**
```
[user@linux]$ cd unid/
```

- **Commit head start (checkout)**
```
[user@linux]$ git checkout -b build origin/main
```

- **Build**
```
[user@linux]$ make
```

The build process will automatically proceed according to the predefined build procedure in the Makefile. If there are no errors and the output is as follows (Finished release [optimized] target(s)), the build process is successful.

```
cargo build --release -Zbuild-std --verbose --target thumbv8m.main-none-eabihf
warning: `panic` setting is ignored for `test` profile
  Fresh core v0.0.0
  Fresh cc v1.0.69
  Compiling version_check v0.9.4
  Compiling proc-macro2 v1.0.36
    Running `rustc --crate-name version_check ...
  Compiling serde_derive v1.0.132
  Compiling serde v1.0.132

(SNIP)

  Compiling k256 v0.10.0
    Running `rustc --crate-name k256 ...
  Compiling unid v0.1.6
    Running `rustc --crate-name unid ...

  Finished release [optimized] target(s) in 26.54s
```

## Checking the build artifacts

- **Browse build artifacts**
```
[user@linux]$ ls -l target/thumbv8m.main-none-eabihf/release
total 2292
drwxr-xr-x 14 root root     4096 Dec 16 05:16 build
drwxr-xr-x  2 root root    16384 Dec 16 05:21 deps
drwxr-xr-x  2 root root     4096 Dec 16 05:16 examples
drwxr-xr-x  2 root root     4096 Dec 16 05:16 incremental
-rw-r--r--  2 root root  2013722 Dec 16 05:21 libunid.a
-rw-r--r--  1 root root      729 Dec 16 05:21 libunid.d
```

These steps will complete the build of UNiD EDGE SDK. Verify that the build artifacts exist in the following path

- **target/thumbv8m.main-none-eabihf/release/libunid.a**

The build artifact (libunid.a, hereafter referred to as "build artifact") behaves as a static library that can be referenced directly from C and C++ languages. This section describes how to use the build artifacts from e2studio.

- The environment where the build deliverables exist is assumed to be Linux OS, and the environment where e2studio is installed is assumed to be Windows OS. Please move the build deliverables to the environment where e2studio is running (Windows OS) beforehand.
- The method of moving build artifacts from Linux OS to Windows OS is out of the scope of this document; if you are using WSL2, you can move them via the mounted volume. If you are not using WSL2 and are using Linux OS directly, you can use SCP or other tools to move the files.

```{toctree}
:hidden:
renesas/index.md
tutorial/index.md
```
