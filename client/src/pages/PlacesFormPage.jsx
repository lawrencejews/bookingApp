import PhotoUploader from "../components/PhotoUpload";
import Perks from "../components/Perks";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setEntraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState(false);

  // Tailwindcss styles
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function AddNewPlace(e) {
    e.preventDefault();

    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav/>
      <form onSubmit={AddNewPlace}>
        {preInput("Title", "Title with an advertisement for your place")}
        <input
          type="text"
          placeholder="My lovely Apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "Much better")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks ", "Select all the perks of your place ")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra Info ", " House rules")}
        <textarea
          value={extraInfo}
          onChange={(e) => setEntraInfo(e.target.value)}
        />

        {preInput(
          "Check in&out times, max guests ",
          " Add check in and out, remember to have time window for cleaning the room "
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              placeholder="0"
              value={maxGuest}
              onChange={(e) => setMaxGuest(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}