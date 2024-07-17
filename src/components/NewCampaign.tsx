import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useFetch from "../hooks/useFetch";
import { Campaign } from "../models/Campaign";

interface NewCampaignFormProps {
  setAddNewCampaign: React.Dispatch<React.SetStateAction<boolean>>;
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  campaigns: Campaign[];
}

const NewCampaignForm: React.FC<NewCampaignFormProps> = ({
  setAddNewCampaign,
  campaigns,
  setCampaigns,
}) => {
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading, error, postData } = useFetch(
    "http://3.136.19.52:8000/api/campaigns/"
  );

  const handleCreateNewCampaign = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (
      title === "" ||
      headline === "" ||
      author === "" ||
      description === ""
    ) {
      return alert("All fields must be completed.");
    }
    const creationDate = new Date();
    const newCampaign = {
      id: uuidv4(),
      title: title,
      headline: headline,
      description: description,
      author: author,
      date_created: creationDate.toLocaleDateString(),
    };

    postData(newCampaign);
    if (error) {
      return;
    }
    setCampaigns([...campaigns, newCampaign]);
    setAddNewCampaign(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCreateNewCampaign}>
        <h2>Create a New Campaign</h2>
        <label>
          Campaign Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Written By:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Headline:
          <textarea
            className="headline-textarea"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            className="description-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {error && <p>Error adding new campaign</p>}
        <div className="form-button-row">
          <button
            className="cancel-button"
            onClick={() => setAddNewCampaign(false)}
          >
            Cancel
          </button>
          <button className="app-button" disabled={isLoading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCampaignForm;
