import React from "react";
import { Campaign } from "../models/Campaign";

interface CampaignRowProps {
    campaign: Campaign
}
const CampaignRow: React.FC<CampaignRowProps> = ({ campaign }) => {
    return (
      <div className="campaign-container">
        <div className="campaign-title">{campaign.title}</div>
        <div className="campaign-author">
          Written By: {campaign.author} {campaign.date_created.toString()}
        </div>
  
        <div className="campaign-headline">{campaign.headline}</div>
        <div className="campaign-description">{campaign.description}</div>
      </div>
    );
  };
  
  export default CampaignRow;
  