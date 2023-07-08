import React, {useEffect, useState} from 'react';
import {getUniqueId, getSystemVersion} from 'react-native-device-info';

import {host, isIOS} from '../resource/';

import {Apis} from '../resource/apis';
import {AccountService} from './Account';
import {deviceType, CheckLogic} from '../resource';
// import {ResetFunction} from './ResetFunction';
import {LanguageService} from './Language';
import {ResetFunction} from '.';
import {ModalBase} from './ModalCustom/ModalBase';

console.log('deviceid', getUniqueId());

// const refreshToken = async () => {
//   const account = AccountService.get();
//   const Strings = LanguageService.get();
//   console.log('refreshToken-account', account);
//   const api = Apis.refreshAccessToken();
//   // console.log('apiRefresh', api);
//   let token;
//   if (account.token?.refresh_token) {
//     token = account.token.refresh_token;
//   } else if (account.refresh_token) {
//     token = account.refresh_token;
//   }
//   try {
//     const response = await fetch(api, {
//       method: 'POST',
//       body: token,
//     });
//     console.log('refreshToken', response);

//     if (response.status === 200 || response.status === 201) {
//       const res = await response.json();
//       console.log('refreshToken', res);
//       if (res.status === 200) {
//         const newAccount = {
//           ...account,
//           token: {...account.token, access_token: res.data},
//         };

//         AccountService.set(newAccount);
//         return res;
//       } else if (res.status === 401) {
//         //account deactive
//         return;
//       }
//     }

//     if (response.status === 403) {
//       // const result = await FetchApi.loginUser({
//       //   username: account.username,
//       //   password: account.rawPassword,
//       // });
//       const info = {
//         deviceId: getUniqueId(),
//         loginType: 'APP_LOGIN',
//         platform: isIOS ? 'IOS' : 'ANDROID',
//         username: account.username,
//         password: account.rawPassword,
//       };
//       const request = JSON.stringify(info);
//       const header = {
//         method: 'POST',
//         body: request,
//       };
//       const responesLogin = await fetch(Apis.loginUser, header);
//       if (responesLogin.status === 200) {
//         const result = await responesLogin.json();
//         // console.log('loginUser', result);
//         if (result.status === 200) {
//           const newAccount = {...account, ...result.data};
//           AccountService.set(newAccount);
//           return {data: result.token.access_token};
//         }
//         if (result.status === 401) {
//           //account deactive
//           return;
//         }
//       }
//     }
//     throw new Error(Strings.Forbiden);
//   } catch (error) {
//     console.log('error', error);
//     return {error};
//   }
// };
const CommonCall = async (api, header) => {
  console.log('api', api);
  const Strings = LanguageService.get();
  // const networkState = await NetInfo.fetch();
  // if (!networkState.isConnected) {
  //   throw new Error(CheckLogic.No_internet);
  // }
  const account = AccountService.get();
  console.log('account', account);
  try {
    let headers = {
      'Content-Type': 'application/json',
      deviceid: getUniqueId(),
    };
    if (header) {
      //overide Content-type
      headers = {
        ...headers,
        ...header.headers,
      };
    }
    if (account && account.api_token && !api.includes(Apis.login)) {
      headers = {
        ...headers,
        Authorization: 'Bearer ' + account.api_token,
      };
    }
    let head = {...header, headers};
    console.log('head', head);
    let response = await fetch(api, head);

    console.log('response', response);

    if (
      response.status === 500 ||
      response.status === 502 ||
      response.status === 404 ||
      response.status === 504
    ) {
      throw new Error(Strings.Error_server);
    }

    // if (response.status !== 200) {
    //   throw new Error(result.message);
    // }
    const result = await response.json();
    // console.log('result', result);
    if (result.message === 'Phiên làm việc đã hết. Bạn cần đăng nhập lại.') {
      ResetFunction.resetToLogin();
    }

    return result;
  } catch (error) {
    console.log('errorFetch', error);
    if (error.message === CheckLogic.No_internet) {
      throw new Error(Strings.Network_request_fail);
    }
    if (error.message === "JSON Parse error: Unrecognized token '<'") {
      throw new Error(Strings.Data_is_not_correct);
    }
    if (error.message === Strings.Account_deactive) {
      throw new Error(Strings.Account_deactive);
    }
    throw new Error(error.message);
  }
};

