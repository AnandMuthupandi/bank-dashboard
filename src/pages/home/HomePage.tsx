import React, { useEffect } from "react";
import { useApiContext } from "../../contexts/apicontext";
import { APIUtility } from "../../utils/apiutilities";
import { CONSTANTS } from "../../utils/constants";
import ClientDetails from "../clientDetails/ClientDetails";

const Home: React.FC = () => {
  const { apiState, fetchData } = useApiContext();
  const clientsAPIId = CONSTANTS.API.CLIENTS.ID;

  useEffect(() => {
    if (!apiState[clientsAPIId]) {
      fetchData({
        url: APIUtility.generateApiUrl(CONSTANTS.API.CLIENTS.URL),
        apiId: clientsAPIId,
        options: APIUtility.apiGetOptions,

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

export default Home;
