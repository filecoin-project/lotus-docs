import d0 from '~/.pre-processing/en/hardware.md';
import d0_1 from '~/.pre-processing/en/hardware-mining.md';

import d1 from '~/.pre-processing/en/getting-started.md';
import d1_1 from '~/.pre-processing/en/install-lotus-arch.md';
import d1_2 from '~/.pre-processing/en/install-lotus-ubuntu.md';
import d1_3 from '~/.pre-processing/en/install-lotus-macos.md';
import d1_4 from '~/.pre-processing/en/updating-lotus.md';
import d1_5 from '~/.pre-processing/en/join-testnet.md';
import d1_t from '~/.pre-processing/en/setup-troubleshooting.md';

import d2 from '~/.pre-processing/en/storing-data.md';
import d2_t from '~/.pre-processing/en/storing-data-troubleshooting.md';

import d3 from '~/.pre-processing/en/retrieving-data.md';

import d4 from '~/.pre-processing/en/mining.md';
import d4_1 from '~/.pre-processing/en/setting-a-static-port.md';
import d4_2 from '~/.pre-processing/en/mining-lotus-seal-worker.md';
import d4_t from '~/.pre-processing/en/mining-troubleshooting.md';

import d5 from '~/.pre-processing/en/api.md';
import d5_1 from '~/.pre-processing/en/api-scripting-support.md';
import d5_t from '~/.pre-processing/en/api-troubleshooting.md';

import d6 from '~/.pre-processing/en/dev-tools.md';
import d6_1 from '~/.pre-processing/en/dev-tools-jaeger-tracing.md';
import d6_2 from '~/.pre-processing/en/dev-tools-pond-ui.md';
import d6_3 from '~/.pre-processing/en/local-dev-net.md';

export default {
  posts: [
    {
      title: 'Hardware Requirements',
      slug: 'en+hardware',
      github: 'en/hardware.md',
      value: d0,
      posts: [
        {
          title: 'Testing Configuration',
          slug: 'en+hardware-mining',
          github: 'en/hardware-mining.md',
          value: d0_1,
        },
      ],
    },
    {
      title: 'Setup',
      slug: 'en+getting-started',
      github: 'en/getting-started.md',
      value: d1,
      posts: [
        {
          title: 'Arch Linux Installation',
          slug: 'en+install-lotus-arch',
          github: 'en/install-lotus-arch.md',
          value: d1_1,
        },
        {
          title: 'Ubuntu Installation',
          slug: 'en+install-lotus-ubuntu',
          github: 'en/install-lotus-ubuntu.md',
          value: d1_2,
        },
        {
          title: 'MacOS Installation',
          slug: 'en+install-lotus-macos',
          github: 'en/install-lotus-macos.md',
          value: d1_3,
        },
        {
          title: 'Updating Lotus',
          slug: 'en+updating-lotus',
          github: 'en/updating-lotus.md',
          value: d1_4,
        },
        {
          id: `1-5`,
          title: 'Join Testnet',
          slug: 'en+join-testnet',
          github: 'en/join-testnet.md',
          value: d1_5,
        },
        {
          title: 'Setup Troubleshooting',
          slug: 'en+setup-troubleshooting',
          github: 'en/setup-troubleshooting.md',
          value: d1_t,
        },
      ],
    },
    {
      title: 'Storage Mining',
      slug: 'en+mining',
      github: 'en/mining.md',
      value: d4,
      posts: [
        {
          title: 'Lotus Seal Worker',
          slug: 'en+lotus-seal-worker',
          github: 'en/mining-lotus-seal-worker.md',
          value: d4_2,
        },
        {
          title: 'Static Ports',
          slug: 'en+setting-a-static-port',
          github: 'en/setting-a-static-port.md',
          value: d4_1,
        },
        {
          title: 'Mining Troubleshooting',
          slug: 'en+mining-troubleshooting',
          github: 'en/mining-troubleshooting.md',
          value: d4_t,
        },
      ],
    },
    {
      title: 'Storing Data',
      slug: 'en+storing-data',
      github: 'en/storing-data.md',
      value: d2,
      posts: [
        {
          title: 'Storage Troubleshooting',
          slug: 'en+storing-data-troubleshooting',
          github: 'en/storing-data-troubleshooting.md',
          value: d2_t,
        },
      ],
    },
    {
      title: 'Retrieving Data',
      slug: 'en+retrieving-data',
      github: 'en/retrieving-data.md',
      value: d3,
      posts: [],
    },
    {
      title: 'API',
      slug: 'en+api',
      github: 'en/api.md',
      value: d5,
      posts: [
        {
          title: 'API Scripting Support',
          slug: 'en+api-scripting-support',
          github: 'en/api-scripting-support.md',
          value: d5_1,
        },
        {
          title: 'API Troubleshooting',
          slug: 'en+api-troubleshooting',
          github: 'en/api-troubleshooting.md',
          value: d5_t,
        },
      ],
    },
    {
      title: 'Developer Tools',
      slug: 'en+dev-tools',
      github: 'en/dev-tools.md',
      value: d6,
      posts: [
        {
          title: 'Setup Local Devnet',
          slug: 'en+setup-local-dev-net',
          github: 'en/local-dev-net.md',
          value: d6_3,
          posts: [],
        },
        {
          title: 'Pond UI',
          slug: 'en+dev-tools-pond-ui',
          github: 'en/dev-tools-pond-ui.md',
          value: d6_2,
          posts: [],
        },
        {
          title: 'Jaeger Tracing',
          slug: 'en+dev-tools-jaeger-tracing',
          github: 'en/dev-tools-jaeger-tracing.md',
          value: d6_1,
          posts: [],
        },
      ],
    },
    {
      title: 'Glossary',
      slug: 'en+glossary',
      github: 'en/glossary-english.json',
      value: null,
      custom: {
        glossary: true,
      },
      posts: [],
    },
  ],
};