const CommonCallTrack = async (api, header) => {
  console.log('api', api);
  const Strings = LanguageService.get();
  // const networkState = await NetInfo.fetch();
  // if (!networkState.isConnected) {
  //   throw new Error(CheckLogic.No_internet);
  // }
  const account = AccountService.get();
  console.log('account', account);
  try {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (header) {
      //overide Content-type
      headers = {
        ...headers,
        ...header.headers,
      };
    }
   
    let head = {...header, headers};
    console.log('head', head);
    let response = await fetch(api, head);

    console.log('response', response);

    // if (
    //   response.status === 500 ||
    //   response.status === 502 ||
    //   response.status === 404 ||
    //   response.status === 504
    // ) {
    //   throw new Error(Strings.Error_server);
    // }

    // if (response.status !== 200) {
    //   throw new Error(result.message);
    // }
    const result = await response.json();
    // console.log('result', result);
    // if (result.message === 'Phiên làm việc đã hết. Bạn cần đăng nhập lại.') {
    //   ResetFunction.resetToLogin();
    // }

    return result;
  } catch (error) {
    console.log('errorFetch', error);
    if (error.message === CheckLogic.No_internet) {
      throw new Error(Strings.Network_request_fail);
    }
    if (error.message === "JSON Parse error: Unrecognized token '<'") {
      throw new Error(Strings.Data_is_not_correct);
    }
    if (error.message === Strings.Account_deactive) {
      throw new Error(Strings.Account_deactive);
    }
    throw new Error(error.message);
  }
};

const CommonCallWithoutUseQuery = async (api, header) => {
  console.log('api', api);
  const Strings = LanguageService.get();
  // const networkState = await NetInfo.fetch();
  // if (!networkState.isConnected) {
  //   throw new Error(CheckLogic.No_internet);
  // }
  const account = AccountService.get();
  // console.log('account', account);
  try {
    let headers = {
      'Content-Type': 'application/json',
      deviceid: getUniqueId(),
    };
    if (header) {
      //overide Content-type
      headers = {
        ...headers,
        ...header.headers,
      };
    }
    if (account && account.api_token && !api.includes(Apis.login)) {
      headers = {
        ...headers,
        Authorization: 'Bearer ' + account.api_token,
      };
    }
    let head = {...header, headers};
    let response = await fetch(api, head);

    console.log('response', response);

    if (
      response.status === 500 ||
      response.status === 502 ||
      response.status === 404 ||
      response.status === 504
    ) {
      return {
        code: response.status,
        message: 'Lỗi kết nối đến server',
      };
    }

    const result = await response.json();
    console.log('result', result);

    if (result.message === 'Phiên làm việc đã hết. Bạn cần đăng nhập lại.') {
      ModalBase.error({
        message: 'Phiên làm việc đã hết. Bạn cần đăng nhập lại.',
      });
      ResetFunction.resetToLogin();
    }

    return result;
  } catch (error) {
    console.log('errorFetch', error);
    if (error.message === CheckLogic.No_internet) {
      return {code: 500, message: Strings.Network_request_fail};
    }
    if (error.message === "JSON Parse error: Unrecognized token '<'") {
      return {code: 11, message: Strings.Data_is_not_correct};
    }
    if (error.message === Strings.Account_deactive) {
    }
    return {code: 12, message: Strings.something_wrong};
  }
};

