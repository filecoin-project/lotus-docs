import 'isomorphic-fetch';
import FS from 'fs-extra';

// NOTE(jim): Redundant but handles errors better for file
// download.
import HTTPS from 'https';

const SERVER_PATH = 'https://api.github.com';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const PROCESSING_PATH = '.lotus-docs-pre-processing';

const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getRepositoryContents = async () => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include',
  };

  const response = await fetch(
    `${SERVER_PATH}/repos/filecoin-project/lotus/contents/documentation/en?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    options
  );
  return await response.json();
};

const download = async (url, dest, cb) => {
  const file = FS.createWriteStream(dest);
  const request = HTTPS.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  }).on('error', function(err) {
    FS.unlink(dest);
    if (cb) cb(err.message);
  });
};

const run = async () => {
  console.log('CREATING PATH');
  await FS.remove(PROCESSING_PATH);

  console.log('CREATING DIRECTORY');
  await FS.ensureDir(`${PROCESSING_PATH}/en`);

  const response = await getRepositoryContents();

  response.forEach(async element => {
    const name = `${PROCESSING_PATH}/en/${element.name}`;
    await download(element.download_url, name);
    console.log(`ADDING ${name}`);
  });
};

run();
