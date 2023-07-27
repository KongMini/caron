import {appKeys, host} from './system';

const Apis = {
  login: `${host.api_user}/ps_user/login`,
  logout: `${host.api_user}/ps_user/logout`,
  delete_account: `${host.api_user}/ps_user/delete_account`,
  resetPassword: `${host.api_user}/ps_user/reset_password`,
  profile: `${host.api_user}/ps_user/profile`,
  changePassword: `${host.api_user}/ps_user/change_password`,

  getOtpCode: `${host.api_user}/ps_user/otp`,
  checkOtpCode: `${host.api_user}/ps_user/checkotp`,
  register: `${host.api_user}/ps_user/register`,
  updateProfile: `${host.api_user}/ps_user/update_profile`,

  advisers: gara_id =>
    `${host.api_user}/ps_user/adviser${gara_id ? '?gara_id=' + gara_id : ''}`,

  getListNews: page => `${host.api_user}/news/list/${page}`,
  getNewsDetail: id => `${host.api_user}/news/detail/${id}`,
  getNewsType: is_type => `${host.api_user}/news/list_type?is_type=${is_type}`,

  getListProduct: `${host.api}/Gara/getAllthongtin_vattu`,
  getListProductPaging: ({
    sort = 'ten_vattu',
    sortType,
    pageIndex,
    pageSize = 30,
  }) =>
    `${host.api}/Gara/getPagingthongtin_vattu?sort=${sort}&sortType=${sortType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
  searchProduct: fieldValue =>
    `${host.api}/Gara/getAllthongtin_vattuByFieldValue?fieldname=ten_vattu&fieldValue=${fieldValue}`,

  getListCaronGarage: `${host.api_user}/gara/list`,
  getListMaybeYouLike: `${host.api_user}/products/favourite`,

  getMoneyHistory: ({page, limit}) =>
    `${host.api2}/apicaron/ps_user/money_history?page=${page}&limit=${limit}`,
  getMoneyApp: `${host.api2}/apicaron/ps_user/money_app`,
  getAllListCar: `${host.api}/Gara/getAllListCar`,
  getAllManufacture: `${host.api}/Gara/getPaginghangxe?sort=ten_hangxe&sortType=asc`,

  getAllTypeCar: `${host.api}/Gara/getAlldongxe`,
  getAllTypeCarById: id => `${host.api}/Gara/getAlldongxeByMa?ma=${id}`,

  addPointToWallet: promotion_id =>
    `${host.api2}/apicaron/ps_user/check_point?promotion_id=${promotion_id}`,
  getAlltinhthanhOld: `${host.api}/Gara/getPagingtinhthanh?sort=ten_thanhpho&sortType=ASC&pageIndex=1&pageSize=100`,
  getAlltinhthanh: `${host.api2}/apicaron/gara/allTinhThanh`,
  getAllquanhuyen: id =>
    `${host.api2}/apicaron/gara/allQuanHuyen?ma_tinhthanh=${id}`,
  getAllquanhuyenOld: id =>
    `${host.api}/Gara/getAllquanhuyen?ma_tinhthanh=${id}`,

  getPromotion: id => `${host.api_user}/promotion/list`,
  getPromotionWithGaraId: id => `${host.api_user}/promotion/list_gara/${id}`,
  getListBaoGia: id => `${host.api_user}/service_quotation/list`,
  createBaoGia: `${host.api_user}/service_quotation/add`,
  detailBaoGia: id => `${host.api_user}/service_quotation/detail/${id}`,
  cancelBaoGia: id => `${host.api_user}/service_quotation/cancel/${id}`,
  getAllCarColors: `${host.api}/Gara/getAllmauxe`,

  getMyCar: `${host.api_user}/ps_user/mycar`,
  addMyCar: `${host.api_user}/ps_user/add_mycar`,
  updateMyCar: `${host.api_user}/ps_user/update_mycar`,
  deleteMyCar: id => `${host.api_user}/ps_user/delete_mycar/${id}`,

  addBooking: `${host.api_user}/booking/add`,
  bookingList: type =>
    `${host.api_user}/booking/list?${type ? 'type=' + type : ''}`,
  detailBooking: id => `${host.api_user}/booking/detail/${id}`,

  expertisePriceList: `${host.api_user}/expertise_price/list`,

  getListLoiThuongGap: ({id_xe, category_id, keysearch}) =>
    `${host.api_user}/faqs/list?${id_xe ? 'id_xe=' + id_xe : ''}${
      category_id ? '&category_id=' + category_id : ''
    }${keysearch ? '&keysearch=' + keysearch : ''}`,
  searchLoiThuongGap: `${host.api_user}/faqs/search`,

  getListExperience: id =>
    `${host.api_user}/experience/list${id ? '/' + id : ''}`,
  searchExperience: `${host.api_user}/experience/search`,

  getListBanner: `${host.api_user}/banner/list`,

  buyInsurrance: `${host.api_user}/insurrance/add`,

  deviceToken: `${host.api_user}/ps_user/notification`,

  getPaginglichsusuachua: ({sort, sortType, pageIndex, pageSize = 15, ma_xe}) =>
    `${host.api}/Gara/getPaginglichsusuachua?sort=${sort}&sortType=${sortType}&pageIndex=${pageIndex}&pageSize=${pageSize}&ma_xe=${ma_xe}`,
  detailHistory: ma => `${host.api}/Gara/getlichsusuachuaByMa?ma=${ma}`,
  ratingAdd: `${host.api_user}/rating/add`,
  ratingComment: ma => `${host.api_user}/rating/list/${ma}`,
  listRescue: (tinhthanh, tukhoa) =>
    `${host.api_user}/rescue/list?${tinhthanh ? 'tinhthanh=' + tinhthanh : ''}${
      tukhoa ? '&tukhoa=' + tukhoa : ''
    }`,
  searchRescue: `${host.api2}/apicaron/rescue/search`,

  listHomeService: `${host.api_user}/home_service/list`,
  listOptionHomeService: `${host.api_user}/home_service/option`,
  addHomeService: `${host.api_user}/home_service/add`,
  detailHomeService: ma => `${host.api_user}/home_service/detail/${ma}`,

  createDevice: `${host.api_user}/ps_user/notification`,

  listCarMarket: ({hangxe, dongxe, keywords}) =>
    `${host.api_user}/car_sale/list?${
      hangxe && hangxe !== 'all' ? 'hangxe=' + hangxe : ''
    }${dongxe ? '&dongxe=' + dongxe : ''}${
      keywords ? '&keywords=' + keywords : ''
    }`,
  detailCarMarket: ma => `${host.api_user}/car_sale/detail/${ma}`,

  listNoti: ({pageSize, pageIndex, screen_code}) =>
    `${host.api_user}/notifications/list?&page=${pageIndex}&limit=${pageSize}${
      screen_code ? '&screen_code=' + screen_code : ''
    }`,
  detailNoti: id => `${host.api_user}/notifications/detail/${id}`,

  configNoti: `${host.api_user}/ps_user/config_notice`,
  introductionGara: `${host.api_user}/news/introduction`,

  bannerPopup: `${host.api_user}/banner/popup`,

  upFile: `${host.api}/File/UploadFormFile?fileModule=1`,

  // App Tracking

  // login
  loginTracking: `${host.api_tracking}/session`,
  
  // Tạo mới
  registerTracking: `${host.api_tracking}/users`,
  
  // token
  tokenTracking: `${host.api_tracking}/session/token`,
  
  GetListBaoHanhByPhone:phone => `${host.api_bss}/GetListBaoHanhByPhone?phone=${phone}`

};

export {Apis};
