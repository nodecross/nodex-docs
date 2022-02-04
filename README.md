# UNiD Official Documentation

The UNiD Official Documentation is designed to organize and disseminate all publicly available information that makes up the UNiD platform. The documentation will be updated as needed, but if you find a bug in the documentation, please follow the contributor guide below to submit a pull request.

## Environment setting

This document follows the Sphinx documentation framework. This document follows the Sphinx documentation framework, so you can easily build the documentation in your own environment. Note that you need to have Python 3.x version installed to build the documentation.

**Clone the repository**
```bash
git clone https://github.com/getunid/unid-docs.git
cd unid-docs
git switch -c sphinx origin/sphinx
```

**Install dependencies**
```bash
make install
```

**Build document (auto-reload)**
```bash
make watch
```
