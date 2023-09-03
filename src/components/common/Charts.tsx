import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import BarChart from "./BarChart";
import { PieChart } from "./PieChart";
import { CONSTANTS } from "../../utils/constants";
import { useApiContext } from "../../contexts/apicontext";
import { APIUtility } from "../../utils/apiutilities";
import { IClientAccounts } from "../../interfaces/types";
import EmptyAccounts from "./EmptyAccounts";
import LoadingWrapper from "./loading/LoadingWrapper";

interface ChartProps {
  clientId: string;
  openModal: () => void;
}

export default function Charts({ clientId, openModal }: ChartProps) {
  const { apiState, fetchData, apiDispatch } = useApiContext();
  const [clientAccounts, setClientAccounts] = useState<IClientAccounts[]>([]);
  const [cardTypes, setCardTypes] = useState<IClientAccounts[]>([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const clientAccountsAPIId = CONSTANTS.API.CLIENT_ACCOUNTS.ID;

  useEffect(() => {
    if (!apiState.apiState?.clientAccounts[clientId]) {
      setIsShowLoading(true);
      fetchData({
        url: APIUtility.generateApiUrl(
          CONSTANTS.API.CLIENT_ACCOUNTS.URL + clientId
        ),
        apiId: clientAccountsAPIId,
        options: APIUtility.apiGetOptions,
        successCallback: (resp: any) => {
          setClientAccounts(resp);
          setCardTypes(resp);
          setIsShowLoading(false);
          apiDispatch({
            type: CONSTANTS.ACTIONS.CLIENT_ACCOUNTS,
            clientId,
            resp,
          });
        },
        errorCallback: (error: any) => {
          setClientAccounts(error);
        },
        isToStoreInContext: false,
      });
    } else if (apiState.apiState?.clientAccounts[clientId]) {
      setClientAccounts(apiState.apiState.clientAccounts[clientId]);
      setCardTypes(apiState.apiState.clientAccounts[clientId]);
    }
  }, [clientId]);

  const handlePieSegmentClick = (segment: any) => {
    setSelectedSegment(segment);
  };

  const handleModal = () => {
    openModal();
  };

  if (clientAccounts.length) {
    return (
      <>
        <LoadingWrapper
          isShowLoading={isShowLoading}
          component={
            <>
              <Grid item xs={4}>
                <PieChart
                  width={400}
                  height={200}
                  clientAccounts={clientAccounts}
                  cardTypes={cardTypes}
                  onSegmentClick={handlePieSegmentClick}
                />
              </Grid>
              <Grid item xs={4}>
                <div onClick={handleModal}>
                  <BarChart
                    clientAccounts={clientAccounts}
                    cardTypes={cardTypes}
                    selectedSegment={selectedSegment}
                  />
                </div>
              </Grid>
            </>
          }
        />
      </>
    );
  } else {
    return (
      <>
        <Grid item xs={8} justifyContent="center">
          <LoadingWrapper
            isShowLoading={isShowLoading}
            component={<EmptyAccounts />}
          />
        </Grid>
      </>
    );
  }
}
