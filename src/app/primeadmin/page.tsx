import AdminDashboard from "./dashboard";
import AdminLogin from "./login";

export default function PrimeAdminPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Use a hybrid approach - check auth client-side */}
        <AdminDashboard />
      </div>
    </div>
  );
}