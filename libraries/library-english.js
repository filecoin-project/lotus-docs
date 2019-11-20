import d0 from '~/pre-processing/en/hardware.md';
import d0_1 from '~/pre-processing/en/hardware-mining.md';

import d1 from '~/pre-processing/en/getting-started.md';
import d1_1 from '~/pre-processing/en/install-lotus-arch.md';
import d1_2 from '~/pre-processing/en/install-lotus-ubuntu.md';
import d1_3 from '~/pre-processing/en/install-lotus-macos.md';
import d1_4 from '~/pre-processing/en/updating-lotus.md';
import d1_5 from '~/pre-processing/en/join-devnet.md';
import d1_t from '~/pre-processing/en/setup-troubleshooting.md';

import d2 from '~/pre-processing/en/storing-data.md';
import d2_t from '~/pre-processing/en/storing-data-troubleshooting.md';

import d3 from '~/pre-processing/en/retrieving-data.md';

import d4 from '~/pre-processing/en/mining.md';
import d4_1 from '~/pre-processing/en/setting-a-static-port.md';
import d4_t from '~/pre-processing/en/mining-troubleshooting.md';

import d5 from '~/pre-processing/en/api.md';
import d5_1 from '~/pre-processing/en/api-scripting-support.md';
import d5_t from '~/pre-processing/en/api-troubleshooting.md';

import d6 from '~/pre-processing/en/dev-tools.md';
import d6_1 from '~/pre-processing/en/dev-tools-jaegar-tracing.md';
import d6_2 from '~/pre-processing/en/dev-tools-pond-ui.md';

export default {
  posts: [
    {
      id: 0,
      title: 'Hardware Requirements',
      slug: 'en+hardware',
      github: 'en/hardware.md',
      value: d0,
      posts: [
        {
          id: `0-1`,
          title: 'Mining Hardware',
          slug: 'en+hardware-mining',
          github: 'en/hardware-mining.md',
          value: d0_1,
        },
      ],
    },
    {
      id: 1,
      title: 'Setup',
      slug: 'en+getting-started',
      github: 'en/getting-started.md',
      value: d1,
      posts: [
        {
          id: `1-1`,
          title: 'Arch Linux Installation',
          slug: 'en+install-lotus-arch',
          github: 'en/install-lotus-arch.md',
          value: d1_1,
        },
        {
          id: `1-2`,
          title: 'Ubuntu Installation',
          slug: 'en+install-lotus-ubuntu',
          github: 'en/install-lotus-ubuntu.md',
          value: d1_2,
        },
        {
          id: `1-3`,
          title: 'MacOS Installation',
          slug: 'en+install-lotus-macos',
          github: 'en/install-lotus-macos.md',
          value: d1_3,
        },
        {
          id: `1-4`,
          title: 'Updating Lotus',
          slug: 'en+updating-lotus',
          github: 'en/updating-lotus.md',
          value: d1_4,
        },
        {
          id: `1-5`,
          title: 'Join DevNet',
          slug: 'en+join-devnet',
          github: 'en/join-devnet.md',
          value: d1_5,
        },
        {
          id: `1-t`,
          title: 'Setup Troubleshooting',
          slug: 'en+setup-troubleshooting',
          github: 'en/setup-troubleshooting.md',
          value: d1_t,
        },
      ],
    },
    {
      id: 5,
      title: 'Storage Mining',
      slug: 'en+mining',
      github: 'en/mining.md',
      value: d4,
      posts: [
        {
          id: `5-1`,
          title: 'Static Ports',
          slug: 'en+setting-a-static-port',
          github: 'en/setting-a-static-port.md',
          value: d4_1,
        },
        {
          id: `5-t`,
          title: 'Mining Troubleshooting',
          slug: 'en+mining-troubleshooting',
          github: 'en/mining-troubleshooting.md',
          value: d4_t,
        },
      ],
    },
    {
      id: 3,
      title: 'Storing Data',
      slug: 'en+storing-data',
      github: 'en/storing-data.md',
      value: d2,
      posts: [
        {
          id: `3-t`,
          title: 'Storage Troubleshooting',
          slug: 'en+storing-data-troubleshooting',
          github: 'en/storing-data-troubleshooting.md',
          value: d2_t,
        },
      ],
    },
    {
      id: 4,
      title: 'Retrieving Data',
      slug: 'en+retrieving-data',
      github: 'en/retrieving-data.md',
      value: d3,
      posts: [],
    },
    {
      id: 6,
      title: 'API',
      slug: 'en+api',
      github: 'en/api.md',
      value: d5,
      posts: [
        {
          id: `6-1`,
          title: 'API Scripting Support',
          slug: 'en+api-scripting-support',
          github: 'en/api-scripting-support.md',
          value: d5_1,
        },
        {
          id: `6-t`,
          title: 'API Troubleshooting',
          slug: 'en+api-troubleshooting',
          github: 'en/api-troubleshooting.md',
          value: d5_t,
        },
      ],
    },
    {
      id: 2,
      title: 'Developer Tools',
      slug: 'en+dev-tools',
      github: 'en/dev-tools.md',
      value: d6,
      posts: [
        {
          id: `2_1`,
          title: 'Pond UI',
          slug: 'en+dev-tools-pond-ui',
          github: 'en/dev-tools-pond-ui.md',
          value: d6_2,
          posts: [],
        },
        {
          id: `2_2`,
          title: 'Jaegar Tracing',
          slug: 'en+dev-tools-jaegar-tracing',
          github: 'en/dev-tools-jaegar-tracing.md',
          value: d6_1,
          posts: [],
        },
      ],
    },
    {
      id: 9,
      title: 'Glossary',
      slug: 'en+glossary',
      github: null,
      value: null,
      custom: {
        glossary: true,
      },
      posts: [],
    },
  ],
};