const FetchApi = {
  login: async ({username, password}) => {
    try {
      const info = {
        password,
        username,
      };
      const request = JSON.stringify(info);
      const header = {
        method: 'POST',
        body: request,
      };
      const api = Apis.login;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  logout: async () => {
    try {
      const header = {
        method: 'POST',
      };
      const api = Apis.logout;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  changePassword: async obj => {
    try {
      const header = {
        method: 'PUT',
        body: JSON.stringify(obj),
      };
      const api = Apis.changePassword;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListNews: async page => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListNews(page);
      const result = await CommonCall(api, header);
      if (result._msg_code === 1) {
        const response = {data: [...(result._data?.dsTin || [])]};
        if (result._data?.dsTin.length) {
          response.nextPage = page + 1;
        }
        return response;
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getNewsType: async is_type => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getNewsType(is_type);
      const result = await CommonCall(api, header);
      if (result._msg_code === 1) {
        return result._data?.dsTin || [];
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getNewsDetail: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getNewsDetail(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListProduct: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListProduct;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  searchProduct: async text => {
    try {
      const header = {
        method: 'post',
        body: JSON.stringify({keysearch: text}),
      };
      const api = Apis.searchProduct(text);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getPaginglichsusuachua: async ({
    pageIndex,
    sortType = 'asc',
    pageSize = 30,
  }) => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListProductPaging({
        pageIndex,
        sortType,
      });
      const result = await CommonCall(api, header);
      if (result._msg_code == 1) {
        const response = {data: result.Data || []};
        if (result.Data?.length === pageSize) {
          response.nextPage = pageIndex + 1;
        }
        return response;
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListCaronGarage: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListCaronGarage;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListMaybeYouLike: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListMaybeYouLike;
      const result = await CommonCall(api, header);
      if (result?._msg_code === 1) {
        const arr = [];
        Object.keys(result?._data).forEach(item => {
          (result?._data?.[item] || []).forEach(itm => {
            arr.push({...itm, data_type: item});
          });
        });
        return arr;
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },

  getAllListCar: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAllListCar;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAllManufacture: async id => {
    try {
      const header = {
        method: 'POST',
      };
      const api = Apis.getAllManufacture;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAllTypeCar: async id => {
    try {
      const header = {
        method: 'POST',
      };
      const api = Apis.getAllTypeCar;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAlltinhthanhOld: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAlltinhthanhOld;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAlltinhthanh: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAlltinhthanh;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAlldistrict: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAllquanhuyen(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAlldistrictOld: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAllquanhuyenOld(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAllTypeCarById: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAllTypeCarById(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getPromotion: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getPromotion(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  bannerPopup: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.bannerPopup;
      const result = await CommonCall(api, header);
      //console.log("hungdv",result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getPromotionWithGaraId: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getPromotionWithGaraId(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getAllCarColors: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getAllCarColors;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListBaoGia: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListBaoGia();
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  addPointToWallet: async promotion_id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.addPointToWallet(promotion_id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  cancelBaoGia: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.cancelBaoGia(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListBanner: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListBanner;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  introductionGara: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.introductionGara;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListLoiThuongGap: async ({id_xe, category_id, keysearch}) => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getListLoiThuongGap({id_xe, category_id, keysearch});
      const result = await CommonCall(api, header);
      console.log('dsadsa', keysearch);
      console.log('dsadresultsa', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  searchLoiThuongGap: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.searchLoiThuongGap;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getListExperience: async id => {
    const header = {
      method: 'GET',
    };
    const api = Apis.getListExperience(id);
    const result = await CommonCall(api, header);
    return result;
  },
  searchExperience: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.searchExperience;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  createBaoGia: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.createBaoGia;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  detailBaoGia: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.detailBaoGia(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  upFile: async (uri, name) => {
    const formData = new FormData();
    formData.append('fileList', {
      uri: uri,
      type: 'multipart/form-data',
      name: `${name || 1}.jpg`,
    });
    try {
      const header = {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const api = Apis.upFile;
      const result = await CommonCall(api, header);
      if (result.Data) {
        return {
          code: 200,
          success: true,
          data: host.api + result.Data,
        };
      }
      console.log('result', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },

  getOtpCode: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj), //phone
      };
      const api = Apis.getOtpCode;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  checkOtpCode: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj), //phone, otp
      };
      const api = Apis.checkOtpCode;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  resetPassword: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj), //phone, otp
      };
      const api = Apis.resetPassword;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  register: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj), //phone
      };
      const api = Apis.register;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  updateProfile: async obj => {
    try {
      const header = {
        method: 'PUT',
        body: JSON.stringify(obj),
      };
      const api = Apis.updateProfile;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },

  getMyCar: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getMyCar;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  addMyCar: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.addMyCar;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  updateMyCar: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.updateMyCar;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  deleteMyCar: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.deleteMyCar(id);
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  profile: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.profile;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  advisers: async gara_id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.advisers(gara_id);
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  detailBooking: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.detailBooking(id);
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  addBooking: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.addBooking;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  ratingAdd: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.ratingAdd;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  ratingComment: async ma => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.ratingComment(ma);
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  expertisePriceList: async ma => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.expertisePriceList;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  bookingList: async type => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.bookingList(type);
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  buyInsurrance: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.buyInsurrance;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  configNoti: async obj => {
    try {
      const header = {
        method: 'PUT',
        body: JSON.stringify(obj),
      };
      const api = Apis.configNoti;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  deviceToken: async obj => {
    try {
      const header = {
        method: 'PUT',
        body: JSON.stringify({
          ...obj,
          osname: isIOS ? 'Ios' : 'Android',
          osvesion: getSystemVersion()(),
        }),
      };
      const api = Apis.deviceToken;
      const result = await CommonCallWithoutUseQuery(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getPaginglichsusuachua: async ({
    pageSize = 15,
    pageIndex,
    sort,
    sortType,
    ma_xe,
  }) => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getPaginglichsusuachua({
        pageSize,
        pageIndex,
        sort,
        sortType,
        ma_xe,
      });
      const result = await CommonCall(api, header);
      if (result._msg_code == 1) {
        const response = {data: result.Data || []};
        if (result.Data?.length === pageSize) {
          response.nextPage = pageIndex + 1;
        }
        return response;
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  detailHistory: async ma => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.detailHistory(ma);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  listRescue: async (tinhthanh, tukhoa) => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.listRescue(tinhthanh, tukhoa);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  searchRescue: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.searchRescue;
      const result = await CommonCall(api, header);
      console.log('body', obj);
      console.log('resultrescue', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  listHomeService: async obj => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.listHomeService;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getMoneyApp: async obj => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.getMoneyApp;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  listOptionHomeService: async obj => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.listOptionHomeService;
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  addHomeService: async obj => {
    try {
      const header = {
        method: 'POST',
        body: JSON.stringify(obj),
      };
      const api = Apis.addHomeService;
      const result = await CommonCall(api, header);
      console.log('addHomeService', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  detailHomeService: async ma => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.detailHomeService(ma);
      const result = await CommonCall(api, header);
      console.log('detailHomeService', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  listCarMarket: async obj => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.listCarMarket(obj);
      const result = await CommonCall(api, header);
      if (result._msg_code == 1) {
        const response = {data: result._data || []};
        if (result._data?.length === -1) {
          response.nextPage = pageIndex + 1;
        }
        return response;
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  detailCarMarket: async ma => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.detailCarMarket(ma);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  createDevice: async item => {
    try {
      const header = {
        method: 'PUT',
        body: JSON.stringify(item),
      };
      const api = Apis.createDevice;
      const result = await CommonCall(api, header);
      console.log('createDevice', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },

  getListNoti: async () => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.listNoti({
        pageSize: 20,
        pageIndex: 1,
      });
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  getPagingNotification: async ({pageSize = 20, pageIndex, screen_code}) => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.listNoti({
        pageSize,
        pageIndex,
        screen_code, //baohiem, baoduong, luudong, baogia, datlich.
      });
      const result = await CommonCall(api, header);
      if (result._msg_code == 1) {
        const response = {data: result._data || []};
        if (result._data?.length === pageSize) {
          response.nextPage = pageIndex + 1;
        }
        return response;
      }
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  detailNotification: async id => {
    try {
      const header = {
        method: 'GET',
      };
      const api = Apis.detailNoti(id);
      const result = await CommonCall(api, header);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },

  // // đăng nhập
  // loginTracking: async () => {
  //   try {
  //     const header = {
  //       method: 'GET',
  //     };
  //     const api = Apis.loginTracking;
  //     const result = await CommonCallWithoutUseQuery(api, header);
  //     return result;
  //   } catch (error) {
  //     return {message: error.message};
  //   }
  // },

  // đăng ký đồng thời kiếm tra tài khoản có trong hệ t

  // loginTracking: async ({email, password}) => {
  //   try {
  //     const [api, SetApi] = useState("")
  //     // SetApi(data)
    
  //     const data1 = new URLSearchParams();
  //     data1.append('email', email);
  //     data1.append('password', password);
    
  //     fetch('http://150.95.115.93:8082/api/session', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       body: data1.toString()
  //     })
  //       .then(response => response.json())
  //       .then(api =>  SetApi(api))
  //       .catch(error => console.error(error));
  //       console.log(api)
  //       return api;
  //   } catch (error) {
  //     return {message: error.message};
  //   }
  // },

  // Get list bảo hành BSS
  // GetListBaoHanhByPhone: async id => {
  //   try {
  //     const header = {
  //       method: 'GET',
  //     };
  //     const api = Apis.GetListBaoHanhByPhone(id);
  //     const result = await CommonCall(api, header);
  //     return result;
  //   } catch (error) {
  //     return {message: error.message};
  //   }
  // },

};
export {FetchApi};
