import FS from 'fs-extra';

const PROCESSING_PATH = '.pre-processing';

const run = async () => {
  await FS.remove('.data.json');
  console.log('REMOVE OLD DATA');

  const library = require(`../${PROCESSING_PATH}/en/.library.json`);

  for (let i = 0; i < library.posts.length; i++) {
    const iPath = `${PROCESSING_PATH}/${library.posts[i].github}`;
    if (iPath.endsWith('.md')) {
      console.log(`SERIALIZING MARKDOWN ${iPath}`);
      library.posts[i].value = await FS.readFile(iPath, 'utf8');
    }

    for (let j = 0; j < library.posts[i].posts.length; j++) {
      const jPath = `${PROCESSING_PATH}/${library.posts[i].posts[j].github}`;

      if (jPath.endsWith('.md')) {
        console.log(`SERIALIZING MARKDOWN ${jPath}`);
        library.posts[i].posts[j].value = await FS.readFile(
          `${PROCESSING_PATH}/${library.posts[i].posts[j].github}`,
          'utf8'
        );
      }
    }
  }

  library.glossary = require(`../${PROCESSING_PATH}/en/.glossary.json`);

  FS.writeFile('.data.json', JSON.stringify(library), function(err) {
    if (err) throw err;
    console.log('ADDING .data.json');
  });
};

run();
