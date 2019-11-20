export const addTooltip = detail => {
  const event = new CustomEvent('add-tooltip', {
    detail,
  });

  window.dispatchEvent(event);
};

export default {
  ['工作正在进行中']: {
    title: '工作正在进行中',
    value: '工作正在进行中',
  },
};
