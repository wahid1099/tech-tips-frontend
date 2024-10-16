import { useUser } from "@/src/context/UserContext";

const Paid = () => {
  const { user, isSetLoading } = useUser();

  return (
    <div>
      <h2>Paid</h2>
      <p>View your payment history and receipts.</p>
      <p>Cooming soon.</p>
      {/* Add your payment history logic here */}
    </div>
  );
};

export default Paid;
