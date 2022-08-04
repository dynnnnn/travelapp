export const GOOGLE_API_KEY = "AIzaSyALw1hlDa1_fdLuWzio6tfuCauElP9gQLU";

export default function getMapPrevew(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  

  if (!response.ok){
      throw new Error('Failed to fetch address!')
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;

}

export async function getCoordiates(placeId) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  

  if (!response.ok){
      throw new Error('Failed to fetch coordinates!')
  }

  const data = await response.json();
  const coordinates = {
    lat: data.results[0].geometry.location.lat, 
    lng: data.results[0].geometry.location.lng}

  return coordinates;

}

