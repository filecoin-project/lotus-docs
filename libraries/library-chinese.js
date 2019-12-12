import d0 from '~/.lotus-docs-pre-processing/cn/hardware.md';
import d0_1 from '~/.lotus-docs-pre-processing/cn/hardware-mining.md';

import d1 from '~/.lotus-docs-pre-processing/cn/getting-started.md';
import d1_1 from '~/.lotus-docs-pre-processing/cn/install-lotus-arch.md';
import d1_2 from '~/.lotus-docs-pre-processing/cn/install-lotus-ubuntu.md';
import d1_3 from '~/.lotus-docs-pre-processing/cn/install-lotus-macos.md';
import d1_5 from '~/.lotus-docs-pre-processing/cn/join-testnet.md';

import d2 from '~/.lotus-docs-pre-processing/cn/storing-data.md';

import d3 from '~/.lotus-docs-pre-processing/cn/retrieving-data.md';

import d4 from '~/.lotus-docs-pre-processing/cn/mining.md';
import d4_1 from '~/.lotus-docs-pre-processing/cn/setting-a-static-port.md';

import d5 from '~/.lotus-docs-pre-processing/cn/api.md';
import d5_1 from '~/.lotus-docs-pre-processing/cn/api-scripting-support.md';

import d6 from '~/.lotus-docs-pre-processing/cn/dev-tools.md';
import d6_1 from '~/.lotus-docs-pre-processing/cn/dev-tools-jaegar-tracing.md';
import d6_2 from '~/.lotus-docs-pre-processing/cn/dev-tools-pond-ui.md';

export default {
  posts: [
    {
      id: 0,
      title: 'Hardware Requirements',
      slug: 'cn+hardware',
      github: 'cn/hardware.md',
      value: d0,
      posts: [
        {
          id: `0-1`,
          title: 'Mining Hardware',
          slug: 'cn+chardware-mining',
          github: 'cn/hardware-mining.md',
          value: d0_1,
        },
      ],
    },
    {
      id: 1,
      title: 'Setup',
      slug: 'cn+getting-started',
      github: 'cn/getting-started.md',
      value: d1,
      posts: [
        {
          id: `1-1`,
          title: 'Install Lotus on Arch Linux',
          slug: 'cn+install-lotus-arch',
          github: 'cn/install-lotus-arch.md',
          value: d1_1,
        },
        {
          id: `1-2`,
          title: 'Install Lotus on Ubuntu',
          slug: 'cn+install-lotus-ubuntu',
          github: 'cn/install-lotus-ubuntu.md',
          value: d1_2,
        },
        {
          id: `1-3`,
          title: 'Install Lotus on MacOS',
          slug: 'cn+install-lotus-macos',
          github: 'cn/install-lotus-macos.md',
          value: d1_3,
        },
        {
          id: `1-4`,
          title: 'Updating Lotus',
          slug: 'cn+updating-lotus',
          github: 'cn/updating-lotus.md',
          value: '',
        },
        {
          id: `1-5`,
          title: 'Join Testnet',
          slug: 'cn+join-testnet',
          github: 'cn/join-testnet.md',
          value: d1_5,
        },
      ],
    },
    {
      id: 5,
      title: 'Storage Mining',
      slug: 'cn+mining',
      github: 'cn/mining.md',
      value: d4,
      posts: [
        {
          id: `5-1`,
          title: 'Static Ports',
          slug: 'cn+setting-a-static-port',
          github: 'cn/setting-a-static-port.md',
          value: d4_1,
        },
      ],
    },
    {
      id: 3,
      title: 'Storing Data',
      slug: 'cn+storing-data',
      github: 'cn/storing-data.md',
      value: d2,
      posts: [],
    },
    {
      id: 4,
      title: 'Retrieving Data',
      slug: 'cn+retrieving-data',
      github: 'cn/retrieving-data.md',
      value: d3,
      posts: [],
    },
    {
      id: 6,
      title: 'API',
      slug: 'cn+api',
      github: 'cn/api.md',
      value: d5,
      posts: [
        {
          id: `6-1`,
          title: 'API Scripting Support',
          slug: 'cn+api-scripting-support',
          github: 'cn/api-scripting-support.md',
          value: d5_1,
        },
      ],
    },
    {
      id: 2,
      title: 'Developer Tools',
      slug: 'cn+dev-tools',
      github: 'cn/dev-tools.md',
      value: d6,
      posts: [
        {
          id: `2_1`,
          title: 'Pond UI',
          slug: 'cn+dev-tools-pond-ui',
          github: 'cn/dev-tools-pond-ui.md',
          value: d6_2,
          posts: [],
        },
        {
          id: `2_2`,
          title: 'Jaegar Tracing',
          slug: 'cn+dev-tools-jaegar-tracing',
          github: 'cn/dev-tools-jaegar-tracing.md',
          value: d6_1,
          posts: [],
        },
      ],
    },
    {
      id: 9,
      title: 'Glossary',
      slug: 'cn+glossary',
      github: null,
      value: null,
      custom: {
        glossary: true,
      },
      posts: [],
    },
  ],
};
