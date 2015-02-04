'use strict';

// Remove 300ms tap delay on mobile devices
import attachFastClick from 'fastclick';
attachFastClick(document.body);

// Expose globally
import React from 'react';
window.React = React;
