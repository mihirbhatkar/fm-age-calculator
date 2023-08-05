import { useReducer, useState } from "react";

function App() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const reducer = (state, action) => {
    if (action == "incomplete fields") return state;
  };

  const [alert, dispatch] = useReducer(reducer, {
    dayAlert: { status: false, message: "" },
    monthAlert: { status: false, message: "" },
    yearAlert: { status: false, message: "" },
  });

  const [age, setAge] = useState("");

  const calcAge = (e) => {
    e.preventDefault();
    if (day && month && year) {
      // TODO check for valid date
      const currentDate = new Date().getTime();
      const birthDate = new Date(day, month, year);
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      <div className="flex items-center  justify-center min-h-screen bg-neu-off-white">
        <div className="flex w-80 flex-col gap-4 bg-white p-8 rounded-xl rounded-br-[100px]">
          <form onSubmit={calcAge}>
            <div className="grid grid-cols-3 gap-2 text-sm font-[800]">
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
            <div className="flex justify-center items-center relative my-4">
              <hr className="absolute w-full z-10" />
              <button className="z-20" type="submit">
                <img
                  src="./images/icon-arrow.svg"
                  className="bg-prim-purple  active:bg-black h-14 w-14 rounded-[100px] p-[16px]"
                  alt=""
                />
              </button>
            </div>
          </form>

          <div className="flex flex-col font-[800] italic text-4xl">
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
