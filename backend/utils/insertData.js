const mongoose = require("mongoose");
const Destination = require("../models/Destination");
const generateData = require("./aiDataGenerator");

require("dotenv").config();

const connectDB = require("../config/db");
connectDB();

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cities = [
  "Paris",
  "London",
  "Tokyo",
  "New York",
  "Dubai",
  "Rome",
  "Bangkok",
  "Barcelona",
  "Amsterdam",
  "Sydney",
  "Berlin",
  "Moscow",
  "Lisbon",
  "Vienna",
  "Cairo",
  "Delhi",
  "Beijing",
  "Rio de Janeiro",
  "Mexico City",
  "Toronto",
  "Istanbul",
  "Seoul",
  "Athens",
  "Venice",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Prague",
  "Munich",
  "Madrid",
  "Stockholm",
  "Zurich",
  "Brussels",
  "Singapore",
  "Hong Kong",
  "Buenos Aires",
  "Cape Town",
  "Melbourne",
  "Jakarta",
  "Manila",
  "Hanoi",
  "Ho Chi Minh City",
  "Bali",
  "Kyoto",
  "Osaka",
  "Kuala Lumpur",
  "Taipei",
  "Shenzhen",
  "Shanghai",
  "Bogotá",
  "Lima",
  "Santiago",
  "Brasilia",
  "Johannesburg",
  "Nairobi",
  "Casablanca",
  "Marrakech",
  "Havana",
  "Panama City",
  "Dubai",
  "Abu Dhabi",
  "Doha",
  "Riyadh",
  "Jeddah",
  "Kuwait City",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Karachi",
  "Lahore",
  "Dhaka",
  "Kathmandu",
  "Thimphu",
  "Colombo",
  "Male",
  "Fiji",
  "Honolulu",
  "Auckland",
  "Wellington",
  "Port Moresby",
  "Ulaanbaatar",
  "Tashkent",
  "Almaty",
  "Bishkek",
  "Ashgabat",
  "Yerevan",
  "Baku",
  "Tbilisi",
  "Sarajevo",
  "Belgrade",
  "Sofia",
  "Bucharest",
  "Reykjavik",
  "Helsinki",
  "Oslo",
  "Copenhagen",
  "Dublin",
  "Edinburgh",
  "Valencia",
  "Seville",
  "Granada",
  "Marrakesh",
  "Rabat",
  "Muscat",
  "Amman",
  "Beirut",
  "Damascus",
  "Tehran",
  "Baghdad",
  "Kabul",
  "Islamabad",
  "Tunis",
  "Algiers",
  "Tripoli",
  "Accra",
  "Lagos",
  "Dakar",
  "Kinshasa",
  "Luanda",
  "Addis Ababa",
  "Maputo",
  "Harare",
  "Antananarivo",
  "Port Louis",
  "Victoria",
  "Hobart",
  "Suva",
  "Nouméa",
  "Apia",
  "Nukuʻalofa",
  "Port Vila",
  "Papeete",
  "San Juan",
  "Kingston",
  "Bridgetown",
  "St. John's",
  "Castries",
  "Port of Spain",
  "Basseterre",
  "Roseau",
  "Georgetown",
  "Paramaribo",
  "Montevideo",
  "Asunción",
  "La Paz",
  "Sucre",
  "San Salvador",
  "Guatemala City",
  "Managua",
  "Tegucigalpa",
  "Belmopan",
  "San José",
  "Cayenne",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insertManyCities() {
  let requestCount = 0;
  let totalInserted = 0;

  console.log(`🚀 Starting data insertion for ${cities.length} cities...`);

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    console.log(`[${i + 1}/${cities.length}] 🔍 Fetching data for: ${city}`);

    try {
      const data = await generateData(city);

      if (data) {
        await Destination.insertMany([data]);
        totalInserted++;
        console.log(
          `✅ Successfully inserted data for ${city} (${totalInserted} total)`
        );
      } else {
        console.log(`⚠️ No data generated for ${city}, skipping`);
      }

      requestCount++;

      // Check if we've made 15 requests
      if (requestCount >= 15) {
        console.log(
          `⏱️ API limit reached! ${requestCount} requests completed. Pausing for 2 minutes...`
        );
        const waitStart = new Date();
        await sleep(120000); // Wait for 2 minutes (120000ms)
        console.log(
          `▶️ Resuming after waiting (${Math.round(
            (new Date() - waitStart) / 1000
          )} seconds)`
        );
        requestCount = 0; // Reset counter after waiting
      }
    } catch (error) {
      console.error(`❌ Error processing ${city}:`, error.message);
      // Continue with next city despite error
    }
  }

  console.log(
    `\n🎉 Data insertion completed! Successfully inserted ${totalInserted}/${cities.length} cities.`
  );
  process.exit();
}

// Execute the function
insertManyCities();
