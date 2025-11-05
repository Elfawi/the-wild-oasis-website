import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

// const metadata = {
//   title: `Cabin`,
// };
export async function generateMetadata({ params: { cabinId } }) {
  const { name } = await getCabin(cabinId);
  return {
    title: `Cabin ${name}`,
  };
}
// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }));
//   return ids;
// }
export default async function Page({ params: { cabinId } }) {
  const cabin = await getCabin(cabinId);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
