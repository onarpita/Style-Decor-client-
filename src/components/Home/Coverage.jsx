import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; 

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const [serviceCentres, setServiceCentres] = useState([]);
    const mapRef = useRef(null);
    useEffect(() => {
        axios('serviceCenter.json')
            .then(res => {
                setServiceCentres(res.data);
            });
    }, [serviceCentres]);
    return (
        <div className="space-y-4">
            <h2 className="text-center text-4xl font-semibold">Service Coverage Map</h2>
            <div className="border w-full h-200">
                <MapContainer center={position} zoom={8} scrollWheelZoom={false} className="h-full" ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCentres.map((center, index) => <Marker key={index} position={[center.latitude, center.longitude]}>
                            <Popup>
                                <p><strong>{center.district}</strong></p>
                                <p>Service Area: {center.covered_area.join(", ")}</p>
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;