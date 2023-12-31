import { useReducer, useState } from "react";

function App() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const reducer = (state, action) => {
    switch (action) {
      case "clear alerts":
        return {
          dayAlert: { status: false, message: "" },
          monthAlert: { status: false, message: "" },
          yearAlert: { status: false, message: "" },
        };

      case "incomplete year":
        return {
          ...state,
          yearAlert: { status: true, message: "This field is required" },
        };
      case "incomplete day":
        return {
          ...state,
          dayAlert: { status: true, message: "This field is required" },
        };
      case "incomplete month":
        return {
          ...state,
          monthAlert: { status: true, message: "This field is required" },
        };

      case "invalid date":
        if (day <= 0 || month <= 0 || year <= 0) {
          return {
            ...state,
            dayAlert: { status: true, message: "Invalid date" },
          };
        } else if (day > 31) {
          return {
            ...state,
            dayAlert: { status: true, message: "Invalid day" },
          };
        } else if (month > 12) {
          return {
            ...state,
            monthAlert: { status: true, message: "Invalid month" },
          };
        }

      default:
        break;
    }
  };

  const [alert, dispatch] = useReducer(reducer, {
    dayAlert: { status: false, message: "" },
    monthAlert: { status: false, message: "" },
    yearAlert: { status: false, message: "" },
  });

  const [age, setAge] = useState("");

  const [invalidDate, setInvalidDate] = useState(false);

  const calcAge = (e) => {
    e.preventDefault();
    dispatch("clear alerts");
    setAge(null);

    if (day && month && year) {
      if (day <= 0 || month <= 0 || year <= 0) {
        setInvalidDate(true);
        setTimeout(() => {
          setInvalidDate(false);
        }, 3000);
      } else if (day > 31 || month > 12) {
        dispatch("invalid date");
        setTimeout(() => {
          dispatch("clear alerts");
        }, 3000);
      } else {
        const birthDate = new Date(year, month - 1, day);

        const currentDate = new Date();

        let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        let ageMonths = currentDate.getMonth() - birthDate.getMonth();
        let ageDays = currentDate.getDate() - birthDate.getDate();

        if (ageDays < 0) {
          // If the current day is less than the birth day, adjust the months and days
          ageMonths--;
          const lastMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          );
          ageDays += lastMonth.getDate();
        }

        if (ageMonths < 0) {
          // If the current month is less than the birth month, adjust the years and months
          ageYears--;
          ageMonths += 12;
        }

        setAge({ day: ageDays, month: ageMonths, year: ageYears });
      }
    } else {
      if (!year) {
        dispatch("incomplete year");
      }
      if (!month) {
        dispatch("incomplete month");
      }
      if (!day) {
        dispatch("incomplete day");
      }

      setTimeout(() => {
        dispatch("clear alerts");
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex items-center  justify-center min-h-screen bg-neu-off-white p-4">
        <div className="flex w-80 mobile:w-[480px] flex-col gap-4 bg-white p-8 rounded-xl rounded-br-[100px]">
          <form onSubmit={calcAge}>
            <div className="grid  mobile:w-80 grid-cols-3 gap-2 text-sm font-[800]">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="day"
                  className={` ${
                    alert.dayAlert.status
                      ? "text-red-600"
                      : "text-neu-smokey-grey"
                  } font-bold tracking-widest`}
                >
                  DAY
                </label>
                <input
                  className={`border-2  ${
                    alert.dayAlert.status
                      ? "border-red-600"
                      : "border-neu-light-grey"
                  }  rounded-lg p-2 text-lg tracking-wide`}
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  type="number"
                  name="day"
                  id="day"
                />
                {alert.dayAlert.status && (
                  <span className="text-red-600 italic font-normal text-[8px]">
                    {alert.dayAlert.message}
                  </span>
                )}
                {invalidDate && (
                  <span className="text-red-600 italic font-normal text-[12px]">
                    Invalid date
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="month"
                  className={` ${
                    alert.monthAlert.status
                      ? "text-red-600"
                      : "text-neu-smokey-grey"
                  } font-bold tracking-widest`}
                >
                  MONTH
                </label>
                <input
                  className={`border-2  ${
                    alert.monthAlert.status
                      ? "border-red-600"
                      : "border-neu-light-grey"
                  }  rounded-lg p-2 text-lg tracking-wide`}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  type="number"
                  name="month"
                  id="month"
                />
                {alert.monthAlert.status && (
                  <span className="text-red-600 italic font-normal text-[8px]">
                    {alert.monthAlert.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="year"
                  className={` ${
                    alert.yearAlert.status
                      ? "text-red-600"
                      : "text-neu-smokey-grey"
                  } font-bold tracking-widest`}
                >
                  YEAR
                </label>
                <input
                  className={`border-2  ${
                    alert.yearAlert.status
                      ? "border-red-600"
                      : "border-neu-light-grey"
                  }  rounded-lg p-2 text-lg tracking-wide`}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  type="number"
                  name="year"
                  id="year"
                />
                {alert.yearAlert.status && (
                  <span className="text-red-600 italic font-normal text-[8px]">
                    {alert.yearAlert.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mobile:justify-start relative my-4 mobile:my-0">
              <hr className="absolute mobile:relative w-full z-10" />
              <button className="z-20 h-16 w-16" type="submit">
                <img
                  src="./images/icon-arrow.svg"
                  className="bg-prim-purple  active:bg-black rounded-[100px] p-[16px]"
                  alt=""
                />
              </button>
            </div>
          </form>

          <div className="flex flex-col font-[800] italic text-5xl mobile:text-[4rem]  mt-[-10px] mobile:mt-[-30px]">
            <div className="">
              <span className="text-prim-purple">{age ? age.year : "--"}</span>{" "}
              years
            </div>
            <div>
              <span className="text-prim-purple">{age ? age.month : "--"}</span>{" "}
              months
            </div>
            <div>
              <span className="text-prim-purple">{age ? age.day : "--"}</span>{" "}
              days
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
