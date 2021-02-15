import "./App.css";
import { useState, useEffect } from "react";
import ListVessel from "./components/ListVessel";
import Header from "./components/Header";
import Vessel from "./components/Vessel";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  const [vesselsData, setVesselsData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("asc");

  const getVessels = async () => {
    try {
      const res = await fetch(
        " https://extranet-api.skuld.com/vesselsearch/?query=tiger"
      );
      const data = await res.json();
      setVesselsData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getVessels();
  }, []);
  const callSetQuery = (e) => {
    setQuery(e.target.value);
  };
  const callSetSort = () => {
    setSortType(sortType === "asc" ? "des" : "asc");
  };
  const callResetInput = () => {
    setQuery("");
  };

  const removeEmptyValues = (obj) => {
    return JSON.parse(JSON.stringify(obj, (k, v) => v ?? undefined));
  };
  const search = (vesselsData) => {
    const rows = removeEmptyValues(vesselsData);
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Header callSetQuery={callSetQuery} query={query} />
            <ListVessel
              vesselsData={search(vesselsData)}
              callResetInput={callResetInput}
              sortType={sortType}
              callSetSort={callSetSort}
            />
          </Route>
          <Route path="/vessel/:id">
            <Vessel vesselsData={vesselsData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
