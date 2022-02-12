# UNiD Official Documentation

The UNiD Official Documentation is designed to organize and disseminate all publicly available information that makes up the UNiD platform. The documentation will be updated as needed, but if you find a bug in the documentation, please follow the contributor guide below to submit a pull request.

## Getting started

This document follows the [Sphinx](https://www.sphinx-doc.org) documentation framework. This document follows the Sphinx documentation framework, so you can easily build the documentation in your own environment. Note that you need to have Python 3.x version installed to build the documentation.

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

## Contributing

[Click here](https://github.com/getunid/unid-docs/issues/new/choose) for `bug report` and `feature request` regarding the contents of this document. Thanks for your feedback to help us to improve.

## License

[Apache License 2.0](LICENSE)
