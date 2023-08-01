import React, {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConfirmDeletion from "./pages/ConfirmDeletion";
import CreationForm from "./pages/CreationForm";
import ShowTable from "./pages/ShowTable";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return(
        <BrowserRouter>
            <main className="container d-flex justify-content-center align-items-center vh-100">
                <Fragment>
                    <Routes>
                        <Route path="/" element={<ShowTable/>} />
                        <Route path="/client" element={<ShowTable/>} />
                        <Route path="/create" element={<CreationForm />} />
                        <Route path="/delete" element={<ConfirmDeletion />} />
                    </Routes>
                </Fragment>
            </main>
        </BrowserRouter>
    );
};

export default App;
