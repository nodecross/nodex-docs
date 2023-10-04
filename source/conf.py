# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html


# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project   = 'NodeX'
copyright = '2022 -, NodeX Project'
author    = 'NodeX Project'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
  'sphinx_rtd_theme',
  'myst_parser',
  'sphinx_copybutton',
  'sphinxemoji.sphinxemoji',
  'sphinxcontrib.httpdomain',
  'sphinxcontrib.mermaid',
  'sphinx_favicon'
]

myst_heading_anchors   = 1
myst_enable_extensions = [
  'deflist',
  'html_image',
  'colon_fence',
]

sphinxemoji_style = 'twemoji'

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_rtd_theme'

# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

favicons = [{
    'rel': 'icon',
    'static-file': 'favicon.svg',
    'type': 'image/svg+xml',
}]

html_css_files = [
    'css/style.css',
]

from docutils.parsers.rst.roles import code_role

def code(role, rawtext, text, lineno, inliner, options={}, content=[]):
    # options['class'] = ['highlight']
    options['classes'] = ['highlight']
    return code_role(role, rawtext, text, lineno, inliner, options=options, content=content)

def setup(app):
    app.add_role('code', code)