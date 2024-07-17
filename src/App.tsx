import { useState, useEffect } from "react";

import "./App.css";
import CampaignRow from "./components/CampaignRow";
import NewCampaignForm from "./components/NewCampaign";
import useFetch from "./hooks/useFetch";

function App() {
  const [addNewCampaign, setAddNewCampaign] = useState(false);

  const { data, setData, isLoading, error, getData, deleteData } = useFetch(
    "http://3.136.19.52:8000/api/campaigns/"
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <h1>Adventures Archivist</h1>
      <p>
        The Adventures Archivist is a web-based application that allows Dungeons
        and Dragons enthusiast to view and share their own unique campaign
        stories.
      </p>
      <button className="app-button" onClick={() => setAddNewCampaign(true)}>
        Add Campaign
      </button>

      {isLoading && <p>Loading....</p>}
      {error && <p>Error getting campaigns</p>}

      {data.length !== 0 ? (
        <ul>
          {data.map((campaign) => (
            <li key={campaign.id}>
              <CampaignRow campaign={campaign} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No Campaigns added.</p>
      )}
      {addNewCampaign && (
        <NewCampaignForm
          setAddNewCampaign={setAddNewCampaign}
          campaigns={data}
          setCampaigns={setData}
        />
      )}
      <button className="cancel-button" onClick={deleteData}>
        Clear Campaigns
      </button>
    </div>
  );
}

export default App;
