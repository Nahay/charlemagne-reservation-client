import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faList } from "@fortawesome/free-solid-svg-icons";

import ACalendar from "../components/order/ACalendar";
import List from "../components/order/List";
import DayDetails from "../components/order/DayDetails";

import { getDateByDate, getDatesByVisibility } from '../services/calendarService';

const Order = () => {

  const ref = useRef(null);

  const [dateList, setDatesList] = useState([]);
  const [dishByDateList, setDishByDateList] = useState([]);
  const [tableActive, setTableActive] = useState(true);
  const [date, setDate] = useState(new Date(new Date().toDateString()).getTime());
  const [nbR, setNbR] = useState("");
  const [price, setPrice] = useState("");

  const previousDate = !isNaN(Date.parse(localStorage.getItem('date'))) && isNaN((localStorage.getItem('date'))) ? localStorage.getItem('date') : new Date();
  
  useEffect(() => {
    const previousDate = !isNaN(Date.parse(localStorage.getItem('date'))) && isNaN((localStorage.getItem('date'))) ? localStorage.getItem('date') : new Date();

    async function getSetDates() {      
      const dates = await getDatesByVisibility();
      setDatesList(dates);
      
      if(previousDate !== null) {
        await getDishByDateList(typeof previousDate === "string" ? new Date(previousDate).getTime() : previousDate);
      }
      else await getDishByDateList(new Date(new Date().toDateString).getTime());
    }

    getSetDates();
  }, [date]);

  const getDishByDateList = async (dateC) => {
    let dateVisible = false;

    const d = await getDateByDate(dateC);

    if (d !== null) {
      if(d.visibility) dateVisible = true;
    }

    if (!dateVisible) {
      setDishByDateList([]);
      setNbR("");
      setPrice("");
    }
    else {
      setDishByDateList(d.dishes);
      setNbR(d.nbRemaining);
      setPrice(d.price);
    }
  }

  const onDateChange = async (dateC) => {    
    setDate(dateC);
    localStorage.setItem('date', new Date(dateC));
    await getDishByDateList(dateC)
  }

  return (
    <div className="order">
      <div className="order__left">
        <div className="order__left__content">
          <div className="order__left__content__icons">
            <FontAwesomeIcon
              icon={faTable}
              onClick={() => setTableActive(true)}
            />
            <FontAwesomeIcon
              icon={faList}
              onClick={() => setTableActive(false)}
            />
          </div>

          { tableActive ?
            <ACalendar rightRef={ref} dateList={dateList} onDateChange={onDateChange} date={typeof previousDate === "string" ? new Date(previousDate) : previousDate}/>
          : 
            <List rightRef={ref} dateList={dateList} onDateChange={onDateChange}/>
          }

        </div>
      </div>
      <div className="order__right" ref={ref}>
          <DayDetails date={previousDate !== null ? new Date(previousDate).getTime() : date} dishByDateList = {dishByDateList} nbR={nbR} price={price}/>
      </div>
    </div>
  );
};

export default Order;