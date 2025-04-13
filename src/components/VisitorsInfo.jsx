import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase"; // Make sure this points to your Firebase configuration

const VisitorsInfo = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Fetch the user's IP address
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const { ip } = await ipResponse.json();
        setIpAddress(ip);

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
