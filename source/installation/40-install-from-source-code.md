# Install from Source Code

To install from source code, Rust must be installed.

If Rust is not installed, please refer [here](https://www.rust-lang.org/tools/install) to complete the Rust installation.


```sh
## Clone NodeX Agent
$ git clone git@github.com:nodecross/nodex.git
$ cd nodex/

## Build and Install NodeX Agent
$ cargo build --release
$ sudo mv target/release/nodex-agent /usr/local/bin/
$ sudo chmod +x /usr/local/bin/nodex-agent
% nodex-agent --version
```


