// Sensor data generator
export const generateSensorData = () => ({
  soilMoisture: Math.round(30 + Math.random() * 50),
  temperature: Math.round((20 + Math.random() * 20) * 10) / 10,
  humidity: Math.round(40 + Math.random() * 40),
  pumpStatus: Math.random() > 0.5,
});

export const generateTimeSeriesData = (points = 20) => {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - i) * 5 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    moisture: Math.round(35 + Math.sin(i * 0.3) * 15 + Math.random() * 8),
    temperature: Math.round((25 + Math.cos(i * 0.2) * 8 + Math.random() * 3) * 10) / 10,
    humidity: Math.round(55 + Math.sin(i * 0.25) * 12 + Math.random() * 6),
  }));
};

export const alerts = [
  { id: 1, type: 'warning' as const, message: 'Soil is too dry in Zone A', time: '2 min ago' },
  { id: 2, type: 'danger' as const, message: 'High temperature detected (38°C)', time: '5 min ago' },
  { id: 3, type: 'info' as const, message: 'Irrigation started automatically', time: '8 min ago' },
  { id: 4, type: 'success' as const, message: 'Zone B moisture levels optimal', time: '15 min ago' },
];

export const cropData = [
  {
    name: 'Rice',
    emoji: '🌾',
    moisture: { ideal: '80-90%', min: 70, max: 95 },
    temperature: { ideal: '25-35°C', min: 20, max: 38 },
    humidity: { ideal: '70-85%', min: 60, max: 90 },
    water: 'High – requires consistent flooding or saturation',
    mistakes: ['Inconsistent water levels', 'Poor drainage during growth', 'Late transplanting'],
    practices: ['Maintain 2-5cm standing water', 'Use alternate wetting and drying', 'Monitor for blast disease'],
    insight: 'Rice requires consistently high moisture levels. Paddy fields should maintain standing water during vegetative growth.',
  },
  {
    name: 'Wheat',
    emoji: '🌾',
    moisture: { ideal: '50-65%', min: 40, max: 70 },
    temperature: { ideal: '15-25°C', min: 10, max: 30 },
    humidity: { ideal: '40-60%', min: 30, max: 70 },
    water: 'Moderate – 4-6 irrigations during growth cycle',
    mistakes: ['Over-watering during grain filling', 'Ignoring crown root initiation irrigation', 'Late sowing'],
    practices: ['Irrigate at critical growth stages', 'Avoid waterlogging', 'Apply nitrogen in splits'],
    insight: 'Wheat is drought-tolerant but needs irrigation at crown root initiation and flowering stages.',
  },
  {
    name: 'Corn',
    emoji: '🌽',
    moisture: { ideal: '55-75%', min: 45, max: 80 },
    temperature: { ideal: '20-30°C', min: 15, max: 35 },
    humidity: { ideal: '50-70%', min: 40, max: 80 },
    water: 'Moderate to High – critical during tasseling',
    mistakes: ['Water stress during silking', 'Overcrowding plants', 'Nutrient deficiency'],
    practices: ['Ensure adequate water during tasseling', 'Space plants 20-30cm apart', 'Side-dress nitrogen'],
    insight: 'Corn is most water-sensitive during tasseling and silking. A single drought event here can reduce yields by 40%.',
  },
  {
    name: 'Tomato',
    emoji: '🍅',
    moisture: { ideal: '60-70%', min: 50, max: 80 },
    temperature: { ideal: '20-28°C', min: 15, max: 32 },
    humidity: { ideal: '50-65%', min: 40, max: 75 },
    water: 'Moderate – consistent but not excessive',
    mistakes: ['Irregular watering causing blossom end rot', 'Over-watering leading to root rot', 'Pruning errors'],
    practices: ['Use drip irrigation', 'Mulch to retain moisture', 'Support with stakes or cages'],
    insight: 'Tomatoes prefer moderate watering and warm temperatures. Irregular watering is the #1 cause of blossom end rot.',
  },
  {
    name: 'Sugarcane',
    emoji: '🎋',
    moisture: { ideal: '70-85%', min: 60, max: 90 },
    temperature: { ideal: '25-38°C', min: 20, max: 42 },
    humidity: { ideal: '60-80%', min: 50, max: 85 },
    water: 'Very High – water-intensive throughout growth',
    mistakes: ['Water stress during tillering', 'Poor ratoon management', 'Delayed harvesting'],
    practices: ['Furrow irrigation works best', 'Maintain moisture during grand growth', 'Trash mulching'],
    insight: 'Sugarcane is extremely water-intensive. It needs 1500-2500mm of water over its 12-18 month cycle.',
  },
  {
    name: 'Cotton',
    emoji: '☁️',
    moisture: { ideal: '45-65%', min: 35, max: 75 },
    temperature: { ideal: '25-35°C', min: 20, max: 40 },
    humidity: { ideal: '40-60%', min: 30, max: 70 },
    water: 'Moderate – sensitive to both drought and excess',
    mistakes: ['Excess moisture during boll opening', 'Pest management neglect', 'Over-fertilization'],
    practices: ['Deficit irrigation during maturity', 'Monitor bollworm regularly', 'Pick cotton promptly'],
    insight: 'Cotton is moderately drought-tolerant but needs careful water management—too much moisture causes boll rot.',
  },
];

