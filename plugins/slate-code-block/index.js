import { onKeyDown, onPaste } from './handlers';

import Options from './options';
import core from './core';

/**
 * A Slate plugin to handle keyboard events in code blocks.
 */

function PluginCodeBlock(optsParam = {}) {
  const opts = new Options(optsParam);

  const corePlugin = core(opts);
  return {
    ...corePlugin,

    onKeyDown: onKeyDown.bind(null, opts),
    onPaste: onPaste.bind(null, opts),
  };
}

export default PluginCodeBlock;
