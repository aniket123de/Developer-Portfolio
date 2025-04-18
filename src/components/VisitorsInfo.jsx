import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase"; // Make sure this points to your Firebase configuration

const VisitorsInfo = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Your location coordinates
  const YOUR_LOCATION = {
    latitude: 22.717361,
    longitude: 88.380833
  };

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Fetch the user's IP address
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const { ip } = await ipResponse.json();
        setIpAddress(ip);

        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude;
              const userLon = position.coords.longitude;
              setLocation({ latitude: userLat, longitude: userLon });
              
              // Calculate distance
              const dist = calculateDistance(
                YOUR_LOCATION.latitude,
                YOUR_LOCATION.longitude,
                userLat,
                userLon
              );
              setDistance(dist);
            },
            (error) => {
              setLocationError("Location access denied or not available");
            }
          );
        } else {
          setLocationError("Geolocation is not supported by your browser");
        }

        // Reference to Firestore collection
        const visitorsCollection = collection(db, "visitors");

        // Check if this IP already exists in Firestore
        const q = query(visitorsCollection, where("ip", "==", ip));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Add new visitor to Firestore
          await addDoc(visitorsCollection, {
            ip,
            timestamp: new Date(),
          });
        }

        // Fetch the total visitor count
        const allVisitors = await getDocs(visitorsCollection);
        setVisitorCount(allVisitors.size);
      } catch (error) {
        console.error("Error tracking visitor:", error);
        setIpAddress("Unable to fetch IP");
      }
    };

    trackVisitor();
  }, []);

  const getDistanceMessage = () => {
    if (!distance) return null;
    
    if (distance < 1) {
      return "You're very close to me! 🎯";
    } else if (distance < 10) {
      return "You're in the same city! 🌆";
    } else if (distance < 100) {
      return "You're in the same state! 🏙️";
    } else if (distance < 1000) {
      return "You're in the same country! 🌏";
    } else {
      return "You're visiting from far away! ✈️";
    }
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-28">
      <div className="bg-black-100 rounded-[20px] p-8 mt-12 text-white">
        <h2 className="text-[60px] font-bold text-center">Insights</h2>
        <p className="text-[18px] mt-4">
          Total Visitors: <span className="font-bold">{visitorCount}</span>
        </p>
        <p className="text-[18px] mt-2">
          Your IP Address: <span className="font-bold">{ipAddress}</span>
        </p>

        {/* Location Information */}
        <div className="mt-6">
          {locationError ? (
            <p className="text-red-500 text-[18px]">{locationError}</p>
          ) : location ? (
            <div>
              <p className="text-[18px]">
                Your Location:{" "}
                <span className="font-bold">
                  {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
                </span>
              </p>
              {distance && (
                <div className="mt-2">
                  <p className="text-[18px]">
                    Distance from me:{" "}
                    <span className="font-bold">
                      {distance.toFixed(1)} km
                    </span>
                  </p>
                  <p className="text-[#915EFF] text-[18px] mt-2 font-medium">
                    {getDistanceMessage()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[18px]">Fetching location...</p>
          )}
        </div>

        {/* Quote Section */}
        <div className="mt-8 bg-gray-800 rounded-full p-4 px-10 shadow-lg flex flex-col sm:flex-row items-center">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[18px] font-medium italic">"Differentiate. But don't Discriminate"</p>
          </div>
          <div className="flex-none mt-4 sm:mt-0 sm:ml-4 px-10">
            <p className="text-[16px] font-bold">- Aniket D.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsInfo;
