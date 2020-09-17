module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  async redirects() {
    return [
      {
	source: '/hardware',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/#minimal-requirements'
	permanent: true
      },
      {
	source: '/hardware-mining',
	destination: 'https://docs.filecoin.io/mine/hardware-requirements/',
	permanent: true
      },
      {
	source: '/getting-started',
	destination: 'https://docs.filecoin.io/get-started/',
	permanent: true
      },
      {
	source: '/install-lotus-arch',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/',
	permanent: true
      },
      {
	source: '/install-lotus-ubuntu',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/',
	permanent: true
      },
      {
	source: '/install-lotus-fedora',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/',
	permanent: true
      },
      {
	source: '/install-lotus-macos',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/',
	permanent: true
      },
      {
	source: '/updating-lotus',
	destination: 'https://docs.filecoin.io/get-started/lotus/upgrades/#installing-an-update',
	permanent: true
      },
      {
	source: '/join-testnet',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/',
	permanent: true
      },
      {
	source: '/install-systemd-services',
	destination: 'https://docs.filecoin.io/get-started/lotus/installation/#systemd-service-files',
	permanent: true
      },
      {
	source: '/setup-troubleshooting',
	destination: 'https://docs.filecoin.io/get-started/lotus/troubleshooting/#build-errors',
	permanent: true
      },
      {
	source: '/env-vars',
	destination: 'https://docs.filecoin.io/get-started/lotus/configuration-and-advanced-usage/',
	permanent: true
      },
      {
	source: '/mining',
	destination: 'https://docs.filecoin.io/mine/lotus/',
	permanent: true
      },
      {
	source: '/lotus-worker',
	destination: 'https://docs.filecoin.io/mine/lotus/seal-workers/',
	permanent: true
      },
      {
	source: '/setting-a-static-port',
	destination: 'https://docs.filecoin.io/mine/lotus/miner-setup/#connectivity-to-the-miner',
	permanent: true
      },
      {
	source: '/mining-troubleshooting',
	destination: 'https://docs.filecoin.io/mine/lotus/miner-troubleshooting/#error-can-t-acquire-bellman-lock',
	permanent: true
      },
      {
	source: '/storing-data',
	destination: 'https://docs.filecoin.io/store/lotus/store-data/',
	permanent: true
      },
      {
	source: '/storing-data-troubleshooting',
	destination: 'https://docs.filecoin.io/store/lotus/store-troubleshooting/',
	permanent: true
      },
      {
	source: '/info-for-miners',
	destination: 'https://docs.filecoin.io/mine/lotus/',
	permanent: true
      },
      {
	source: '/ipfs-client-integration',
	destination: 'https://docs.filecoin.io/store/lotus/import-data-from-ipfs/',
	permanent: true
      },
      {
	source: '/retrieving-data',
	destination: 'https://docs.filecoin.io/store/lotus/retrieve-data/',
	permanent: true
      },
      {
	source: '/payment-channels',
	destination: 'https://docs.filecoin.io/build/lotus/payment-channels/',
	permanent: true
      },
      {
	source: '/cli',
	destination: 'https://docs.filecoin.io/get-started/lotus/',
	permanent: true
      },
      {
	source: '/api',
	destination: 'https://docs.filecoin.io/build/lotus/',
	permanent: true
      },
      {
	source: '/api-scripting-support',
	destination: 'https://docs.filecoin.io/build/lotus/',
	permanent: true
      },
      {
	source: '/api-methods',
	destination: 'https://docs.filecoin.io/reference/lotus-api/',
	permanent: true
      },
      {
	source: '/api-troubleshooting',
	destination: 'https://docs.filecoin.io/build/lotus/troubleshooting/',
	permanent: true
      },
      {
	source: '/dev-tools',
	destination: 'https://docs.filecoin.io/build/local-devnet/',
	permanent: true
      },
      {
	source: '/setup-local-dev-net',
	destination: 'https://docs.filecoin.io/build/local-devnet/',
	permanent: true
      },
      {
	source: '/faqs',
	destination: 'https://docs.filecoin.io/about-filecoin/faq/',
	permanent: true
      },
    ]
  }
};
