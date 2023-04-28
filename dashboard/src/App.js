import { Header } from "./components";
import { SideBar } from "./container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import AddCars from "./pages/AddCars";

import { Navigate } from "react-router-dom";

import { useState } from "react";
import ShowCar from "./pages/ShowCar";
import UpdateCar from "./pages/UpdateCar";
import Bookings from "./pages/Bookings";
import AddClient from "./pages/AddClient";
import ShowClient from "./pages/ShowClient";
import Places from "./pages/Places";
import AddPlace from "./pages/AddPlace";
import UpdatePlaces from "./pages/UpdatePlaces";
import Feedbacks from "./pages/Feedbacks";
import Informations from "./pages/Informations";
import UpdateInfos from "./pages/UpdateInfos";

function App() {
  const [addCar, setAddCar] = useState(false)
  const [showCar, setShowCar] = useState(false)
  const [updateCar, setUpdateCar] = useState(false)

  const [addClient, setAddClient] = useState(false)
  const [showClient, setShowClient] = useState(false)

  const [addPlace, setAddPlace] = useState(false)
  const [updatePlace, setUpdatePlace] = useState(false)

  return (
    <BrowserRouter>
      <div className="h-screen">
        <Header />
        <div className="container mx-auto flex flex-row">
          <SideBar />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/cars" element={<Cars setAddCar={setAddCar} setShowCar={setShowCar} setUpdateCar={setUpdateCar} />} />
            <Route path="/addCar" element={addCar ? <AddCars setAddCar={setAddCar} /> : <Navigate to='/cars' />} />
            <Route path="/showCar/:id" element={showCar ? <ShowCar setShowCar={setShowCar} /> : <Navigate to='/cars' />} />
            <Route path="/updateCar/:id" element={updateCar ? <UpdateCar setUpdateCar={setUpdateCar} /> : <Navigate to='/cars' />} />

            <Route path="/bookings" element={<Bookings setAddClient={setAddClient} setShowClient={setShowClient} />}/>
            <Route path="/addClient" element={addClient ? <AddClient setAddClient={setAddClient} /> : <Navigate to="/bookings" />} />
            <Route path="/showClient/:id" element={showClient ? <ShowClient setShowClient={setShowClient} /> : <Navigate to="/bookings" />}/>

            <Route path="/places" element={<Places setAddPlace={setAddPlace} setUpdatePlace={setUpdatePlace} />} />
            <Route path="/addPlace" element={addPlace ? <AddPlace setAddPlace={setAddPlace} /> : <Navigate to="/places" />} />
            <Route path="/updatePlace/:id" element={updatePlace ? <UpdatePlaces setUpdatePlace={setUpdatePlace} /> : <Navigate to='/places' />} />

            <Route path="/feedbacks" element={<Feedbacks />} />

            <Route path="/informations" element={<Informations />} />
            <Route path="/updateInfos/:id" element={<UpdateInfos />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