export const weatherData = {
  temperature: 32,
  feelsLike: 35,
  humidity: 65,
  rainProbability: 40,
  windSpeed: 12,
  uvIndex: 7,
  condition: 'Partly Cloudy',
  forecast: [
    { day: 'Mon', temp: 32, rain: 40, icon: '⛅' },
    { day: 'Tue', temp: 34, rain: 20, icon: '☀️' },
    { day: 'Wed', temp: 30, rain: 70, icon: '🌧️' },
    { day: 'Thu', temp: 28, rain: 80, icon: '🌧️' },
    { day: 'Fri', temp: 31, rain: 30, icon: '⛅' },
    { day: 'Sat', temp: 33, rain: 10, icon: '☀️' },
    { day: 'Sun', temp: 35, rain: 5, icon: '☀️' },
  ],
  suggestions: [
    { text: 'Rain expected Wednesday — consider postponing irrigation', type: 'info' as const },
    { text: 'Hot weather Thursday-Friday — increase watering frequency', type: 'warning' as const },
    { text: 'UV index high today — crops may need shade protection', type: 'warning' as const },
  ],
};

export const farmZones = [
  { id: 1, name: 'Zone A - Rice Paddy', crop: 'Rice', status: 'irrigating', moisture: 82, x: 10, y: 10, w: 35, h: 40 },
  { id: 2, name: 'Zone B - Wheat Field', crop: 'Wheat', status: 'optimal', moisture: 58, x: 50, y: 10, w: 40, h: 25 },
  { id: 3, name: 'Zone C - Corn Field', crop: 'Corn', status: 'dry', moisture: 35, x: 10, y: 55, w: 30, h: 35 },
  { id: 4, name: 'Zone D - Tomato Greenhouse', crop: 'Tomato', status: 'optimal', moisture: 65, x: 45, y: 40, w: 25, h: 30 },
  { id: 5, name: 'Zone E - Cotton Field', crop: 'Cotton', status: 'moderate', moisture: 48, x: 75, y: 45, w: 20, h: 45 },
];

export const getStatusColor = (value: number, type: 'moisture' | 'temperature' | 'humidity') => {
  if (type === 'moisture') {
    if (value < 30) return 'destructive';
    if (value < 50) return 'warning';
    return 'success';
  }
  if (type === 'temperature') {
    if (value > 38) return 'destructive';
    if (value > 32) return 'warning';
    return 'success';
  }
  if (value < 30) return 'warning';
  if (value > 80) return 'warning';
  return 'success';
};
