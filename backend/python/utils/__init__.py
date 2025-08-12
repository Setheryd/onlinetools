"""
Utilities Module

This module contains shared utilities and helper functions used across
the backend, including logging, database operations, and common utilities.
"""

from .logger import get_logger, setup_logger

__all__ = ['get_logger', 'setup_logger']
