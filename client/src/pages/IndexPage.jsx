import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/places/" + place._id}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h2 className="text-sm font-bold truncate leading-4">
              {place.address}
            </h2>
            <h3 className="text-sm truncate leading-4 text-gray-500">
              {place.title}
            </h3>
            <div className="mt-1">
              <span className="font-bold px-1">${place.price}</span>per night
            </div>
          </Link>
        ))}
    </div>
  );
}
