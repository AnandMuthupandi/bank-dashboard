import { MouseEvent, useEffect, useState, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select,
} from "d3";
import { IClientAccounts, IData } from "../../interfaces/types";
import FilterCardType from "./FilterCardType";
import { colorMapping } from "../../utils/utilities";
import styles from "../../styles/styles.module.css";
import { preprocessClientAccountData } from "../../utils/chartUtilities";

interface BarChartProps {
  clientAccounts: IClientAccounts[];
  cardTypes: IClientAccounts[];
  selectedSegment: any;
}
interface ITooltip {
  x: number;
  y: number;
  balance: number;
  cardType: string;
}

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
  data: IData[];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
  onMouseEnter: (
    e: MouseEvent<SVGPathElement>,
    balance: number,
    cardType: string
  ) => void;
  onMouseLeave: () => void;
  selectedSegment: any;
  highlightedAccounts: any;
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({
  data,
  height,
  scaleX,
  scaleY,
  onMouseEnter,
  onMouseLeave,
  selectedSegment,
  highlightedAccounts,
}: BarsProps) {
  return (
    <>
      {data.map(({ id, card_type, balance }) => {
        const isHighlighted =
          highlightedAccounts &&
          highlightedAccounts.some(
            (account: IClientAccounts) => account.card_type === card_type
          );

        return (
          <rect
            key={`bar-${id}`}
            x={scaleX(card_type)}
            y={scaleY(balance)}
            width={scaleX.bandwidth()}
            height={height - scaleY(balance)}
            fill={colorMapping(card_type)}
            onMouseEnter={(event) => onMouseEnter(event, balance, card_type)}
            onMouseLeave={onMouseLeave}
            opacity={isHighlighted ? 0.5 : 1}
          />
        );
      })}
    </>
  );
}

export default function BarChart({
  clientAccounts,
  cardTypes,
  selectedSegment,
}: BarChartProps) {
  const [clientAccountData, setClientAccountData] = useState<IClientAccounts[]>(
    []
  );

  const [tooltipState, setTooltipState] = useState<ITooltip | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setClientAccountData(clientAccounts);
    setSuccess(true);
  }, []);

  const filteredCardTypes = (cardType: any) => {
    const filteredItems = cardTypes.filter((card) => !cardType[card.id]);

    setClientAccountData(filteredItems);
  };
  const highlightedAccounts =
    selectedSegment &&
    preprocessClientAccountData(clientAccountData).filter(({ balance }) =>
      selectedSegment === "Balance >=0" ? balance >= 0 : balance < 0
    );

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 350 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const maxYByCardType: Record<string, number> = preprocessClientAccountData(
    clientAccountData
  ).reduce((acc, { card_type, balance }) => {
    if (!acc[card_type] || balance > acc[card_type]) {
      acc[card_type] = balance;
    }
    return acc;
  }, {} as Record<string, number>);

  if (success) {
    const scaleX = scaleBand()
      .domain(
        preprocessClientAccountData(cardTypes).map(({ card_type }) => card_type)
      )
      .range([0, width])
      .padding(0.4);

    const minYValue = Math.min(0, Math.min(...Object.values(maxYByCardType)));
    const maxYValue = Math.max(...Object.values(maxYByCardType));

    const scaleY = scaleLinear()
      .domain([minYValue, maxYValue])
      .range([height, 0]);

    return (
      <>
        <FilterCardType
          clientAccounts={cardTypes}
          filteredCards={filteredCardTypes}
        />
        {/* <br></br> */}
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
            <AxisLeft scale={scaleY} />
            <Bars
              data={clientAccountData}
              height={height}
              scaleX={scaleX}
              scaleY={scaleY}
              onMouseEnter={(event, balance, cardType) => {
                setTooltipState({
                  x: event.clientX,
                  y: event.clientY,
                  balance: balance,
                  cardType: cardType,
                });
              }}
              onMouseLeave={() => setTooltipState(null)}
              selectedSegment={selectedSegment}
              highlightedAccounts={highlightedAccounts}
            />
          </g>
        </svg>
        {tooltipState !== null ? (
          <div
            className={styles.tooltip}
            style={{ top: tooltipState.y, left: tooltipState.x }}
          >
            <span className={styles.tooltipTitle}>
              {tooltipState.cardType} : {tooltipState.balance}
            </span>
          </div>
        ) : null}
      </>
    );
  } else {
    return <></>;
  }
}
