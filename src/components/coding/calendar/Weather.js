import React from 'react'

import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '50c47db0a43e3272ad62e5808487e517',
    lat: '34.1011825196704',
    lon: '-118.35148796361587',
    lang: 'en',
    unit: 'imperial', // values are (metric, standard, imperial)
  });
  return (
    <ReactWeather
      style={{height: '100%'}}
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Home"
      unitsLabels={{ temperature: 'F', windSpeed: 'Mp/h' }}
      showForecast
    />
  );
};