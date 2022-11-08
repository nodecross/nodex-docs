# Minimal makefile for Sphinx documentation
#

SHELL=/bin/bash

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS       ?=

_SPHINXBUILD     ?= sphinx-build
_SPHINXAUTOBUILD ?= sphinx-autobuild
_PYTHON          ?= python3
_SOURCE          ?= source

VENVDIR           = .venv
SOURCEDIR         = source
BUILDDIR          = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(_SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

venv:
	@$(_PYTHON) -m venv "$(VENVDIR)"
	@$(_SOURCE) "$(VENVDIR)/bin/activate"

install: venv
	@$(_PYTHON) -m pip install -r "requirements.txt"

build: venv
	@$(_SPHINXBUILD) -W --keep-going -v -a "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O)

watch: venv
	@$(_SPHINXAUTOBUILD) "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(_SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
