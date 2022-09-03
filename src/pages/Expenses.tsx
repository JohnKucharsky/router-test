import { useOutletContext } from "react-router-dom";

function Expenses() {
  const executorWorks = useOutletContext();
  console.log(executorWorks);
  return <div>{JSON.stringify(executorWorks)}</div>;
}

export default Expenses;
