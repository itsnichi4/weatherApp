export function showTimezoneAndClock(location) {
    const timezoneApiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${`AIzaSyAwPB3_HoHYDJ-kbbb9kyaPb1n5OIqgM5Y`}`;
    
    fetch(timezoneApiUrl)
      .then(response => response.json())
      .then(data => {
        const offsetSeconds = data.dstOffset + data.rawOffset;
        const timezoneOffset = (offsetSeconds >= 0 ? '+' : '-') + new Date(Math.abs(offsetSeconds) * 1000).toISOString().substr(11, 5);
  
        // display the timezone and clock
        const timezoneElement = document.createElement('div');
        timezoneElement.textContent = `Timezone: GMT${timezoneOffset}`;
        const clockElement = document.createElement('div');
        clockElement.id = 'clock';
  
        // Append  elements to weather container
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.appendChild(timezoneElement);
        weatherContainer.appendChild(clockElement);
  
        // Update clock
        setInterval(() => {
          const now = new Date();
          const hour = (now.getUTCHours() + offsetSeconds / 3600) % 24;
          const minute = now.getUTCMinutes() + (offsetSeconds % 3600) / 60;
          const second = now.getUTCSeconds();
          clockElement.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });
  }