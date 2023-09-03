// src/components/ClientList.tsx
import React, { useState, useEffect } from "react";
import { useApiContext } from "../../contexts/apicontext";
import { APIUtility } from "../../utils/apiutilities";
import { CONSTANTS } from "../../utils/constants";
import ClientDetails from "../clientDetails/ClientDetails";

interface Client {
  id: string;
  firstname: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const { apiState, fetchData } = useApiContext();
  const clientsAPIId = CONSTANTS.API.CLIENTS.ID;

  useEffect(() => {
    if (!apiState[clientsAPIId]) {
      fetchData({
        url: APIUtility.generateApiUrl(CONSTANTS.API.CLIENTS.URL),
        apiId: clientsAPIId,
        options: APIUtility.apiGetOptions,
        // successCallback: (resp: any) => {
        //   setClients(resp);
        // },
        // errorCallback: (error: any) => {
        //   setClients(error);
        // },
        isToStoreInContext: true,
      });
    }
  }, []);

  if (apiState[clientsAPIId]) {
    let { data, error } = APIUtility.parseResponse(apiState[clientsAPIId]);
    if (data) {
      return <ClientDetails clientData={data} />;
    } else if (error) {
      return error.message;
    }
  }
};

export default Dashboard;
