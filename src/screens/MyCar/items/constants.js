const CAR_MANUFACTURERS = [
  {value: 'Vin fast'},
  {value: 'Abarth'},
  {value: 'Alfa Romeo'},
  {value: 'Aston Martin'},
  {value: 'Audi'},
  {value: 'Bentley'},
  {value: 'BMW'},
  {value: 'Bugatti'},
  {value: 'Cadillac'},
  {value: 'Chevrolet'},
  {value: 'Chrysler'},
  {value: 'Citroën'},
  {value: 'Dacia'},
  {value: 'Daewoo'},
  {value: 'Daihatsu'},
  {value: 'Dodge'},
  {value: 'Donkervoort'},
  {value: 'DS'},
  {value: 'Ferrari'},
  {value: 'Fiat'},
  {value: 'Fisker'},
  {value: 'Ford'},
  {value: 'Honda'},
  {value: 'Hummer'},
  {value: 'Hyundai'},
  {value: 'Infiniti'},
  {value: 'Iveco'},
  {value: 'Jaguar'},
  {value: 'Jeep'},
  {value: 'Kia'},
  {value: 'KTM'},
  {value: 'Lada'},
  {value: 'Lamborghini'},
  {value: 'Lancia'},
  {value: 'Land Rover'},
  {value: 'Landwind'},
  {value: 'Lexus'},
  {value: 'Lotus'},
  {value: 'Maserati'},
  {value: 'Maybach'},
  {value: 'Mazda'},
  {value: 'McLaren'},
  {value: 'Mercedes-Benz'},
  {value: 'MG'},
  {value: 'Mini'},
  {value: 'Mitsubishi'},
  {value: 'Morgan'},
  {value: 'Nissan'},
  {value: 'Opel'},
  {value: 'Peugeot'},
  {value: 'Porsche'},
  {value: 'Renault'},
  {value: 'Rolls-Royce'},
  {value: 'Rover'},
  {value: 'Saab'},
  {value: 'Seat'},
  {value: 'Skoda'},
  {value: 'Smart'},
  {value: 'SsangYong'},
  {value: 'Subaru'},
  {value: 'Suzuki'},
  {value: 'Tesla'},
  {value: 'Toyota'},
  {value: 'Volkswagen'},
  {value: 'Volvo'},
];

const getListYear = () => {
  let currentYear = new Date().getFullYear();
  const years = [];

  let startYear = 1970;
  while (Number(currentYear) >= Number(startYear)) {
    years.push({value: `${currentYear--}`});
  }
  return years;
};

const YEARS = getListYear();

export {CAR_MANUFACTURERS, YEARS};
