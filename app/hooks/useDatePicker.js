import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

const useDatePicker = () => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [dateOne, setDateOne] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const onChangeOne = (event, selectedDateOne) => {
    const currentDateOne = selectedDateOne;
    setShow(false);
    setDateOne(currentDateOne);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const DatePicker = ({ type }) => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={type ? dateOne : date}
        mode={mode}
        is24Hour={true}
        onChange={type ? onChangeOne : onChange}
      />
    );
  };

  return {
    date,
    dateOne,
    show,
    DatePicker,
    onChange,
    showDatepicker,
    showTimepicker,
  };
};
export default useDatePicker;
