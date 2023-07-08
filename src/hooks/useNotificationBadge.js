import {useEffect, useState} from 'react';

let listeners = [];
let badgeLocal = {all: 0, baoduong: 0, baohiem: 0};

const getBadgeLocal = () => badgeLocal;
const setBadgeLocal = e => {
  listeners.forEach(listener => listener(e));
  badgeLocal = e;
};

function useNotificationBadge() {
  const [badge, setBadge] = useState(badgeLocal);

  useEffect(() => {
    badgeLocal = badge;
    listeners.forEach(listener => listener(badge));
  }, [badge]);

  useEffect(() => {
    listeners.push(setBadge);
    return () => {
      const newListeners = listeners.filter(listener => {
        return listener !== setBadge;
      });
      listeners = newListeners;
    };
  }, []);

  return {badge, setBadge};
}

export {useNotificationBadge, getBadgeLocal, setBadgeLocal};
