const changeListeners = {};

const InAppNotificationService = {
  set: async data => {
    Object.keys(changeListeners).forEach(k =>
      changeListeners[k]({
        appIconSource: require('../../images/caron_placeholder.jpeg'),
        slideOutTime: 6000,
        ...data,
      }),
    );
  },
  onChange: ({key}, cb) => {
    changeListeners[key] = data => cb(data);
  },
  removeChange: key => {
    if (changeListeners[key]) {
      delete changeListeners[key];
    }
  },
};

export {InAppNotificationService};
