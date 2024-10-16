
import { useUser } from "@/src/context/UserContext";

const MakePayments = () => {
  const { user, isSetLoading } = useUser();

  return (
    <div>
      <h2>Make Payments</h2>
      <p>Manage and make payments.</p>
      {/* Add your payment management logic here */}
    </div>
  );
};

export default MakePayments;
